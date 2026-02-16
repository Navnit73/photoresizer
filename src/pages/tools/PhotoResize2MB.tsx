import { Helmet } from "react-helmet-async";
import { Target, Download, Check, TrendingDown } from "lucide-react";
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
  { icon: Target, title: "Exact 2MB Output", description: "Compress your photo to exactly 2MB (2048KB) — maximum quality for platforms with 2MB limits." },
  { icon: Check, title: "Premium Quality", description: "2MB preserves virtually all detail, perfect for high-res uploads and document attachments." },
  { icon: TrendingDown, title: "Massive Reduction", description: "Reduce 10MB-50MB camera photos to 2MB while keeping stunning quality." },
  { icon: Download, title: "Free & Instant", description: "Download your 2MB photo immediately. No registration, no limits, no watermarks." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any JPG, PNG, or WEBP image. Handles large DSLR and smartphone photos." },
  { title: "Auto-Compress to 2MB", description: "Our algorithm intelligently compresses your photo to exactly 2MB with best possible quality." },
  { title: "Download & Use", description: "Download your 2MB photo for documents, uploads, presentations, or social sharing." },
];

const faqs = [
  { question: "Which platforms have a 2MB upload limit?", answer: "Many email services, WhatsApp (for documents), online application forms, and content management systems have 2MB or similar limits. Our tool ensures your photo fits perfectly." },
  { question: "Can I compress RAW photos to 2MB?", answer: "Our tool works with JPG, PNG, and WEBP formats. Convert your RAW file to JPG first, then use our compressor to reduce it to exactly 2MB." },
  { question: "Is 2MB good for printing?", answer: "2MB photos have good print quality for standard sizes (4x6, 5x7). For large prints or professional use, consider keeping a higher resolution version." },
];

const relatedLinks = [
  { label: "Resize Photo to 1MB", href: "/photo-resize-1mb" },
  { label: "Resize Photo MB to KB", href: "/photo-resize-mb-to-kb" },
  { label: "Resize Photo to 500KB", href: "/photo-resize-500kb" },
];

export default function PhotoResize2MB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 2MB – Free Online</title>
        <meta name="description" content="Compress your photo to exactly 2MB online for free. Premium quality for uploads, emails, and documents. Fast, easy, no signup required." />
        <meta name="keywords" content="photo resize 2mb, compress photo 2mb, reduce image to 2mb, 2mb photo compressor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-2mb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 2MB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 2MB with premium quality preservation</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 2MB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(2048)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(2048)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 2MB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 2MB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
