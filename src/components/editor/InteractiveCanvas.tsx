import { useState, useRef, useCallback, useEffect } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Crop, Check, X, RotateCcw, Grid3X3, Move as MoveIcon } from 'lucide-react';

interface InteractiveCanvasProps {
  imageState: ImageState;
  onCropApply: (cropData: CropData) => void;
}

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

type CropHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'move' | null;

export function InteractiveCanvas({ imageState, onCropApply }: InteractiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCropMode, setIsCropMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<CropHandle>(null);
  const [cropArea, setCropArea] = useState<CropData>({ x: 0, y: 0, width: 100, height: 100 });
  
  const startPosRef = useRef({ x: 0, y: 0 });
  const startCropRef = useRef<CropData>({ x: 0, y: 0, width: 0, height: 0 });

  // Calculate display scale to fit in container
  const containerWidth = 480;
  const containerHeight = 380;
  const scale = Math.min(
    containerWidth / imageState.width,
    containerHeight / imageState.height,
    1
  );
  
  const displayWidth = imageState.width * scale;
  const displayHeight = imageState.height * scale;

  useEffect(() => {
    setCropArea({ x: 0, y: 0, width: imageState.width, height: imageState.height });
  }, [imageState.width, imageState.height]);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle: CropHandle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveHandle(handle);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startCropRef.current = { ...cropArea };
  }, [cropArea]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isCropMode) return;

    const deltaX = (e.clientX - startPosRef.current.x) / scale;
    const deltaY = (e.clientY - startPosRef.current.y) / scale;

    let newCrop = { ...startCropRef.current };

    if (activeHandle === 'move') {
      // Move the entire crop area
      newCrop.x = Math.max(0, Math.min(imageState.width - newCrop.width, startCropRef.current.x + deltaX));
      newCrop.y = Math.max(0, Math.min(imageState.height - newCrop.height, startCropRef.current.y + deltaY));
    } else if (activeHandle) {
      const minSize = 30;
      
      switch (activeHandle) {
        case 'e':
          newCrop.width = Math.max(minSize, Math.min(imageState.width - newCrop.x, startCropRef.current.width + deltaX));
          break;
        case 'w': {
          const newX = Math.max(0, Math.min(startCropRef.current.x + startCropRef.current.width - minSize, startCropRef.current.x + deltaX));
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - newX);
          newCrop.x = newX;
          break;
        }
        case 's':
          newCrop.height = Math.max(minSize, Math.min(imageState.height - newCrop.y, startCropRef.current.height + deltaY));
          break;
        case 'n': {
          const newY = Math.max(0, Math.min(startCropRef.current.y + startCropRef.current.height - minSize, startCropRef.current.y + deltaY));
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - newY);
          newCrop.y = newY;
          break;
        }
        case 'se':
          newCrop.width = Math.max(minSize, Math.min(imageState.width - newCrop.x, startCropRef.current.width + deltaX));
          newCrop.height = Math.max(minSize, Math.min(imageState.height - newCrop.y, startCropRef.current.height + deltaY));
          break;
        case 'nw': {
          const nwX = Math.max(0, Math.min(startCropRef.current.x + startCropRef.current.width - minSize, startCropRef.current.x + deltaX));
          const nwY = Math.max(0, Math.min(startCropRef.current.y + startCropRef.current.height - minSize, startCropRef.current.y + deltaY));
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - nwX);
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - nwY);
          newCrop.x = nwX;
          newCrop.y = nwY;
          break;
        }
        case 'ne': {
          newCrop.width = Math.max(minSize, Math.min(imageState.width - newCrop.x, startCropRef.current.width + deltaX));
          const neY = Math.max(0, Math.min(startCropRef.current.y + startCropRef.current.height - minSize, startCropRef.current.y + deltaY));
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - neY);
          newCrop.y = neY;
          break;
        }
        case 'sw': {
          const swX = Math.max(0, Math.min(startCropRef.current.x + startCropRef.current.width - minSize, startCropRef.current.x + deltaX));
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - swX);
          newCrop.x = swX;
          newCrop.height = Math.max(minSize, Math.min(imageState.height - newCrop.y, startCropRef.current.height + deltaY));
          break;
        }
      }
    }

    setCropArea({
      x: Math.round(newCrop.x),
      y: Math.round(newCrop.y),
      width: Math.round(newCrop.width),
      height: Math.round(newCrop.height),
    });
  }, [isDragging, activeHandle, scale, imageState.width, imageState.height, isCropMode]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveHandle(null);
  }, []);

  const handleApplyCrop = () => {
    onCropApply(cropArea);
    setIsCropMode(false);
  };

  const handleResetCrop = () => {
    setCropArea({ x: 0, y: 0, width: imageState.width, height: imageState.height });
  };

  const handleStartCrop = () => {
    setIsCropMode(true);
    setCropArea({ 
      x: imageState.width * 0.1, 
      y: imageState.height * 0.1, 
      width: imageState.width * 0.8, 
      height: imageState.height * 0.8 
    });
  };

  const estimatedSize = Math.round((imageState.width * imageState.height * 3 * (imageState.quality / 100)) / 1024);

  const handleClasses = "absolute w-4 h-4 bg-white border-2 border-primary rounded-sm shadow-lg z-20 hover:scale-110 transition-transform";

  if (!imageState.originalUrl) return null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {!isCropMode ? (
            <Button
              variant="tool"
              size="sm"
              onClick={handleStartCrop}
            >
              <Crop className="w-4 h-4 mr-2" />
              Crop Image
            </Button>
          ) : (
            <Badge variant="secondary" className="px-3 py-1.5 text-sm bg-primary/10 text-primary border-primary/20">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Crop Mode Active
            </Badge>
          )}
        </div>

        {/* Live Dimensions */}
        <motion.div
          key={`${imageState.width}-${imageState.height}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="flex flex-wrap gap-2"
        >
          <Badge variant="default" className="text-sm px-3 py-1.5 font-mono bg-foreground text-background">
            {imageState.width} × {imageState.height} px
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1.5">
            ~{estimatedSize > 1024 ? `${(estimatedSize / 1024).toFixed(1)} MB` : `${estimatedSize} KB`}
          </Badge>
        </motion.div>
      </div>

      {/* Crop dimensions indicator */}
      {isCropMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
        >
          <MoveIcon className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Selection:</span>
          <Badge variant="outline" className="font-mono">
            {Math.round(cropArea.width)} × {Math.round(cropArea.height)} px
          </Badge>
          <span className="text-xs text-muted-foreground">
            Position: ({Math.round(cropArea.x)}, {Math.round(cropArea.y)})
          </span>
        </motion.div>
      )}

      {/* Canvas */}
      <Card 
        variant="bordered" 
        className="relative overflow-hidden select-none bg-muted/30"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative flex items-center justify-center p-6 min-h-[420px]"
          style={{
            backgroundColor: imageState.backgroundColor === 'transparent' ? undefined : imageState.backgroundColor,
            backgroundImage: imageState.backgroundColor === 'transparent'
              ? 'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--background)) 0% 50%)'
              : undefined,
            backgroundSize: '16px 16px',
          }}
        >
          <div className="relative" style={{ width: displayWidth, height: displayHeight }}>
            {/* Main Image */}
            <img
              src={imageState.originalUrl}
              alt="Editable preview"
              className="w-full h-full object-contain pointer-events-none rounded"
              style={{ transform: `rotate(${imageState.rotation}deg)` }}
              draggable={false}
            />

            {/* Crop Overlay */}
            {isCropMode && (
              <>
                {/* Dark overlay outside crop area */}
                <div 
                  className="absolute inset-0 bg-foreground/60 pointer-events-none transition-all duration-150"
                  style={{
                    clipPath: `polygon(
                      0% 0%, 
                      0% 100%, 
                      ${(cropArea.x / imageState.width) * 100}% 100%, 
                      ${(cropArea.x / imageState.width) * 100}% ${(cropArea.y / imageState.height) * 100}%, 
                      ${((cropArea.x + cropArea.width) / imageState.width) * 100}% ${(cropArea.y / imageState.height) * 100}%, 
                      ${((cropArea.x + cropArea.width) / imageState.width) * 100}% ${((cropArea.y + cropArea.height) / imageState.height) * 100}%, 
                      ${(cropArea.x / imageState.width) * 100}% ${((cropArea.y + cropArea.height) / imageState.height) * 100}%, 
                      ${(cropArea.x / imageState.width) * 100}% 100%, 
                      100% 100%, 
                      100% 0%
                    )`
                  }}
                />
                
                {/* Crop selection area */}
                <div
                  className="absolute border-2 border-white shadow-xl cursor-move transition-all duration-75"
                  style={{
                    left: `${(cropArea.x / imageState.width) * 100}%`,
                    top: `${(cropArea.y / imageState.height) * 100}%`,
                    width: `${(cropArea.width / imageState.width) * 100}%`,
                    height: `${(cropArea.height / imageState.height) * 100}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, 'move')}
                >
                  {/* Rule of thirds grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/40" />
                    ))}
                  </div>

                  {/* Corner handles */}
                  <div className={`${handleClasses} -top-2 -left-2 cursor-nw-resize`} onMouseDown={(e) => handleMouseDown(e, 'nw')} />
                  <div className={`${handleClasses} -top-2 -right-2 cursor-ne-resize`} onMouseDown={(e) => handleMouseDown(e, 'ne')} />
                  <div className={`${handleClasses} -bottom-2 -right-2 cursor-se-resize`} onMouseDown={(e) => handleMouseDown(e, 'se')} />
                  <div className={`${handleClasses} -bottom-2 -left-2 cursor-sw-resize`} onMouseDown={(e) => handleMouseDown(e, 'sw')} />
                  
                  {/* Edge handles */}
                  <div className={`${handleClasses} -top-2 left-1/2 -translate-x-1/2 cursor-n-resize`} onMouseDown={(e) => handleMouseDown(e, 'n')} />
                  <div className={`${handleClasses} top-1/2 -right-2 -translate-y-1/2 cursor-e-resize`} onMouseDown={(e) => handleMouseDown(e, 'e')} />
                  <div className={`${handleClasses} -bottom-2 left-1/2 -translate-x-1/2 cursor-s-resize`} onMouseDown={(e) => handleMouseDown(e, 's')} />
                  <div className={`${handleClasses} top-1/2 -left-2 -translate-y-1/2 cursor-w-resize`} onMouseDown={(e) => handleMouseDown(e, 'w')} />
                </div>
              </>
            )}

            {/* Normal state border */}
            {!isCropMode && (
              <div className="absolute inset-0 border border-border/50 rounded pointer-events-none" />
            )}
          </div>
        </div>

        {/* Crop Action Buttons */}
        {isCropMode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/95 backdrop-blur-sm p-2 rounded-lg shadow-lg border"
          >
            <Button size="sm" variant="default" onClick={handleApplyCrop}>
              <Check className="w-4 h-4 mr-1" />
              Apply Crop
            </Button>
            <Button size="sm" variant="outline" onClick={handleResetCrop}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsCropMode(false)}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </motion.div>
        )}
      </Card>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground text-center">
        {isCropMode 
          ? 'Drag corners or edges to adjust. Drag inside to move selection. Click Apply when done.'
          : 'Click "Crop Image" to select the area you want to keep.'}
      </p>
    </div>
  );
}
