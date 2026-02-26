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
import { AmazonAd } from "@/components/shared/AmazonAd";

const features = [
  { icon: Target, title: "High-Fidelity 500KB Compression", description: "The safe upper limit for most digital forms. 500KB allows us to preserve incredible detail, making it perfect for complex architectural plans, medical records, and detailed maps." },
  { icon: Check, title: "Avoids Email Blocking", description: "Many corporate email servers block attachments over 25MB. By compressing your images to 500KB, you can comfortably attach up to 40 high-quality photos in a single email." },
  { icon: TrendingDown, title: "Tames Modern Camera Files", description: "A single raw photo from a modern DSLR or flagship smartphone can exceed 20MB. Our tool elegantly downscales these massive files to a web-friendly 500KB without looking heavily compressed." },
  { icon: Download, title: "Fast Web Loading", description: "If you run a blog or e-commerce store, raw images will kill your SEO. 500KB is an excellent target for large hero-banners that need to load quickly on mobile networks." },
];

const steps = [
  { title: "Select Heavy Image", description: "Upload your massive raw photo, detailed document scan, or high-res graphics folder. We accept PNG, JPG, and WEBP inputs natively." },
  { title: "Engage 500KB Target", description: "Our browser-engine calculates the optimal compression ratio to squeeze the file under 500KB while rigorously defending visual quality." },
  { title: "Download and Share", description: "Click download to save your new JPG. It's now perfectly optimized for fast email delivery, web-hosting, or portal uploads." },
];

const faqs = [
  { question: "Is 500KB too big for a passport photo upload?", answer: "Usually, yes. Most government portals cap passport photos between 20KB and 50KB. A 500KB limit is typically reserved for full-page PDF scans, portfolios, or multi-page documents. If you need a passport photo, use our 50KB tool instead." },
  { question: "Will my 20MB wedding photo look bad if reduced to 500KB?", answer: "Not at all. 500KB is actually a massive amount of data for a standard JPEG. While you might lose some extreme zooming capabilities, the photo will look perfectly crisp and clear on any phone, tablet, or standard laptop screen." },
  { question: "Why doesn't the tool increase my 50KB file UP to 500KB?", answer: "Our tool's primary function is compression (making files smaller). You cannot 'add' quality to an already small file. If your upload is already under 500KB, the tool will simply export it at its current optimal size without digitally inflating the data." },
];

const relatedLinks = [
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
  { label: "Compress Image (Variable Size)", href: "/compress-image" },
];

export default function PhotoResize500KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 500KB – Free Online</title>
        <meta name="description" content="Compress your photo to exactly 500KB online for free. Preserve high quality for portfolios, presentations, and websites. Fast and easy, no signup." />
        <meta name="keywords" content="photo resize 500kb, compress photo 500kb, reduce image to 500kb, 500kb photo compressor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-500kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 500KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 500KB while preserving excellent quality</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 500KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(500)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(500)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 500KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 500KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
