import { Helmet } from "react-helmet-async";
import { ArrowDownToLine, Download, TrendingDown, Zap } from "lucide-react";
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
  { icon: ArrowDownToLine, title: "MB to KB Conversion", description: "Reduce photos from megabytes to kilobytes. Convert 5MB, 10MB, or larger files to KB sizes." },
  { icon: TrendingDown, title: "Massive Reduction", description: "Compress multi-MB photos to any KB target while keeping the best possible quality." },
  { icon: Zap, title: "Smart Algorithm", description: "Our engine intelligently adjusts quality to achieve maximum size reduction with minimal loss." },
  { icon: Download, title: "Instant & Free", description: "Convert MB photos to KB instantly. No registration, no watermarks, completely free." },
];

const steps = [
  { title: "Upload MB-Size Photo", description: "Select your large MB-size photo. Our tool handles files up to 50MB or more." },
  { title: "Compress to KB", description: "Use quality and dimension controls to reduce your photo from MB to KB. Live preview shows current size." },
  { title: "Download KB Photo", description: "Download your compressed photo now in KB. Ready for forms, emails, and uploads." },
];

const faqs = [
  { question: "How do I reduce a 5MB photo to KB?", answer: "Upload your 5MB photo, then lower the quality slider and optionally reduce dimensions. The live preview shows the estimated size. You can target any KB value from 20KB to 500KB or more." },
  { question: "How many KB are in 1 MB?", answer: "1 MB (megabyte) equals 1024 KB (kilobytes). So a 5MB photo is about 5120KB. Our tool can compress it to any KB target you need." },
  { question: "Will my photo lose quality when converting MB to KB?", answer: "Some quality reduction is expected when decreasing file size significantly. Our smart compression minimizes visible quality loss, keeping your photo clear for its intended use." },
];

const relatedLinks = [
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Resize Photo by KB", href: "/photo-resize-by-kb" },
];

export default function PhotoResizeMBToKB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo MB to KB – Reduce Size Free</title>
        <meta name="description" content="Convert and reduce photo size from MB to KB online free. Compress large photos from megabytes to kilobytes. Smart compression with quality control." />
        <meta name="keywords" content="photo resize mb to kb, reduce photo mb to kb, compress image mb to kb, convert mb to kb photo" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-mb-to-kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Reduce Photo Size from MB to KB</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress large photos from megabytes to kilobytes with smart compression</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">MB → KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload()} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload()} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">MB to KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Reduce Photo from MB to KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
