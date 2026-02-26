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
  { icon: Target, title: "150KB Portal Standard", description: "Hit the exact 150KB requirement common on university admissions portals and mid-tier government web forms without compromising face clarity." },
  { icon: Check, title: "Avoid Server Rejections", description: "Submitting a 151KB file to a strict portal will result in an error. Our engine mathematically locks the final output well within the 150KB ceiling." },
  { icon: TrendingDown, title: "Retain Document Legibility", description: "Unlike extreme 20KB compression, 150KB provides enough data to keep small text on scanned ID cards and certificates highly readable." },
  { icon: Download, title: "Private & Secure", description: "Your sensitive admission documents and ID scans are processed entirely within your browser. Nothing is uploaded to our cloud." },
];

const steps = [
  { title: "Select Digital Scan", description: "Upload a photo of your diploma, ID card, or passport picture. Web-based processing begins immediately." },
  { title: "Optimize and Shrink", description: "Adjust the quality slider until the live size preview drops just below 150KB. Use the dimension tool to crop away unused margins." },
  { title: "Secure Download", description: "Save the processed JPG straight to your device. The optimized file is ready for immediate portal upload." },
];

const faqs = [
  { question: "Why is 150KB a common size limit for university applications?", answer: "Universities receive tens of thousands of applications simultaneously. Capping attachments at 150KB prevents their storage servers from crashing while allowing enough resolution for admissions officers to clearly read transcripts and view applicant photos." },
  { question: "Is 150KB enough for a clear, readable document scan? ", answer: "Yes. 150KB is a 'sweet spot' for single-page documents. If you scan an A4 transcript, convert it to greyscale, and compress it to 150KB, all the text will remain razor-sharp and perfectly legible." },
  { question: "Will compressing to 150KB change my physical document size?", answer: "No, compressing file size (KB) using quality reduction does not alter the physical dimensions (inches/cm) unless you explicitly use our resizing tool to shrink the height and width." },
];

const relatedLinks = [
  { label: "Resize Photo to 100KB", href: "/photo-resize-100kb" },
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
];

export default function PhotoResize150KB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 150KB – Free Online</title>
        <meta name="description" content="Resize and compress your photo to exactly 150KB online for free. High quality output for profiles, applications, and online forms. No signup required." />
        <meta name="keywords" content="photo resize 150kb, compress photo 150kb, reduce image to 150kb, 150kb photo resizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-150kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo to 150KB Online Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Compress your photo to exactly 150KB with excellent quality for any application</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Target: 150KB</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload(150)} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(150)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional 150KB Photo Compression</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Photo to 150KB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
