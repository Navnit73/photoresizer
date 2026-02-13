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
  { icon: Target, title: "Exact 1MB Output", description: "Compress your photo to exactly 1MB (1024KB) — ideal for email attachments and large uploads." },
  { icon: Check, title: "Near-Original Quality", description: "1MB allows stunning image quality, preserving virtually all detail from the original photo." },
  { icon: TrendingDown, title: "Large File Reduction", description: "Reduce 5MB-20MB photos to 1MB with minimal quality loss using smart compression." },
  { icon: Download, title: "Instant & Free", description: "Get your 1MB photo immediately. No watermarks, no registration, works everywhere." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image. Handles large camera files, screenshots, and more." },
  { title: "Auto-Compress to 1MB", description: "Our algorithm compresses your photo to exactly 1MB (1024KB) with optimal quality settings." },
  { title: "Download & Share", description: "Download your 1MB photo for emails, documents, presentations, or any purpose." },
];

const faqs = [
  { question: "Why would I reduce my photo to 1MB?", answer: "Email attachments, WhatsApp sharing, and many upload forms have file size limits. 1MB is large enough for excellent quality while being small enough to share easily." },
  { question: "What's the difference between 1MB and 1024KB?", answer: "They're the same! 1MB equals 1024KB. Our tool targets exactly 1024KB to give you a precise 1MB output." },
  { question: "Can I compress a 10MB photo to 1MB?", answer: "Absolutely! Our tool can compress photos of any size to 1MB. The algorithm automatically adjusts quality and settings to hit the exact target." },
];

const relatedLinks = [
  { label: "Resize Photo to 500KB", href: "/photo-resize-500kb" },
  { label: "Resize Photo to 2MB", href: "/photo-resize-2mb" },
  { label: "Photo Resize MB to KB", href: "/photo-resize-mb-to-kb" },
];

export default function PhotoResize1MB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 1MB – Free Online Tool</title>
        <meta name="description" content="Compress your photo to exactly 1MB (1024KB) online for free. Near-original quality for emails, documents, and sharing. Fast, free, no signup required." />
        <meta name="keywords" content="photo resize 1mb, compress photo 1mb, reduce image to 1mb, 1mb photo compressor, photo resize 1024kb" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-1mb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 1MB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 1MB with near-original quality for easy sharing</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 1MB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(1024)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(1024)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 1MB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 1MB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
