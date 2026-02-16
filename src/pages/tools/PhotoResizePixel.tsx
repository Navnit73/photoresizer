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
import { Undo2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Grid3X3, title: "Pixel-Perfect Resize", description: "Set exact width and height in pixels for precise control over your photo dimensions." },
  { icon: Maximize, title: "Custom Dimensions", description: "Enter any pixel values. Common sizes like 600x600, 1200x800, or passport-size pixels." },
  { icon: Zap, title: "Aspect Ratio Lock", description: "Maintain original proportions automatically or set custom aspect ratios." },
  { icon: Download, title: "Free & Instant", description: "Resize to any pixel dimension instantly. No registration or watermarks." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image from your device. Any size accepted." },
  { title: "Set Pixel Dimensions", description: "Enter your desired width and height in pixels. Toggle aspect ratio lock as needed." },
  { title: "Download Resized Photo", description: "Download your photo at the exact pixel dimensions you specified." },
];

const faqs = [
  { question: "What pixel size should I use for passport photos?", answer: "Standard passport photo sizes vary by country. India uses 600x600 pixels, US uses 600x600 pixels (2x2 inches at 300 DPI). Use our preset options for quick setup." },
  { question: "How do pixels relate to print size?", answer: "The relationship depends on DPI (dots per inch). At 300 DPI, 600 pixels equals 2 inches. At 72 DPI (screen), 600 pixels equals about 8.3 inches." },
  { question: "Can I resize both width and height independently?", answer: "Yes! You can unlock the aspect ratio to set width and height independently. Keep it locked to maintain original proportions while changing one dimension." },
];

const relatedLinks = [
  { label: "Resize Photo in PX", href: "/photo-resize-in-px" },
  { label: "Resize Photo Width & Height", href: "/photo-resize-width-height" },
  { label: "Resize Photo in CM", href: "/photo-resize-cm" },
];

export default function PhotoResizePixel() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo by Pixel – Free Online</title>
        <meta name="description" content="Resize your photo to exact pixel dimensions online free. Set custom width and height in pixels with aspect ratio control. Fast, free, no signup needed." />
        <meta name="keywords" content="photo resize pixel, resize image pixels, change photo dimensions pixels, pixel photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-pixel" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo by Pixel Dimensions</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Set exact width and height in pixels for precise photo resizing</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Pixel Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Pixel-Perfect Photo Resizing</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo by Pixel" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
