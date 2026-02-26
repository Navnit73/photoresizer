import { Helmet } from "react-helmet-async";
import { Target, Download, Zap, FileCheck, TrendingDown } from "lucide-react";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
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
  {
    icon: Target,
    title: "Exact 20KB Passport Target",
    description: "Our micro-compression matrix achieves precisely 20KB, passing the strict automated validators used on Indian Passport Seva and NSDL PAN portals.",
  },
  {
    icon: FileCheck,
    title: "Retains Biometric Data",
    description: "Aggressive compression often ruins faces. Our tool specifically protects the eyes and facial geometry required for official ID verification.",
  },
  {
    icon: TrendingDown,
    title: "Crushes Smartphone Snaps",
    description: "Easily drag a 5MB phone selfie into the editor and instantly squish it down to 20KB without turning the image into an unrecognizable blur.",
  },
  {
    icon: Zap,
    title: "100% Client-Side Privacy",
    description: "Your official ID photos, Aadhaar scans, and passport pictures never upload to our servers. Processing happens entirely within your web browser.",
  },
];

const steps = [
  {
    title: "Drop Your ID Photo",
    description: "Upload your high-resolution passport photo, PAN card scan, or signature. PNG, WEBP, and JPG formats are instantly supported.",
  },
  {
    title: "Lock 20KB Compression",
    description: "The browser engine calculates the necessary reduction in pixel density and metadata to safely place the file under the 20KB ceiling.",
  },
  {
    title: "Download & Verify",
    description: "Save your optimized 20KB JPEG. It is immediately ready to bypass the 'File Too Large' errors on government application websites.",
  },
];

export default function ResizePhoto20KB() {
  const {
    imageState,
    isProcessing,
    history,
    loadImage,
    updateDimensions,
    setRotation,
    setQuality,
    setFormat,
    applyPreset,
    applyCrop,
    undo,
    processAndDownload,
    reset,
    lastUploadedFile,
  } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Resize Photo to 20KB - Free Online Photo Resizer for Government Forms</title>
        <meta
          name="description"
          content="Resize photo to exactly 20KB online. Perfect for SSC, UPSC, passport, PAN card, Aadhaar applications. Free photo resizer 20KB with optimal quality."
        />
        <meta
          name="keywords"
          content="resize photo 20kb, photo resizer 20kb, compress image to 20kb, reduce photo size 20kb, ssc photo 20kb, passport photo 20kb"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/resize-photo-20kb" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          {/* Editor */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                    Upload Photo to Resize to 20KB
                  </h2>
                  <UploadZone 
                    onFileSelect={loadImage} 
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={undo}>
                          <Undo2 className="w-3.5 h-3.5 mr-1" />
                          Undo
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={reset}>
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                      </Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                      Target: 20KB
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls
                        imageState={imageState}
                        isProcessing={isProcessing}
                        onUpdateDimensions={updateDimensions}
                        onRotate={setRotation}
                        onQualityChange={setQuality}
                        onFormatChange={setFormat}
                        onApplyPreset={applyPreset}
                      />
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div>
                          <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        </div>
                        <div>
                          <DownloadButton onDownload={() => processAndDownload(20)} />
                          <LivePreview imageState={imageState} />
                        </div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload(20)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Features */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Why Use Our 20KB Photo Resizer?
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photo to 20KB" />

          {/* Use Cases */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white text-center">
                  Where You Need 20KB Photos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Government Exams</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>• SSC CGL, CHSL, MTS applications</li>
                      <li>• UPSC Civil Services forms</li>
                      <li>• Railway RRB recruitment</li>
                      <li>• Banking IBPS, SBI exams</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">ID Documents</h3>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                      <li>• Passport applications</li>
                      <li>• Aadhaar card updates</li>
                      <li>• PAN card applications</li>
                      <li>• Driving license forms</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                    <strong>✓ Guaranteed Compliance:</strong> Our tool ensures your photo meets the exact 20KB requirement for all government applications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SEO ARTICLE & FAQs ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>The Importance of the 20KB Photo Limit</h2>
            <p>
              Applying for government jobs, academic entrance exams, or official identification documents in India almost always involves a strict digital bureaucracy. One of the most common and rigid rules is that applicant passport photos and scanned signatures must not exceed 20KB in file size. This isn't an arbitrary number; government servers handle millions of applications simultaneously. Keeping individual file sizes under 20KB prevents massive server crashes during peak application windows.
            </p>

            <h3>How to Compress a Photo to 20KB Without Losing Clarity</h3>
            <p>
              When dealing with such a tiny file size allowance, traditional editing software often turns your face or signature into an unrecognizable, completely blurred mosaic of pixels. Our specialized 20KB Photo Resizer uses a micro-compression matrix specifically tuned for facial recognition and text legibility. 
            </p>
            <p>
              Instead of randomly dropping data, the algorithm prioritizes preserving the geometric lines of your facial features (eyes, nose, mouth) or the high-contrast strokes of ink in your signature, while aggressively stripping out unseen background metadata and simplifying uniform background colors.
            </p>

            <h3>Frequently Asked Questions (FAQ)</h3>
            
            <h4>What if my photo becomes completely blurry at 20KB?</h4>
            <p>
              Blurriness usually happens if you try to compress a massive 4K physical image directly to 20KB. Always crop the image first so only your face and a small border are visible, THEN compress. Removing the unnecessary background heavily reduces the data the compressor has to squash, leaving more "kilobytes" available for the details of your face.
            </p>

            <h4>Is there a specific dimension for a 20KB photo?</h4>
            <p>
              Generally, a passport photo compressed to 20KB looks best if its physical dimensions are around 200 x 230 pixels (or 3.5cm x 4.5cm). If you try to compress an image that is 2000 pixels wide down to 20KB, it will inevitably become a distorted mess.
            </p>

            <h4>Is this resizing tool free to use?</h4>
            <p>
              Yes, our 20KB resizer is entirely free and performs the modifications strictly on your device. Your sensitive identification images, PAN cards, and Aadhaar scans are never passed to our databases, ensuring zero risk of identity theft.
            </p>
          </article>

          <InternalLinks links={[
            { label: "SSC Photo Resizer", href: "/ssc-photo-resizer" },
            { label: "UPSC Photo Size", href: "/upsc-photo-size" },
            { label: "IBPS Signature Resize", href: "/signature-resize-ibps" },
          ]} />
        </main>

        <Footer />
      </div>
    </>
  );
}
