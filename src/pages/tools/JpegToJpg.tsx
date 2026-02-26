import { Helmet } from "react-helmet-async";
import { ImageIcon, Download, Zap, Shield, Maximize2, Images } from "lucide-react";
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

const features = [
  {
    icon: Zap,
    title: "Instant Conversion",
    description: "Convert JPEG to JPG format instantly in your browser. No upload required, 100% client-side processing.",
  },
  {
    icon: Shield,
    title: "Completely Private",
    description: "Your images never leave your device. All processing happens locally in your browser for maximum privacy.",
  },
  {
    icon: Maximize2,
    title: "No Quality Loss",
    description: "Lossless format conversion maintains original image quality. Perfect pixel-to-pixel conversion.",
  },
  {
    icon: Images,
    title: "Batch Support",
    description: "Convert multiple JPEG files to JPG format one after another with our easy-to-use interface.",
  },
];

const steps = [
  {
    title: "Upload Your JPEG File",
    description: "Click the upload button or drag and drop your JPEG image file into the editor. Supported formats include .jpeg and .jpg files.",
  },
  {
    title: "Edit (Optional)",
    description: "Optionally resize, crop, rotate, or adjust quality settings. You can also change the background color if needed.",
  },
  {
    title: "Download as JPG",
    description: "Click the download button to save your file. The image will be automatically converted to JPG format with your applied settings.",
  },
];

export default function JpegToJpg() {
  const {
    imageState,
    isProcessing,
    history,
    loadImage,
    updateDimensions,
    setRotation,
    setBackgroundColor,
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
        <title>JPEG to JPG Converter - Free Online Image Format Converter</title>
        <meta
          name="description"
          content="Convert JPEG to JPG online for free. Fast, secure, and private JPEG to JPG converter. No upload required - all processing happens in your browser."
        />
        <meta
          name="keywords"
          content="jpeg to jpg, jpeg to jpg converter, convert jpeg to jpg, jpeg jpg converter, image format converter, online jpeg converter"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/jpeg-to-jpg" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <HeroSection
          Icon={ImageIcon}
          subtitle="Format Converter"
          title="JPEG to JPG Converter"
          description="Convert your JPEG images to JPG format instantly. Free, fast, and completely secure - all processing happens in your browser."
        />

        <main className="flex-1">
          {/* Editor Section */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div
                  key="upload"
                  className="max-w-2xl mx-auto animate-[fadeInUp_0.35s_ease-out]"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                    Upload Your JPEG Image
                  </h2>
                  <UploadZone 
                    onFileSelect={loadImage} 
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div
                  key="editor"
                  className="space-y-3 animate-[fadeIn_0.3s_ease-out]"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={undo} className="h-8 px-2 text-xs">
                          <Undo2 className="w-3.5 h-3.5 mr-1" />
                          Undo
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={reset} className="h-8 px-2 text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Main Layout */}
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    {/* Settings Panel */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 lg:sticky lg:top-20 max-h-[85vh] overflow-y-auto">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Settings
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

                    {/* Canvas Area */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 sm:p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Original</div>
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Preview</div>
                          <DownloadButton onDownload={processAndDownload} />
                          <LivePreview imageState={imageState} />
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <div className="sticky bottom-3">
                          <DownloadButton onDownload={processAndDownload} />
                        </div>
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
                Why Use Our JPEG to JPG Converter?
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          {/* How To Guide */}
          <HowToGuide steps={steps} title="How to Convert JPEG to JPG" />

          {/* FAQ/Info Section */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                  About JPEG vs JPG
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    <strong>JPEG</strong> and <strong>JPG</strong> are essentially the same image format. The only difference is the file extension - .jpeg vs .jpg. Both use the same compression algorithm and image quality.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    The .jpg extension exists because older Windows systems (MS-DOS, Windows 3.1) had a three-letter limit for file extensions. Modern systems support both, but some applications may prefer one over the other.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Our converter makes it easy to switch between these extensions while maintaining perfect image quality. You can also resize, compress, or edit your images during the conversion process.
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
