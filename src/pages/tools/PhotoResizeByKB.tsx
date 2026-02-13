import { Helmet } from "react-helmet-async";
import { Settings, Download, Sliders, Zap } from "lucide-react";
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
  { icon: Sliders, title: "Custom KB Target", description: "Enter any KB value and compress your photo to that exact file size. Full control over output." },
  { icon: Settings, title: "Flexible Controls", description: "Adjust quality, dimensions, crop, and format while targeting your desired KB size." },
  { icon: Zap, title: "Smart Algorithm", description: "Our intelligent engine finds the perfect quality setting to hit your target KB precisely." },
  { icon: Download, title: "Instant Results", description: "Get your photo at the exact KB size you need. Free, fast, no registration." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image from your device. Any resolution or size accepted." },
  { title: "Set Target KB Size", description: "Use the editor controls to adjust quality and dimensions. Preview the file size in real-time." },
  { title: "Download at Target Size", description: "Download your photo compressed to your target KB size. Ready for any form or upload." },
];

const faqs = [
  { question: "How do I resize a photo to a specific KB size?", answer: "Upload your photo, then use the quality slider and dimension controls to adjust the output size. The live preview shows the estimated file size so you can hit your target KB exactly." },
  { question: "What KB sizes can I target?", answer: "You can target any KB size from as low as 10KB up to several MB. Common targets include 15KB, 20KB, 30KB, 40KB, 50KB, 80KB, 100KB, 150KB, 200KB, and 500KB." },
  { question: "Why does my form require a specific KB size?", answer: "Government exams, job portals, and educational institutions set KB limits to standardize uploads and reduce server load. Our tool helps you meet these exact requirements." },
];

const relatedLinks = [
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
  { label: "Photo Resize MB to KB", href: "/photo-resize-mb-to-kb" },
];

export default function PhotoResizeByKB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize by KB – Exact Size Online</title>
        <meta name="description" content="Resize your photo to any specific KB size online free. Target exact file size for forms, applications, and uploads. Smart compression with quality control." />
        <meta name="keywords" content="photo resize by kb, resize image by kb, compress photo to kb, photo size reducer kb" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-by-kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo by KB – Target Any File Size</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to any specific KB size for forms, applications, and uploads</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Custom KB Target</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Resize Photo to Any KB Size</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo by KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
