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
  { label: "Canada Visa Photo", href: "/canada-visa-photo" },
  { label: "UK Visa Photo", href: "/uk-visa-photo" },
  { label: "Passport Photo Editor", href: "/passport-photo-editor" },
];

export default function USVisaPhoto() {
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
        <title>US Visa Photo Tool | Create 600x600 px Visa Photos Online</title>
        <meta
          name="description"
          content="Free online US Visa photo maker. Perfectly resize and format your photograph to the exact 600x600 pixel requirements for United States visa applications."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/us-visa-photo" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  US Visa 600x600 Photo Tool
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly format your photo strictly to the 2x2 inch (600x600px) US Department of State criteria.
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
                      <div className="w-full relative py-2 flex justify-center mb-4 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
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

  
          {/* ================= SEO CONTENT ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Perfect Your US Visa Application Photo</h2>
            <p>
              The United States Department of State employs one of the strictest photographic biometric screening processes globally. Applying for a B1/B2 tourist visa, an F1 student visa, or an H1B work visa requires a pristine digital photograph meeting extreme technical thresholds. A single shadow or improper physical ratio will result in your DS-160 application being rejected.
            </p>

            <h3>Official US Visa Photo Requirements (2024 Guidelines)</h3>
            <p>
              The US government explicitly defines both the visual aesthetics and the digital binary properties of a compliant visa photograph:
            </p>
            <ul>
              <li><strong>Physical Dimensions:</strong> Precisely 2 x 2 inches (51 x 51 mm) if printing physically.</li>
              <li><strong>Digital Dimensions:</strong> A perfect square minimum of 600 x 600 pixels and a maximum of 1200 x 1200 pixels.</li>
              <li><strong>Head Size Ratio:</strong> Your head (measured from the top of the hair to the bottom of the chin) must calculate between 1 inch and 1 3/8 inches (50% to 69% of the total height).</li>
              <li><strong>Background:</strong> Pure, stark white or off-white. No shadows cast upon the wall behind you.</li>
              <li><strong>File Format:</strong> Only `.JPEG` or `.JPG` files are accepted by the DS-160 digital portal.</li>
              <li><strong>File Size Weight:</strong> Must be strictly less than or equal to 240 KB (kilobytes) in disk space.</li>
              <li><strong>Color Space:</strong> sRGB true color ONLY; black and white outputs are instantly rejected.</li>
            </ul>

            <h3>Step-by-Step Guide: Making Your DS-160 Photo</h3>
            <ol>
              <li>
                <strong>Stand Against a White Wall:</strong> Ensure lighting is hitting your face evenly from the front so neither cheek is shadowed.
              </li>
              <li>
                <strong>Upload to Our Tool:</strong> Once you snap the picture, upload it securely into the 600x600px editor sandbox above.
              </li>
              <li>
                <strong>Crop Perfectly:</strong> Use our bounding box interactive tool. We recommend setting the pixel dimensions explicitly to `600px Width` and `600px Height`. Center your face dynamically inside the box preview.
              </li>
              <li>
                <strong>Compress Below 240KB:</strong> Use the quality slider on the left to reduce the file weight. The preview logic will estimate your final KB weight before downloading.
              </li>
              <li>
                <strong>Download and Attach:</strong> Pull the JPG file and upload it immediately to your CEAC DS-160 confirmation page. Our algorithms enforce the math securely without retaining your photo.
              </li>
            </ol>

            <hr className="my-8" />

            <h2>Common US Visa Photo Questions (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I wear glasses in my US Visa photo?</h4>
                <p className="text-sm mt-1"><strong>NO.</strong> Starting November 1, 2016, eyeglasses are no longer permitted in new visa photos under any circumstances, barring extremely rare and documented medical exemptions occurring near the eyes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Are religious head coverings allowed?</h4>
                <p className="text-sm mt-1">Yes, if worn daily for religious significance. However, the covering cannot cast any shadows over the face, and the full face—from the bottom of the chin to the top of the forehead—must be visibly unobscured.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Is it okay to smile?</h4>
                <p className="text-sm mt-1">The US State Department requests a "neutral facial expression" with both eyes open. A subtle, natural, closed-mouth rest state is required. Do not flash a wide, toothy grin.</p>
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
