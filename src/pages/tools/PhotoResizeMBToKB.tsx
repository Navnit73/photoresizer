import { Helmet } from "react-helmet-async";
import { ArrowDownToLine, Download, TrendingDown, Zap } from "lucide-react";
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
  { icon: ArrowDownToLine, title: "Universal Portal Fix", description: "Instantly solve the dreaded 'File too large' error. Convert multi-megabyte DSLR and iPhone camera photos into lightweight kilobytes." },
  { icon: TrendingDown, title: "Lossless Down-Sampling", description: "Our browser-based engine radically reduces pixel density and strips heavy EXIF metadata without introducing ugly color banding." },
  { icon: Zap, title: "Real-Time Size Preview", description: "Don't guess the final size. Our live compression engine shows you the exact KB output before you even click download." },
  { icon: Download, title: "Zero Data Logging", description: "Your massive, private photos are never uploaded to a cloud server. All MB to KB conversion happens instantly in your own browser cache." },
];

const steps = [
  { title: "Drop Massive File", description: "Upload your 5MB, 10MB, or even 20MB raw photo. The tool natively supports high-density JPG, PNG, and HEIC-converted WEBP." },
  { title: "Dial in the KB", description: "Use the quality slider to watch the file size drop in real-time. Stop when you hit the exact kilobyte requirement for your specific portal." },
  { title: "Export Web-Ready Format", description: "Click download. Your photo is now a highly-optimized, web-compliant file ready for immediate upload to any application." },
];

const faqs = [
  { question: "Why is a single smartphone photo 5MB+?", answer: "Modern smartphones shoot in extremely high definition (12MP to 48MP) to capture detail. While great for printing, a 5MB data payload is far too large for standard web database storage, which is why forms force you to convert them to KB." },
  { question: "How much quality will I lose going from MB to KB?", answer: "It depends on the target. Compressing a 10MB photo to 1MB (1000KB) will look nearly identical. Compressing that same 10MB photo down to 20KB for a passport signature will visibly reduce the sharpness, though it remains perfectly legible." },
  { question: "Does converting MB to KB change the photo's dimensions?", answer: "If you only adjust the quality slider, the 'dimensions' (width and height in inches/cm) remain identical. However, to achieve ultra-low KB sizes, it is highly recommended to also use our crop tool to trim away unnecessary background space." },
];

const relatedLinks = [
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
];

export default function PhotoResizeMBToKB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo MB to KB – Reduce Size Free</title>
        <meta name="description" content="Convert and reduce photo size from MB to KB online free. Compress large photos from megabytes to kilobytes. Smart compression with quality control." />
        <meta name="keywords" content="photo resize mb to kb, reduce photo mb to kb, compress image mb to kb, convert mb to kb photo" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-mb-to-kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Reduce Photo Size from MB to KB</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress large photos from megabytes to kilobytes with smart compression</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">MB → KB</div>
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

          <div className="py-2">
            <AmazonAd />
          </div>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">MB to KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Reduce Photo from MB to KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
