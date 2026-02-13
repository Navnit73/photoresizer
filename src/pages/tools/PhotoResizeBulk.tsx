import { Helmet } from "react-helmet-async";
import { Layers, Download, Zap, Image } from "lucide-react";
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
  { icon: Layers, title: "Batch Processing", description: "Upload and resize multiple photos at once. Same settings applied to all images." },
  { icon: Zap, title: "Fast Processing", description: "Our engine handles multiple photos quickly. All processed locally in your browser." },
  { icon: Image, title: "Consistent Output", description: "All photos get the same dimensions and quality. Perfect for product listings and catalogs." },
  { icon: Download, title: "Download All", description: "Download all resized photos individually. Free, no registration needed." },
];

const steps = [
  { title: "Upload Multiple Photos", description: "Select multiple images from your device. Upload them one at a time to apply the same settings." },
  { title: "Set Common Size", description: "Configure dimensions, quality, and format. These settings apply to each photo you process." },
  { title: "Download Resized Photos", description: "Process and download each photo at the set size. Repeat for all images in your batch." },
];

const faqs = [
  { question: "Can I resize many photos at once?", answer: "Upload one photo at a time, apply your settings, download, then upload the next. The editor remembers your settings for consistent batch processing." },
  { question: "Will all photos be the same size?", answer: "Yes! Set your desired dimensions and quality once, and each photo you process will have the same output size and settings." },
  { question: "Is there a limit on how many photos I can resize?", answer: "No limits! Process as many photos as you need. Since everything runs in your browser, there are no server-side restrictions." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
  { label: "Photo Resize Free", href: "/photo-resize-free" },
];

export default function PhotoResizeBulk() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Bulk Photo Resize – Multiple Images Free</title>
        <meta name="description" content="Resize multiple photos in bulk online free. Apply same dimensions and quality to all images. Perfect for product photos, catalogs, and batch processing." />
        <meta name="keywords" content="photo resize bulk, bulk image resizer, resize multiple photos, batch photo resize" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-bulk" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Bulk Photo Resize – Process Multiple Images</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Resize multiple photos with consistent settings for product listings and catalogs</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Bulk Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Bulk Photo Resizing Features</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Bulk Resize Photos" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
