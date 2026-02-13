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
  { icon: Target, title: "Precise 30KB Output", description: "Intelligent compression delivers exactly 30KB file size while maintaining optimal image quality." },
  { icon: Check, title: "Application Ready", description: "Ideal for online job applications, exam forms, and portals that require photos under 30KB." },
  { icon: TrendingDown, title: "Smart Compression", description: "Our algorithm finds the perfect balance between 30KB file size and visual clarity." },
  { icon: Download, title: "Free & Instant", description: "Compress your photo to 30KB in seconds. No signup needed, completely free to use." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image from your device. Any size or resolution accepted." },
  { title: "Auto-Compress to 30KB", description: "Our smart engine automatically compresses your image to exactly 30KB with best possible quality." },
  { title: "Download & Use", description: "Download your 30KB photo instantly and submit it to any application form or portal." },
];

const faqs = [
  { question: "Which applications require a 30KB photo?", answer: "Many state government job portals, university admission forms, and competitive exam applications specify a 30KB photo size limit. Our tool ensures exact compliance." },
  { question: "Can I resize a large photo to 30KB?", answer: "Yes! Our tool can compress photos of any size down to exactly 30KB. It works with files from your phone camera, DSLR, or any source." },
  { question: "Is the 30KB photo suitable for printing?", answer: "30KB photos are optimized for digital form submissions. For printing purposes, we recommend using a larger file size to maintain print quality." },
];

const relatedLinks = [
  { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
  { label: "Resize Photo to 40KB", href: "/photo-resize-40kb" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
];

export default function PhotoResize30KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 30KB – Free Online Tool</title>
        <meta name="description" content="Compress and resize your photo to exactly 30KB online for free. Perfect for job applications, exam forms, and online portals. Fast, easy, no signup." />
        <meta name="keywords" content="photo resize 30kb, compress photo 30kb, reduce image to 30kb, 30kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-30kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 30KB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 30KB for application forms and online portals</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 30KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(30)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(30)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 30KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 30KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
