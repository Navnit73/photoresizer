import { useState, useRef, useCallback, useEffect } from 'react';
import { ImageState } from '@/types/editor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Move, Crop, Maximize2, Check, X, RotateCcw } from 'lucide-react';

interface InteractiveCanvasProps {
  imageState: ImageState;
  onDimensionsChange: (width: number, height: number) => void;
  onCropApply: (cropData: CropData) => void;
}

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Tool = 'resize' | 'crop' | 'move';
type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | null;

export function InteractiveCanvas({ imageState, onDimensionsChange, onCropApply }: InteractiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTool, setActiveTool] = useState<Tool>('resize');
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle>(null);
  const [displayDimensions, setDisplayDimensions] = useState({ width: imageState.width, height: imageState.height });
  const [cropArea, setCropArea] = useState<CropData>({ x: 0, y: 0, width: 100, height: 100 });
  const [isCropping, setIsCropping] = useState(false);
  
  const startPosRef = useRef({ x: 0, y: 0 });
  const startDimensionsRef = useRef({ width: 0, height: 0 });
  const startCropRef = useRef<CropData>({ x: 0, y: 0, width: 0, height: 0 });

  // Calculate display scale to fit in container
  const containerWidth = 500;
  const containerHeight = 400;
  const scale = Math.min(
    containerWidth / imageState.width,
    containerHeight / imageState.height,
    1
  );
  
  const displayWidth = displayDimensions.width * scale;
  const displayHeight = displayDimensions.height * scale;

  useEffect(() => {
    setDisplayDimensions({ width: imageState.width, height: imageState.height });
    setCropArea({ x: 0, y: 0, width: imageState.width, height: imageState.height });
  }, [imageState.width, imageState.height]);

  const handleMouseDown = useCallback((e: React.MouseEvent, handle: ResizeHandle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveHandle(handle);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startDimensionsRef.current = { width: displayDimensions.width, height: displayDimensions.height };
    startCropRef.current = { ...cropArea };
  }, [displayDimensions, cropArea]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    if (activeTool === 'resize' && activeHandle) {
      let newWidth = startDimensionsRef.current.width;
      let newHeight = startDimensionsRef.current.height;
      const aspectRatio = imageState.originalWidth / imageState.originalHeight;

      switch (activeHandle) {
        case 'e':
          newWidth = Math.max(50, startDimensionsRef.current.width + deltaX);
          break;
        case 'w':
          newWidth = Math.max(50, startDimensionsRef.current.width - deltaX);
          break;
        case 's':
          newHeight = Math.max(50, startDimensionsRef.current.height + deltaY);
          break;
        case 'n':
          newHeight = Math.max(50, startDimensionsRef.current.height - deltaY);
          break;
        case 'se':
          newWidth = Math.max(50, startDimensionsRef.current.width + deltaX);
          newHeight = Math.round(newWidth / aspectRatio);
          break;
        case 'sw':
          newWidth = Math.max(50, startDimensionsRef.current.width - deltaX);
          newHeight = Math.round(newWidth / aspectRatio);
          break;
        case 'ne':
          newWidth = Math.max(50, startDimensionsRef.current.width + deltaX);
          newHeight = Math.round(newWidth / aspectRatio);
          break;
        case 'nw':
          newWidth = Math.max(50, startDimensionsRef.current.width - deltaX);
          newHeight = Math.round(newWidth / aspectRatio);
          break;
      }

      // Scale back to actual dimensions
      const actualWidth = Math.round(newWidth / scale);
      const actualHeight = Math.round(newHeight / scale);
      
      setDisplayDimensions({ width: actualWidth, height: actualHeight });
    }

    if (activeTool === 'crop' && activeHandle) {
      const scaledDeltaX = deltaX / scale;
      const scaledDeltaY = deltaY / scale;
      
      let newCrop = { ...startCropRef.current };

      switch (activeHandle) {
        case 'e':
          newCrop.width = Math.max(20, Math.min(imageState.width - newCrop.x, startCropRef.current.width + scaledDeltaX));
          break;
        case 'w':
          const newX = Math.max(0, startCropRef.current.x + scaledDeltaX);
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - newX);
          newCrop.x = newX;
          break;
        case 's':
          newCrop.height = Math.max(20, Math.min(imageState.height - newCrop.y, startCropRef.current.height + scaledDeltaY));
          break;
        case 'n':
          const newY = Math.max(0, startCropRef.current.y + scaledDeltaY);
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - newY);
          newCrop.y = newY;
          break;
        case 'se':
          newCrop.width = Math.max(20, Math.min(imageState.width - newCrop.x, startCropRef.current.width + scaledDeltaX));
          newCrop.height = Math.max(20, Math.min(imageState.height - newCrop.y, startCropRef.current.height + scaledDeltaY));
          break;
        case 'nw':
          const nwX = Math.max(0, startCropRef.current.x + scaledDeltaX);
          const nwY = Math.max(0, startCropRef.current.y + scaledDeltaY);
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - nwX);
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - nwY);
          newCrop.x = nwX;
          newCrop.y = nwY;
          break;
        case 'ne':
          newCrop.width = Math.max(20, Math.min(imageState.width - newCrop.x, startCropRef.current.width + scaledDeltaX));
          const neY = Math.max(0, startCropRef.current.y + scaledDeltaY);
          newCrop.height = startCropRef.current.height + (startCropRef.current.y - neY);
          newCrop.y = neY;
          break;
        case 'sw':
          const swX = Math.max(0, startCropRef.current.x + scaledDeltaX);
          newCrop.width = startCropRef.current.width + (startCropRef.current.x - swX);
          newCrop.x = swX;
          newCrop.height = Math.max(20, Math.min(imageState.height - newCrop.y, startCropRef.current.height + scaledDeltaY));
          break;
      }

      setCropArea(newCrop);
    }
  }, [isDragging, activeHandle, activeTool, scale, imageState.width, imageState.height, imageState.originalWidth, imageState.originalHeight]);

  const handleMouseUp = useCallback(() => {
    if (isDragging && activeTool === 'resize') {
      onDimensionsChange(displayDimensions.width, displayDimensions.height);
    }
    setIsDragging(false);
    setActiveHandle(null);
  }, [isDragging, activeTool, displayDimensions, onDimensionsChange]);

  const handleApplyCrop = () => {
    onCropApply(cropArea);
    setIsCropping(false);
  };

  const handleResetCrop = () => {
    setCropArea({ x: 0, y: 0, width: imageState.width, height: imageState.height });
  };

  const estimatedSize = Math.round((displayDimensions.width * displayDimensions.height * 3 * (imageState.quality / 100)) / 1024);

  const handleClasses = "absolute w-3 h-3 bg-primary border-2 border-primary-foreground rounded-full shadow-md z-20 hover:scale-125 transition-transform";

  if (!imageState.originalUrl) return null;

  return (
    <div className="space-y-4">
      {/* Tool Selector */}
      <div className="flex items-center gap-2">
        <Button
          variant={activeTool === 'resize' ? 'toolActive' : 'tool'}
          size="sm"
          onClick={() => { setActiveTool('resize'); setIsCropping(false); }}
        >
          <Maximize2 className="w-4 h-4 mr-1" />
          Free Resize
        </Button>
        <Button
          variant={activeTool === 'crop' ? 'toolActive' : 'tool'}
          size="sm"
          onClick={() => { setActiveTool('crop'); setIsCropping(true); handleResetCrop(); }}
        >
          <Crop className="w-4 h-4 mr-1" />
          Crop
        </Button>
        <Button
          variant={activeTool === 'move' ? 'toolActive' : 'tool'}
          size="sm"
          onClick={() => setActiveTool('move')}
        >
          <Move className="w-4 h-4 mr-1" />
          Pan
        </Button>
      </div>

      {/* Live Dimensions Display */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2"
      >
        <Badge variant="default" className="text-sm px-3 py-1 font-mono">
          {displayDimensions.width} × {displayDimensions.height} px
        </Badge>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          ~{estimatedSize} KB
        </Badge>
        {isDragging && (
          <Badge variant="outline" className="text-sm px-3 py-1 animate-pulse bg-primary/10 text-primary">
            Resizing...
          </Badge>
        )}
        {activeTool === 'crop' && (
          <Badge variant="outline" className="text-sm px-3 py-1 bg-accent/10 text-accent">
            Crop: {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
          </Badge>
        )}
      </motion.div>

      {/* Interactive Canvas */}
      <Card 
        variant="bordered" 
        className="relative overflow-hidden select-none"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative flex items-center justify-center p-8 min-h-[450px]"
          style={{
            backgroundColor: imageState.backgroundColor === 'transparent' ? undefined : imageState.backgroundColor,
            backgroundImage: imageState.backgroundColor === 'transparent'
              ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%)'
              : undefined,
            backgroundSize: '16px 16px',
          }}
        >
          <div className="relative" style={{ width: displayWidth, height: displayHeight }}>
            {/* Main Image */}
            <img
              src={imageState.originalUrl}
              alt="Editable preview"
              className="w-full h-full object-contain pointer-events-none"
              style={{
                transform: `rotate(${imageState.rotation}deg)`,
              }}
              draggable={false}
            />

            {/* Crop Overlay */}
            {activeTool === 'crop' && isCropping && (
              <>
                {/* Dark overlay outside crop area */}
                <div 
                  className="absolute inset-0 bg-foreground/50 pointer-events-none"
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
                
                {/* Crop selection border */}
                <div
                  className="absolute border-2 border-primary border-dashed"
                  style={{
                    left: `${(cropArea.x / imageState.width) * 100}%`,
                    top: `${(cropArea.y / imageState.height) * 100}%`,
                    width: `${(cropArea.width / imageState.width) * 100}%`,
                    height: `${(cropArea.height / imageState.height) * 100}%`,
                  }}
                >
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-primary/30" />
                    ))}
                  </div>

                  {/* Crop handles */}
                  <div className={`${handleClasses} -top-1.5 -left-1.5 cursor-nw-resize`} onMouseDown={(e) => handleMouseDown(e, 'nw')} />
                  <div className={`${handleClasses} -top-1.5 left-1/2 -translate-x-1/2 cursor-n-resize`} onMouseDown={(e) => handleMouseDown(e, 'n')} />
                  <div className={`${handleClasses} -top-1.5 -right-1.5 cursor-ne-resize`} onMouseDown={(e) => handleMouseDown(e, 'ne')} />
                  <div className={`${handleClasses} top-1/2 -right-1.5 -translate-y-1/2 cursor-e-resize`} onMouseDown={(e) => handleMouseDown(e, 'e')} />
                  <div className={`${handleClasses} -bottom-1.5 -right-1.5 cursor-se-resize`} onMouseDown={(e) => handleMouseDown(e, 'se')} />
                  <div className={`${handleClasses} -bottom-1.5 left-1/2 -translate-x-1/2 cursor-s-resize`} onMouseDown={(e) => handleMouseDown(e, 's')} />
                  <div className={`${handleClasses} -bottom-1.5 -left-1.5 cursor-sw-resize`} onMouseDown={(e) => handleMouseDown(e, 'sw')} />
                  <div className={`${handleClasses} top-1/2 -left-1.5 -translate-y-1/2 cursor-w-resize`} onMouseDown={(e) => handleMouseDown(e, 'w')} />
                </div>
              </>
            )}

            {/* Resize Handles */}
            {activeTool === 'resize' && (
              <>
                {/* Corner handles */}
                <div className={`${handleClasses} -top-1.5 -left-1.5 cursor-nw-resize`} onMouseDown={(e) => handleMouseDown(e, 'nw')} />
                <div className={`${handleClasses} -top-1.5 -right-1.5 cursor-ne-resize`} onMouseDown={(e) => handleMouseDown(e, 'ne')} />
                <div className={`${handleClasses} -bottom-1.5 -right-1.5 cursor-se-resize`} onMouseDown={(e) => handleMouseDown(e, 'se')} />
                <div className={`${handleClasses} -bottom-1.5 -left-1.5 cursor-sw-resize`} onMouseDown={(e) => handleMouseDown(e, 'sw')} />
                
                {/* Edge handles */}
                <div className={`${handleClasses} -top-1.5 left-1/2 -translate-x-1/2 cursor-n-resize`} onMouseDown={(e) => handleMouseDown(e, 'n')} />
                <div className={`${handleClasses} top-1/2 -right-1.5 -translate-y-1/2 cursor-e-resize`} onMouseDown={(e) => handleMouseDown(e, 'e')} />
                <div className={`${handleClasses} -bottom-1.5 left-1/2 -translate-x-1/2 cursor-s-resize`} onMouseDown={(e) => handleMouseDown(e, 's')} />
                <div className={`${handleClasses} top-1/2 -left-1.5 -translate-y-1/2 cursor-w-resize`} onMouseDown={(e) => handleMouseDown(e, 'w')} />

                {/* Resize border */}
                <div className="absolute inset-0 border-2 border-primary/50 border-dashed pointer-events-none rounded" />
              </>
            )}
          </div>
        </div>

        {/* Crop Action Buttons */}
        {activeTool === 'crop' && isCropping && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Button size="sm" variant="default" onClick={handleApplyCrop}>
              <Check className="w-4 h-4 mr-1" />
              Apply Crop
            </Button>
            <Button size="sm" variant="outline" onClick={handleResetCrop}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsCropping(false)}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground text-center">
        {activeTool === 'resize' && 'Drag the corner handles to resize while maintaining aspect ratio, or edge handles to resize freely'}
        {activeTool === 'crop' && 'Drag the handles to select the area you want to keep, then click Apply Crop'}
        {activeTool === 'move' && 'Click and drag to pan around the image'}
      </div>
    </div>
  );
}
