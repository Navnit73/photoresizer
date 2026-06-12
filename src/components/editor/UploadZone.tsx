import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Check, ShieldCheck, Loader2 } from "lucide-react";
import { processHeicFile } from "@/utils/heicHelper";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  recentFile?: File | null;
}

export function UploadZone({ onFileSelect, recentFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const processFile = async (file: File) => {
    const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
    if (isHeic) {
      setIsConverting(true);
    }
    const processed = await processHeicFile(file);
    if (isHeic) {
      setIsConverting(false);
    }
    
    // Check type after processing since it might have been converted to jpeg
    if (processed.type.startsWith("image/") || processed.name.toLowerCase().endsWith(".jpg")) {
      setIsValidFile(true);
      setTimeout(() => {
        onFileSelect(processed);
        setIsValidFile(false);
      }, 300);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
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
        processFile(file);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="space-y-6">
      {/* Recently Uploaded Option */}
      {recentFile && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left overflow-hidden min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                Edit {recentFile.name} again?
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {(recentFile.size / 1024).toFixed(1)} KB • Previously uploaded
              </p>
            </div>
          </div>
          <button
            onClick={() => onFileSelect(recentFile)}
            className="w-full sm:w-auto px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            Load Image
          </button>
        </div>
      )}

      {/* Main Upload Area */}
      <label
        className={`relative block w-full border-2 border-dashed rounded-2xl p-10 md:p-14 text-center cursor-pointer transition-colors duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : isValidFile
            ? "border-green-500 bg-green-50"
            : "border-border bg-card hover:bg-muted hover:border-primary/50"
        }`}
      >
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="relative flex flex-col items-center gap-5"
        >
          {/* Icon Area */}
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-colors duration-300 ${
              isDragging
                ? "bg-primary text-primary-foreground"
                : isValidFile
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {isValidFile ? (
              <Check className="w-10 h-10" />
            ) : isDragging ? (
              <Upload className="w-10 h-10 animate-pulse" />
            ) : (
              <Upload className="w-10 h-10" />
            )}
          </div>

          {/* Text Area */}
          <div className="space-y-1.5">
            <h2
              className={`text-2xl font-bold tracking-tight ${
                isDragging
                  ? "text-primary"
                  : isValidFile
                  ? "text-green-600"
                  : "text-foreground"
              }`}
            >
              {isConverting
                ? "Converting HEIC..."
                : isDragging
                ? "Drop it here!"
                : isValidFile
                ? "Loading Image..."
                : "Upload an Image"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              {isConverting
                ? "This might take a moment..."
                : isDragging
                ? "Release to upload"
                : "Drag & drop or click to browse your files"}
            </p>
          </div>

          {/* File Info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background border border-border px-3 py-1.5 rounded-full mt-2">
            <span>JPG, PNG, WEBP, HEIC</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Up to 50MB</span>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            <span>100% Private (processed in browser)</span>
          </div>
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg,.heic,.heif"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
}
