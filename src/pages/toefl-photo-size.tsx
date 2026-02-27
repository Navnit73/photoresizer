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
  { label: "IELTS Photo Size", href: "/ielts-photo-size" },
  { label: "SAT Photo Size", href: "/sat-photo-size" },
  { label: "GRE Photo Size", href: "/gre-photo-size" },
];

export default function TOEFLPhotoSize() {
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
        <title>TOEFL Exam Photo Resizer | Correct Size & Dimensions Online</title>
        <meta
          name="description"
          content="Use our free TOEFL photo resizer to crop and compress your application picture to the required 2x2 inch (600x600 px) format instantly."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/toefl-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  TOEFL Exam Photo Resizer
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Ensure your TOEFL iBT application photo perfectly matches ETS requirements instantly.
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
            <h2>Format Your Application Photo for the TOEFL Exam</h2>
            <p>
              Educational Testing Service (ETS) implements strict rules for candidate photographs during TOEFL iBT exam registration. These measures exist to prevent fraud and definitively confirm your identity across testing centers worldwide. Fumbling with complicated photo editing software is tedious. With our specialized TOEFL Photo Maker tool, you simply upload, crop, and automatically match ETS dimensions.
            </p>

            <h3>What is the Official TOEFL Photo Size?</h3>
            <p>
              The digital photo upload specifications for the TOEFL essentially shadow US Passport rules. Ensure your uploaded file adheres to these specific constraints:
            </p>
            <ul>
              <li><strong>Dimensions/Resolution:</strong> Exact 1:1 aspect ratio. Generally, 600 x 600 pixels (minimum) up to 1200 x 1200 pixels is considered ideal.</li>
              <li><strong>Physical Equivalency:</strong> 2 x 2 inches (51 mm x 51 mm).</li>
              <li><strong>Format:</strong> High-quality JPG/JPEG is preferred. PNG is often accepted as well.</li>
              <li><strong>File Size Constraints:</strong> The image weight must be kept reasonably low (often under 240 KB to 1 MB). Use our compression tool to shave off excess kilobytes securely.</li>
              <li><strong>Visual Quality:</strong> Taken within the last 6 months. Standard plain white/off-white background. Full-face view directly facing the camera.</li>
            </ul>

            <h3>Quick Guide to Formatting Your TOEFL Image</h3>
            <ol>
              <li>
                <strong>Select your Photo:</strong> Ensure the background is un-textured and plain white. Head coverings are only permitted for religious reasons, and they cannot obscure the face.
              </li>
              <li>
                <strong>Enforce the 1:1 Crop:</strong> Apply a square (1:1) aspect ratio on the editor. Put your head smoothly in the central bounding box, leaving some headroom above your hairline.
              </li>
              <li>
                <strong>Compress if Needed:</strong> If you used a modern smartphone camera, your standard photo could be 3-5 Megabytes. Adjust the compression slider to reduce it precisely under the upload limit.
              </li>
              <li>
                <strong>Submit:</strong> Download the .jpg safely to your device and resume your ETS test booking seamlessly.
              </li>
            </ol>

            <h3>Why Do TOEFL Portraits Frequently Get Rejected?</h3>
            <p>
              The most common reasons images are bounced by ETS servers involve shadows cast across the face, digital photo alteration (heavy filters/Photoshop), and skewed aspect ratios (trying to upload rectangular photos instead of squares). 
            </p>

            <hr className="my-8" />

            <h2>Have Questions About the TOEFL Photo? (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">My photo is a 3:4 rectangle. Will ETS accept it?</h4>
                <p className="text-sm mt-1">No. The system will forcibly stretch or crop your rectangular photo, potentially chopping off your face or rejecting the file outright. Use our site to crop the image securely into a perfect square (1:1).</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I wear headphones or earbuds?</h4>
                <p className="text-sm mt-1">Absolutely not. Any electronic device, including hats, wireless earbuds, or large head-wraps (non-religious), are strictly forbidden in your examination profile photograph.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does this resizer keep my data private?</h4>
                <p className="text-sm mt-1">Yes, our entire cropping and optimization process happens within your web browser. Nothing gets transmitted to our application servers, hence your private identity photo never leaves your physical device.</p>
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
