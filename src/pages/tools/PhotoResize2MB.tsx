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
  { icon: Target, title: "Precision 2MB Threshold", description: "Seamlessly hits the exact 2MB (2048KB) maximum file size limit imposed by corporate applicant tracking systems and modern university portals." },
  { icon: Check, title: "Lossless-Quality Retention", description: "Because 2MB provides massive data overhead, our tool prioritizes keeping 100% of your document's original resolution and color depth." },
  { icon: TrendingDown, title: "Crushes RAW Camera Files", description: "Instantly convert and compress massive 40MB+ RAW or ProRAW photography into lightweight, universally accepted 2MB JPEG files." },
  { icon: Download, title: "No Registration Required", description: "No email signups, no watermarks, and no servers. Your heavy files are processed instantly inside your own web browser." },
];

const steps = [
  { title: "Select Massive File", description: "Upload a gigapixel panorama, a raw DSLR photo, or a high-dpi scanned poster. The tool supports standard web image formats natively." },
  { title: "Lock the 2MB Target", description: "Our browser engine parses the extreme file size and gracefully reduces pixel density and metadata to comfortably sit under the 2MB cap." },
  { title: "Save and Upload", description: "Download your optimization. You can now reliably attach this high-quality 2MB image to emails and strict web platforms without timeout errors." },
];

const faqs = [
  { question: "Why do so many sites limit uploads to 2MB?", answer: "2MB is the historic 'safe limit' for web servers. It ensures that databases don't get bloated and that files can be reliably uploaded even on slower 3G/4G mobile networks." },
  { question: "Will compressing a 20MB photo to 2MB ruin the quality?", answer: "No. 2MB is still a tremendous amount of data for a JPEG. Unless you are printing the image on a highway billboard, you will not notice any difference on a digital screen." },
  { question: "Can I use this for converting iPhone HEIC photos?", answer: "To compress an iPhone photo to 2MB, you first need to export or save it as a JPG or PNG. Our tool will then easily compress it to meet the 2MB data limit." },
];

const relatedLinks = [
  { label: "Resize Photo to 1MB", href: "/photo-resize-1mb" },
  { label: "Resize Photo MB to KB", href: "/photo-resize-mb-to-kb" },
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
