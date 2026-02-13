import { Helmet } from "react-helmet-async";
import { Instagram, Download, Image, Zap } from "lucide-react";
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
  { icon: Instagram, title: "Instagram Ready", description: "Resize to perfect Instagram dimensions: 1080×1080 (post), 1080×1350 (portrait), 1080×566 (landscape)." },
  { icon: Image, title: "Story & Reels Size", description: "Get perfect 1080×1920 dimensions for Instagram Stories and Reels." },
  { icon: Zap, title: "Profile Picture", description: "Create the perfect 320×320 Instagram profile picture with our crop tool." },
  { icon: Download, title: "High Quality", description: "Download at optimal quality for Instagram's compression algorithm." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any photo from your device. Camera photos, screenshots, or designs — all work." },
  { title: "Choose Instagram Size", description: "Use presets for post (1:1), portrait (4:5), landscape (1.91:1), or story (9:16) dimensions." },
  { title: "Download for Instagram", description: "Download your perfectly sized photo ready to upload directly to Instagram." },
];

const faqs = [
  { question: "What is the best photo size for Instagram posts?", answer: "For Instagram posts, 1080×1080 pixels (square) is the standard. Portrait (1080×1350) gets more screen space. Landscape (1080×566) works for panoramic shots." },
  { question: "What size is an Instagram Story?", answer: "Instagram Stories and Reels use 1080×1920 pixels (9:16 aspect ratio). This fills the entire phone screen for maximum impact." },
  { question: "Does resizing affect Instagram photo quality?", answer: "If you resize to Instagram's recommended dimensions, quality will be optimal. Instagram further compresses uploads, so starting with the right size minimizes quality loss." },
];

const relatedLinks = [
  { label: "Photo Resize & Crop", href: "/photo-resize-and-crop" },
  { label: "Resize Photo by Pixel", href: "/photo-resize-pixel" },
  { label: "Photo Resize Online", href: "/photo-resize-online" },
];

export default function PhotoResizeForInstagram() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize for Instagram – Perfect Fit</title>
        <meta name="description" content="Resize photos for Instagram posts, stories, and reels. Perfect 1080×1080, 1080×1350, 1080×1920 dimensions. Free online tool, no signup needed." />
        <meta name="keywords" content="photo resize for instagram, instagram photo size, resize image for instagram, instagram photo dimensions" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-for-instagram" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photos for Instagram – Perfect Dimensions</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Get the perfect size for Instagram posts, stories, reels, and profile pictures</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Instagram Size</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Instagram Photo Size Guide</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photos for Instagram" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
