import { useState, useCallback } from "react";
import {
  Download,
  Palette,
  FileImage,
  SlidersHorizontal,
  PackageOpen,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type {
  BgColor,
  OutputFormat,
  BgRemovalResult,
} from "@/hooks/useBackgroundRemoval";

interface BgRemovalControlsProps {
  mode: "single" | "bulk";
  singleResult: BgRemovalResult | null;
  bulkResults: BgRemovalResult[];
  isProcessing: boolean;
  onDownloadSingle: (bgColor: BgColor, format: OutputFormat, quality: number) => void;
  onDownloadAll: (bgColor: BgColor, format: OutputFormat, quality: number) => void;
  onReset: () => void;
  bgSelection: InternalBgSelection;
  setBgSelection: (bg: InternalBgSelection) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

// Bug fix: "custom" is an internal UI state, never passed as BgColor directly
export type InternalBgSelection = "transparent" | "white" | "#000000" | "#EF4444" | "#3B82F6" | "#22C55E" | "_custom";

const BG_PRESETS: { label: string; value: InternalBgSelection; hex?: string }[] = [
  { label: "Transparent", value: "transparent" },
  { label: "White", value: "white" },
  { label: "Black", value: "#000000", hex: "#000000" },
  { label: "Red", value: "#EF4444", hex: "#EF4444" },
  { label: "Blue", value: "#3B82F6", hex: "#3B82F6" },
  { label: "Green", value: "#22C55E", hex: "#22C55E" },
];

function SwatchDot({ value, hex, size = 16 }: { value: InternalBgSelection; hex?: string; size?: number }) {
  const s = size;
  if (value === "transparent") {
    return (
      <div
        style={{
          width: s, height: s, borderRadius: "50%", flexShrink: 0,
          border: "1px solid #d1d5db",
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
        }}
      />
    );
  }
  if (value === "white") {
    return <div style={{ width: s, height: s, borderRadius: "50%", background: "#fff", border: "1px solid #d1d5db", flexShrink: 0 }} />;
  }
  return <div style={{ width: s, height: s, borderRadius: "50%", background: hex ?? "#000", flexShrink: 0 }} />;
}

export function BgRemovalControls({
  mode,
  singleResult,
  bulkResults,
  isProcessing,
  onDownloadSingle,
  onDownloadAll,
  onReset,
  bgSelection,
  setBgSelection,
  customColor,
  setCustomColor,
}: BgRemovalControlsProps) {
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(92);

  // Bug fix: resolve internal "_custom" to actual hex before passing to download
  const resolvedBgColor = useCallback((): BgColor => {
    if (bgSelection === "_custom") return customColor as BgColor;
    if (bgSelection === "transparent") return "transparent";
    if (bgSelection === "white") return "white";
    return bgSelection as BgColor;
  }, [bgSelection, customColor]);

  const canDownloadSingle = mode === "single" && singleResult?.status === "done";
  const doneCount = bulkResults.filter((r) => r.status === "done").length;
  const canDownloadAll = mode === "bulk" && doneCount > 0;

  const handleDownload = useCallback(() => {
    const bg = resolvedBgColor();
    const q = quality / 100;
    if (mode === "single") {
      onDownloadSingle(bg, format, q);
    } else {
      onDownloadAll(bg, format, q);
    }
  }, [mode, resolvedBgColor, format, quality, onDownloadSingle, onDownloadAll]);

  const sectionLabel = (icon: React.ReactNode, text: string) => (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2.5">
      {icon}
      {text}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* ── Background color ── */}
      <section aria-label="Background color">
        {sectionLabel(<Palette className="w-3.5 h-3.5" />, "Background")}

        <div className="grid grid-cols-2 gap-1.5">
          {BG_PRESETS.map((preset) => {
            const isActive = bgSelection === preset.value;
            return (
              <button
                key={preset.value}
                onClick={() => setBgSelection(preset.value)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                  ${isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500/20"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-slate-200"
                  }
                `}
              >
                <SwatchDot value={preset.value} hex={preset.hex} />
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Custom color row */}
        <div className="flex items-center gap-2 mt-1.5">
          <button
            onClick={() => setBgSelection("_custom")}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all flex-1
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              ${bgSelection === "_custom"
                ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500/20"
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-slate-200"
              }
            `}
          >
            <div
              style={{
                width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                background: customColor,
              }}
            />
            Custom
          </button>
          <label className="sr-only" htmlFor="custom-color-picker">Pick custom color</label>
          <input
            id="custom-color-picker"
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setBgSelection("_custom");
            }}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent p-0.5 flex-shrink-0"
            title="Pick a custom color"
          />
        </div>
      </section>

      {/* ── Output format ── */}
      <section aria-label="Output format">
        {sectionLabel(<FileImage className="w-3.5 h-3.5" />, "Format")}
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { label: "PNG", value: "image/png" as OutputFormat, desc: "Lossless, transparency" },
              { label: "WEBP", value: "image/webp" as OutputFormat, desc: "Smaller file size" },
            ] as const
          ).map((f) => {
            const isActive = format === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFormat(f.value)}
                className={`
                  px-3 py-2.5 rounded-xl border text-left transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
                  ${isActive
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 ring-1 ring-violet-500/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <div className={`text-sm font-semibold ${isActive ? "text-violet-700 dark:text-violet-300" : "text-slate-800 dark:text-slate-200"}`}>
                  {f.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Quality (WEBP only) ── */}
      {format === "image/webp" && (
        <section aria-label="Compression quality">
          {sectionLabel(<SlidersHorizontal className="w-3.5 h-3.5" />, "Quality")}
          <div className="flex items-center gap-3 mb-2">
            <Slider
              value={[quality]}
              min={50}
              max={100}
              step={1}
              onValueChange={(v) => setQuality(v[0])}
              className="flex-1"
              aria-label="WEBP quality"
            />
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md min-w-[44px] text-center">
              {quality}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Higher = better quality, larger file
          </p>
        </section>
      )}

      {/* ── Actions ── */}
      <section className="pt-1 space-y-2">
        {(canDownloadSingle || canDownloadAll) && (
          <Button
            onClick={handleDownload}
            disabled={isProcessing}
            className="w-full h-11 text-sm font-semibold gap-2 bg-violet-600 hover:bg-violet-700 text-white"
          >
            {mode === "bulk" ? (
              <>
                <PackageOpen className="w-4 h-4" />
                Download ZIP ({doneCount} image{doneCount !== 1 ? "s" : ""})
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download result
              </>
            )}
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onReset}
          disabled={isProcessing}
          className="w-full h-9 text-xs gap-1.5 text-slate-600 dark:text-slate-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start over
        </Button>
      </section>
    </div>
  );
}