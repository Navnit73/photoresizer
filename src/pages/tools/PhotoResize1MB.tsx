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
  { icon: Target, title: "1MB Document & Scan Optimizer", description: "The industry standard file size for multi-page PDFs exported as JPGs, medical records, and detailed technical drawings submitted to government web portals." },
  { icon: Check, title: "Retains Maximum Detail", description: "Unlike harsh 50KB compression, allowing a 1MB file size means our algorithm preserves virtually 100% of the original optical clarity and text sharpness." },
  { icon: TrendingDown, title: "Squeezes 30MB+ Camera Files", description: "Modern smartphones take massive 30MB photos. We instantly crush these down to exactly 1MB without introducing ugly pixelation or color banding." },
  { icon: Download, title: "Instant Browser Processing", description: "Your private documents never leave your laptop. The entire 1MB compression process happens securely inside your web browser." },
];

const steps = [
  { title: "Select Large Media", description: "Upload a heavy camera roll photo, a detailed diagram, or a high-res certificate scan. Supported formats include JPG, PNG, and modern WEBP." },
  { title: "Hit the 1MB Target", description: "The engine intelligently strips invisible metadata and optimizes the pixel grid to sit just under the 1024KB limit while keeping visual fidelity near perfect." },
  { title: "Export to Device", description: "Download your optimized 1MB image. It is now perfectly sized for strict corporate email attachments or HR portal uploads." },
];

const faqs = [
  { question: "Why do corporate portals ask for 1MB specifically?", answer: "1MB (or 1024KB) is large enough to contain exquisite detail for multi-page document scans or large architectural photos, while still being small enough that it won't instantly max out a company's server storage or email inbox caps." },
  { question: "Is a 1MB photo good enough to print?", answer: "Yes. While professional billboard printers might want the untouched 20MB raw file, a well-optimized 1MB JPEG contains more than enough data to print beautifully on standard A4 or letter-sized paper." },
  { question: "Can I compress a whole folder of images to 1MB each?", answer: "Currently, this specific tool processes one detailed image at a time to ensure maximum quality retention. For bulk jobs, check out our Bulk Resize Tool in the menu." },
];

const relatedLinks = [
  { label: "Resize Photo to 500KB", href: "/photo-resize-500kb" },
  { label: "Resize Photo to 2MB", href: "/photo-resize-2mb" },
];

export default function PhotoResize1MB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 1MB – Free Online Tool</title>
        <meta name="description" content="Compress your photo to exactly 1MB (1024KB) online for free. Near-original quality for emails, documents, and sharing. Fast, free, no signup required." />
        <meta name="keywords" content="photo resize 1mb, compress photo 1mb, reduce image to 1mb, 1mb photo compressor, photo resize 1024kb" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-1mb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 1MB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 1MB with near-original quality for easy sharing</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 1MB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(1024)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(1024)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 1MB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 1MB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
