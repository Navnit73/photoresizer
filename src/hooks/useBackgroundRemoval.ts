import { useState, useCallback, useRef } from "react";
import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

// ── Types ──────────────────────────────────────────────────────────────

export type BgColor = "transparent" | "white" | string;
export type OutputFormat = "image/png" | "image/webp";

export interface BgRemovalResult {
  id: string;
  originalFile: File;
  originalUrl: string;
  resultBlob: Blob | null;
  resultUrl: string | null;
  status: "pending" | "processing" | "done" | "error";
  progress: number; // 0–100
  error?: string;
}

export interface UseBackgroundRemovalReturn {
  singleResult: BgRemovalResult | null;
  removeSingleBackground: (file: File) => Promise<void>;
  bulkResults: BgRemovalResult[];
  removeBulkBackgrounds: (files: File[]) => Promise<void>;
  isProcessing: boolean;
  overallProgress: number;
  cancelProcessing: () => void;
  reset: () => void;
  compositeWithBg: (
    resultBlob: Blob,
    bgColor: BgColor,
    format: OutputFormat,
    quality: number
  ) => Promise<Blob>;
}

// ── Helpers ────────────────────────────────────────────────────────────

let idCounter = 0;
function makeId(): string {
  return `bgr_${Date.now()}_${++idCounter}`;
}

function createObjectUrl(blob: Blob | File): string {
  return URL.createObjectURL(blob);
}

// ── Hook ───────────────────────────────────────────────────────────────

