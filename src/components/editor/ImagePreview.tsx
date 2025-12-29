import { useEffect, useState, useRef } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { FileImage, Maximize, FileDown, ArrowRight } from 'lucide-react';

interface ImagePreviewProps {
  imageState: ImageState;
  generatePreview: () => Promise<string | null>;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function ImagePreview({ imageState, generatePreview }: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [estimatedSize, setEstimatedSize] = useState<number>(0);

  useEffect(() => {
    const updatePreview = async () => {
      const url = await generatePreview();
      setPreviewUrl(url);
      
      // Estimate file size
      if (url) {
        const base64Length = url.split(',')[1]?.length || 0;
        const padding = url.endsWith('==') ? 2 : url.endsWith('=') ? 1 : 0;
        const size = (base64Length * 3) / 4 - padding;
        setEstimatedSize(size);
      }
    };
    
    if (imageState.originalUrl) {
      updatePreview();
    }
  }, [imageState, generatePreview]);

  if (!imageState.originalUrl) {
    return (
      <Card variant="bordered" className="h-full flex items-center justify-center p-8 bg-secondary/20">
        <div className="text-center text-muted-foreground">
          <FileImage className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">Preview Area</p>
          <p className="text-sm">Upload an image to see the preview</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Maximize className="w-3 h-3" />
          {imageState.width} × {imageState.height}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <FileDown className="w-3 h-3" />
          ~{formatBytes(estimatedSize)}
        </Badge>
        <Badge variant="outline" className="text-muted-foreground">
          {imageState.format.toUpperCase()} @ {imageState.quality}%
        </Badge>
      </div>

      {/* Comparison View */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Original */}
        <Card variant="tool" className="overflow-hidden">
          <div className="p-3 border-b border-border bg-secondary/30">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Original</p>
          </div>
          <div className="p-4 flex items-center justify-center min-h-[200px] bg-[repeating-conic-gradient(#f0f0f0_0%_25%,#ffffff_0%_50%)] bg-[length:16px_16px]">
            <img
              src={imageState.originalUrl}
              alt="Original"
              className="max-w-full max-h-[300px] object-contain shadow-lg rounded"
            />
          </div>
          <div className="p-3 border-t border-border bg-secondary/30 text-xs text-muted-foreground">
            {imageState.originalWidth} × {imageState.originalHeight} • {formatBytes(imageState.originalFileSize)}
          </div>
        </Card>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center shadow-lg">
            <ArrowRight className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Edited */}
        <Card variant="tool" className="overflow-hidden">
          <div className="p-3 border-b border-border bg-primary/5">
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Edited Preview</p>
          </div>
          <div 
            className="p-4 flex items-center justify-center min-h-[200px]"
            style={{
              backgroundColor: imageState.backgroundColor === 'transparent' 
                ? undefined 
                : imageState.backgroundColor,
              backgroundImage: imageState.backgroundColor === 'transparent'
                ? 'repeating-conic-gradient(#f0f0f0 0% 25%, #ffffff 0% 50%)'
                : undefined,
              backgroundSize: '16px 16px',
            }}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-[300px] object-contain shadow-lg rounded"
              />
            )}
          </div>
          <div className="p-3 border-t border-border bg-primary/5 text-xs text-primary font-medium">
            {imageState.width} × {imageState.height} • ~{formatBytes(estimatedSize)}
          </div>
        </Card>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}
