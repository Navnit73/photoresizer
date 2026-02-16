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
  { icon: Target, title: "Precise 40KB Output", description: "Our algorithm compresses your photo to exactly 40KB, meeting strict form upload requirements." },
  { icon: Check, title: "Form Compatible", description: "Optimized for government jobs, banking exams, and online applications that need 40KB photos." },
  { icon: TrendingDown, title: "Quality Optimized", description: "Best possible image quality is maintained while hitting the exact 40KB target size." },
  { icon: Download, title: "Quick & Free", description: "Get your 40KB photo instantly. No signup, no watermarks, 100% free online tool." },
];

const steps = [
  { title: "Upload Your Image", description: "Select any JPG, PNG, or WEBP photo from your device. Supports all image sizes." },
  { title: "Auto-Compress to 40KB", description: "Our engine automatically compresses your photo to exactly 40KB with optimal quality settings." },
  { title: "Download & Submit", description: "Download your 40KB photo and submit it directly to any application form or portal." },
];

const faqs = [
  { question: "What forms require a 40KB photo?", answer: "Many banking recruitment portals (IBPS, SBI), state public service commission forms, and various competitive exam applications require photos around 40KB." },
  { question: "Can I adjust quality before downloading?", answer: "Yes! Our editor provides quality controls, dimension adjustments, and crop tools. The final download will target exactly 40KB regardless of your edits." },
  { question: "Does compressing to 40KB pixelate my photo?", answer: "Our smart compression minimizes quality loss. For best results, upload a clear, well-lit photo. The algorithm prioritizes facial clarity for form submissions." },
];

const relatedLinks = [
  { label: "Resize Photo to 30KB", href: "/photo-resize-30kb" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Resize Photo by KB", href: "/photo-resize-by-kb" },
];

export default function PhotoResize40KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 40KB – Free Online Tool</title>
        <meta name="description" content="Compress your photo to exactly 40KB online free. Ideal for IBPS, SBI, government job forms and exam applications. Fast, easy, no registration needed." />
        <meta name="keywords" content="photo resize 40kb, compress photo 40kb, reduce image to 40kb, 40kb photo compressor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-40kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 40KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 40KB for banking and government exam applications</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 40KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(40)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(40)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 40KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 40KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
