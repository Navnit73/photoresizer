import { Helmet } from "react-helmet-async";
import { ScanLine, Download, Settings, Zap } from "lucide-react";
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
  { icon: ScanLine, title: "DPI Control", description: "Set custom DPI values — 72 for web, 150 for decent print, 300 for high-quality print." },
  { icon: Settings, title: "Resolution Aware", description: "Understand the relationship between DPI, pixel dimensions, and print size." },
  { icon: Zap, title: "Print Ready", description: "Ensure your photo has the correct DPI for professional printing results." },
  { icon: Download, title: "Free & Instant", description: "Change your photo's DPI and download instantly. No registration required." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any image. The tool will show you the current dimensions and estimated DPI." },
  { title: "Adjust DPI Settings", description: "Set your target DPI and adjust dimensions accordingly for the desired print size." },
  { title: "Download Optimized Photo", description: "Download your photo with the correct DPI setting for printing or digital use." },
];

const faqs = [
  { question: "What DPI should I use for printing?", answer: "300 DPI is the standard for high-quality prints. 150 DPI is acceptable for less critical prints. 72 DPI is for screen/web use only." },
  { question: "Does changing DPI change image quality?", answer: "Changing DPI alone doesn't alter pixels — it just changes the metadata telling the printer how large to print. However, if you resize dimensions to match a DPI target, the pixel count changes." },
  { question: "What DPI do I need for passport photos?", answer: "Passport photos typically need 300 DPI for official print quality. Our tool can set the correct DPI along with the proper dimensions for passport submissions." },
];

const relatedLinks = [
  { label: "Resize Photo by Pixel", href: "/photo-resize-pixel" },
  { label: "Resize Photo in CM", href: "/photo-resize-cm" },
  { label: "Resize Photo Without Quality Loss", href: "/photo-resize-without-losing-quality" },
];

export default function PhotoResizeDPI() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo DPI – Change Resolution Free</title>
        <meta name="description" content="Change photo DPI and resolution online free. Set 72, 150, or 300 DPI for web or print. Understand DPI and resize for perfect print results." />
        <meta name="keywords" content="photo resize dpi, change image dpi, photo dpi changer, resize image resolution dpi" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-dpi" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Change Photo DPI – Resize Resolution Online</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Set the perfect DPI for web, print, or document requirements</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">DPI Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">DPI & Resolution Photo Resize</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Change Photo DPI" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
