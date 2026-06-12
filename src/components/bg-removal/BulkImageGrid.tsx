import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { BgRemovalResult } from "@/hooks/useBackgroundRemoval";

interface BulkImageGridProps {
  results: BgRemovalResult[];
  onSelectItem: (index: number) => void;
  selectedIndex: number | null;
}

// Checkerboard as a CSS data-URL so it works on the wrapper behind transparent PNGs
const CHECKER_BG = `
  linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
  linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
  linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)
`.trim();

export function BulkImageGrid({
  results,
  onSelectItem,
  selectedIndex,
}: BulkImageGridProps) {
  if (results.length === 0) return null;

  const doneCount = results.filter((r) => r.status === "done").length;
  const processingCount = results.filter((r) => r.status === "processing").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {results.length} image{results.length !== 1 ? "s" : ""}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {doneCount > 0 && (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {doneCount} done
            </span>
          )}
          {processingCount > 0 && (
            <span className="flex items-center gap-1">
              <Loader2 className="w-3 h-3 text-violet-500 animate-spin" />
              {processingCount} processing
            </span>
          )}
          {errorCount > 0 && (
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-500" />
              {errorCount} failed
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {results.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(index)}
            className={`
              relative group aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
              ${selectedIndex === index
                ? "border-violet-500 ring-2 ring-violet-500/20 scale-[1.03] shadow-md"
                : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 hover:scale-[1.01]"
              }
            `}
            aria-label={`Select ${item.originalFile.name}`}
            aria-pressed={selectedIndex === index}
          >
            {/* Bug fix: checkerboard goes on the wrapper div, not on the img style */}
            <div
              className="absolute inset-0"
              style={
                item.resultUrl
                  ? {
                      backgroundImage: CHECKER_BG,
                      backgroundSize: "12px 12px",
                      backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                    }
                  : undefined
              }
            />

            {/* Thumbnail — always show result if available, else original */}
            <img
              src={item.resultUrl ?? item.originalUrl}
              alt={item.originalFile.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Processing overlay */}
            {item.status === "processing" && (
              <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1.5">
                <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                  {item.progress}%
                </span>
                <div className="w-3/4 h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Pending overlay */}
            {item.status === "pending" && (
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            )}

            {/* Done badge */}
            {item.status === "done" && (
              <div className="absolute top-1 right-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 drop-shadow-sm" />
              </div>
            )}

            {/* Error overlay */}
            {item.status === "error" && (
              <div className="absolute inset-0 bg-red-50/80 dark:bg-red-950/50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}

            {/* Hover filename tooltip */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[10px] text-white truncate font-medium leading-tight">
                {item.originalFile.name}
              </p>
            </div>

            {/* Selected ring indicator */}
            {selectedIndex === index && (
              <div className="absolute inset-0 ring-2 ring-inset ring-violet-500/40 rounded-[10px] pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}