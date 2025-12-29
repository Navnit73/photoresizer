import { ImageState, PRESET_SIZES, BACKGROUND_COLORS, FORMAT_OPTIONS } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  RotateCw, 
  RotateCcw, 
  Palette, 
  Download, 
  Trash2,
  Maximize2,
  Image as ImageIcon,
  FileImage,
  Gauge,
  Link2,
  Link2Off
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EditorControlsProps {
  imageState: ImageState;
  isProcessing: boolean;
  onUpdateDimensions: (width: number, height: number, maintainRatio?: boolean) => void;
  onRotate: (rotation: number) => void;
  onBackgroundChange: (color: string) => void;
  onQualityChange: (quality: number) => void;
  onFormatChange: (format: 'jpeg' | 'png' | 'webp') => void;
  onApplyPreset: (width: number, height: number) => void;
  onDownload: () => void;
  onReset: () => void;
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
  onDownload,
  onReset,
}: EditorControlsProps) {
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  
  const groupedPresets = PRESET_SIZES.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, typeof PRESET_SIZES>);

  const handleWidthChange = (newWidth: number) => {
    if (lockAspectRatio && imageState.originalWidth && imageState.originalHeight) {
      const ratio = imageState.originalHeight / imageState.originalWidth;
      const newHeight = Math.round(newWidth * ratio);
      onUpdateDimensions(newWidth, newHeight);
    } else {
      onUpdateDimensions(newWidth, imageState.height);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    if (lockAspectRatio && imageState.originalWidth && imageState.originalHeight) {
      const ratio = imageState.originalWidth / imageState.originalHeight;
      const newWidth = Math.round(newHeight * ratio);
      onUpdateDimensions(newWidth, newHeight);
    } else {
      onUpdateDimensions(imageState.width, newHeight);
    }
  };

  // Calculate estimated file size
  const estimatedSize = Math.round((imageState.width * imageState.height * 3 * (imageState.quality / 100)) / 1024);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Quick Stats */}
      <Card variant="tool" className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold font-heading text-primary">{imageState.width}</p>
              <p className="text-xs text-muted-foreground">Width (px)</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-heading text-primary">{imageState.height}</p>
              <p className="text-xs text-muted-foreground">Height (px)</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border text-center">
            <p className="text-sm font-medium">~{estimatedSize} KB</p>
            <p className="text-xs text-muted-foreground">Estimated size</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="resize" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="resize" className="text-xs">
            <Maximize2 className="w-3 h-3 mr-1" />
            Size
          </TabsTrigger>
          <TabsTrigger value="presets" className="text-xs">
            <ImageIcon className="w-3 h-3 mr-1" />
            Presets
          </TabsTrigger>
          <TabsTrigger value="adjust" className="text-xs">
            <RotateCw className="w-3 h-3 mr-1" />
            Adjust
          </TabsTrigger>
          <TabsTrigger value="export" className="text-xs">
            <FileImage className="w-3 h-3 mr-1" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resize" className="space-y-4">
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-primary" />
                  Dimensions
                </span>
                <button
                  onClick={() => setLockAspectRatio(!lockAspectRatio)}
                  className={`p-1.5 rounded-md transition-colors ${lockAspectRatio ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}
                  title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                >
                  {lockAspectRatio ? <Link2 className="w-4 h-4" /> : <Link2Off className="w-4 h-4" />}
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Width (px)</Label>
                  <Input
                    type="number"
                    value={imageState.width || ''}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="h-9 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Height (px)</Label>
                  <Input
                    type="number"
                    value={imageState.height || ''}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="h-9 font-mono"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs bg-secondary/50 rounded-lg p-2">
                <span className="text-muted-foreground">Original:</span>
                <span className="font-mono">{imageState.originalWidth} × {imageState.originalHeight}px</span>
              </div>

              {/* Quick Scale Buttons */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Quick Scale</Label>
                <div className="flex gap-2 flex-wrap">
                  {[25, 50, 75, 100, 150, 200].map((percent) => (
                    <Button
                      key={percent}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => {
                        const newWidth = Math.round(imageState.originalWidth * (percent / 100));
                        const newHeight = Math.round(imageState.originalHeight * (percent / 100));
                        onUpdateDimensions(newWidth, newHeight);
                      }}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Size Presets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
              {Object.entries(groupedPresets).map(([category, presets]) => (
                <div key={category} className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">{category}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant={imageState.width === preset.width && imageState.height === preset.height ? "toolActive" : "tool"}
                        size="sm"
                        onClick={() => onApplyPreset(preset.width, preset.height)}
                        className="text-xs h-auto py-2 flex-col items-start"
                      >
                        <span className="font-medium">{preset.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {preset.width}×{preset.height}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjust" className="space-y-4">
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-primary" />
                Rotation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="tool"
                  size="sm"
                  onClick={() => onRotate(imageState.rotation - 90)}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  -90°
                </Button>
                <Button
                  variant="tool"
                  size="sm"
                  onClick={() => onRotate(imageState.rotation + 90)}
                  className="flex-1"
                >
                  <RotateCw className="w-4 h-4 mr-1" />
                  +90°
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Current: <span className="font-mono font-medium">{imageState.rotation}°</span>
              </p>
            </CardContent>
          </Card>

          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {BACKGROUND_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onBackgroundChange(color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      imageState.backgroundColor === color.value
                        ? 'border-primary scale-110 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{
                      backgroundColor: color.value === 'transparent' ? undefined : color.value,
                      backgroundImage: color.value === 'transparent' 
                        ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                        : undefined,
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                {BACKGROUND_COLORS.find(c => c.value === imageState.backgroundColor)?.name || 'Custom'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-xs">Compression</Label>
                  <span className="text-xs font-mono font-medium text-primary">{imageState.quality}%</span>
                </div>
                <Slider
                  value={[imageState.quality]}
                  onValueChange={([value]) => onQualityChange(value)}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="tool">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileImage className="w-4 h-4 text-primary" />
                Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={imageState.format} onValueChange={(v) => onFormatChange(v as 'jpeg' | 'png' | 'webp')}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      <span className="font-medium">{format.label}</span>
                      <span className="text-muted-foreground ml-2 text-xs">
                        {format.value === 'jpeg' && '(Best for photos)'}
                        {format.value === 'png' && '(Lossless, larger)'}
                        {format.value === 'webp' && '(Modern, smaller)'}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={onDownload}
          disabled={isProcessing}
        >
          <Download className="w-4 h-4 mr-2" />
          {isProcessing ? 'Processing...' : `Download ${imageState.format.toUpperCase()}`}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onReset}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear & Start Over
        </Button>
      </div>
    </motion.div>
  );
}
