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
  { icon: Target, title: "Exact 100KB Target", description: "Precisely compress your photo to 100KB — a universal size accepted by most online platforms." },
  { icon: Check, title: "Universal Compatibility", description: "100KB is the most common photo size limit across job portals, exam forms, and registration sites." },
  { icon: TrendingDown, title: "Excellent Quality", description: "100KB provides great image quality, making your photo look professional on any platform." },
  { icon: Download, title: "One-Click Download", description: "Upload, compress, and download your 100KB photo in seconds. Completely free to use." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image from your device. Any resolution or file size works." },
  { title: "Auto-Compress to 100KB", description: "Our intelligent algorithm compresses your photo to exactly 100KB while maximizing quality." },
  { title: "Download & Apply", description: "Download your perfectly sized 100KB photo and use it for any online form or application." },
];

const faqs = [
  { question: "What platforms require 100KB photos?", answer: "Many platforms including LinkedIn, Naukri, government job portals, and university admission forms commonly require photos around 100KB. It's the most widely accepted file size limit." },
  { question: "How is 100KB different from 50KB compression?", answer: "100KB allows nearly double the image data compared to 50KB, resulting in noticeably better quality. Choose 100KB when the platform allows it for the best visual result." },
  { question: "Can I resize dimensions along with file size?", answer: "Yes! Our editor allows you to change width, height, crop, rotate, and adjust quality — all while ensuring the final file is exactly 100KB." },
];

const relatedLinks = [
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Resize Photo to 150KB", href: "/photo-resize-150kb" },
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
];

export default function PhotoResize100KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 100KB – Free Online Tool</title>
        <meta name="description" content="Compress your photo to exactly 100KB online free. Ideal for job portals, exam forms, and online profiles. High quality, fast, and no signup required." />
        <meta name="keywords" content="photo resize 100kb, compress photo 100kb, reduce image to 100kb, 100kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-100kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 100KB Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 100KB for job portals, profiles, and online applications</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 100KB</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(100)} /><LivePreview imageState={imageState} /></div>
                        </div>
                        <div className="block lg:hidden space-y-3">
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                          <LivePreview imageState={imageState} />
                          <DownloadButton onDownload={() => processAndDownload(100)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 100KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 100KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
