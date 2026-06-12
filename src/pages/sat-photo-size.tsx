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
  { label: "TOEFL Photo Size", href: "/toefl-photo-size" },
  { label: "IELTS Photo Size", href: "/ielts-photo-size" },
  { label: "GRE Photo Size", href: "/gre-photo-size" },
];

export default function SATPhotoSize() {
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
        <title>SAT Exam Photo Requirements & Resizer | Upload Perfect Photo</title>
        <meta
          name="description"
          content="Free SAT photo resizer online. Format your image to College Board SAT registration dimensions (2x2 inch, 2MB-3MB) fast and securely."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/sat-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  SAT Exam Photo Editor
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Quickly resize, format, and crop your photo specifically for College Board SAT Registration.
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
                                    {/* <AdUnit type="sidebar" /> */}

               </div>

          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Hassle-Free SAT Registration Photo Resizer</h2>
            <p>
              The College Board enforces stringent identification policies when candidates sit for the SAT. When completing your test registration, your uploaded headshot serves as your admission ticket photo and your roster ID. An incorrectly scaled photo—or one suffering from bad lighting or filters—can literally prevent you from entering the test center on exam day. Don't risk a cancellation; use this dedicated SAT Photo Maker to finalize a perfect image immediately.
            </p>

            <h3>Crucial SAT Photo Upload Requirements</h3>
            <p>
              To ensure full compliance, the College Board dictates clear physical specifications. Our browser-based resizer ensures you hit these benchmarks rapidly:
            </p>
            <ul>
              <li><strong>Dimensions (Pixels):</strong> Ranging strictly between 2 x 2 inches if printing. Digitally, a recognizable squarish ratio works best. Ensure full facial features are vividly detailed.</li>
              <li><strong>Head Size & Framing:</strong> Your head (chin to top of hair) must measure around 1 to 1 3/8 inches. The crop must not cut off your hairline. You must stare straight into the camera.</li>
              <li><strong>File Type constraints:</strong> Supported formats are simply .jpg, .gif, or .png. Note that GIF may reduce clarity, so we strictly output optimized High-Quality JPGs.</li>
              <li><strong>Visual Background:</strong> Solid, very plain color backgrounds only. White, off-white, or very pale neutral shades.</li>
              <li><strong>Prohibited Items in Picture:</strong> Heavy makeup, sunglasses, extreme fashion hats (religious garb excluded), earbuds, and severe glares down the middle of your glasses are strictly forbidden.</li>
            </ul>

            <h3>Create Your College Board Image In 3 Steps</h3>
            <ol>
              <li>
                <strong>Upload Safely:</strong> Toss in your freshly-taken smartphone headshot. You don't need a bulky professional SLR file, any good daylight smartphone shot against a blank wall will suffice.
              </li>
              <li>
                <strong>Square It:</strong> Force the square aspect ratio from our sidebar control. Slide your photo within the canvas until your shoulders are visible at the bottom baseline and your head is centered.
              </li>
              <li>
                <strong>Download and Attach:</strong> Export the perfect .jpg file and confidently upload it to the College Board application portal without worrying about annoying 'resolution too low' error prompts.
              </li>
            </ol>

            <h3>Why Do I Need This Specific Resizer?</h3>
            <p>
              Default tablet and desktop editors usually destroy EXIF data or forcibly stretch digital photographs rather than proportionally cropping them into a 1:1 format. These distortions guarantee immediate algorithmic rejection by standard exam portal software. Our SAT-specific editor maintains proportion scaling alongside an adjustable file-size compression slider for maximum reliability.
            </p>

            <hr className="my-8" />

            <h2>SAT Registration FAQs</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I use a school portrait photo?</h4>
                <p className="text-sm mt-1">Yes, standard school portraits are generally perfect for SAT registration assuming they were taken in the last 6 months and present a clear view of your face staring directly forward.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">What happens if the test center thinks my photo doesn't look like me?</h4>
                <p className="text-sm mt-1">If your appearance has drastically changed (heavy weight loss/gain, entirely different massive hair style) between registration and test day, security monitors might refuse admission. Ensure the image is extremely recent.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does my SAT photo require a formal suit or tie?</h4>
                <p className="text-sm mt-1">No formal attire is legally mandated. A simple, neat collared shirt or completely plain t-shirt is completely acceptable to College Board officials.</p>
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
