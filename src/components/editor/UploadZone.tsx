import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative space-y-4"
    >
      {/* Recently Uploaded File Option */}
      {recentFile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-2xl"
        >
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
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-lg shadow-primary/20"
          >
            Load Image
          </button>
        </motion.div>
      )}

      <label
        className={`relative block border-2 border-dashed rounded-3xl p-12 md:p-16 text-center transition-all duration-300 cursor-pointer group overflow-hidden ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : isValidFile
            ? "border-green-500 bg-green-500/10"
            : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-primary hover:bg-primary/5"
        }`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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
            {/* Animated Icon */}
            <motion.div
              animate={
                isDragging
                  ? { scale: 1.1, rotate: [0, -5, 5, 0] }
                  : isValidFile
                  ? { scale: 1.1 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div
                className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isDragging
                    ? "bg-gradient-to-br from-primary-500 to-secondary-500"
                    : isValidFile
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-primary/5 text-primary"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isValidFile ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="w-12 h-12 text-white" />
                    </motion.div>
                  ) : isDragging ? (
                    <motion.div
                      key="sparkles"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="group-hover:scale-110 transition-transform"
                    >
                      <Upload className="w-12 h-12 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Floating particles on hover */}
              {!isDragging && !isValidFile && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary-400 opacity-0 group-hover:opacity-100"
                    animate={{ y: [-5, -15, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-secondary-400 opacity-0 group-hover:opacity-100"
                    animate={{ y: [5, 15, 5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                </>
              )}
            </motion.div>

            {/* Text Content */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                {isDragging ? (
                  <motion.h2
                    key="dragging"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl md:text-3xl font-bold text-primary"
                  >
                    Drop it here! 🎉
                  </motion.h2>
                ) : isValidFile ? (
                  <motion.h2
                    key="valid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl md:text-3xl font-bold text-green-600"
                  >
                    Perfect! Loading... ✓
                  </motion.h2>
                ) : (
                  <motion.h2
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
                  >
                    Upload Your Photo to Edit
                  </motion.h2>
                )}
              </AnimatePresence>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>100% Private • All processing happens in your browser</span>
            </motion.div>
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
    </motion.div>
  );
}
