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
  { icon: ScanLine, title: "Precision DPI Targeting", description: "Instantly force your photo's metadata into strict compliance with government and print standards, including 200 DPI for standard forms or 300 DPI for high-end passports." },
  { icon: Settings, title: "Print-Ready Export", description: "Changing DPI guarantees that physical printers reading the file know exactly how densely to pack the ink pixels, preventing blurry or oversized physical prints." },
  { icon: Zap, title: "Combined Resize & DPI", description: "Unlike basic desktop tools, our engine lets you change the physical dimensions (e.g. 3.5cm x 4.5cm), the KB file size, and the target DPI all simultaneously." },
  { icon: Download, title: "Local Browser Processing", description: "Your private headshots and signature scans shouldn't be uploaded to random servers. All DPI conversions happen entirely offline within your device's RAM." },
];

const steps = [
  { title: "Upload Source Image", description: "Select your raw passport photo, scanned signature, or digital artwork. Both low-res web images and massive DSLR files are supported." },
  { title: "Dial in the DPI", description: "Input the exact DPI required by your publisher or application portal (typically 300 DPI for passport applications). Adjust physical dimensions if needed." },
  { title: "Download Print File", description: "Save your optimized JPG. The new DPI metadata is now hardcoded into the file, ensuring it prints perfectly or passes automated portal checks." },
];

const faqs = [
  { question: "Why do passport portals reject my photo for 'Incorrect DPI'?", answer: "DPI (Dots Per Inch) tells scanners and printers how dense the image should be. Government portals scan your digital file's metadata to ensure that if they ever print your photo on a physical ID card, it won't be blurry. 200 or 300 DPI is the universal official standard." },
  { question: "Does changing a 72 DPI web photo to 300 DPI 'improve' the quality?", answer: "No. Increasing DPI simply instructs a printer to pack the existing pixels closer together, resulting in a physically smaller, denser print. It does not magically generate detail that wasn't captured by the original camera." },
  { question: "Can I use this to prepare artwork for commercial printing?", answer: "Absolutely. Commercial printers universally require 300 DPI for crisp graphics. You can use our tool to verify and embed the 300 DPI flag into your JPGs before sending them to the print shop." },
];

const relatedLinks = [
  { label: "Resize Photo in Pixels", href: "/photo-resize-pixel" },
  { label: "Resize Photo in CM", href: "/photo-resize-cm" },
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
