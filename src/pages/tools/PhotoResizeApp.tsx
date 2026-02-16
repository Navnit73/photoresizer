import { Helmet } from "react-helmet-async";
import { Smartphone, Download, Globe, Zap } from "lucide-react";
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
  { icon: Smartphone, title: "Works on Mobile", description: "Use our photo resize app on any phone or tablet. Responsive design works perfectly on all screen sizes." },
  { icon: Globe, title: "No Install Needed", description: "Web app works directly in your browser. No downloading or installing any application." },
  { icon: Zap, title: "App-Like Speed", description: "Fast, responsive interface that feels like a native app. Instant preview and processing." },
  { icon: Download, title: "Save Directly", description: "Download resized photos directly to your device's camera roll or downloads folder." },
];

const steps = [
  { title: "Open the App", description: "Visit our photo resize app in any browser. Works on Chrome, Safari, Firefox, and more." },
  { title: "Upload & Edit", description: "Select a photo from your gallery or camera. Use our tools to resize, crop, and compress." },
  { title: "Save to Device", description: "Download your resized photo directly to your phone, tablet, or computer." },
];

const faqs = [
  { question: "Do I need to install an app to resize photos?", answer: "No! Our photo resize tool works directly in your browser as a web app. No installation, no storage space used, no permissions needed." },
  { question: "Does the app work on iPhone and Android?", answer: "Yes! Our web app works on all devices — iPhone, Android, iPad, Windows, Mac, and Linux. Just open it in your browser." },
  { question: "Is the photo resize app free?", answer: "Completely free! No premium plans, no in-app purchases, no ads blocking features. Every tool is available for free." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Photo Resize Free", href: "/photo-resize-free" },
  { label: "Photo Resize Tool", href: "/photo-resize-tool" },
];

export default function PhotoResizeApp() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize App – Free Online Tool</title>
        <meta name="description" content="Free photo resize app that works in your browser. No installation needed. Resize, crop, and compress photos on any device. Mobile-friendly." />
        <meta name="keywords" content="photo resize app, photo resizer app, image resize app online, free photo resize application" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-app" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Photo Resize App – No Installation Needed</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Use our free photo resize app right in your browser on any device</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Resize App</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Photo Resize App Features</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Use the Photo Resize App" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
