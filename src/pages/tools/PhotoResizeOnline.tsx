import { Helmet } from "react-helmet-async";
import { Globe, Download, Zap, Shield } from "lucide-react";
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
import { Undo2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Globe, title: "100% Online", description: "No software to install. Resize photos directly in your browser on any device." },
  { icon: Zap, title: "Lightning Fast", description: "Photos processed instantly in your browser. No waiting for server uploads." },
  { icon: Shield, title: "Private & Secure", description: "Your photos never leave your device. All processing happens locally in your browser." },
  { icon: Download, title: "Free Forever", description: "Unlimited photo resizing. No signup, no watermarks, no hidden charges." },
];

const steps = [
  { title: "Upload Your Photo", description: "Click or drag-and-drop any image. Supports JPG, PNG, WEBP, and more." },
  { title: "Customize Settings", description: "Adjust dimensions, quality, crop, rotate — everything you need in one editor." },
  { title: "Download Resized Photo", description: "Download your optimized photo instantly. Ready for any purpose." },
];

const faqs = [
  { question: "Is this online photo resizer really free?", answer: "Yes! Our photo resizer is 100% free with no hidden charges. There's no signup required and no watermarks added to your photos." },
  { question: "Are my photos safe when resizing online?", answer: "Absolutely. All processing happens in your browser — your photos are never uploaded to any server. Your images remain completely private." },
  { question: "What image formats are supported?", answer: "Our online photo resizer supports JPG, JPEG, PNG, and WEBP formats. You can also convert between formats while resizing." },
];

const relatedLinks = [
  { label: "Resize Photo Free", href: "/photo-resize-free" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
  { label: "Compress Image", href: "/compress-image" },
];

export default function PhotoResizeOnline() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize Online Free – Fast & Easy</title>
        <meta name="description" content="Resize photos online for free. Change dimensions, compress file size, crop and rotate — all in your browser. No signup, no watermarks. Fast and private." />
        <meta name="keywords" content="photo resize online, resize image online, online photo resizer, resize photo free online" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-online" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photos Online – Free & Instant</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">The fastest way to resize, compress, and optimize your photos online</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Online Resizer</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
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
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Why Resize Photos Online?</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photos Online" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
