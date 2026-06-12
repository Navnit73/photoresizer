import { XCircle, Zap, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { BgRemovalResult } from "@/hooks/useBackgroundRemoval";
import { useMemo, useEffect, useRef, useState } from "react";

interface BulkProgressTrackerProps {
  results: BgRemovalResult[];
  overallProgress: number;
  isProcessing: boolean;
  onCancel: () => void;
  startTime: number | null;
}

export function BulkProgressTracker({
  results,
  overallProgress,
  isProcessing,
  onCancel,
  startTime,
}: BulkProgressTrackerProps) {
  // Bug fix: track elapsed time via state + interval so memo doesn't go stale
  const [now, setNow] = useState(() => Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isProcessing) {
      intervalRef.current = setInterval(() => setNow(Date.now()), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isProcessing]);

  const total = results.length;
  const done = results.filter(
    (r) => r.status === "done" || r.status === "error"
  ).length;
  const errors = results.filter((r) => r.status === "error").length;
  const succeeded = results.filter((r) => r.status === "done").length;

  // Bug fix: only count truly processing items, exclude done+error
  const processing = results.filter((r) => r.status === "processing").length;
  const allDone = done === total && total > 0 && !isProcessing;

  // Bug fix: use `now` so estimate updates live without stale closure
  const estimatedTimeRemaining = useMemo(() => {
    if (!startTime || done === 0 || !isProcessing) return null;
    const elapsed = now - startTime;
    const perItem = elapsed / done;
    const remaining = (total - done) * perItem;
    if (remaining <= 0) return null;
    if (remaining < 1000) return "< 1s";
    if (remaining < 60000) return `~${Math.ceil(remaining / 1000)}s`;
    return `~${Math.ceil(remaining / 60000)}m`;
  }, [startTime, done, total, isProcessing, now]);

  if (total === 0) return null;

  return (
    <div
      className={`
        rounded-2xl border px-4 py-3.5 transition-all duration-500
        ${allDone && errors === 0
          ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
          : allDone && errors > 0
          ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        }
      `}
    >
      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {allDone && errors === 0 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          ) : allDone && errors > 0 ? (
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          ) : (
            <Zap className="w-4 h-4 text-violet-500 flex-shrink-0 animate-pulse" />
          )}
          <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {allDone && errors === 0
              ? `All ${total} images done!`
              : allDone && errors > 0
              ? `Done — ${errors} failed`
              : isProcessing
              ? "Processing images…"
              : "Ready to process"}
          </span>
        </div>

        {/* Right side: timer + fraction */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {estimatedTimeRemaining && isProcessing && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock className="w-3 h-3" />
              {estimatedTimeRemaining} left
            </span>
          )}
          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
            {done}/{total}
          </span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <Progress
        value={overallProgress}
        className={`h-2 mb-3 transition-all duration-300 ${
          allDone && errors === 0
            ? "[&>div]:bg-emerald-500"
            : allDone && errors > 0
            ? "[&>div]:bg-amber-500"
            : "[&>div]:bg-violet-500"
        }`}
      />

      {/* ── Footer row ── */}
      <div className="flex items-center justify-between gap-2">
        {/* Status pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Mobile: show time remaining here too */}
          {estimatedTimeRemaining && isProcessing && (
            <span className="flex sm:hidden items-center gap-1 text-slate-400 dark:text-slate-500">
              <Clock className="w-3 h-3" />
              {estimatedTimeRemaining} left
            </span>
          )}

          {/* Bug fix: only show "in progress" when not allDone */}
          {processing > 0 && !allDone && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              {processing} processing
            </span>
          )}

          {succeeded > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium">
              {succeeded} done
            </span>
          )}

          {errors > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">
              {errors} failed
            </span>
          )}
        </div>

        {/* Cancel button — only while processing */}
        {isProcessing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-7 px-2.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex-shrink-0"
          >
            <XCircle className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}