import { ImageState, PRESET_SIZES, FORMAT_OPTIONS } from "@/types/editor";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Maximize2,
  Image as ImageIcon,
  RotateCw,
  RotateCcw,
  FileImage,
  Gauge,
  Link2,
  Link2Off,
  Settings2,
} from "lucide-react";

import { useState, useRef, useEffect, useCallback, memo } from "react";

interface EditorControlsProps {
  imageState: ImageState;
  isProcessing: boolean;
  onUpdateDimensions: (width: number, height: number) => void;
  onRotate: (rotation: number) => void;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: "jpeg" | "png" | "webp") => void;
  onApplyPreset: (width: number, height: number) => void;
}

export const EditorControls = memo(function EditorControls({
  imageState,
  isProcessing,
  onUpdateDimensions,
  onRotate,
  onQualityChange,
  onFormatChange,
  onApplyPreset,
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

  const groupedPresets = PRESET_SIZES.reduce(
    (acc, preset) => {
      acc[preset.category] ??= [];
      acc[preset.category].push(preset);
      return acc;
    },
    {} as Record<string, typeof PRESET_SIZES>,
  );

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
    <div
      className="space-y-4 animate-[fadeInUp_0.3s_ease-out]"
    >
      {/* Dimensions Controls */}
      <Card variant="tool" className="overflow-visible"> 
        {/* overflow-visible ensures tooltips/dropdowns aren't clipped and touch scrolling works naturally */}
        <CardHeader className="pb-3 space-y-3">
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-primary" />
            Dimensions
          </CardTitle>

          <div className="flex items-start sm:items-center gap-4 flex-wrap">
            {/* <span
              className={`text-[11px] sm:text-xs leading-tight px-2 py-1 rounded border ${
                lockAspectRatio
                  ? "text-red-600 bg-red-50 border-red-200"
                  : "text-gray-600 bg-gray-50 border-gray-200"
              }`}
            >
              {lockAspectRatio ? (
                <>
                  🔒 <b>Size Locked</b> (比例 सुरक्षित)
                  <br />
                  Width बदलने पर Height अपने-आप बदलेगी
                </>
              ) : (
                <>
                  🔓 <b>Size Free</b> (比例 खुला)
                  <br />
                  Width और Height अलग-अलग बदल सकते हैं
                </>
              )}
            </span> */}

            {/* <button
              onClick={() => setLockAspectRatio(!lockAspectRatio)}
              className={`p-1.5 rounded-md shrink-0 transition ${
                lockAspectRatio
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary"
              }`}
              aria-label="Toggle size lock"
            >
              {lockAspectRatio ? (
                <Link2 className="w-4 h-4" />
              ) : (
                <Link2Off className="w-4 h-4" />
              )}
            </button> */}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={localWidth}
                onChange={(e) =>
                  handleWidthChange(Number(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={localHeight}
                onChange={(e) =>
                  handleHeightChange(Number(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {[25, 50, 75, 100].map((p) => (
              <Button
                key={p}
                size="sm"
                variant="outline"
                className="text-xs"
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
        </CardContent>
      </Card>

      {/* Settings (Quality, Format, Rotation) */}
      <Card variant="tool">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-primary" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quality */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                Quality
              </Label>
              <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                {localQuality}%
              </span>
            </div>
            <Slider
              value={[localQuality]}
              min={10}
              max={100}
              step={5}
              onValueChange={([v]) => handleQualityChange(v)}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Smaller File</span>
              <span>Better Quality</span>
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Format & Rotation Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Format */}
            <div className="space-y-2">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <FileImage className="w-3.5 h-3.5 text-muted-foreground" />
                Format
              </Label>
              <Select
                value={imageState.format}
                onValueChange={(v) =>
                  onFormatChange(v as "jpeg" | "png" | "webp")
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <Label className="text-xs font-medium flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-muted-foreground" />
                Rotation
              </Label>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 h-9 px-0"
                  onClick={() => onRotate(imageState.rotation - 90)}
                  title="Rotate Left"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 px-0"
                  onClick={() => onRotate(imageState.rotation + 90)}
                  title="Rotate Right"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