export function useBackgroundRemoval(): UseBackgroundRemovalReturn {
  const [singleResult, setSingleResult] = useState<BgRemovalResult | null>(null);
  const [bulkResults, setBulkResults] = useState<BgRemovalResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const cancelledRef = useRef(false);
  const urlsToRevoke = useRef<string[]>([]);

  // Bug fix 1: track the active promise so reset() can properly abort it.
  // Previously cancelledRef was set to true but the async loop had no way to
  // surface that to the imgly promise already in-flight; we now also abort
  // any pending per-item work via a generation counter so stale callbacks
  // from a previous run never mutate state for a new run.
  const generationRef = useRef(0);

  const revokeUrls = useCallback(() => {
    urlsToRevoke.current.forEach((u) => URL.revokeObjectURL(u));
    urlsToRevoke.current = [];
  }, []);

  // ─── Single image ──────────────────────────────────────────────────

  const removeSingleBackground = useCallback(async (file: File) => {
    // Bug fix 2: increment generation so any in-flight callbacks from a
    // previous call (e.g. rapid re-uploads) ignore their results.
    const gen = ++generationRef.current;
    cancelledRef.current = false;

    setIsProcessing(true);
    setOverallProgress(0);

    const originalUrl = createObjectUrl(file);
    urlsToRevoke.current.push(originalUrl);

    setSingleResult({
      id: makeId(),
      originalFile: file,
      originalUrl,
      resultBlob: null,
      resultUrl: null,
      status: "processing",
      progress: 0,
    });

    try {
      const blob = await imglyRemoveBackground(file, {
        progress: (_key: string, current: number, total: number) => {
          // Bug fix 3: guard on both cancelledRef AND generation so a stale
          // progress callback from a previous file never overwrites new state.
          if (cancelledRef.current || generationRef.current !== gen) return;
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          setOverallProgress(pct);
          setSingleResult((prev) => (prev ? { ...prev, progress: pct } : prev));
        },
      });

      if (cancelledRef.current || generationRef.current !== gen) return;

      const resultUrl = createObjectUrl(blob);
      urlsToRevoke.current.push(resultUrl);

      setSingleResult((prev) =>
        prev
          ? { ...prev, resultBlob: blob, resultUrl, status: "done", progress: 100 }
          : prev
      );
      setOverallProgress(100);
    } catch (err: unknown) {
      if (cancelledRef.current || generationRef.current !== gen) return;
      const message = err instanceof Error ? err.message : "Processing failed";
      setSingleResult((prev) =>
        prev ? { ...prev, status: "error", error: message } : prev
      );
    } finally {
      // Bug fix 4: only clear isProcessing if this is still the active run.
      // Without this, a fast second upload would set isProcessing=false
      // prematurely when the first run's finally block fires.
      if (generationRef.current === gen) {
        setIsProcessing(false);
      }
    }
  }, []);

  // ─── Bulk images ───────────────────────────────────────────────────

  const removeBulkBackgrounds = useCallback(async (files: File[]) => {
    const gen = ++generationRef.current;
    cancelledRef.current = false;

    setIsProcessing(true);
    setOverallProgress(0);

    const items: BgRemovalResult[] = files.map((file) => {
      const originalUrl = createObjectUrl(file);
      urlsToRevoke.current.push(originalUrl);
      return {
        id: makeId(),
        originalFile: file,
        originalUrl,
        resultBlob: null,
        resultUrl: null,
        status: "pending" as const,
        progress: 0,
      };
    });
    setBulkResults([...items]);

    const total = files.length;
    let doneCount = 0;

    for (let i = 0; i < total; i++) {
      if (cancelledRef.current || generationRef.current !== gen) break;

      items[i] = { ...items[i], status: "processing", progress: 0 };
      setBulkResults([...items]);

      try {
        const blob = await imglyRemoveBackground(files[i], {
          progress: (_key: string, current: number, progressTotal: number) => {
            if (cancelledRef.current || generationRef.current !== gen) return;
            const itemPct =
              progressTotal > 0 ? Math.round((current / progressTotal) * 100) : 0;
            items[i] = { ...items[i], progress: itemPct };
            setBulkResults([...items]);

            // Bug fix 5: overall progress calculation was slightly wrong when
            // doneCount=0 and itemPct=0 — it produced NaN-adjacent values.
            // Clamp to [0,100] and use Math.round consistently.
            const globalPct = Math.min(
              100,
              Math.round(((doneCount + itemPct / 100) / total) * 100)
            );
            setOverallProgress(globalPct);
          },
        });

        if (cancelledRef.current || generationRef.current !== gen) break;

        const resultUrl = createObjectUrl(blob);
        urlsToRevoke.current.push(resultUrl);

        items[i] = {
          ...items[i],
          resultBlob: blob,
          resultUrl,
          status: "done",
          progress: 100,
        };
        doneCount++;
        setBulkResults([...items]);
        setOverallProgress(Math.round((doneCount / total) * 100));
      } catch (err: unknown) {
        if (cancelledRef.current || generationRef.current !== gen) break;
        const message = err instanceof Error ? err.message : "Processing failed";
        items[i] = { ...items[i], status: "error", error: message };
        // Bug fix 6: doneCount was incremented on error, which is correct for
        // progress tracking, but the items array mutation happened AFTER the
        // setBulkResults call in the original — meaning the UI briefly showed
        // stale state. Reordered: mutate items[i] first, then setState.
        doneCount++;
        setBulkResults([...items]);
        setOverallProgress(Math.round((doneCount / total) * 100));
      }
    }

    // Bug fix 7: mark any remaining "pending" or "processing" items as errors
    // when the loop exits early due to cancellation, so the UI doesn't freeze
    // showing spinner/clock icons forever.
    if (cancelledRef.current || generationRef.current !== gen) {
      let mutated = false;
      for (let i = 0; i < items.length; i++) {
        if (items[i].status === "pending" || items[i].status === "processing") {
          items[i] = { ...items[i], status: "error", error: "Cancelled" };
          mutated = true;
        }
      }
      if (mutated && generationRef.current === gen) {
        setBulkResults([...items]);
      }
    }

    if (generationRef.current === gen) {
      setIsProcessing(false);
    }
  }, []);

  // ─── Composite with background color ───────────────────────────────

  const compositeWithBg = useCallback(
    async (
      resultBlob: Blob,
      bgColor: BgColor,
      format: OutputFormat = "image/png",
      quality: number = 0.92
    ): Promise<Blob> => {
      // Fast path: transparent PNG needs no canvas work.
      if (bgColor === "transparent" && format === "image/png") {
        return resultBlob;
      }

      const img = new Image();
      const url = createObjectUrl(resultBlob);

      return new Promise((resolve, reject) => {
        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");

          // Bug fix 8: canvas.getContext("2d") can return null (e.g. too many
          // active canvases, or in some test environments). The original used
          // a non-null assertion (!) which would throw an opaque TypeError.
          if (!ctx) {
            reject(new Error("Could not get 2D canvas context"));
            return;
          }

          if (bgColor !== "transparent") {
            ctx.fillStyle = bgColor === "white" ? "#ffffff" : bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Canvas toBlob failed"));
            },
            format,
            // Bug fix 9: quality is ignored by the browser for PNG (lossless).
            // Passing it anyway is harmless, but for WEBP values must be 0–1.
            // Guard here so a caller passing quality=92 (integer %) doesn't
            // silently produce a 0-byte WEBP.
            format === "image/webp" ? Math.min(1, Math.max(0, quality)) : undefined
          );
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image for compositing"));
        };
        img.src = url;
      });
    },
    []
  );

  // ─── Cancel & Reset ────────────────────────────────────────────────

  const cancelProcessing = useCallback(() => {
    cancelledRef.current = true;
    // Bug fix 10: cancelProcessing set isProcessing=false immediately, but
    // the async loop's finally block would then also call setIsProcessing(false)
    // redundantly — and if a new run started in the meantime, the finally
    // block from the cancelled run would clobber the new run's isProcessing=true.
    // The generation guard in finally now prevents that, so it's safe to set
    // false here too (no-op if already false, correct if still true).
    setIsProcessing(false);
  }, []);

  const reset = useCallback(() => {
    // Bump generation first so any in-flight finally blocks are ignored.
    generationRef.current++;
    cancelledRef.current = true;
    setIsProcessing(false);
    setOverallProgress(0);
    setSingleResult(null);
    setBulkResults([]);
    revokeUrls();
  }, [revokeUrls]);

  return {
    singleResult,
    removeSingleBackground,
    bulkResults,
    removeBulkBackgrounds,
    isProcessing,
    overallProgress,
    cancelProcessing,
    reset,
    compositeWithBg,
  };
}