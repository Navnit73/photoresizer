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
  { icon: Target, title: "State Portal Ready 30KB Target", description: "Specifically tuned to hit the exact 30KB maximum required by dozens of state government portals (like BPSC and APPSC) for signatures and photographs." },
  { icon: Check, title: "Preserves Detail & Texture", description: "At 30KB, our engine retains crucial biometric data—such as facial features and the distinct ink-flow patterns of scanned signatures." },
  { icon: TrendingDown, title: "Aggressive Auto-Tuning", description: "Takes a standard 1MB smartphone photo and intelligently compresses it by over 95% without letting the image degrade into unrecognizable pixel blocks." },
  { icon: Download, title: "Zero Upload Risk", description: "Don't upload your private passport photo to random servers. Our tool compresses the photo entirely within your browser for absolute data security." },
];

const steps = [
  { title: "Select Photograph or Signature", description: "Upload your high-res digital photo or scanned signature. Wait a second for the engine to load it into the local preview." },
  { title: "Force 30KB Compression", description: "The system will immediately calculate the exact compression ratio needed to squeeze the file down to 30KB or less." },
  { title: "Save Compliant File", description: "Instantly download the optimized JPG and upload it to your application form. Guaranteed to bypass 'file too large' errors." },
];

const faqs = [
  { question: "Why do so many forms ask specifically for a 30KB limit?", answer: "A 30KB limit is a legacy standard used by many older state-level government portals to save database space while theoretically retaining just enough data for a recognizable face or signature." },
  { question: "My signature looks blurry when compressed to 30KB. What should I do?", answer: "This happens when there is too much 'white space' around your signature. Before compressing, use the crop tool in our editor to trim the image as tightly as possible around the actual ink. This forces the 30KB of data to focus only on the signature." },
  { question: "Will compressing to 30KB change the physical dimensions of my photo?", answer: "By default, our tool only changes the data size (compression), not the physical pixel dimensions. However, if the file is extremely large to begin with, the tool may slightly downscale the resolution to safely reach the 30KB target without severe pixelation." },
];

const relatedLinks = [
  { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
];

export default function PhotoResize30KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 30KB – Free Online Tool</title>
        <meta name="description" content="Compress and resize your photo to exactly 30KB online for free. Perfect for job applications, exam forms, and online portals. Fast, easy, no signup." />
        <meta name="keywords" content="photo resize 30kb, compress photo 30kb, reduce image to 30kb, 30kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-30kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 30KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 30KB for application forms and online portals</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 30KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(30)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(30)} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 30KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 30KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
