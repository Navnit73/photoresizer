import { Helmet } from "react-helmet-async";
import { Grid3X3, Download, Maximize, Zap } from "lucide-react";
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
  { icon: Grid3X3, title: "PX Precision", description: "Set exact width and height in pixels (PX) for pixel-perfect photo sizing." },
  { icon: Maximize, title: "Common PX Sizes", description: "Quick access to 300×300, 600×600, 1080×1080, and other common pixel dimensions." },
  { icon: Zap, title: "Aspect Ratio Lock", description: "Lock or unlock aspect ratio for proportional or independent PX resizing." },
  { icon: Download, title: "Free & Instant", description: "Resize to any PX dimension instantly. No registration, no watermarks." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image from your device." },
  { title: "Set PX Dimensions", description: "Enter your desired width and height in PX. Use the aspect ratio lock as needed." },
  { title: "Download in PX", description: "Download your photo at the exact PX dimensions you specified." },
];

const faqs = [
  { question: "What does PX mean in photo resizing?", answer: "PX stands for pixel — the smallest unit of a digital image. When you resize a photo to 600×400 PX, you're setting it to 600 pixels wide and 400 pixels tall." },
  { question: "How many PX do I need for a clear photo?", answer: "For web use, 800-1200 PX width is typically sufficient. For printing at 300 DPI, you need more — e.g., a 4×6 inch print needs 1200×1800 PX." },
  { question: "Can I increase PX to make a photo larger?", answer: "You can increase pixel dimensions, but this enlarges the image by interpolation, which may reduce clarity. For best results, avoid upscaling beyond 150% of the original size." },
];

const relatedLinks = [
  { label: "Resize Photo by Pixel", href: "/photo-resize-pixel" },
  { label: "Resize Photo Width & Height", href: "/photo-resize-width-height" },
  { label: "Resize Photo in CM", href: "/photo-resize-cm" },
];

export default function PhotoResizeInPX() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo in PX – Pixel Perfect Tool</title>
        <meta name="description" content="Resize photo in PX (pixels) online free. Set exact width and height in pixels for precise sizing. Free, fast, supports all image formats." />
        <meta name="keywords" content="photo resize in px, resize image px, photo pixel resizer, change image size px" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-in-px" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo in PX – Pixel Perfect Sizing</h1>
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
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">PX Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">PX-Based Photo Resizing</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo in PX" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
