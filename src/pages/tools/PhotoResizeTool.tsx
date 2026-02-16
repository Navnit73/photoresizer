import { Helmet } from "react-helmet-async";
import { Wrench, Download, Settings, Zap } from "lucide-react";
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
  { icon: Wrench, title: "All-in-One Tool", description: "Resize dimensions, compress file size, crop, rotate, and convert format — everything in one tool." },
  { icon: Settings, title: "Advanced Controls", description: "Quality slider, format conversion, aspect ratio lock, and custom dimension inputs." },
  { icon: Zap, title: "Live Preview", description: "See changes in real-time as you adjust settings. Download when you're satisfied." },
  { icon: Download, title: "Free Forever", description: "Professional photo resize tool with no premium tier. Every feature is free." },
];

const steps = [
  { title: "Upload Your Photo", description: "Click or drag any image. Supports JPG, PNG, and WEBP formats up to 50MB." },
  { title: "Use the Tools", description: "Resize dimensions, adjust quality, crop to any ratio, rotate, and change format." },
  { title: "Download Result", description: "Download your perfectly resized photo. Ready for any purpose." },
];

const faqs = [
  { question: "What can this photo resize tool do?", answer: "Our tool can resize dimensions (width/height), compress file size (KB/MB), crop to any ratio, rotate, and convert between JPG/PNG/WEBP formats. All in one editor." },
  { question: "Is this a professional-grade tool?", answer: "Yes! Despite being free, our tool offers professional features: precise dimension control, quality adjustment, interactive cropping, and format conversion." },
  { question: "Can I use this tool for commercial projects?", answer: "Absolutely! The tool is free for both personal and commercial use. Resize product photos, marketing materials, or any images without restrictions." },
];

const relatedLinks = [
  { label: "Photo Resize Online", href: "/photo-resize-online" },
  { label: "Photo Resize Free", href: "/photo-resize-free" },
  { label: "Photo Resize App", href: "/photo-resize-app" },
];

export default function PhotoResizeTool() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize Tool – Free Online Editor</title>
        <meta name="description" content="Free photo resize tool with professional features. Resize, crop, compress, rotate, and convert photos online. All-in-one editor, no signup needed." />
        <meta name="keywords" content="photo resize tool, image resize tool, photo resizer online tool, free photo editing tool" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-tool" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Photo Resize Tool – All Features Free</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Professional photo resizing with crop, compress, rotate, and format conversion</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Resize Tool</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Professional Photo Resize Tool</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Use the Photo Resize Tool" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
