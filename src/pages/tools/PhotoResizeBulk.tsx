import { Helmet } from "react-helmet-async";
import { Layers, Download, Zap, Image } from "lucide-react";
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
  { icon: Layers, title: "Batch Photo Resizing", description: "Scale entire folders of images down to exact e-commerce specifications in one go. Perfect for Amazon, Flipkart, or Shopify catalogs." },
  { icon: Zap, title: "Uniform Dimensions", description: "Enforce strict aspect ratios and pixel limits across 50+ photos simultaneously so your online store grid looks perfectly aligned." },
  { icon: Image, title: "Bulk Format Conversion", description: "Instantly convert a massive batch of heavy PNG or WEBP files into lightweight, SEO-friendly JPGs with uniform quality settings." },
  { icon: Download, title: "Zip File Export", description: "Download your entire batch of processed photos instantly as a neatly organized ZIP file. No agonizing one-by-one saving." },
];

const steps = [
  { title: "Drop Folder of Photos", description: "Select multiple product photos, real estate listings, or event galleries. You can drag and drop dozens of images at once." },
  { title: "Set Master Rules", description: "Define your target dimensions (e.g., 1000x1000px), set the maximum KB size, and choose your export format. These rules apply to the entire batch." },
  { title: "Process and Download Zip", description: "Click process. Our local browser engine will rapidly resize every image and package them into a single, easy-to-download ZIP archive." },
];

const faqs = [
  { question: "Is there a limit to how many photos I can bulk resize?", answer: "Because our tool processes everything directly inside your computer's RAM (and not on a cloud server), the limit depends entirely on your device. Most modern laptops can easily handle batches of 50 to 100 photos at once." },
  { question: "Why do e-commerce sellers need a bulk resizer?", answer: "Platforms like Amazon require product images to have specific dimensions (e.g., 1000px on the longest side) and pure white backgrounds. Resizing hundreds of product shots individually in Photoshop takes hours; our bulk tool does it in seconds." },
  { question: "Does bulk resizing ruin EXIF metadata for photographers?", answer: "By default, our web compressor strips EXIF data to minimize file size for web uploads. If you are a photographer delivering client galleries and need to keep copyright metadata intact, we recommend using dedicated desktop software like Lightroom." },
];

const relatedLinks = [
  { label: "Resize Photo to 50KB", href: "/resize-photo-50kb" },
  { label: "Photo Resize by MB", href: "/photo-resize-mb-to-kb" },
];

export default function PhotoResizeBulk() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Bulk Photo Resize – Multiple Images Free</title>
        <meta name="description" content="Resize multiple photos in bulk online free. Apply same dimensions and quality to all images. Perfect for product photos, catalogs, and batch processing." />
        <meta name="keywords" content="photo resize bulk, bulk image resizer, resize multiple photos, batch photo resize" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-bulk" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Bulk Photo Resize – Process Multiple Images</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Resize multiple photos with consistent settings for product listings and catalogs</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Bulk Resize</div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Bulk Photo Resizing Features</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Bulk Resize Photos" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
