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
  { label: "Australia Visa Photo", href: "/australia-visa-photo" },
  { label: "US Visa Photo", href: "/us-visa-photo" },
  { label: "Passport Photo Editor", href: "/passport-photo-editor" },
];

export default function UKVisaPhoto() {
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
        <title>UK Visa Photo Size Maker | 35x45mm Dimensions Online</title>
        <meta
          name="description"
          content="Free online UK Visa photo resizer. Easily format and resize your photograph to strict United Kingdom UKVI Visa specifications (35 mm x 45 mm). Check requirements."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/uk-visa-photo" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  UK Visa Photo Size Maker (35x45mm)
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly format your photo strictly to the 35x45 mm UKVI (UK Visas and Immigration) physical standard constraints.
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
            <h2>Perfect Your UK Visa Application Photo (35x45mm)</h2>
            <p>
              When dealing with UKVI (United Kingdom Visas and Immigration) applications, your digital or physical identity photograph holds incredible weight. Whether you are submitting a standard Visitor Visa, applying for a Tier 2 Work Visa, or gaining entry clearance for Study pathways, the British government employs strictly standardized facial-metric validation systems. Submitting photographs at the standard US 2x2 specification will virtually guarantee rejection. You absolutely require the 35x45mm format.
            </p>

            <h3>Official UK Visa Photo Requirements (2024 Guidelines)</h3>
            <p>
              The guidelines set forth by the UK authorities align perfectly with standard European (Schengen) passport parameters. Note the strict head size constraints:
            </p>
            <ul>
              <li><strong>Exact Physical Dimensions:</strong> Must measure precisely 35 millimeters wide by 45 millimeters high if printing out physical hard-copies.</li>
              <li><strong>Digital Resolution Minimum:</strong> Minimum frame size must be at least 600 pixels wide by 750 pixels tall for online applications natively.</li>
              <li><strong>Surgical Head Size Measurement:</strong> The size of the head, from the crown (top of the hair) to the point of the chin, MUST be between 29 mm and 34 mm.</li>
              <li><strong>Background:</strong> Solid plain cream or light grey background completely free of shadows. Pure stark white is often rejected due to lack of contrast against pale skin tones.</li>
              <li><strong>File Format:</strong> `.JPEG`/`.JPG` format only for digital portal uploads.</li>
              <li><strong>File Size Constraints:</strong> Must strictly fall between 50 KB (minimum weight) and 10 MB (maximum weight on newer portals).</li>
              <li><strong>Age of Photograph:</strong> Taken within the last 1 month, perfectly mirroring your current appearance structure.</li>
            </ul>

            <h3>Step-by-Step Editor Guide: Designing Your UK Matrix</h3>
            <ol>
              <li>
                <strong>Use Our Tool's Aspect Ratios:</strong> When uploading to the interactive canvas engine above, utilize the `MM` input selection instead of pure pixel resolution. Enter `35mm` width and `45mm` height to ensure the crop outline calculates precisely against physical printers.
              </li>
              <li>
                <strong>Crop Centered:</strong> Position your face directly in the middle of the vertical box. Leave ample breathing room above your hair so the head size (chin to crown) measures roughly 29 to 34 mm. The UK photo is a standard European rectangle.
              </li>
              <li>
                <strong>Verify KB Weight:</strong> Slide the digital quality metric bar leftwards if the download estimate exceeds your specific portal's requirements (generally 50KB-10MB limits).
              </li>
              <li>
                <strong>Secure Processing:</strong> Click Export to generate a flawless digital translation completely securely. Your image never travels to our backend servers; it compiles directly into a clean byte-array right inside your actual browser cache memory. 
              </li>
            </ol>

            <hr className="my-8" />

            <h2>Common UK Visa & Passport Queries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I apply light digital retouching to my UK visa photo?</h4>
                <p className="text-sm mt-1"><strong>NO.</strong> UKVI strictly forbids any and all forms of digital retouching, "red-eye" reduction, or airbrushing algorithms. Altering the shape of your face or digitally removing blemishes will trigger biometric rejection algorithms.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I wear glasses in my UK Visa photo?</h4>
                <p className="text-sm mt-1">If you must wear glasses for medical reasons, the frames cannot cover any part of your eyes, and there must be absolutely no glare or reflections on the lenses. It is strongly recommended by UK officials to remove glasses entirely for the photograph.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Should I submit a stark white background?</h4>
                <p className="text-sm mt-1">Interestingly, the UK government explicitly prefers a "plain cream or light grey" background. Pure stark white backgrounds can sometimes wash out lighter skin tones, although they are generally accepted if the contrast remains high.</p>
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
