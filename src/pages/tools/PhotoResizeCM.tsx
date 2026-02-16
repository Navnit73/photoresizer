import { Helmet } from "react-helmet-async";
import { Ruler, Download, Settings, Zap } from "lucide-react";
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
  { icon: Ruler, title: "CM-Based Resize", description: "Set photo dimensions in centimeters. Ideal for print-ready photos and document submissions." },
  { icon: Settings, title: "DPI Aware", description: "Our tool converts CM to pixels based on DPI settings for accurate print sizing." },
  { icon: Zap, title: "Common Sizes", description: "Quick presets for 3.5×4.5 cm, 3.5×2.5 cm, 5×5 cm, and other standard sizes." },
  { icon: Download, title: "Print Ready", description: "Download photos sized perfectly in CM for printing and document pasting." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any image from your device. Supports JPG, PNG, and WEBP formats." },
  { title: "Set Size in CM", description: "Enter width and height in centimeters. Use presets for passport, PAN card, or custom sizes." },
  { title: "Download Print-Ready Photo", description: "Download your photo at the exact CM dimensions for printing or form submission." },
];

const faqs = [
  { question: "How do I convert CM to pixels?", answer: "The conversion depends on DPI. At 300 DPI (print quality): 1 cm = 118 pixels. At 96 DPI (screen): 1 cm = 38 pixels. Our tool handles this conversion automatically." },
  { question: "What CM size is a passport photo?", answer: "Standard Indian passport photo is 3.5×4.5 cm. US passport is 5×5 cm (2×2 inches). Our tool includes presets for common document sizes." },
  { question: "Can I resize photos for printing?", answer: "Yes! Set your desired CM dimensions and ensure DPI is set to 300 for high-quality prints. Our editor provides the tools to get print-perfect results." },
];

const relatedLinks = [
  { label: "Resize Photo by Pixel", href: "/photo-resize-pixel" },
  { label: "Resize Photo Width & Height", href: "/photo-resize-width-height" },
  { label: "Photo Resize for PAN Card", href: "/photo-resize-for-pan-card" },
];

export default function PhotoResizeCM() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo in CM – Free Online Tool</title>
        <meta name="description" content="Resize your photo in centimeters (CM) online free. Set exact width and height in CM for printing and documents. Print-ready output with DPI control." />
        <meta name="keywords" content="photo resize cm, resize image in cm, photo size in centimeters, cm photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-cm" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo in CM – Print-Ready Dimensions</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Set photo dimensions in centimeters for printing and document submissions</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">CM Resize</div>
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

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Resize Photos by Centimeters</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo in CM" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
