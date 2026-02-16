import { Helmet } from "react-helmet-async";
import { CreditCard, Download, Check, Shield } from "lucide-react";
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
  { icon: CreditCard, title: "PAN Card Specs", description: "Photo resized to PAN card requirements: 3.5×2.5 cm (132×94 pixels at 96 DPI) with size under 50KB." },
  { icon: Check, title: "NSDL Compatible", description: "Output photo meets NSDL and UTIITSL PAN card application photo requirements." },
  { icon: Shield, title: "White Background", description: "Ensure your photo has proper lighting and background for PAN card acceptance." },
  { icon: Download, title: "Instant Download", description: "Get your PAN card photo instantly. Free, no registration needed." },
];

const steps = [
  { title: "Upload Your Photo", description: "Upload a recent passport-style photo with white background and clear face visibility." },
  { title: "Resize for PAN Card", description: "Our editor helps you crop and resize to exact PAN card specifications (3.5×2.5 cm)." },
  { title: "Download & Apply", description: "Download your PAN card photo and paste it on the application form." },
];

const faqs = [
  { question: "What is the exact photo size for PAN card?", answer: "PAN card requires a photo of 3.5×2.5 cm (approximately 132×94 pixels at 96 DPI). The file size should be between 2KB and 50KB in JPG format." },
  { question: "What background is required for PAN card photo?", answer: "A plain white or light-colored background is required. The photo should show your face clearly with no shadows or reflection on glasses." },
  { question: "Can I use a phone selfie for PAN card?", answer: "Yes, but ensure good lighting, white background, and a straight-on face angle. Our tool will help you crop and resize to the correct PAN card dimensions." },
];

const relatedLinks = [
  { label: "Passport Size Photo", href: "/photo-resize-passport-size" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Photo Resize for SSC", href: "/photo-resize-for-ssc" },
];

export default function PhotoResizeForPanCard() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize for PAN Card – 3.5×2.5 cm</title>
        <meta name="description" content="Resize photo for PAN card application online free. Exact 3.5×2.5 cm size with under 50KB. NSDL and UTIITSL compatible. Fast and easy." />
        <meta name="keywords" content="photo resize for pan card, pan card photo size, pan card photo dimensions, pan card photo editor" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-for-pan-card" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo for PAN Card Application</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Get your photo to exact PAN card specifications — 3.5×2.5 cm, under 50KB</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">PAN Card Size</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(50)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(50)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">PAN Card Photo Requirements</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo for PAN Card" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
