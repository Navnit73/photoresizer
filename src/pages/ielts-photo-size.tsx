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

const relatedLinks = [
  { label: "TOEFL Photo Size", href: "/toefl-photo-size" },
  { label: "SAT Photo Size", href: "/sat-photo-size" },
  { label: "Passport Photo Editor", href: "/passport-photo-editor" },
];

export default function IELTSPhotoSize() {
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
        <title>IELTS Photo Size Maker | Resize IELTS Exam Photo Online</title>
        <meta
          name="description"
          content="Free online IELTS photo resizer. Easily format and resize your photograph to IELTS exam visa specifications (35x45mm or passport size). Check requirements."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/ielts-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  IELTS Photo Size & Dimension Maker
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly resize and format your photograph precisely for the IELTS exam application.
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

          <div className="py-2">
            <AmazonAd />
          </div>

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Perfect Your IELTS Exam Photo</h2>
            <p>
              When applying for the IELTS (International English Language Testing System), ensuring your application photograph meets their specific standards is crucial. An incorrect photo can cause frustrating delays in your test registration or even rejection. This IELTS Photo Resizer tool automatically adjusts your image's dimensions and file size to match exact official testing and visa requirements without losing clarity.
            </p>

            <h3>IELTS Photo Specifications & Constraints</h3>
            <p>
              Depending on whether you are registering online via IDP/British Council or sending physical copies alongside a UKVI visa, there are a few standard benchmarks you need to hit:
            </p>
            <ul>
              <li><strong>Dimensions (Physical):</strong> Typically 35 mm wide by 45 mm high (passport size format) for physical copies.</li>
              <li><strong>Dimensions (Digital):</strong> Minimum 130 x 160 pixels, though often up to 800 x 800 pixels is acceptable online.</li>
              <li><strong>Background:</strong> Solid plain white or off-white background ONLY. No patterns or dark backgrounds.</li>
              <li><strong>File Format:</strong> JPEG/JPG or PNG format.</li>
              <li><strong>File Size:</strong> Usually must be under 1 MB, and often recommended below 500 KB to avoid upload timeouts.</li>
              <li><strong>Appearance:</strong> Neutral expression, glasses removed if they cause glare, and face taking up about 70-80% of the total frame.</li>
            </ul>

            <h3>How to Use the IELTS Photo Resizer Online</h3>
            <ol>
              <li>
                <strong>Upload your Image:</strong> Choose a well-lit, plain background image from your phone or computer.
              </li>
              <li>
                <strong>Crop intelligently:</strong> Align the bounding box so your face sits perfectly in the middle, filling up the majority of the frame.
              </li>
              <li>
                <strong>Adjust File Size (KB):</strong> Use the compression slider to reduce the physical file weight if your image exceeds the 1MB limit.
              </li>
              <li>
                <strong>Download instantly:</strong> Save the fully-processed, exam-ready image to your device and confidentially upload it to the IDP/IELTS portal. All processing happens locally, maintaining your ultimate privacy.
              </li>
            </ol>

            <h3>Why Do I Need a Specific IELTS Photo Size?</h3>
            <p>
              The digital photo you provide serves as identity proof on your final Test Report Form (TRF). Therefore, biometric scanners frequently rely on specific facial scaling and lighting to verify candidate identity during testing day. Getting this right from the onset eliminates registration anxieties.
            </p>

            <hr className="my-8" />

            <h2>Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I wear glasses in my IELTS photo?</h4>
                <p className="text-sm mt-1">If wearing glasses, they must not have tinted lenses, and the frames must not obscure your eyes. There should be absolutely no flash glare. Generally, it's safer to remove them entirely for the photograph.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">What happens if my photo size is above 1MB?</h4>
                <p className="text-sm mt-1">Most IELTS registration portals will outright reject the upload and prompt an error. Our tool compress your file seamlessly to below 500KB without blurring your facial features.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Is a white background strictly mandatory?</h4>
                <p className="text-sm mt-1">Yes! Avoid taking selfies against walls with wallpaper, outdoor scenery, or colored doors. A pure, solid white or lightly colored plain wall is standard.</p>
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
