import { ImageState, FORMAT_OPTIONS } from "@/types/editor";

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

import { Maximize2, Gauge } from "lucide-react";
import { motion } from "framer-motion";

interface EditorControlsProps {
  imageState: ImageState;
  isProcessing: boolean;
  onUpdateDimensions: (width: number, height: number) => void;
  onRotate: (rotation: number) => void;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: "jpeg" | "png" | "webp") => void;
  onApplyPreset: (width: number, height: number) => void;
}

export function EditorControls({
  imageState,
  isProcessing,
  onUpdateDimensions,
  onQualityChange,
  onFormatChange,
}: EditorControlsProps) {
  const handleWidthChange = (width: number) => {
    onUpdateDimensions(width, imageState.height);
  };

  const handleHeightChange = (height: number) => {
    onUpdateDimensions(imageState.width, height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* ================= DIMENSIONS ================= */}
      <Card variant="tool">
        <CardHeader className="pb-3 space-y-2">
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-primary" />
            Dimensions
          </CardTitle>

          <span className="text-xs px-2 py-1 rounded border text-green-700 bg-green-50 border-green-200">
            🔓 <b>Size Free</b> — Width & Height independent
          </span>
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
                disabled={isProcessing}
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
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Percentage resize (free scaling) */}
          <div className="flex gap-2 flex-wrap">
            {[25, 50, 75, 100].map((p) => (
              <Button
                key={p}
                size="sm"
                variant="outline"
                className="text-xs"
                disabled={isProcessing}
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

      {/* ================= QUALITY ================= */}
      <Card variant="tool">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            Quality
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Slider
            value={[imageState.quality]}
            min={10}
            max={100}
            step={5}
            onValueChange={([v]) => onQualityChange(v)}
            disabled={isProcessing}
          />

          <div className="flex justify-between text-xs">
            <span>Smaller</span>
            <span className="font-mono">{imageState.quality}%</span>
            <span>Better</span>
          </div>

          <div className="text-sm font-medium mt-2">
            Select Export Format
          </div>

          <Select
            value={imageState.format}
            onValueChange={(v) =>
              onFormatChange(v as "jpeg" | "png" | "webp")
            }
            disabled={isProcessing}
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
    </motion.div>
  );
}
