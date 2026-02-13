import { Helmet } from "react-helmet-async";
import { Target, Download, Check, TrendingDown } from "lucide-react";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
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
  { icon: Target, title: "Precise 150KB Output", description: "Compress your photo to exactly 150KB — ideal for high-quality form submissions and profiles." },
  { icon: Check, title: "Professional Quality", description: "150KB allows sharp, detailed photos perfect for professional profiles and corporate applications." },
  { icon: TrendingDown, title: "Smart Algorithm", description: "Our intelligent compression preserves colors, sharpness, and detail at the 150KB target." },
  { icon: Download, title: "Instant Results", description: "Get your 150KB photo in seconds. Free, no registration, works on all devices." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image. Works with any file size or resolution." },
  { title: "Auto-Compress to 150KB", description: "Our algorithm compresses your image to exactly 150KB while maintaining excellent quality." },
  { title: "Download & Use", description: "Download your 150KB photo for use in applications, profiles, or anywhere you need it." },
];

const faqs = [
  { question: "When should I use 150KB instead of smaller sizes?", answer: "Use 150KB when the platform allows it. It provides significantly better quality than 50KB or 100KB options, making your photo look more professional." },
  { question: "Can I also resize dimensions to 150KB?", answer: "Yes! Our editor lets you change width, height, crop, and rotate your photo. The compression engine ensures the final output is exactly 150KB." },
  { question: "What file format is the 150KB output?", answer: "The output is in JPG format by default for maximum compatibility. You can also choose PNG or WEBP formats in the editor settings." },
];

const relatedLinks = [
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
  { label: "Resize Photo to 500KB", href: "/photo-resize-500kb" },
];

export default function PhotoResize150KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 150KB – Free Online</title>
        <meta name="description" content="Resize and compress your photo to exactly 150KB online for free. High quality output for profiles, applications, and online forms. No signup required." />
        <meta name="keywords" content="photo resize 150kb, compress photo 150kb, reduce image to 150kb, 150kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-150kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 150KB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 150KB with excellent quality for any application</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 150KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(150)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(150)} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 150KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 150KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
