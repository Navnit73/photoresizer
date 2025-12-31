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

  useEffect(() => {
    if (!imageState.originalUrl) return;

    const render = async () => {
      setIsRendering(true);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        canvas.width = imageState.width;
        canvas.height = imageState.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (imageState.backgroundColor !== 'transparent') {
          ctx.fillStyle = imageState.backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((imageState.rotation * Math.PI) / 180);
        ctx.drawImage(
          img,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
        ctx.restore();

        const quality = imageState.quality / 100;
        const type =
          imageState.format === 'jpeg'
            ? 'image/jpeg'
            : imageState.format === 'png'
            ? 'image/png'
            : 'image/webp';

        setPreviewUrl(canvas.toDataURL(type, quality));
        setIsRendering(false);
      };

      img.src = imageState.originalUrl;
    };

    render();
  }, [imageState]);

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
    <Card variant="bordered" className="p-4 space-y-4">
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
          className="relative rounded-xl border overflow-hidden shadow-sm"
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
            {previewUrl ? (
              <motion.img
                key={previewUrl}
                src={previewUrl}
                alt="Preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-contain"
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
