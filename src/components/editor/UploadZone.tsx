import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Sparkles, Check } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  recentFile?: File | null;
}

export function UploadZone({ onFileSelect, recentFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        setIsValidFile(true);
        setTimeout(() => {
          onFileSelect(file);
          setIsValidFile(false);
        }, 500);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsValidFile(true);
        setTimeout(() => {
          onFileSelect(file);
          setIsValidFile(false);
        }, 500);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="relative space-y-4 animate-[fadeIn_0.5s_ease-out]">
      {/* Recently Uploaded File Option */}
      {recentFile && (
        <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-2xl animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Edit {recentFile.name} again?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {(recentFile.size / 1024).toFixed(1)} KB • Previously uploaded
              </p>
            </div>
          </div>
          <button
            onClick={() => onFileSelect(recentFile)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500/90 rounded-xl transition-colors shadow-lg shadow-primary/20"
          >
            Load Image
          </button>
        </div>
      )}

      <label
        className={`relative block border-2 border-dashed rounded-3xl p-12 md:p-16 text-center transition-all duration-300 cursor-pointer group overflow-hidden ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : isValidFile
            ? "border-green-500 bg-green-500/10"
            : "border-purple-500/30 hover:border-purple-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-500/5"
        }`}
      >
        {/* Static gradient background - only visible on hover via CSS, no JS animation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="relative"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Icon - simple CSS transitions instead of framer-motion */}
            <div className={`relative transition-transform duration-300 ${isDragging ? 'scale-110' : isValidFile ? 'scale-110' : ''}`}>
              <div
                className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isDragging
                    ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
                    : isValidFile
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-purple-500/20"
                }`}
              >
                {isValidFile ? (
                  <Check className="w-12 h-12 text-white" />
                ) : isDragging ? (
                  <Sparkles className="w-12 h-12 text-white" />
                ) : (
                  <Upload className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                )}
              </div>

              {/* Static decorative dots (visible on hover via CSS, no infinite JS animation) */}
              {!isDragging && !isValidFile && (
                <>
                  <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </div>

            {/* Text Content */}
            <div className="space-y-2">
              <h2
                className={`text-2xl md:text-3xl font-bold transition-colors duration-200 ${
                  isDragging
                    ? "text-primary"
                    : isValidFile
                    ? "text-green-600"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {isDragging
                  ? "Drop it here! 🎉"
                  : isValidFile
                  ? "Perfect! Loading... ✓"
                  : "Upload Your Photo to Edit"}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                {isDragging
                  ? "Release to upload your image"
                  : "Drag & drop or click to browse your files"}
              </p>
            </div>

            {/* Format Info */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200/50 dark:border-slate-700/50">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  JPG, PNG, WEBP
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-slate-200/50 dark:border-slate-700/50">
                <Sparkles className="w-4 h-4 text-secondary-500" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Up to 50MB
                </span>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 animate-[fadeIn_0.5s_ease-out_0.3s_both]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>100% Private • All processing happens in your browser</span>
            </div>
          </div>

          {/* The actual input */}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileInput}
            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </label>
    </div>
  );
}
