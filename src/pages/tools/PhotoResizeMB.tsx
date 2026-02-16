import { Helmet } from "react-helmet-async";
import { HardDrive, Download, TrendingDown, Zap } from "lucide-react";
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
  { icon: HardDrive, title: "MB-Level Control", description: "Target specific MB sizes — 1MB, 2MB, 5MB, or any custom MB value for your photo." },
  { icon: TrendingDown, title: "Reduce to Any MB", description: "Compress multi-MB photos to your target MB size while keeping optimal quality." },
  { icon: Zap, title: "Live MB Preview", description: "See estimated file size in MB/KB as you adjust quality and dimensions." },
  { icon: Download, title: "Free & Quick", description: "Resize photos in MB instantly. No signup, no watermarks, unlimited use." },
];

const steps = [
  { title: "Upload Your Photo", description: "Select any photo from your device. Large files of any MB size are accepted." },
  { title: "Set MB Target", description: "Use quality and dimension controls to reach your target MB size. Watch the live preview for size changes." },
  { title: "Download at Target MB", description: "Download your photo at the desired MB size. Ready for any use." },
];

const faqs = [
  { question: "How do I reduce photo size to 1MB?", answer: "Upload your photo, then reduce quality to around 70-80% and optionally lower dimensions. For most camera photos, this brings the size to under 1MB while maintaining good quality." },
  { question: "How many MB is a typical photo?", answer: "Phone photos are usually 3-8MB. DSLR photos can be 15-40MB. Screenshots are typically 0.5-2MB. Our tool helps you resize any of these to your target." },
  { question: "Is MB the same as megabytes?", answer: "Yes! MB stands for megabytes. 1 MB = 1024 KB. Our tool works with both MB and KB measurements for your convenience." },
];

const relatedLinks = [
  { label: "Photo Resize MB to KB", href: "/photo-resize-mb-to-kb" },
  { label: "Resize Photo to 1MB", href: "/photo-resize-1mb" },
  { label: "Resize Photo to 2MB", href: "/photo-resize-2mb" },
];

export default function PhotoResizeMB() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo in MB – Reduce File Size</title>
        <meta name="description" content="Resize and reduce photo size in MB online free. Target any MB value with smart compression. Live preview shows file size as you adjust." />
        <meta name="keywords" content="photo resize mb, resize image mb, reduce photo size mb, photo mb reducer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-mb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo in MB – Control File Size</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Reduce your photo to any MB size with smart compression and quality control</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">MB Resizer</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">MB-Level Photo Resizing</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo in MB" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
