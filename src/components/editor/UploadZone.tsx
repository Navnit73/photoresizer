import { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
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
    [onFileSelect]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold font-heading text-foreground mb-2">
              Upload Your Image
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag & drop or click to browse
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <ImageIcon className="w-4 h-4" />
            <span>Supports JPG, PNG, WEBP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
