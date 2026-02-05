import { Helmet } from "react-helmet-async";
import { RefreshCw, Download, Zap, Shield, FileType, Palette } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: RefreshCw,
    title: "Lossless Conversion",
    description: "Convert JPG to PNG format without any quality loss. Perfect for images requiring transparency.",
  },
  {
    icon: Palette,
    title: "Transparency Support",
    description: "PNG format supports transparency, perfect for logos, graphics, and web design elements.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Fast client-side conversion. No upload required, processing happens instantly in your browser.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "Your images never leave your device. All processing is done locally for complete privacy.",
  },
];

const steps = [
  {
    title: "Upload JPG File",
    description: "Select your JPG or JPEG image file. Drag and drop or click to browse from your device.",
  },
  {
    title: "Adjust Settings",
    description: "Optionally resize, crop, or adjust quality. You can also add a transparent background if needed.",
  },
  {
    title: "Download as PNG",
    description: "Click download to save your image in PNG format with optional transparency and high quality.",
  },
];

export default function JpgToPng() {
  const {
    imageState,
    isProcessing,
    history,
    loadImage,
    updateDimensions,
    setRotation,
    setQuality,
    setFormat,
    applyPreset,
    applyCrop,
    undo,
    processAndDownload,
    reset,
  } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>JPG to PNG Converter - Convert JPEG to PNG Online Free</title>
        <meta
          name="description"
          content="Convert JPG to PNG online for free. Add transparency to your images. Fast, secure JPG to PNG converter with no upload required."
        />
        <meta
          name="keywords"
          content="jpg to png, jpg to png converter, jpeg to png, convert jpg to png, image converter, add transparency"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/jpg-to-png" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <HeroSection
          Icon={FileType}
          subtitle="Format Converter"
          title="JPG to PNG Converter"
          description="Convert your JPG/JPEG images to PNG format with transparency support. Free, fast, and completely private."
        />

        <main className="flex-1">
          {/* Features Section */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Why Convert JPG to PNG?
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          {/* Editor Section */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="max-w-2xl mx-auto"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                      Upload Your JPG Image
                    </h2>
                    <UploadZone onFileSelect={loadImage} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={undo}>
                            <Undo2 className="w-3.5 h-3.5 mr-1" />
                            Undo
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={reset}>
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls
                          imageState={imageState}
                          isProcessing={isProcessing}
                          onUpdateDimensions={updateDimensions}
                          onRotate={setRotation}
                          onQualityChange={setQuality}
                          onFormatChange={setFormat}
                          onApplyPreset={applyPreset}
                        />
                      </div>

                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div>
                            <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          </div>
                          <div>
                            <DownloadButton onDownload={processAndDownload} />
                            <LivePreview imageState={imageState} />
                          </div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={processAndDownload} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Convert JPG to PNG" />

          {/* Info Section */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
                  JPG vs PNG: When to Use Each Format
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white flex items-center gap-2">
                      <FileType className="w-5 h-5 text-primary" />
                      JPG Format
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>✓ Smaller file sizes</li>
                      <li>✓ Best for photos</li>
                      <li>✓ Good for web use</li>
                      <li>✗ No transparency support</li>
                      <li>✗ Lossy compression</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white flex items-center gap-2">
                      <Palette className="w-5 h-5 text-secondary-500" />
                      PNG Format
                    </h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>✓ Transparency support</li>
                      <li>✓ Lossless compression</li>
                      <li>✓ Best for logos & graphics</li>
                      <li>✓ Better quality</li>
                      <li>✗ Larger file sizes</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>💡 Pro Tip:</strong> Use PNG when you need transparency for logos, icons, or graphics with text. Use JPG for photographs and images where file size matters more than perfect quality.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
