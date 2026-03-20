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
  { label: "TOEFL Photo Size", href: "/toefl-photo-size" },
  { label: "GMAT Photo Size", href: "/gmat-photo-size" },
  { label: "SAT Photo Size", href: "/sat-photo-size" },
];

export default function GREPhotoSize() {
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
        <title>GRE Exam Photo Resizer | Dimensions & Requirements Checklist</title>
        <meta
          name="description"
          content="Ensure your GRE test-day application photo perfectly aligns with ETS digital standards. Quick, easy, and completely free online resizing tool."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/gre-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  GRE Exam Photo Format Tool
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Easily crop, compress, and confirm your GRE test enrollment headshot without losing image integrity.
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
  <div className="mb-8">
            <AdUnit type="sidebar" />
          </div>


          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Perfect Your Application Shot For the GRE</h2>
            <p>
              The Graduate Record Examinations (GRE) employs stringent facial verification parameters during enrollment, especially heavily leaning into ETS biometric requirements. Fumbling around manually attempting to conform a casual snapshot into an approved technical portal frequently results in annoying unspecific "error - dimension mismatch" messages. Our GRE photo size tool automatically handles these exact constraints.
            </p>

            <h3>Core ETS / GRE Photo Upload Specifications</h3>
            <p>
              Before uploading anything to your ETS portal, double-check that your finished .JPG aligns tightly with these institutional benchmarks:
            </p>
            <ul>
              <li><strong>Physical Size:</strong> The resulting image represents a 2 x 2-inch square (51 x 51 mm) physical photograph.</li>
              <li><strong>Digital Ratio:</strong> Exact 1:1 Aspect Ratio. A 600 x 600 pixel square is often considered the most stable, reliable format constraint.</li>
              <li><strong>Background Canvas:</strong> The backdrop must be un-textured, cleanly lit plain white or very off-white. Avoid brick, wooden styling, and patterned wallpapers completely.</li>
              <li><strong>Pose and Lighting:</strong> Maintain direct eye contact with the camera lens. Provide an expressionless or neutral facade. Extreme smiling that alters cheekbone lines can create biometric flag errors down the line.</li>
              <li><strong>Age of Photograph:</strong> Taken specifically within the last 6 months. Do not use an old high-school photo if you are actively applying for graduate schooling years later.</li>
            </ul>

            <h3>Quick Tips for a Successful GRE Photo Editing Session</h3>
            <ol>
              <li>
                <strong>Capture Even Lighting:</strong> Stand facing a window inside your room, using a blank wall opposite the window. Soft, even lighting eliminates deep eye and cheek shadows.
              </li>
              <li>
                <strong>Lock the Crop:</strong> Use the dedicated square (1:1) selector in the sidebar panel. Scale the highlighted zone so your chin sits just above the bottom, and your hair rests comfortably beneath the top border.
              </li>
              <li>
                <strong>Reduce Web-Size Overload:</strong> Shrink down modern raw photo megabytes using the built-in final compression slider. Often, maintaining a file weight just under 200 KB ensures instantaneous success without freezing the ETS upload site.
              </li>
            </ol>

            <h3>Why Opt For This Free Resizer?</h3>
            <p>
              Rather than installing heavy desktop applications or signing over personal data to a commercial app, our script functions solely through your browser caching. Your facial tracking biometric data is never handed over to servers. Process, resize securely, and delete local caches at will. Maximum safety coupled with maximum efficiency.
            </p>

            <hr className="my-8" />

            <h2>Common GRE Photo Hurdles (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I apply with my graduation picture wearing a cap and gown?</h4>
                <p className="text-sm mt-1">Unfortunately no. ETS policies explicitly ban uniforms, hats, and formal academic attire within standard application photographs to ensure uninterrupted biometric scanning of your cranial structure.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I use a copy of my scanned driver's license?</h4>
                <p className="text-sm mt-1">Images of other ID documents, magazine cutouts, or low-resolution scans from an actual driver's license fail the clarity check and are rejected immediately by ETS monitors.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">My image was rejected for 'Head Size'. How do I fix it?</h4>
                <p className="text-sm mt-1">You zoomed out too far. Your head and shoulders should fill 70% to 80% of the entire square canvas. Return to our cropping slider and pull the borders closer to your ears. </p>
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
