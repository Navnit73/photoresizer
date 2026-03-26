import { useEffect, useState, useRef, memo } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ImageIcon, Loader2 } from 'lucide-react';

interface LivePreviewProps {
  imageState: ImageState;
}

export const LivePreview = memo(function LivePreview({ imageState }: LivePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [blobSize, setBlobSize] = useState<number>(0);
  const [isRendering, setIsRendering] = useState(false);
  const renderTimer = useRef<ReturnType<typeof setTimeout>>();

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      clearTimeout(renderTimer.current);
    };
  }, [previewUrl]);

  // Debounced canvas rendering (300ms) — prevents jank during rapid slider changes
  useEffect(() => {
    if (!imageState.originalUrl) return;

    clearTimeout(renderTimer.current);
    renderTimer.current = setTimeout(() => {
      const render = async () => {
        setIsRendering(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
          alpha: imageState.format === 'png',
          willReadFrequently: false,
        });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const radians = (imageState.rotation * Math.PI) / 180;
          const isRotated90or270 =
            imageState.rotation === 90 || imageState.rotation === 270;

          canvas.width = isRotated90or270 ? imageState.height : imageState.width;
          canvas.height = isRotated90or270 ? imageState.width : imageState.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (
            imageState.backgroundColor !== 'transparent' &&
            imageState.format !== 'png'
          ) {
            ctx.fillStyle = imageState.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(radians);

          const drawWidth = isRotated90or270 ? imageState.height : imageState.width;
          const drawHeight = isRotated90or270 ? imageState.width : imageState.height;

          ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
          ctx.restore();

          const quality = imageState.format === 'png' ? 1 : imageState.quality / 100;
          const type = `image/${imageState.format}`;

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newUrl = URL.createObjectURL(blob);
                setPreviewUrl((prev) => {
                  if (prev) URL.revokeObjectURL(prev);
                  return newUrl;
                });
                setBlobSize(blob.size);
              }
              setIsRendering(false);
            },
            type,
            quality
          );
        };

        img.src = imageState.originalUrl;
      };

      render();
    }, 300);

    return () => clearTimeout(renderTimer.current);
  }, [
    imageState.originalUrl,
    imageState.width,
    imageState.height,
    imageState.rotation,
    imageState.quality,
    imageState.format,
    imageState.backgroundColor,
  ]);

  if (!imageState.originalUrl) return null;

  const maxPreview = 340;
  const scale = Math.min(
    maxPreview / imageState.width,
    maxPreview / imageState.height,
    1
  );

  return (
    <div className="w-full p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Eye className="w-4 h-4 text-primary" />
        Live Preview
        {isRendering && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            updating
          </span>
        )}
      </div>

      {/* Preview Image */}
      <div className="flex justify-center p-2">
        <div
          className="relative rounded-lg overflow-hidden max-w-full"
          style={{
            width: imageState.width * scale,
            aspectRatio: `${imageState.width} / ${imageState.height}`,
            background:
              imageState.backgroundColor === 'transparent'
                ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 16px 16px'
                : imageState.backgroundColor,
          }}
        >
      
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain transition-opacity duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/30 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Dimensions Badge */}
      <div className="flex justify-center">
        <Badge variant="secondary" className="font-mono text-xs bg-primary/10 text-primary border-primary/20">
          {imageState.width} × {imageState.height}px
        </Badge>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-y-2 text-xs pt-3 border-t">
        <span className="text-muted-foreground">Format</span>
        <Badge variant="secondary" className="w-fit uppercase">
          {imageState.format}
        </Badge>

        <span className="text-muted-foreground">Quality</span>
        <span className="font-medium">{imageState.quality}%</span>

        <span className="text-muted-foreground">Actual Size</span>
        <span className="font-mono font-bold text-primary">
          {blobSize > 1024 * 1024
            ? `${(blobSize / (1024 * 1024)).toFixed(2)} MB`
            : `${(blobSize / 1024).toFixed(1)} KB`}
        </span>

        {imageState.rotation !== 0 && (
          <>
            <span className="text-muted-foreground">Rotation</span>
            <span>{imageState.rotation}°</span>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}, (prev, next) => {
  // Custom comparator: only re-render when visually-relevant fields change
  const a = prev.imageState;
  const b = next.imageState;
  return (
    a.originalUrl === b.originalUrl &&
    a.width === b.width &&
    a.height === b.height &&
    a.quality === b.quality &&
    a.format === b.format &&
    a.rotation === b.rotation &&
    a.backgroundColor === b.backgroundColor
  );
});

