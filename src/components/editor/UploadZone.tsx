import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Upload Box */}
      <label
        className="
          relative block
          rounded-2xl p-12 text-center cursor-pointer group
          border-2 border-dotted border-purple-400/60
          bg-purple-500/5
          hover:bg-purple-500/10
          hover:border-purple-400
          transition-all duration-300
        "
      >
        {/* Soft outer ring */}
        <div
          className="absolute inset-0 rounded-2xl
            ring-1 ring-purple-400/20
            group-hover:ring-purple-400/40
            transition pointer-events-none"
        />

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Icon + Arrow */}
            <div className="relative">
              {/* Upload Icon */}
              <div
                className="
                  w-20 h-20 rounded-2xl
                  bg-gradient-to-br from-purple-600 to-purple-500
                  flex items-center justify-center
                  shadow-[0_12px_30px_rgba(109,40,217,0.45)]
                  group-hover:scale-110
                  transition-transform duration-300
                "
              >
                <Upload
                  className="
                    w-10 h-10
                    text-white
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]
                  "
                />
              </div>

              {/* Arrow starts INSIDE */}
              <svg
                className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 text-purple-400"
                width="240"
                height="120"
                viewBox="0 0 240 120"
                fill="none"
              >
                <path
                  d="M0 60 C90 10, 150 10, 215 50"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  fill="none"
                />
              </svg>
            </div>

            {/* Text inside box */}
            <div>
              <h2 className="text-xl font-semibold font-heading text-foreground mb-2">
                Upload Your Image to Resize and Compress
              </h2>
              <p className="text-muted-foreground text-sm">
                Drag & drop or click to browse
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <ImageIcon className="w-4 h-4" />
              <span>Supports JPG, PNG, WEBP</span>
            </div>
          </div>

          {/* File input */}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileInput}
            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </label>

      {/* Outside Hint Text */}
      <div className="hidden md:block absolute -right-56 top-1/2 -translate-y-1/2">
        <div className="text-sm leading-snug text-purple-500">
          <p className="font-medium text-purple-600">Upload your photo here</p>
          <p className="text-xs">यहाँ अपनी फोटो अपलोड करें</p>
          <p className="text-xs">在这里上传您的照片</p>
        </div>
      </div>
    </motion.div>
  );
}
