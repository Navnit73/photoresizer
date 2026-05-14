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

import AdUnit from "@/components/shared/AdUnit";

const relatedLinks = [
  { label: "GRE Photo Size", href: "/gre-photo-size" },
  { label: "TOEFL Photo Size", href: "/toefl-photo-size" },
  { label: "Passport Photo Editor", href: "/passport-photo-editor" },
];

export default function GMATPhotoSize() {
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
        <title>
          GMAT Photo Maker Online | Exact Resizing & Cropping Securely
        </title>
        <meta
          name="description"
          content="Process your specific GMAT candidate test photo. Crop securely to accurate technical dimensions and handle background requirements immediately online."
        />
        <link
          rel="canonical"
          href="https://www.photoresizer.co.in/gmat-photo-size"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <div className="mb-8">
          <AdUnit type="sidebar" />
        </div>
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  GMAT ID Photo Format Guide & Automatic Editor
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Guarantee your MBA admissions testing experience avoids
                  delays. Upload, frame, and reduce your GMAT enrollment
                  photograph properly.
                </p>
              </div>

              {!imageState.originalUrl ? (
                <div
                  key="upload"
                  className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]"
                >
                  <UploadZone
                    onFileSelect={loadImage}
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div
                  key="editor"
                  className="space-y-3 animate-[fadeIn_0.5s_ease-out]"
                >
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
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 lg:sticky lg:top-20 max-h-[85vh] overflow-y-auto">
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
                          <InteractiveCanvas
                            imageState={imageState}
                            onCropApply={applyCrop}
                          />
                        </div>
                        <div>
                          <DownloadButton onDownload={processAndDownload} />
                          <LivePreview imageState={imageState} />
                        </div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={processAndDownload} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <div className="mb-8">
            <AdUnit type="sidebar" />
          </div>

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Streamline your GMAT Examination Photo Check</h2>
            <p>
              The Graduate Management Admission Test (GMAT) requires rigorous
              identity validation methodologies across testing platforms to
              preserve academic integrity. While your primary biometric
              verification occurs during your physical check-in on test day
              alongside a palm-vein scan, uploading a clean, flawlessly
              dimensioned profile/visa application picture solidifies your
              online portfolio. Use this dedicated editor to clear any final
              upload roadblocks immediately.
            </p>

            <h3>How Big Does the GMAT Candidate Photo Need To Be?</h3>
            <p>
              When uploading supplementary digital photos for associated
              Business School applications, GMAT portals, or connected visas,
              verify the file contains these critical physical characteristics:
            </p>
            <ul>
              <li>
                <strong>Dimensions/Size:</strong> Normally standard Passport
                proportions are the safest digital approach. Aim for roughly 600
                pixels wide by 600 pixels high (perfect square format).
              </li>
              <li>
                <strong>Lighting Setup:</strong> Absolutely flat, shadow-free
                illumination across your forehead and chin. Shadows obscure
                biometric checks.
              </li>
              <li>
                <strong>Framing Constraints:</strong> Ensure only your head and
                the top of your shoulders enter the frame. No distracting
                background objects or secondary people are permitted.
              </li>
              <li>
                <strong>Acceptable Extrusions:</strong> Religious headdresses
                are permitted, provided they don't hide cheekbones, chins, or
                brow lines. Any distracting accessories (sunglasses, massive
                jewelry) should be securely removed.
              </li>
              <li>
                <strong>File Type constraints:</strong> Output must universally
                be a standard .JPG rendering to ensure rapid database
                cataloging.
              </li>
            </ul>

            <h3>Optimizing Your Photo in 3 Steps</h3>
            <ol>
              <li>
                <strong>Load it In:</strong> Bypass installing sketchy software
                apps. Upload directly to our web interface from your local
                storage drive.
              </li>
              <li>
                <strong>Frame the Face:</strong> Tap the Square 1:1 option
                within the settings menu. Hover the grid overlay directly over
                your face, dragging corners exactly around the shoulder line.
              </li>
              <li>
                <strong>Compress without Quality Loss:</strong> Drag the slider
                setting down towards around the 250 KB milestone. Large MB
                photographs tend to time-out MBA application servers globally.
                Download instantly.
              </li>
            </ol>

            <h3>The Browser Security Advantage</h3>
            <p>
              Uploading photos possessing your face, name, and related academic
              records to random back-alley servers represents an immense
              personal data vulnerability. Free resizers often sell uploaded
              pictures to train machine learning data. Our application mitigates
              this entirely. All logic functions exist locally via your web
              browser engine. When you compress your GMAT image, the data
              literally never vacates the memory inside your own laptop.
            </p>

            <hr className="my-8" />

            <h2>Frequent GMAT Picture Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">
                  Does test-day checking compare my uploaded photo?
                </h4>
                <p className="text-sm mt-1">
                  Yes! Administrators physically compare the photo captured at
                  the Pearson checkout desk to your official physical ID, and
                  anything provided on standard profile uploads. Consistency
                  avoids investigation delays. Provide extremely recent photos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  Can I apply an Instagram-style filter?
                </h4>
                <p className="text-sm mt-1">
                  Under no circumstances. Any digital filtering that smoothens
                  skin texture, manipulates lighting contrast dramatically, or
                  alters cheek structures will trigger biometric system
                  rejections.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  Help! My photo file says it's 6MB and won't attach.
                </h4>
                <p className="text-sm mt-1">
                  Return to our editor, finalize your crop outline, and drop the
                  compression (quality) slider down from 95% down into the 70%
                  range. This won't drastically blur your face but successfully
                  condenses your 6MB file completely down into an uploadable
                  fraction (a few hundred KBs).
                </p>
              </div>
            </div>
          </article>

          <InternalLinks links={relatedLinks} />
        </main>

        <Footer />
      </div>
    </>
  );
}
