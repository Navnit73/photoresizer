import { Helmet } from "react-helmet-async";
import { Crop, Download, Move, Zap } from "lucide-react";
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
  { icon: Crop, title: "Interactive Crop", description: "Drag to select the perfect crop area. Visual crop tool makes it easy to frame your photo." },
  { icon: Move, title: "Resize + Crop", description: "Combine resizing with cropping for the perfect photo dimensions and composition." },
  { icon: Zap, title: "Preset Ratios", description: "Quick presets for 1:1, 4:3, 16:9, 3:2, and custom aspect ratios." },
  { icon: Download, title: "One-Click Download", description: "Crop, resize, and download in one smooth workflow. Free and instant." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any image from your device. All common image formats supported." },
  { title: "Crop & Resize", description: "Use the interactive crop tool to select your area, then resize to desired dimensions." },
  { title: "Download Final Photo", description: "Download your cropped and resized photo. Perfect for profiles, forms, and social media." },
];

const faqs = [
  { question: "What's the difference between resize and crop?", answer: "Resizing changes the overall dimensions of your photo. Cropping cuts away parts of the image to focus on a specific area. Our tool lets you do both together." },
  { question: "Can I crop to a specific aspect ratio?", answer: "Yes! Use preset aspect ratios like 1:1 (square), 4:3, 16:9, or set custom ratios. The crop tool maintains your chosen ratio automatically." },
  { question: "Will cropping reduce my photo quality?", answer: "Cropping itself doesn't reduce quality — it simply removes parts of the image. The visible area maintains its original resolution and quality." },
];

const relatedLinks = [
  { label: "Resize Photo Width & Height", href: "/photo-resize-width-height" },
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Resize Photo for Instagram", href: "/photo-resize-for-instagram" },
];

export default function PhotoResizeAndCrop() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize & Crop Photo Online Free</title>
        <meta name="description" content="Resize and crop photos online for free. Interactive crop tool with preset ratios. Combine cropping with resizing in one easy workflow. No signup needed." />
        <meta name="keywords" content="photo resize and crop, crop and resize image, photo cropper resizer, resize crop photo online" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-and-crop" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize and Crop Photos Online Free</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Crop and resize your photos in one easy step with interactive tools</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Crop & Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Crop & Resize in One Step</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize & Crop Photos" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
