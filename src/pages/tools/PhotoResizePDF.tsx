import { Helmet } from "react-helmet-async";
import { FileText, Download, Shield, Zap } from "lucide-react";
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
  { icon: FileText, title: "PDF-Optimized Size", description: "Resize photos to optimal dimensions and file size for embedding in PDF documents." },
  { icon: Shield, title: "Document Ready", description: "Perfect for resumes, reports, applications, and any PDF document that needs embedded photos." },
  { icon: Zap, title: "Fast Processing", description: "Resize and compress your photo instantly for PDF use. No software installation needed." },
  { icon: Download, title: "JPG Output", description: "Download in JPG format — the most compatible format for PDF document embedding." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select the photo you want to use in a PDF document. Any format accepted." },
  { title: "Resize for PDF", description: "Adjust dimensions and quality for optimal PDF embedding. Smaller files mean smaller PDFs." },
  { title: "Download & Embed", description: "Download your optimized photo and insert it into your PDF document." },
];

const faqs = [
  { question: "What photo size is best for PDFs?", answer: "For standard documents, 800×600 pixels at 150 DPI works well. For print-quality PDFs, use 300 DPI. Keep file size under 200KB for each photo to maintain a reasonable PDF size." },
  { question: "How do I reduce PDF file size by resizing photos?", answer: "Large photos are the main reason PDFs are too big. Resize each photo to the actual display size needed and compress to under 200KB. This can reduce your PDF size by 80% or more." },
  { question: "What format should I use for photos in PDFs?", answer: "JPG is the best format for photos in PDFs — it provides good quality at small file sizes and is universally compatible with all PDF readers." },
];

const relatedLinks = [
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
  { label: "Compress Image", href: "/compress-image" },
  { label: "Resize Photo Without Quality Loss", href: "/photo-resize-without-losing-quality" },
];

export default function PhotoResizePDF() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo for PDF – Free Online Tool</title>
        <meta name="description" content="Resize photos for PDF documents online free. Optimize photo dimensions and file size for embedding in resumes, reports, and applications. Fast and easy." />
        <meta name="keywords" content="photo resize pdf, resize image for pdf, photo for pdf document, pdf photo optimizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo for PDF Documents</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Optimize your photo's size and dimensions for PDF embedding</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">PDF Ready</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">PDF Photo Optimization</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo for PDF" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
