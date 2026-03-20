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
  { label: "US Visa Photo Tool", href: "/us-visa-photo" },
  { label: "UK Visa Photo Task", href: "/uk-visa-photo" },
  { label: "Passport Photo Editor", href: "/passport-photo-editor" },
];

export default function CanadaVisaPhoto() {
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
        <title>Canada Visa Photo Size Maker | 50x70mm Dimensions Online</title>
        <meta
          name="description"
          content="Free online Canada Visa photo resizer. Easily format and resize your photograph to strict Canadian IRCC Visa specifications (50 mm x 70 mm). Check 2024 requirements."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/canada-visa-photo" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Canada Visa Photo Size Maker (50x70mm)
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly format your photo strictly to the 50x70 mm IRCC (Immigration, Refugees and Citizenship Canada) physical standard constraints.
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
            <h2>Perfect Your Canadian Visa Application Photo (50x70mm)</h2>
            <p>
              When dealing with IRCC (Immigration, Refugees and Citizenship Canada) applications, your digital or physical identity photograph holds incredible weight. Whether you are submitting a Permanent Resident card application, applying for a standard long-term Visitor Visa, or extending a Study Permit, the Canadian government employs notoriously precise facial-metric validation systems. Submitting photographs at the standard US 2x2 specification will virtually guarantee rejection. You absolutely require the 50x70mm format.
            </p>

            <h3>Official Canada Visa Photo Requirements (2024 Guidelines)</h3>
            <p>
              The guidelines set forth by the Canadian authorities differ drastically from standard passport parameters in other Western countries. Note the strict head size constraints:
            </p>
            <ul>
              <li><strong>Exact Physical Dimensions:</strong> Must measure precisely 50 mm wide by 70 mm high (2 inches wide by 2 3/4 inches long) if printing out physical hard-copies.</li>
              <li><strong>Digital Resolution Minimum:</strong> Minimum frame size must be 420 (width) x 540 (height) pixels for online applications natively.</li>
              <li><strong>Surgical Head Size Measurement:</strong> The size of the head, from the crown (top of the hair) to the point of the chin, MUST be between 31 mm and 36 mm (between 1 1/4 and 1 7/16 inches). This usually means you leave more white space horizontally above your scalp than standard photos.</li>
              <li><strong>Background:</strong> Solid plain white or light-colored background completely free of shadows. The difference between your face and the background must be clear.</li>
              <li><strong>File Format:</strong> `.JPEG`/`.JPG` format only for digital portal uploads.</li>
              <li><strong>File Size Constraints:</strong> Must strictly fall between 60 KB (minimum weight) and 240 KB (maximum weight - usually 4MB on newer portals but aim aggressively under 240kb to be safe during upload).</li>
              <li><strong>Age of Photograph:</strong> Taken within the last 6 months, perfectly mirroring your current appearance structure.</li>
            </ul>

            <h3>Step-by-Step Editor Guide: Designing Your Canadian Matrix</h3>
            <ol>
              <li>
                <strong>Use Our Tool's Aspect Ratios:</strong> When uploading to the interactive canvas engine above, utilize the `MM` input selection instead of pure pixel resolution. Enter `50mm` width and `70mm` height to ensure the crop outline calculates precisely against physical printers.
              </li>
              <li>
                <strong>Crop Centered:</strong> Position your face directly in the middle of the vertical box. Leave ample breathing room above your hair (the crown) to meet the 31-36mm head-height requirement. The Canadian photo is noticeably "taller" vertically.
              </li>
              <li>
                <strong>Verify KB Weight:</strong> Slide the digital quality metric bar leftwards if the download estimate exceeds your specific portal's requirements (generally 60-240KB limits).
              </li>
              <li>
                <strong>Secure Processing:</strong> Click Export to generate a flawless digital translation completely securely. Your image never travels to our backend servers; it compiles directly into a clean byte-array right inside your actual browser cache memory. 
              </li>
            </ol>

            <hr className="my-8" />

            <h2>Common Canadian Visa & Passport Queries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I apply light digital retouching to my Canadian visa photo?</h4>
                <p className="text-sm mt-1"><strong>NO.</strong> IRCC strictly forbids any and all forms of digital retouching or airbrushing algorithms. Altering the shape of your face, digitally "removing" scars, or painting over completely dark shadows will trigger biometric rejection algorithms.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Are Canadian passport photos and visa photos identically sized?</h4>
                <p className="text-sm mt-1">Yes! Both strictly mandate the 50x70 mm (2 x 2 3/4 inches) dimensions. You can universally use this specific 50x70mm configuration tool for both citizenship applications and temporary visitor visa extensions simultaneously without issue.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Should I submit color or black-and-white photos?</h4>
                <p className="text-sm mt-1">IRCC officially accepts both brilliant true color OR sharp black-and-white photographs—assuming they accurately reflect a crystal clear high-contrast representation of the subject. However, digital portals heavily prefer sRGB true color uploads universally.</p>
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
