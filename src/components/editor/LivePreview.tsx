import { useEffect, useState, useRef } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ImageIcon, Loader2 } from 'lucide-react';

interface LivePreviewProps {
  imageState: ImageState;
}

export function LivePreview({ imageState }: LivePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isRendering, setIsRendering] = useState(false);

  // Low-end device optimization: NO Canvas rendering. Use CSS.
  // We use the originalUrl (or editedUrl) and apply CSS logic.
  
  // NOTE: Quality preview is unfortunately NOT possible with CSS only.
  // But avoiding a crash is more important.
  // We can show a tooltip saying "Quality will be applied on download".


  if (!imageState.originalUrl) return null;

  const maxPreview = 220;
  const scale = Math.min(
    maxPreview / imageState.width,
    maxPreview / imageState.height,
    1
  );

  const estimatedSize = Math.round(
    (imageState.width *
      imageState.height *
      3 *
      (imageState.quality / 100)) /
      1024
  );

  return (
    <Card variant="bordered" className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <Eye className="w-4 h-4 text-primary" />
        Live Preview
        {isRendering && (
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" />
            updating
          </span>
        )}
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div
          className="relative rounded-xl border overflow-hidden shadow-sm flex items-center justify-center"
          style={{
            width: imageState.width * scale,
            height: imageState.height * scale,
            background:
              imageState.backgroundColor === 'transparent'
                ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 16px 16px'
                : imageState.backgroundColor,
          }}
        >
          <AnimatePresence mode="wait">
            {imageState.originalUrl ? (
              <motion.img
                key={imageState.originalUrl}
                src={imageState.originalUrl}
                alt="Preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-contain transition-transform duration-300"
                style={{
                    transform: `rotate(${imageState.rotation}deg)`,
                    // Maximize size within the container
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
              />
            ) : (
              <motion.div
                key="placeholder"
                className="w-full h-full flex items-center justify-center"
              >
                <ImageIcon className="w-8 h-8 text-muted-foreground animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dimensions */}
      <Badge className=" bg-red-500 " >
        {imageState.width} × {imageState.height}px
      </Badge>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-y-2 text-xs pt-3 border-t">
        <span className="text-muted-foreground">Format</span>
        <Badge variant="secondary" className="w-fit uppercase">
          {imageState.format}
        </Badge>

        <span className="text-muted-foreground">Quality</span>
        <span className="font-medium">{imageState.quality}%</span>

        <span className="text-muted-foreground">Est. Size</span>
        <span className="font-mono">
          {estimatedSize > 1024
            ? `${(estimatedSize / 1024).toFixed(1)} MB`
            : `${estimatedSize} KB`}
        </span>

        {imageState.rotation !== 0 && (
          <>
            <span className="text-muted-foreground">Rotation</span>
            <span>{imageState.rotation}°</span>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}
