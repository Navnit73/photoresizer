import { useCallback, useState, useId } from "react";
import { Upload, Check, ShieldCheck, Images, ImagePlus } from "lucide-react";
import { processHeicFile } from "@/utils/heicHelper";

interface BgRemovalUploadZoneProps {
  mode: "single" | "bulk";
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/heic", "image/heif"];

function isValidImage(file: File): boolean {
  return ACCEPTED_TYPES.includes(file.type) || file.type.startsWith("image/") || file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
}

export function BgRemovalUploadZone({
  mode,
  onFileSelect,
  onFilesSelect,
  disabled = false,
}: BgRemovalUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const inputId = useId();

  const dispatchFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;
      setIsLoading(true);

      const hasHeic = files.some(
        (f) =>
          f.name.toLowerCase().endsWith(".heic") ||
          f.name.toLowerCase().endsWith(".heif")
      );
      if (hasHeic) setIsConverting(true);

      const processedFiles = await Promise.all(files.map(processHeicFile));

      if (hasHeic) setIsConverting(false);

      if (mode === "bulk" && onFilesSelect) {
        onFilesSelect(processedFiles);
      } else {
        onFileSelect(processedFiles[0]);
      }
      setIsLoading(false);
    },
    [mode, onFileSelect, onFilesSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      setDragCount(0);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files).filter(isValidImage);
      dispatchFiles(files);
    },
    [disabled, dispatchFiles]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) {
        setDragCount(e.dataTransfer.items?.length ?? 1);
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      // Only fire leave when leaving the zone itself, not child elements
      if (e.currentTarget === e.target) {
        setIsDragging(false);
        setDragCount(0);
      }
    },
    []
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList).filter(isValidImage);
      dispatchFiles(files);
      e.target.value = "";
    },
    [dispatchFiles]
  );

  const isBulk = mode === "bulk";

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`
        relative rounded-2xl border-2 border-dashed transition-all duration-200
        ${disabled ? "opacity-50 pointer-events-none" : ""}
        ${isDragging
          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20 scale-[1.01]"
          : isLoading
          ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
          : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-violet-400 dark:hover:border-violet-500 hover:bg-violet-50/30 dark:hover:bg-violet-950/10"
        }
      `}
    >
      <label
        htmlFor={inputId}
        className={`flex flex-col items-center gap-5 px-6 py-12 md:py-16 text-center cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
      >
        {/* Icon */}
        <div
          className={`
            relative w-18 h-18 rounded-2xl flex items-center justify-center transition-all duration-300
            ${isDragging
              ? "bg-violet-600 text-white scale-110"
              : isLoading
              ? "bg-emerald-500 text-white scale-105"
              : "bg-gradient-to-br from-violet-600 to-violet-500 text-white shadow-sm"
            }
          `}
          style={{ width: 72, height: 72 }}
        >
          {isLoading ? (
            <Check className="w-9 h-9" />
          ) : isDragging ? (
            <Upload className="w-9 h-9 animate-bounce" />
          ) : isBulk ? (
            <Images className="w-9 h-9" />
          ) : (
            <ImagePlus className="w-9 h-9" />
          )}

          {/* Bulk drag count badge */}
          {isBulk && isDragging && dragCount > 1 && (
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-violet-800 text-white text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-800">
              {dragCount}
            </div>
          )}
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDragging
                ? "text-violet-700 dark:text-violet-300"
                : isLoading
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {isConverting
              ? "Converting HEIC..."
              : isDragging
              ? isBulk
                ? "Drop images here!"
                : "Drop it here!"
              : isLoading
              ? "Loading…"
              : isBulk
              ? "Upload multiple images"
              : "Upload an image"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
            {isConverting
              ? "This might take a moment..."
              : isDragging
              ? "Release to start background removal"
              : isBulk
              ? "Drag & drop multiple images or tap to browse"
              : "Drag & drop or tap to select your photo"}
          </p>
        </div>

        {/* Format badge */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3.5 py-1.5 rounded-full">
          <span className="font-medium">JPG · PNG · WEBP · HEIC</span>
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span>{isBulk ? "Up to 20 images" : "Up to 25 MB"}</span>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span>100% private — AI runs in your browser, nothing uploaded</span>
        </div>
      </label>

      {/* Hidden file input */}
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg,.heic,.heif"
        multiple={isBulk}
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        aria-label={isBulk ? "Upload multiple images" : "Upload an image"}
      />
    </div>
  );
}