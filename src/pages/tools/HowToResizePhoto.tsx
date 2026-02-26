import { Helmet } from "react-helmet-async";
import { BookOpen, Download, Monitor, Zap } from "lucide-react";
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
import { AmazonAd } from "@/components/shared/AmazonAd";

const features = [
  { icon: BookOpen, title: "Step-by-Step Guide", description: "Learn exactly how to resize photos with our intuitive editor and easy-to-follow instructions." },
  { icon: Monitor, title: "Works Everywhere", description: "Resize photos from any device — computer, phone, or tablet. No app install needed." },
  { icon: Zap, title: "Instant Results", description: "See size changes in real-time as you adjust. Download immediately when satisfied." },
  { icon: Download, title: "Multiple Options", description: "Resize by KB, pixel, CM, or percentage. Change format and quality. All in one tool." },
];

const steps = [
  { title: "Step 1: Upload Photo", description: "Click the upload area or drag your photo into it. We support JPG, PNG, and WEBP formats up to 50MB." },
  { title: "Step 2: Adjust Size", description: "Use dimension controls for width/height, the quality slider for file size, or enter a specific KB target." },
  { title: "Step 3: Download", description: "Click the download button to save your resized photo. The live preview shows the estimated output file size." },
];

const faqs = [
  { question: "What's the easiest way to resize a photo?", answer: "Upload your photo to our tool, adjust the quality slider or enter new dimensions, and download. It takes less than 30 seconds for most photos." },
  { question: "Can I resize photos on my phone?", answer: "Yes! Our tool works in any mobile browser. No app installation needed. Just visit the site, upload, resize, and download." },
  { question: "How do I resize a photo for email?", answer: "For email, reduce dimensions to around 800×600 pixels and use JPG format at 80% quality. This typically produces a file under 200KB — perfect for email attachments." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Photo Resize Free", href: "/photo-resize-free" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
];

export default function HowToResizePhoto() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>How to Resize Photo – Step by Step Guide</title>
        <meta name="description" content="Learn how to resize photos online in 3 easy steps. Change dimensions, compress file size, or target specific KB. Complete guide with free tool." />
        <meta name="keywords" content="how to resize photo, resize photo tutorial, how to reduce photo size, photo resize guide" />
        <link rel="canonical" href="https://www.photoresizer.co.in/how-to-resize-photo" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">How to Resize a Photo – Easy Guide</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Follow these simple steps to resize any photo. Try it now — upload your image below</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Photo Resizer</div>
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
                </div>
              )}
            </div>
          </section>

          <div className="py-2">
            <AmazonAd />
          </div>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Everything You Need to Know</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize a Photo in 3 Steps" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
