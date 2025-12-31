import {
  ImageState,
  PRESET_SIZES,
  BACKGROUND_COLORS,
  FORMAT_OPTIONS,
} from "@/types/editor";

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
  Palette,
  FileImage,
  Gauge,
  Link2,
  Link2Off,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

interface EditorControlsProps {
  imageState: ImageState;
  isProcessing: boolean;
  onUpdateDimensions: (width: number, height: number) => void;
  onRotate: (rotation: number) => void;
  onBackgroundChange: (color: string) => void;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: "jpeg" | "png" | "webp") => void;
  onApplyPreset: (width: number, height: number) => void;
}

export function EditorControls({
  imageState,
  isProcessing,
  onUpdateDimensions,
  onRotate,
  onBackgroundChange,
  onQualityChange,
  onFormatChange,
  onApplyPreset,
}: EditorControlsProps) {
  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const groupedPresets = PRESET_SIZES.reduce((acc, preset) => {
    acc[preset.category] ??= [];
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, typeof PRESET_SIZES>);

  const handleWidthChange = (width: number) => {
    if (
      lockAspectRatio &&
      imageState.originalWidth &&
      imageState.originalHeight
    ) {
      const ratio = imageState.originalHeight / imageState.originalWidth;
      onUpdateDimensions(width, Math.round(width * ratio));
    } else {
      onUpdateDimensions(width, imageState.height);
    }
  };

  const handleHeightChange = (height: number) => {
    if (
      lockAspectRatio &&
      imageState.originalWidth &&
      imageState.originalHeight
    ) {
      const ratio = imageState.originalWidth / imageState.originalHeight;
      onUpdateDimensions(Math.round(height * ratio), height);
    } else {
      onUpdateDimensions(imageState.width, height);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="basic" className="text-xs">
            <Gauge className="w-3 h-3 mr-1" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="presets" className="text-xs">
            <ImageIcon className="w-3 h-3 mr-1" />
            Presets
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">
            <RotateCw className="w-3 h-3 mr-1" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* ================= BASIC ================= */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          {/* Dimensions */}
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-primary" />
                  Dimensions
                </span>
                <button
                  onClick={() => setLockAspectRatio(!lockAspectRatio)}
                  className={`p-1.5 rounded-md ${
                    lockAspectRatio
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary"
                  }`}
                >
                  {lockAspectRatio ? (
                    <Link2 className="w-4 h-4" />
                  ) : (
                    <Link2Off className="w-4 h-4" />
                  )}
                </button>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Width</Label>
                  <Input
                    type="number"
                    value={imageState.width}
                    onChange={(e) =>
                      handleWidthChange(Number(e.target.value) || 0)
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs">Height</Label>
                  <Input
                    type="number"
                    value={imageState.height}
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
                        Math.round(imageState.originalHeight * (p / 100))
                      )
                    }
                  >
                    {p}%
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality */}
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Slider
                value={[imageState.quality]}
                min={10}
                max={100}
                step={5}
                onValueChange={([v]) => onQualityChange(v)}
              />
              <div className="flex justify-between text-xs mt-2">
                <span>Smaller</span>
                <span className="font-mono">{imageState.quality}%</span>
                <span>Better</span>
              </div>
            </CardContent>
          </Card>

          {/* Format */}
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileImage className="w-4 h-4 text-primary" />
                Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={imageState.format}
                onValueChange={(v) =>
                  onFormatChange(v as "jpeg" | "png" | "webp")
                }
              >
                <SelectTrigger>
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
            </CardContent>
          </Card>

         
        </TabsContent>

        {/* ================= PRESETS ================= */}
        <TabsContent value="presets" className="space-y-6 mt-4">
          {Object.entries(groupedPresets).map(([category, presets]) => (
            <Card key={category} variant="tool">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  {category}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {presets.map((preset) => {
                    const isActive =
                      imageState.width === preset.width &&
                      imageState.height === preset.height;

                    return (
                      <button
                        key={preset.name}
                        onClick={() =>
                          onApplyPreset(preset.width, preset.height)
                        }
                        className={`
                  group w-full rounded-lg border px-3 py-3 text-left transition-all
                  ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-background hover:border-primary/50 hover:bg-secondary"
                  }
                `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {preset.name}
                          </span>
                          {isActive && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                              Active
                            </span>
                          )}
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground font-mono">
                          {preset.width} × {preset.height}px
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ================= ADVANCED ================= */}
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-primary" />
                Rotation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                variant="tool"
                onClick={() => onRotate(imageState.rotation - 90)}
              >
                <RotateCcw className="w-4 h-4 mr-1" /> -90°
              </Button>
              <Button
                variant="tool"
                onClick={() => onRotate(imageState.rotation + 90)}
              >
                <RotateCw className="w-4 h-4 mr-1" /> +90°
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
