import { Helmet } from "react-helmet-async";
import { Sparkles, Download, Shield, Zap } from "lucide-react";
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
  { icon: Sparkles, title: "Lossless Resize", description: "Change dimensions without compression artifacts. Maintain original pixel clarity and detail." },
  { icon: Shield, title: "Quality Preserved", description: "Use PNG format and high quality settings to minimize any visual degradation during resize." },
  { icon: Zap, title: "Smart Downscaling", description: "Our algorithm uses bicubic interpolation for the smoothest possible downscaling results." },
  { icon: Download, title: "Original Clarity", description: "Download your resized photo with maximum quality preservation. Free and instant." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select a high-quality photo. The better the input, the better the resize quality." },
  { title: "Resize with High Quality", description: "Set quality to maximum and choose PNG format for lossless output. Adjust dimensions as needed." },
  { title: "Download Quality Photo", description: "Download your resized photo with quality preserved. Compare with original to verify." },
];

const faqs = [
  { question: "Can I resize without any quality loss?", answer: "Making an image smaller while using PNG format preserves maximum quality. For JPG, set quality to 95-100%. Enlarging images always introduces some interpolation." },
  { question: "Which format preserves the most quality?", answer: "PNG is lossless and preserves all quality. WEBP offers excellent quality at smaller sizes. JPG at 95%+ quality is nearly indistinguishable from the original." },
  { question: "Why does my resized photo look blurry?", answer: "This usually happens with excessive compression or too much upscaling. To avoid this, use high quality settings, prefer PNG format, and avoid enlarging images beyond 150% of original size." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Compress Image", href: "/compress-image" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
];

export default function PhotoResizeWithoutLosingQuality() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo Without Losing Quality Free</title>
        <meta name="description" content="Resize photos without losing quality online free. Smart resizing preserves clarity and detail. Use PNG for lossless output. No signup needed." />
        <meta name="keywords" content="photo resize without losing quality, resize image without quality loss, lossless photo resize, quality photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-without-losing-quality" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <AnimatePresence mode="wait">
                {!imageState.originalUrl ? (
                  <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo Without Losing Quality</h1>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Smart resizing that preserves your photo's clarity, detail, and color accuracy</p>
                    <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                  </motion.div>
                ) : (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                        <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Quality Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Quality-Preserving Photo Resize</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Without Quality Loss" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
