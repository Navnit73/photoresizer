import { Helmet } from "react-helmet-async";
import { Target, Download, Check, TrendingDown } from "lucide-react";
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
    title: "Precise 50KB Output",
    description: "Smart compression ensures your photo is exactly 50KB, meeting strict application requirements.",
  },
  {
    icon: Check,
    title: "Form Compatible",
    description: "Optimized for online forms including job applications, university admissions, and government portals.",
  },
  {
    icon: TrendingDown,
    title: "Balanced Quality",
    description: "Perfect balance between file size and image quality for professional applications.",
  },
  {
    icon: Download,
    title: "Quick & Easy",
    description: "Get your 50KB photo instantly. No complicated settings, just upload and download.",
  },
];

const steps = [
  {
    title: "Select Your Image",
    description: "Upload any JPG, PNG, or WEBP photo. Works with images of any size or resolution.",
  },
  {
    title: "Auto-Compress to 50KB",
    description: "Our algorithm automatically compresses your image to exactly 50KB with optimal quality settings.",
  },
  {
    title: "Download & Use",
    description: "Download your 50KB photo and use it for any application form or online portal.",
  },
];

export default function ResizePhoto50KB() {
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
        <title>Resize Photo to 50KB - Online Photo Compressor for Applications</title>
        <meta
          name="description"
          content="Compress photo to 50KB online free. Perfect for job applications, university forms, and online portals. Fast 50KB photo resizer with quality preservation."
        />
        <meta
          name="keywords"
          content="resize photo 50kb, compress photo 50kb, reduce image to 50kb, 50kb photo compressor, job application photo"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/resize-photo-50kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <HeroSection
          Icon={Target}
          subtitle="50KB Photo Compressor"
          title="Resize Photo to 50KB"
          description="Get your photo to exactly 50KB for job applications, university admissions, and online forms. Fast, free, and easy to use."
        />

        <main className="flex-1">
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Professional 50KB Photo Compression
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                      Upload Photo to Compress to 50KB
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
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">
                        Target: 50KB
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
                            <DownloadButton onDownload={() => processAndDownload(50)} />
                            <LivePreview imageState={imageState} />
                          </div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(50)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 50KB" />

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white text-center">
                  Common 50KB Photo Requirements
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Online Job Applications",
                    "University Admissions",
                    "Professional Certifications",
                    "Visa Applications",
                    "Corporate Portals",
                    "Training Registrations",
                  ].map((item) => (
                    <div key={item} className="p-4 rounded-xl glass border border-slate-200/50 dark:border-slate-700/50 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</p>
                    </div>
                  ))}
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
