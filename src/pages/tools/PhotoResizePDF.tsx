import { Helmet } from "react-helmet-async";
import { FileText, Download, Shield, Zap } from "lucide-react";
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
  { icon: FileText, title: "Avoid PDF Bloat", description: "Stop sending 50MB PDF files. Resize your heavy photos, charts, and signatures before embedding them into your Word or PDF export." },
  { icon: Shield, title: "Perfect for Resumes", description: "A standard ATS (Applicant Tracking System) rejects PDF resumes over 2MB. Optimize your headshot so your resume stays lightweight and gets read." },
  { icon: Zap, title: "Signature Extraction", description: "Use our crop tool to slice an ink signature from a large page, then compress the file to paste neatly into digital contracts without pixelation." },
  { icon: Download, title: "Universally Compatible JPGs", description: "While PDFs are document wrappers, they struggle to compress raw images internally. We export highly optimized JPGs that make your final PDF ultra-lean." },
];

const steps = [
  { title: "Select Source Media", description: "Upload the high-resolution photo, company logo, or scanned signature you plan to embed inside your document." },
  { title: "Shrink Dimensions & KB", description: "If the image will only be 2 inches wide on the PDF page, don't use a 4000px wide photo. Scale the dimensions down to 600px and compress to under 100KB." },
  { title: "Export and Embed", description: "Download the web-optimized JPG and insert it directly into your Word Document, Google Doc, or Adobe Acrobat file." },
];

const faqs = [
  { question: "Why is my exported PDF document so massive?", answer: "Usually, a massive PDF is caused by embedding raw, uncompressed photos from a modern smartphone directly onto the page. You should always resize and compress images using our tool before inserting them into your document." },
  { question: "Does this tool convert a PDF into a JPG?", answer: "No. This tool is for preparing and optimizing photos (JPG/PNG/WEBP) so they don't bloat the final size of a PDF document when you embed them." },
  { question: "What is the best dimension for a resume headshot?", answer: "A resume headshot printed on an A4 page rarely exceeds 2x2 inches. Resizing your photo to 600x600 pixels (and compressing it to under 50KB) guarantees it will look perfectly sharp on screen and in print without inflating the PDF size." },
];

const relatedLinks = [
  { label: "Resize Photo to 200KB", href: "/photo-resize-200kb" },
  { label: "Compress Image (Variable)", href: "/compress-image" },
];

export default function PhotoResizePDF() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo for PDF – Free Online Tool</title>
        <meta name="description" content="Resize photos for PDF documents online free. Optimize photo dimensions and file size for embedding in resumes, reports, and applications. Fast and easy." />
        <meta name="keywords" content="photo resize pdf, resize image for pdf, photo for pdf document, pdf photo optimizer" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-pdf" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photo for PDF Documents</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Optimize your photo's size and dimensions for PDF embedding</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">PDF Ready</div>
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

          <div className="py-2">
            <AmazonAd />
          </div>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">PDF Photo Optimization</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo for PDF" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
