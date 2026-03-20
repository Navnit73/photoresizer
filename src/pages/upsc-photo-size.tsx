import { Helmet } from "react-helmet-async";
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
import { InternalLinks } from "@/components/shared/InternalLinks";
import { AmazonAd } from "@/components/shared/AmazonAd";
import AdUnit from "@/components/shared/AdUnit";

const relatedLinks = [
  { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
  { label: "SSC Photo Resizer", href: "/ssc-photo-resizer" },
  { label: "IBPS Signature Resize", href: "/signature-resize-ibps" },
];

export default function UPSCPhotoSize() {
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
        <title>UPSC Exam Photo Size & Dimensions | UPSC Photo Resizer Online</title>
        <meta
          name="description"
          content="Check UPSC exam photo dimensions and resize photo online for UPSC CSE, CDS, NDA and other exams. Compress to required size without quality loss."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/upsc-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          {/* ================= EDITOR UI ================= */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  UPSC Exam Photo Size & Dimension Tool
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Easily resize and compress your photo for UPSC Civil Services, CDS, NDA and other recruitment exams.
                </p>
              </div>

              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
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
                  </div>

                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 lg:sticky lg:top-20 max-h-[85vh] overflow-y-auto flex flex-col gap-4">
                      <div className="w-full relative py-2 flex justify-center min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                        <AdUnit type="sidebar" />
                      </div>
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
                          <DownloadButton onDownload={processAndDownload} />
                          <LivePreview imageState={imageState} />
                        </div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={processAndDownload} />
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

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Perfect Your UPSC Exam Photo</h2>
            <p>
              The UPSC (Union Public Service Commission) sets precise standards for candidate photographs. 
              Submitting a photo that fails to meet their strict physical dimension and file-size specifications 
              can lead directly to the rejection of your application. The UPSC Photo Size Tool simplifies this process 
              for candidates applying to the Civil Services (CSE), CDS, NDA, and other recruitment exams.
            </p>

            <h3>UPSC Photo Size & Dimensions Requirements</h3>
            <p>
              UPSC requires standard passport-sized dimensions, but with strictly capped physical file sizes. Ensure your final image matches the following requirements:
            </p>
            <ul>
              <li><strong>Dimensions:</strong> Typically 3.5 cm (width) x 4.5 cm (height) or 413 x 531 pixels.</li>
              <li><strong>File size:</strong> Guaranteed between 20KB to 50KB, depending on the specific exam notice.</li>
              <li><strong>Format:</strong> Must be JPG or JPEG format.</li>
              <li><strong>Clarity:</strong> Face must occupy 70-80% of the frame, with a clear standard white or light-colored background.</li>
            </ul>

            <h3>Supported UPSC Exams</h3>
            <p>
              Our automated resizer handles correct specifications for:
            </p>
            <ul>
              <li>UPSC Civil Services Examination (CSE)</li>
              <li>UPSC Combined Defence Services (CDS)</li>
              <li>National Defence Academy (NDA)</li>
              <li>UPSC CAPF, CMS, and other technical requirements</li>
            </ul>

            <h3>How to Resize UPSC photos Online</h3>
            <ol>
              <li>
                <strong>Upload:</strong> Select your high-resolution original image from your device.
              </li>
              <li>
                <strong>Crop and Scale:</strong> The editor natively constrains the aspect ratio. Align your face comfortably within the preview canvas.
              </li>
              <li>
                <strong>Compress:</strong> Set the target size slider below 50KB (or as stated strictly in your exam notice). The algorithm reduces file weight without destroying visual clarity.
              </li>
              <li>
                <strong>Download Safely:</strong> The processed JPEG saves directly to your computer. No data is stored on external servers, protecting your sensitive personal identifiable information.
              </li>
            </ol>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
