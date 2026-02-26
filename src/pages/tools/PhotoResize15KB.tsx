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
  { icon: Target, title: "Exact 15KB Output Without Blurring", description: "Our custom compression engine locks the target aggressively at 15KB while maintaining sharp facial and text details essential for verification." },
  { icon: Check, title: "Passes Strict State Govt Portals", description: "Specially tuned for demanding portals like UPPSC, MPSC, and state police recruitment boards which instantly reject photos over 15KB." },
  { icon: TrendingDown, title: "Thumb Impressions & Signatures", description: "The perfect fallback for compressing scanned thumbprints and signatures when standard tools fail to push below 20KB." },
  { icon: Download, title: "100% Client-Side Privacy", description: "Your sensitive ID documents and photos are compressed locally in your browser. No uploads, zero privacy risks." },
];

const steps = [
  { title: "Upload Source Image", description: "Select the photo, signature, or thumb impression (JPG/PNG). Scanning at a minimum of 200 DPI is recommended." },
  { title: "Force 15KB Target", description: "The tool automatically shrinks data density to exactly meet the 15KB cap. Use the crop tool to remove unnecessary background and improve face clarity." },
  { title: "Download & Verify", description: "Instantly download the compliant JPG. Your file is guaranteed to pass the 15KB strict upload threshold on government servers." },
];

const faqs = [
  { question: "Which exams strictly require a 15KB photo?", answer: "While central exams often use a 20KB-50KB range, many state-level Public Service Commissions (like UPPSC, BPSC), police application portals, and certain university admission forms strictly limit signatures and thumb impressions to a maximum of 15KB." },
  { question: "How do I avoid my signature looking blurry at 15KB?", answer: "Sign on plain white paper with a thick black pen. When uploading, use our crop tool to trim all excess white space. By removing blank areas, the 15KB data limit is entirely committed to keeping the actual signature strokes sharp." },
  { question: "My photo is 2MB. Can it really be reduced to 15KB?", answer: "Yes. Our tool aggressively downscales the resolution while stripping out non-essential image metadata. However, for a 2MB photo, we strongly recommend cropping it closely around the face first to retain recognizable details." },
];

const relatedLinks = [
  { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
  { label: "Resize Signature to 10KB", href: "/signature-resize-ibps" },
];

export default function PhotoResize15KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 15KB – Free Online Tool</title>
        <meta name="description" content="Resize and compress your photo to exactly 15KB online for free. Perfect for SSC, UPSC, Railway and government exam application forms. Fast and easy." />
        <meta name="keywords" content="photo resize 15kb, compress photo 15kb, reduce image to 15kb, 15kb photo compressor, government form photo" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-15kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 15KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 15KB for government exam forms and applications</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 15KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(15)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(15)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 15KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 15KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
