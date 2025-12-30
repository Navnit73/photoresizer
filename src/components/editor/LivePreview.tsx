import { useEffect, useState, useRef } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, ImageIcon } from 'lucide-react';

interface LivePreviewProps {
  imageState: ImageState;
}

export function LivePreview({ imageState }: LivePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!imageState.originalUrl) return;

    const generatePreview = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        canvas.width = imageState.width;
        canvas.height = imageState.height;

        // Apply background
        if (imageState.backgroundColor !== 'transparent') {
          ctx.fillStyle = imageState.backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Apply rotation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((imageState.rotation * Math.PI) / 180);
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.restore();

        // Generate preview URL
        const quality = imageState.quality / 100;
        const mimeType = imageState.format === 'jpeg' ? 'image/jpeg' : 
                         imageState.format === 'png' ? 'image/png' : 'image/webp';
        setPreviewUrl(canvas.toDataURL(mimeType, quality));
      };

      img.src = imageState.originalUrl;
    };

    generatePreview();
  }, [imageState]);

  const estimatedSize = Math.round((imageState.width * imageState.height * 3 * (imageState.quality / 100)) / 1024);

  if (!imageState.originalUrl) return null;

  const maxSize = 180;
  const originalScale = Math.min(maxSize / imageState.originalWidth, maxSize / imageState.originalHeight, 1);
  const editedScale = Math.min(maxSize / imageState.width, maxSize / imageState.height, 1);

  return (
    <Card variant="bordered" className="p-4 h-fit">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-4 h-4 text-primary" />
        <h3 className="font-medium text-sm">Live Preview</h3>
      </div>

      <div className="space-y-4">
        {/* Comparison View */}
        <div className="flex items-center justify-between gap-3">
          {/* Original */}
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground mb-2">Original</p>
            <div 
              className="mx-auto rounded border border-border/50 overflow-hidden bg-muted/30"
              style={{ 
                width: imageState.originalWidth * originalScale,
                height: imageState.originalHeight * originalScale,
              }}
            >
              <img
                src={imageState.originalUrl}
                alt="Original"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {imageState.originalWidth}×{imageState.originalHeight}
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </motion.div>

          {/* Edited */}
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground mb-2">Edited</p>
            <div 
              className="mx-auto rounded border-2 border-primary overflow-hidden shadow-sm"
              style={{ 
                width: imageState.width * editedScale,
                height: imageState.height * editedScale,
                backgroundColor: imageState.backgroundColor === 'transparent' ? undefined : imageState.backgroundColor,
              }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Edited preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-muted-foreground animate-pulse" />
                </div>
              )}
            </div>
            <p className="text-xs text-primary mt-1 font-mono font-medium">
              {imageState.width}×{imageState.height}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-3 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Format</span>
            <Badge variant="secondary" className="text-xs uppercase">{imageState.format}</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Quality</span>
            <span className="font-medium">{imageState.quality}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Est. Size</span>
            <span className="font-medium font-mono">
              {estimatedSize > 1024 ? `${(estimatedSize / 1024).toFixed(1)} MB` : `${estimatedSize} KB`}
            </span>
          </div>
          {imageState.rotation !== 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Rotation</span>
              <span className="font-medium">{imageState.rotation}°</span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for preview generation */}
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}
