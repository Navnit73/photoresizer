import { useState, useRef, useCallback, useEffect } from "react";
import { GripHorizontal, Eye, EyeOff, Loader2 } from "lucide-react";
import type { BgRemovalResult } from "@/hooks/useBackgroundRemoval";

interface BgRemovalPreviewProps {
  result: BgRemovalResult;
}

const CHECKER_BG = `
  linear-gradient(45deg, #d4d4d4 25%, transparent 25%),
  linear-gradient(-45deg, #d4d4d4 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #d4d4d4 75%),
  linear-gradient(-45deg, transparent 75%, #d4d4d4 75%)
`.trim();

export function BgRemovalPreview({ result }: BgRemovalPreviewProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [showOriginal, setShowOriginal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Bug fix: use containerRef width each time pointer moves, not a cached offsetWidth
  const posFromPointer = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      setSliderPos(posFromPointer(e.clientX));
    },
    [posFromPointer]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Bug fix: global listener only for safety; primary cleanup via pointer capture
  useEffect(() => {
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  // Touch support for mobile
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      setSliderPos(posFromPointer(e.touches[0].clientX));
    },
    [posFromPointer]
  );

  const isLoading = result.status === "processing";
  const hasResult = result.status === "done" && result.resultUrl;
  const hasError = result.status === "error";
  const isPending = result.status === "pending";

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Preview</h3>
        {hasResult && (
          <button
            onClick={() => setShowOriginal((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {showOriginal ? (
              <><EyeOff className="w-3.5 h-3.5" /> Show result</>
            ) : (
              <><Eye className="w-3.5 h-3.5" /> Show original</>
            )}
          </button>
        )}
      </div>

      {/* Main container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 select-none"
        style={{
          aspectRatio: "4 / 3",
          backgroundImage: CHECKER_BG,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          touchAction: "none",
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchMove={handleTouchMove}
      >
        {/* ── Pending ── */}
        {isPending && (
          <img
            src={result.originalUrl}
            alt="Waiting to process"
            className="absolute inset-0 w-full h-full object-contain opacity-60"
          />
        )}

        {/* ── Show original toggle ── */}
        {showOriginal && !isLoading && (
          <img
            src={result.originalUrl}
            alt="Original"
            className="absolute inset-0 w-full h-full object-contain z-10"
          />
        )}

        {/* ── Before/after slider ── */}
        {!showOriginal && hasResult && (
          <>
            {/* Result (full) */}
            <img
              src={result.resultUrl!}
              alt="Background removed"
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />

            {/* Original (clipped) — Bug fix: use % width on wrapper + 100vw trick replaced with getBoundingClientRect */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0" style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%", maxWidth: "none" }}>
                <img
                  src={result.originalUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-30 cursor-ew-resize"
              style={{ left: `${sliderPos}%`, transform: "translate(-50%, -50%)" }}
              onPointerDown={handlePointerDown}
            >
              <div className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
                <GripHorizontal className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-2.5 left-2.5 z-10 px-2 py-1 rounded-md bg-black/55 text-white text-[11px] font-semibold backdrop-blur-sm pointer-events-none">
              Original
            </div>
            <div className="absolute top-2.5 right-2.5 z-10 px-2 py-1 rounded-md bg-black/55 text-white text-[11px] font-semibold backdrop-blur-sm pointer-events-none">
              Removed
            </div>

            {/* Mobile hint — shown briefly */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 rounded-full bg-black/40 text-white text-[10px] backdrop-blur-sm pointer-events-none sm:hidden">
              Drag to compare
            </div>
          </>
        )}

        {/* ── Loading overlay ── */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <img
              src={result.originalUrl}
              alt="Processing"
              className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none"
            />
            <div className="relative flex flex-col items-center gap-3 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-violet-500 animate-spin" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Removing background…
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                  {result.progress}% complete
                </p>
              </div>
              <div className="w-40 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-300 ease-out"
                  style={{ width: `${result.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Error overlay ── */}
        {hasError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm">
            <img
              src={result.originalUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-contain opacity-15 pointer-events-none"
            />
            <div className="relative text-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl" role="img" aria-label="Warning">⚠️</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Processing failed</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] mx-auto">
                {result.error ?? "An unknown error occurred"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}