import { Helmet } from "react-helmet-async";
import { Gift, Download, Shield, Zap } from "lucide-react";
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
  { icon: Gift, title: "100% Free", description: "No premium plans, no hidden costs. Every feature is free to use without limits." },
  { icon: Shield, title: "No Signup Required", description: "Start resizing immediately. No account creation, no email verification needed." },
  { icon: Zap, title: "No Watermarks", description: "Download clean photos without any watermarks or branding. Your photo, your way." },
  { icon: Download, title: "Unlimited Use", description: "Resize as many photos as you want. No daily limits, no restrictions." },
];

const steps = [
  { title: "Upload for Free", description: "Click or drag any image. No signup needed — start resizing immediately." },
  { title: "Customize Everything", description: "Resize dimensions, compress file size, crop, rotate — all features are free." },
  { title: "Download Without Limits", description: "Download your resized photo instantly. No watermarks, no restrictions." },
];

const faqs = [
  { question: "Is this photo resizer completely free?", answer: "Yes! 100% free with all features included. No premium tiers, no hidden charges, no signup. You can resize unlimited photos without any restrictions." },
  { question: "Why don't you charge for this tool?", answer: "We believe photo resizing should be accessible to everyone. Our tool runs in your browser, keeping our costs low, so we can offer it completely free." },
  { question: "Are there any limits on free usage?", answer: "No limits! Resize as many photos as you want, at any size, in any format. All features are available for free without creating an account." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function PhotoResizeFree() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo Free Online – No Signup</title>
        <meta name="description" content="Resize photos for free online. No signup, no watermarks, no limits. Change dimensions, compress size, crop and rotate. 100% free photo resizer." />
        <meta name="keywords" content="photo resize free, free photo resizer, resize image free, free online photo resize" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-free" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photos Free – No Signup Needed</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Free photo resizer with all features. No watermarks, no limits, no registration</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Free Resizer</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Why Choose Our Free Photo Resizer?</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photos for Free" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
