import { Helmet } from "react-helmet-async";
import { Target, Download, Zap, Shield, FileCheck, TrendingDown } from "lucide-react";
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
    icon: Target,
    title: "Exact 20KB Target",
    description: "Our smart compression algorithm achieves precisely 20KB file size with optimal quality preservation.",
  },
  {
    icon: FileCheck,
    title: "Government Form Ready",
    description: "Perfect for SSC, UPSC, banking exams, passport, and other applications requiring 20KB photos.",
  },
  {
    icon: TrendingDown,
    title: "Quality Optimization",
    description: "Automatically finds the best quality settings to achieve 20KB while maintaining visual clarity.",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Get your 20KB photo in seconds. No upload needed, everything happens in your browser.",
  },
];

const steps = [
  {
    title: "Upload Your Photo",
    description: "Select an image from your device. Works with JPG, JPEG, PNG files of any size.",
  },
  {
    title: "Auto-Optimize to 20KB",
    description: "Our algorithm will automatically compress your image to exactly 20KB while maintaining the best possible quality.",
  },
  {
    title: "Download 20KB Photo",
    description: "Download your perfectly optimized 20KB photo, ready for any government form or application.",
  },
];

export default function ResizePhoto20KB() {
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
        <title>Resize Photo to 20KB - Free Online Photo Resizer for Government Forms</title>
        <meta
          name="description"
          content="Resize photo to exactly 20KB online. Perfect for SSC, UPSC, passport, PAN card, Aadhaar applications. Free photo resizer 20KB with optimal quality."
        />
        <meta
          name="keywords"
          content="resize photo 20kb, photo resizer 20kb, compress image to 20kb, reduce photo size 20kb, ssc photo 20kb, passport photo 20kb"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/resize-photo-20kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <HeroSection
          Icon={Target}
          subtitle="20KB Photo Resizer"
          title="Resize Photo to Exactly 20KB"
          description="Perfect for government forms and applications. Our smart algorithm compresses your photo to exactly 20KB while maintaining maximum quality."
        />

        <main className="flex-1">
          {/* Editor */}
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
                      Upload Photo to Resize to 20KB
                    </h2>
                    <UploadZone 
                      onFileSelect={loadImage} 
                      recentFile={lastUploadedFile}
                    />
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
                      <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                        Target: 20KB
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
                            <DownloadButton onDownload={() => processAndDownload(20)} />
                            <LivePreview imageState={imageState} />
                          </div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(20)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Why Use Our 20KB Photo Resizer?
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo to 20KB" />

          {/* Use Cases */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white text-center">
                  Where You Need 20KB Photos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Government Exams</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>• SSC CGL, CHSL, MTS applications</li>
                      <li>• UPSC Civil Services forms</li>
                      <li>• Railway RRB recruitment</li>
                      <li>• Banking IBPS, SBI exams</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">ID Documents</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>• Passport applications</li>
                      <li>• Aadhaar card updates</li>
                      <li>• PAN card applications</li>
                      <li>• Driving license forms</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                    <strong>✓ Guaranteed Compliance:</strong> Our tool ensures your photo meets the exact 20KB requirement for all government applications.
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
