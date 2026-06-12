import { ImageState, PRESET_SIZES, FORMAT_OPTIONS } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Maximize2, FileImage, Gauge, RotateCw, RotateCcw, Settings2, Paintbrush } from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";

interface EditorControlsProps {
  imageState: ImageState;
  isProcessing: boolean;
  onUpdateDimensions: (width: number, height: number) => void;
  onRotate: (rotation: number) => void;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: "jpeg" | "png" | "webp") => void;
  onApplyPreset: (width: number, height: number) => void;
  onBackgroundColorChange: (color: string) => void;
}

export const EditorControls = memo(function EditorControls({
  imageState,
  isProcessing,
  onUpdateDimensions,
  onRotate,
  onQualityChange,
  onFormatChange,
  onApplyPreset,
  onBackgroundColorChange,
}: EditorControlsProps) {
  const [lockAspectRatio, setLockAspectRatio] = useState(false);

  // Local state for immediate UI feedback (debounced upstream)
  const [localQuality, setLocalQuality] = useState(imageState.quality);
  const [localWidth, setLocalWidth] = useState(imageState.width);
  const [localHeight, setLocalHeight] = useState(imageState.height);
  const qualityTimer = useRef<ReturnType<typeof setTimeout>>();
  const dimTimer = useRef<ReturnType<typeof setTimeout>>();

  // Sync local state when imageState changes from outside (e.g. preset applied)
  useEffect(() => { setLocalQuality(imageState.quality); }, [imageState.quality]);
  useEffect(() => { setLocalWidth(imageState.width); }, [imageState.width]);
  useEffect(() => { setLocalHeight(imageState.height); }, [imageState.height]);

  // Debounced quality change (300ms)
  const handleQualityChange = useCallback((value: number) => {
    setLocalQuality(value);
    clearTimeout(qualityTimer.current);
    qualityTimer.current = setTimeout(() => onQualityChange(value), 300);
  }, [onQualityChange]);

  // Cleanup timers
  useEffect(() => () => {
    clearTimeout(qualityTimer.current);
    clearTimeout(dimTimer.current);
  }, []);

  const handleWidthChange = useCallback((width: number) => {
    setLocalWidth(width);
    clearTimeout(dimTimer.current);
    dimTimer.current = setTimeout(() => {
      if (lockAspectRatio && imageState.originalWidth && imageState.originalHeight) {
        const ratio = imageState.originalHeight / imageState.originalWidth;
        onUpdateDimensions(width, Math.round(width * ratio));
      } else {
        onUpdateDimensions(width, localHeight);
      }
    }, 400);
  }, [lockAspectRatio, imageState.originalWidth, imageState.originalHeight, localHeight, onUpdateDimensions]);

  const handleHeightChange = useCallback((height: number) => {
    setLocalHeight(height);
    clearTimeout(dimTimer.current);
    dimTimer.current = setTimeout(() => {
      if (lockAspectRatio && imageState.originalWidth && imageState.originalHeight) {
        const ratio = imageState.originalWidth / imageState.originalHeight;
        onUpdateDimensions(Math.round(height * ratio), height);
      } else {
        onUpdateDimensions(localWidth, height);
      }
    }, 400);
  }, [lockAspectRatio, imageState.originalWidth, imageState.originalHeight, localWidth, onUpdateDimensions]);

  return (
    <div className="space-y-8">
      {/* Dimensions Block */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-primary" />
          Dimensions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Width (px)</Label>
            <Input
              type="number"
              value={localWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value) || 0)}
              className="bg-background border-border h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Height (px)</Label>
            <Input
              type="number"
              value={localHeight}
              onChange={(e) => handleHeightChange(Number(e.target.value) || 0)}
              className="bg-background border-border h-9"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap pb-2 border-b border-border">
          {[25, 50, 75, 100].map((p) => (
            <Button
              key={p}
              size="sm"
              variant="outline"
              className="h-7 px-3 text-xs bg-muted/50 border-transparent hover:border-border"
              onClick={() =>
                onUpdateDimensions(
                  Math.round(imageState.originalWidth * (p / 100)),
                  Math.round(imageState.originalHeight * (p / 100)),
                )
              }
            >
              {p}%
            </Button>
          ))}
        </div>
      </div>

      {/* Settings Block */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary" />
          Format & Quality
        </h3>
        
        {/* Quality Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5" />
              Compression Image Quality
            </Label>
            <span className="text-xs font-mono font-medium">{localQuality}%</span>
          </div>
          <Slider
            value={[localQuality]}
            min={10}
            max={100}
            step={5}
            onValueChange={([v]) => handleQualityChange(v)}
            className="py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Format Select */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <FileImage className="w-3.5 h-3.5" />
              Format
            </Label>
            <Select
              value={imageState.format}
              onValueChange={(v) => onFormatChange(v as "jpeg" | "png" | "webp")}
            >
              <SelectTrigger className="h-9 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMAT_OPTIONS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rotation Buttons */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              Rotate
            </Label>
            <div className="flex gap-1.5">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 h-9 bg-background border-border"
                onClick={() => onRotate(imageState.rotation - 90)}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="flex-1 h-9 bg-background border-border"
                onClick={() => onRotate(imageState.rotation + 90)}
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-1.5 col-span-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Paintbrush className="w-3.5 h-3.5" />
              Background Color
            </Label>
            <div className="flex gap-2 items-center">
              <Input 
                type="color" 
                value={imageState.backgroundColor === "transparent" ? "#ffffff" : imageState.backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-12 h-9 p-1 bg-background border-border"
                disabled={imageState.format === "png" && imageState.backgroundColor === "transparent"}
              />
              <Button 
                variant={imageState.backgroundColor === "transparent" ? "default" : "outline"} 
                size="sm"
                onClick={() => onBackgroundColorChange("transparent")}
                className="h-9"
              >
                Transparent
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Used when rotating, or when saving a transparent image as JPEG.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
