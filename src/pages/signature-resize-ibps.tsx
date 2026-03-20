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
  { label: "UPSC Photo Size", href: "/upsc-photo-size" },
];

export default function SignatureResizeIBPS() {
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
        <title>Signature Resize for IBPS Exam | IBPS Signature Size Tool</title>
        <meta
          name="description"
          content="Free signature resize tool for IBPS PO, Clerk, RRB and banking exams. Resize and compress signature image as per IBPS requirements."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/signature-resize-ibps" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          {/* ================= EDITOR UI ================= */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Signature Resize Tool for IBPS Exams
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly scale, crop, and compress your signature scan to meet rigid IBPS and banking application portal restrictions.
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
                        <AdUnit format="fluid" layoutKey="-gw-1+2a-9x+5y" />
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
            <h2>Perfect Your IBPS Signature Scan</h2>
            <p>
              The IBPS Signature Resize Tool helps candidates manually prepare their signature images for IBPS PO, IBPS Clerk, IBPS RRB Officer, Office Assistant, and other banking examinations. Most modern smartphone cameras capture photos at sizes far exceeding what banking portables permit. Upload your signature image and adjust its dimensions and file size exactly as required by IBPS without losing the clarity of the ink or paper.
            </p>

            <h3>Strict IBPS Signature Size Requirements</h3>
            <p>
              The Institute of Banking Personnel Selection (IBPS) specifies strict signature upload guidelines for all online application forms. 
              Signatures must be uploaded in a prescribed physical dimension and compressed heavily into just a few kilobytes. 
              If the uploaded signature is blurry, cropped weirdly, or exceeds these file constraints, the automated portal will flatly reject the upload.
            </p>

            <h3>Banking Exams Supported</h3>
            <p>
              You can leverage this dedicated tool for signature resizing for:
            </p>
            <ul>
              <li>IBPS PO & IBPS Clerk</li>
              <li>IBPS RRB Officer Scale I, II, III & Office Assistant</li>
              <li>SBI PO & SBI Clerk applications</li>
              <li>RBI Grade-B and Assistant portals</li>
            </ul>

            <h3>How to Resize Signature for IBPS Online Forms</h3>
            <ol>
              <li>
                Upload a clear image of your handwritten signature signed strictly on white paper using black or dark blue ink.
              </li>
              <li>
                Use the cropping tools to remove excess white border. The signature should take up the vast majority of the frame.
              </li>
              <li>
                Adjust the quality slider until the live MB/KB counter rests comfortably below the limit established in your banking job notification text (usually 10KB to 20KB).
              </li>
              <li>
                Download the processed JPEG and safely upload it to the IBPS portal. The process runs 100% inside your Google Chrome or Safari browser, so no sensitive files ping our servers.
              </li>
            </ol>

            <h3>Common Upload Rejections Avoided</h3>
            <p>
              Aspirants commonly face immediate rejection alerts ranging from "invalid file format," "incorrect dimensions," or "file size exceeded" when racing to submit IBPS forms. 
              Scaling down a photo manually without retaining proportions often results in squished handwriting that validators deem illegible. Using a mathematically sound scale-and-compress tool locks proportions in place while stripping away unnecessary visual data bytes.
            </p>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
