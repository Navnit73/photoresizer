import { Helmet } from "react-helmet-async";
import { RefreshCw, Download, Zap, Shield, FileType, Palette } from "lucide-react";
import { InternalLinks } from "@/components/shared/InternalLinks";
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
import { Undo2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmazonAd } from "@/components/shared/AmazonAd";
import AdUnit from "@/components/shared/AdUnit";

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
    lastUploadedFile,
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

        {/* <HeroSection
          Icon={FileType}
          subtitle="Format Converter"
          title="JPG to PNG Converter"
          description="Convert your JPG/JPEG images to PNG format with transparency support. Free, fast, and completely private."
        /> */}

        <main className="flex-1">
          {/* Editor Section */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div
                  key="upload"
                  className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                    Upload Your JPG Image
                  </h2>
                  <UploadZone 
                    onFileSelect={loadImage} 
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
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
                      <div className="w-full relative py-2 flex justify-center mb-4 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <AdUnit format="fluid" layoutKey="-gw-1+2a-9x+5y" />
                      </div>
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
                </div>
              )}
            </div>
          </section>

          <div className="py-2">
            <AmazonAd />
          </div>

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

          {/* Editor Section was here */}

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

          {/* ================= SEO ARTICLE & FAQs ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Ultimate Guide to Converting JPG to PNG Online</h2>
            <p>
              While JPG (or JPEG) is the most common image format for photographs due to its small file size, it has one major limitation: it does not support transparent backgrounds. Whether you're a designer looking to drop a logo over a varied background, or a student needing to insert a clear signature into a document without an awkward white box, converting your image to PNG is the essential first step.
            </p>

            <h3>Why Convert JPEG vs Other Formats?</h3>
            <p>
              PNG (Portable Network Graphics) uses lossless compression. This means every single pixel of data is preserved exactly as it was. When you convert a JPG to PNG using our tool, we unpack the compressed JPEG data and repackage it into a high-fidelity PNG structure. This prepares the image for professional uses—from high-quality web graphics to crisp print publications—while enabling the possibility of an alpha channel (transparency).
            </p>

            <h3>Frequently Asked Questions (FAQ)</h3>
            
            <h4>Does converting a JPG to PNG improve its quality?</h4>
            <p>
              No. A PNG can only be as good as the original JPG you uploaded. While saving as PNG prevents *further* compression loss, it cannot magically restore details that were already lost in the original JPG compression.
            </p>

            <h4>Why is my new PNG file larger than the original JPG?</h4>
            <p>
              Because PNG uses lossless compression, it fundamentally stores more data per pixel to ensure absolute visual accuracy. JPG uses lossy compression to aggressively save space. A jump in file size is completely normal and expected when moving from JPG to PNG format.
            </p>

            <h4>Is my data private when converting?</h4>
            <p>
              100% private. Our JPG to PNG Converter relies entirely on your browser's local processing power. We never upload your sensitive personal photos, documents, or logos to external servers. The file conversion happens right on your device.
            </p>
          </article>

          <InternalLinks links={[
            { label: "Compress Image Online", href: "/compress-image" },
            { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
            { label: "Passport Photo Editor", href: "/passport-photo-editor" },
          ]} />
        </main>

        <Footer />
      </div>
    </>
  );
}
