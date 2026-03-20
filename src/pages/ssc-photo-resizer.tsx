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
  { label: "UPSC Photo Size", href: "/upsc-photo-size" },
  { label: "IBPS Signature Resize", href: "/signature-resize-ibps" },
];

export default function SSCPhotoResizer() {
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
        <title>SSC CGL Photo Resizer 2026 | Resize Photo for SSC CGL</title>
        <meta
          name="description"
          content="Easily resize photo for SSC CGL 2026. Crop to 3.5cm x 4.5cm and compress image size between 20KB to 50KB exactly per official Staff Selection Commission guidelines."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/ssc-photo-resizer" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          {/* ================= EDITOR UI ================= */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  SSC CGL Photo Resizer 2026
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly crop, resize, and compress your photo to exact Staff Selection Commission guidelines (3.5cm x 4.5cm, 20KB-50KB).
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
            <h2>Fast, Free, and Accurate Image Crop for SSC Exams</h2>
            <p>
              Are you applying for the upcoming SSC CGL 2026 exam? A single mistake in your uploaded photograph can lead to instant application rejection. Don't take chances with generic editors if you need to resize photo for SSC CGL 2026. Use our free SSC CGL Resizer Tool to instantly crop, resize, and compress your photo to exact Staff Selection Commission guidelines without losing critical clarity.
            </p>

            <h3>How SSC CGL Photo Rules Are Different</h3>
            <p>
              Unlike traditional banking or UPSC exams, the Staff Selection Commission utilizes extremely strict, automated visual verification checks. The SSC CGL 2026 guidelines demand a perfectly clear frontal facial view, explicitly prohibiting spectacles or caps. Furthermore, while other competitive exams might accept a wide array of image compressions, SSC strictly requires physical dimensions of <strong>3.5cm x 4.5cm</strong> and rigidly enforces a precise file size window of <strong>20KB to 50KB</strong>. Any minor deviation will either block you from submitting your application or result in your admit card being withheld.
            </p>

            <h3>Official SSC CGL 2026 Photo Requirements Checklist</h3>
            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="p-4 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">Specification</th>
                    <th className="p-4 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">Official Requirement</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 dark:text-slate-300">
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Image Dimensions</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">3.5 cm (width) x 4.5 cm (height)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Acceptable File Size</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700 font-bold text-blue-600 dark:text-blue-400">20 KB to 50 KB</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Allowed File Format</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">JPEG / JPG strictly</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Background Color</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Plain White or very Light Color only</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-slate-200 dark:border-slate-700">Strict Prohibitions</td>
                    <td className="p-4 border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400">No spectacles, caps, masks, or dark glasses</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Step-by-Step Guide: How to Resize Photo for SSC CGL 2026</h3>
            <ol>
              <li>
                <strong>Upload Your Image:</strong> Start by selecting or dragging and dropping your recent, original passport-size photograph into our secure online resizer. We process images locally, ensuring complete privacy.
              </li>
              <li>
                <strong>Adjust the Crop Area:</strong> Our tool automatically locks the aspect ratio to the required 3.5cm x 4.5cm proportions. Simply adjust the crop frame so that your face is clearly visible, centered, and covers roughly 70% to 80% of the active image area.
              </li>
              <li>
                <strong>Optimize the File Size:</strong> Once cropped, the tool's smart compression algorithm automatically reduces the image data so that it falls perfectly within the mandatory 20KB to 50KB target. It ensures your face remains sharp and fully recognizable.
              </li>
              <li>
                <strong>Download & Apply:</strong> Save the optimized JPEG file to your device. Your newly resized photograph is now 100% compliant and ready to be uploaded to the official SSC registration portal without any errors.
              </li>
            </ol>

            <h3>Frequently Asked Questions (FAQ)</h3>
            
            <h4>1. What happens if my photo size is over 50KB or under 20KB?</h4>
            <p>
              The official SSC application portal will immediately flag an error and reject the upload, preventing you from submitting your SSC CGL 2026 form. Our tool eliminates this frustration by guaranteeing your final exported file sits exactly inside the accepted 20KB to 50KB range.
            </p>

            <h4>2. Is a printed date required on the SSC CGL photo?</h4>
            <p>
              Recent Staff Selection Commission notifications have dropped the strict requirement for a date printed directly on the photograph itself. However, the photo must be recent (taken within three months of the official notification date). Always double-check the latest exam notice for any recent changes, but rest assured our resizer handles the core dimension and size requirements perfectly.
            </p>

            <h4>3. Can I wear spectacles or glasses in my uploaded SSC photo?</h4>
            <p>
              Absolutely not. SSC strictly prohibits photographs where candidates are wearing spectacles, caps, or dark glasses. Even if you wear prescription glasses daily, you must remove them for this photograph. Uploading a photo while wearing glasses is the number one reason for automatic rejection of candidacy.
            </p>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
