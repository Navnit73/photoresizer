import { Helmet } from "react-helmet-async";
import { Maximize, Download, Grid3X3, Zap } from "lucide-react";
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
  { icon: Maximize, title: "Custom Width & Height", description: "Set exact width and height values to resize your photo to any custom dimension." },
  { icon: Grid3X3, title: "Aspect Ratio Control", description: "Lock or unlock aspect ratio to maintain proportions or set independent dimensions." },
  { icon: Zap, title: "Live Preview", description: "See your resized photo in real-time as you adjust width and height values." },
  { icon: Download, title: "Quick Download", description: "Download your custom-sized photo instantly. Free and no registration needed." },
];

const steps = [
  { title: "Upload Your Image", description: "Select any JPG, PNG, or WEBP photo from your device." },
  { title: "Set Width & Height", description: "Enter desired width and height values. Toggle aspect ratio lock as needed for proportional resizing." },
  { title: "Download Custom Size", description: "Download your photo at the exact width and height you specified." },
];

const faqs = [
  { question: "How do I resize a photo to specific width and height?", answer: "Upload your photo, enter the desired width and height in pixels in the editor controls, and download. You can lock aspect ratio to maintain proportions." },
  { question: "What are common width and height values for photos?", answer: "Social media: 1080×1080 (Instagram), 1200×628 (Facebook). Documents: 600×600 (passport), 413×531 (visa). Web: 1920×1080 (banner), 800×600 (standard)." },
  { question: "Can I resize to non-standard dimensions?", answer: "Absolutely! Enter any width and height values you need. Our tool supports custom dimensions of any size, both larger and smaller than the original." },
];

const relatedLinks = [
  { label: "Resize Photo by Pixel", href: "/photo-resize-pixel" },
  { label: "Resize Photo in CM", href: "/photo-resize-cm" },
  { label: "Photo Resize & Crop", href: "/photo-resize-and-crop" },
];

export default function PhotoResizeWidthHeight() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo by Width & Height – Free</title>
        <meta name="description" content="Resize photo to custom width and height online free. Set exact dimensions with aspect ratio control. Fast, easy, supports all image formats." />
        <meta name="keywords" content="photo resize width and height, resize image dimensions, custom photo size, width height photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-width-height" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo by Width and Height</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Set custom width and height to resize your photo to any dimension</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">W×H Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Custom Dimension Photo Resizing</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo by Width & Height" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
