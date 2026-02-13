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
  { icon: Target, title: "Precise 500KB Output", description: "Compress your photo to exactly 500KB for high-quality uploads where larger file sizes are allowed." },
  { icon: Check, title: "High-Res Quality", description: "500KB preserves exceptional detail and color accuracy, suitable for portfolios and presentations." },
  { icon: TrendingDown, title: "Efficient Compression", description: "Reduce multi-megabyte photos to 500KB without noticeable quality loss." },
  { icon: Download, title: "Free & Fast", description: "Get your 500KB photo instantly. No signup, no watermarks, works on any device." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image. Handles large files from cameras and smartphones." },
  { title: "Auto-Compress to 500KB", description: "Our engine optimizes your photo to exactly 500KB with maximum quality preservation." },
  { title: "Download & Use", description: "Download your 500KB photo for portfolios, websites, presentations, or email." },
];

const faqs = [
  { question: "Is 500KB too large for online forms?", answer: "Some forms accept up to 500KB or more. Always check the specific requirements. If a smaller size is needed, try our 100KB or 200KB resize tools." },
  { question: "How does 500KB compare to the original quality?", answer: "At 500KB, most photos look virtually identical to the original. You'll notice minimal quality loss, making it ideal when you want to reduce file size without sacrificing appearance." },
  { question: "Can I use 500KB photos on websites?", answer: "500KB is acceptable for website images, though for faster page loads, consider our smaller compression options. It's great for hero images and portfolio pages." },
];

const relatedLinks = [
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
  { label: "Resize Photo to 1MB", href: "/photo-resize-1mb" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function PhotoResize500KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 500KB – Free Online</title>
        <meta name="description" content="Compress your photo to exactly 500KB online for free. Preserve high quality for portfolios, presentations, and websites. Fast and easy, no signup." />
        <meta name="keywords" content="photo resize 500kb, compress photo 500kb, reduce image to 500kb, 500kb photo compressor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-500kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 500KB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 500KB while preserving excellent quality</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 500KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(500)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(500)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 500KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 500KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
