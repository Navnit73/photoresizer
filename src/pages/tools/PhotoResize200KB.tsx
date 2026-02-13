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
  { icon: Target, title: "Exact 200KB Output", description: "Compress your photo to precisely 200KB — great balance of quality and file size for most uses." },
  { icon: Check, title: "High Quality Results", description: "200KB provides excellent visual quality, perfect for professional documents and applications." },
  { icon: TrendingDown, title: "Smart Optimization", description: "Advanced compression technology preserves details, colors, and sharpness at 200KB." },
  { icon: Download, title: "Free & Quick", description: "Get your 200KB photo instantly. No registration, no limits, completely free." },
];

const steps = [
  { title: "Upload Your Image", description: "Select any JPG, PNG, or WEBP photo. Handles images from 1KB to 50MB or more." },
  { title: "Auto-Compress to 200KB", description: "Our engine compresses your photo to exactly 200KB with the best quality settings." },
  { title: "Download & Share", description: "Download your 200KB photo for documents, profiles, social media, or any purpose." },
];

const faqs = [
  { question: "Is 200KB good enough for a professional photo?", answer: "Yes! 200KB provides excellent quality for digital use including professional profiles, resumes, and online forms. It's large enough to maintain clarity while being small enough for fast uploads." },
  { question: "Can I compress multiple photos to 200KB?", answer: "Currently our tool processes one photo at a time. Upload each photo individually and download them at 200KB. For bulk processing, check out our bulk resize tool." },
  { question: "What happens to photo EXIF data?", answer: "During compression, EXIF metadata like camera info and GPS data may be stripped to reduce file size. This also helps protect your privacy when sharing photos online." },
];

const relatedLinks = [
  { label: "Resize Photo to 150KB", href: "/photo-resize-150kb" },
  { label: "Resize Photo to 500KB", href: "/photo-resize-500kb" },
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
];

export default function PhotoResize200KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 200KB – Free Online</title>
        <meta name="description" content="Compress your photo to exactly 200KB online for free. High quality results for professional documents, applications, and online profiles. No signup needed." />
        <meta name="keywords" content="photo resize 200kb, compress photo 200kb, reduce image to 200kb, 200kb photo compressor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-200kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 200KB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 200KB with excellent quality preservation</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 200KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(200)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(200)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 200KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 200KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
