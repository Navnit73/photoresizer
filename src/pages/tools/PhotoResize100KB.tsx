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
  { icon: Target, title: "Precision 100KB Downscaling", description: "Hits the exact 100KB sweet spot required by comprehensive job portals like Naukri, Monster, and international university applications." },
  { icon: Check, title: "Maximum Optical Clarity", description: "At 100KB, our algorithm preserves fine details allowing profile photos and high-resolution document scans to remain easily readable." },
  { icon: TrendingDown, title: "Perfect For Bulk Submissions", description: "Reduces heavy multi-megabyte images quickly, ideal when preparing entire portfolios of certificates for educational admissions." },
  { icon: Download, title: "No Server Uploads", description: "Processes 100% on your local machine. Perfect for handling secure financial documents, transcripts, and personal IDs." },
];

const steps = [
  { title: "Select Source Document", description: "Upload the high-resolution photo, passport scan, or certificate (JPG/PNG). The tool handles massive modern smartphone photos effortlessly." },
  { title: "Adjust the 100KB Target", description: "The core engine will immediately squish the data size to safely sit under the 100KB ceiling. Use the live preview to verify document text readability." },
  { title: "Save and Upload", description: "Export your final, high-quality JPG image. It is perfectly formatted and sized for immediate upload to any modern web portal." },
];

const faqs = [
  { question: "Why is 100KB the standard for most job portals?", answer: "100KB offers the perfect balance. It is small enough to load instantly on corporate servers, saving bandwidth, but large enough to clearly read scanned text on certificates and verify applicant facial features." },
  { question: "Can I compress a 5MB smartphone photo down to 100KB?", answer: "Absolutely. Modern smartphones take massive photos. Our tool will heavily compress the resolution and adjust the quality matrix to achieve a sub-100KB file. For best results on documents, crop out any backgrounds first." },
  { question: "Does this tool work for PDF to 100KB JPG conversion?", answer: "Currently, this specific tool is designed for image inputs (JPG/PNG/WEBP). If you scan a document, make sure to save the scan export as a JPG rather than PDF so our tool can effectively compress it." },
];

const relatedLinks = [
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
];

export default function PhotoResize100KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 100KB – Free Online Tool</title>
        <meta name="description" content="Compress your photo to exactly 100KB online free. Ideal for job portals, exam forms, and online profiles. High quality, fast, and no signup required." />
        <meta name="keywords" content="photo resize 100kb, compress photo 100kb, reduce image to 100kb, 100kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-100kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 100KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 100KB for job portals, profiles, and online applications</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 100KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(100)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(100)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 100KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 100KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
