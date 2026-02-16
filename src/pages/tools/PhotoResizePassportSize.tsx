import { Helmet } from "react-helmet-async";
import { UserCheck, Download, Crop, Zap } from "lucide-react";
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
  { icon: UserCheck, title: "Passport Specs", description: "Resize to standard passport sizes: 3.5×4.5 cm (India), 2×2 inches (US), or other country specs." },
  { icon: Crop, title: "Face Framing Guide", description: "Crop your photo to the correct face-to-frame ratio for passport requirements." },
  { icon: Zap, title: "Multiple Countries", description: "Supports passport photo requirements for India, USA, UK, Canada, Australia, and more." },
  { icon: Download, title: "Print Ready", description: "Download at 300 DPI for professional printing. Ready to paste on passport applications." },
];

const steps = [
  { title: "Upload Your Photo", description: "Upload a recent photo with white background, facing forward, and neutral expression." },
  { title: "Crop to Passport Size", description: "Use the crop tool to frame your face correctly. Select your country's passport preset." },
  { title: "Download Passport Photo", description: "Download your passport-sized photo ready for printing or online submission." },
];

const faqs = [
  { question: "What is the standard passport photo size in India?", answer: "Indian passport photos should be 3.5×4.5 cm (approximately 413×531 pixels at 300 DPI). The file size should be between 10KB and 300KB in JPG format." },
  { question: "What is the US passport photo size?", answer: "US passport photos are 2×2 inches (5.08×5.08 cm, or 600×600 pixels at 300 DPI). The head should occupy 50-69% of the photo height." },
  { question: "What background do I need for a passport photo?", answer: "Most countries require a plain white or off-white background. The photo should have even lighting, no shadows, and a clear view of the face with neutral expression." },
];

const relatedLinks = [
  { label: "Photo Resize for PAN Card", href: "/photo-resize-for-pan-card" },
  { label: "Photo Resize for SSC", href: "/photo-resize-for-ssc" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
];

export default function PhotoResizePassportSize() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to Passport Size – Free</title>
        <meta name="description" content="Resize photo to passport size online free. India 3.5×4.5 cm, US 2×2 inches. Print-ready at 300 DPI. Crop and resize for passport applications." />
        <meta name="keywords" content="photo resize passport size, passport photo resize, passport size photo maker, passport photo dimensions" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-passport-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to Passport Size</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Create passport-size photos for India, US, UK, and more — print-ready at 300 DPI</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Passport Size</div>
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

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Passport Photo Requirements</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Create Passport Size Photo" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
