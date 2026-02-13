import { Helmet } from "react-helmet-async";
import { FileCheck, Download, Target, Shield } from "lucide-react";
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
  { icon: FileCheck, title: "SSC Exam Ready", description: "Photo resized to exact SSC requirements: 3.5×4.5 cm, under 100KB, JPG format." },
  { icon: Target, title: "Exact Specifications", description: "Meet SSC CGL, CHSL, MTS, and other SSC exam photo requirements precisely." },
  { icon: Shield, title: "Signature Too", description: "Also resize signatures for SSC forms — typically 3.5×1.5 cm, under 30KB." },
  { icon: Download, title: "Instant Download", description: "Get SSC-ready photos instantly. Free, no registration, matches official specs." },
];

const steps = [
  { title: "Upload Your Photo", description: "Upload a recent passport-style photo with white background and clear face." },
  { title: "Resize for SSC", description: "Our editor helps you crop and resize to exact SSC photo specifications." },
  { title: "Download & Apply", description: "Download your SSC-ready photo and upload it directly to the SSC application form." },
];

const faqs = [
  { question: "What are SSC exam photo specifications?", answer: "SSC requires photos of 3.5×4.5 cm (approximately 100×140 pixels at 72 DPI). File size should be between 20KB and 50KB in JPG format. Signature size is 3.5×1.5 cm, between 10KB and 20KB." },
  { question: "Can I use same photo for SSC CGL and CHSL?", answer: "Yes, SSC CGL, CHSL, MTS, GD, and other SSC exams generally have the same photo specifications. The same resized photo will work for all SSC exam applications." },
  { question: "What if my SSC photo gets rejected?", answer: "Common rejection reasons: wrong dimensions, blurry face, colored background, or wrong file size. Use our tool to ensure exact specifications and upload a clear, white-background photo." },
];

const relatedLinks = [
  { label: "SSC Photo Resizer", href: "/ssc-photo-resizer" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Photo Resize for PAN Card", href: "/photo-resize-for-pan-card" },
];

export default function PhotoResizeForSSC() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize for SSC Exam – Exact Specs</title>
        <meta name="description" content="Resize photo for SSC exams (CGL, CHSL, MTS) online free. Exact specifications: 3.5×4.5 cm, JPG, under 100KB. Instant and easy to use." />
        <meta name="keywords" content="photo resize for ssc, ssc photo size, ssc exam photo resize, ssc cgl photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-for-ssc" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo for SSC Exam Applications</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Get your photo to exact SSC specifications for CGL, CHSL, MTS, and more</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">SSC Specs</div>
                    </div>
                    <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                        <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                          <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                          <div><DownloadButton onDownload={() => processAndDownload(50)} /><LivePreview imageState={imageState} /></div>
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

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">SSC Exam Photo Requirements</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo for SSC" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
