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
  { label: "UK Visa Photo", href: "/uk-visa-photo" },
  { label: "Canada Visa Photo", href: "/canada-visa-photo" },
  { label: "US Visa Photo Tool", href: "/us-visa-photo" },
];

export default function AustraliaVisaPhoto() {
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
        <title>Australia Visa Photo Maker | 35x45mm to 40x50mm Editor</title>
        <meta
          name="description"
          content="Free online Australia Visa photo resizer. Easily format and resize your photograph to strict Australian Department of Home Affairs specifications (35x45mm to 40x50mm)."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/australia-visa-photo" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  Australia Visa Photo Size Maker
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Instantly format your photo strictly to the Australian Department of Home Affairs application specifications.
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
            <h2>Perfect Your Australia Visa Application Photo</h2>
            <p>
              When dealing with the Australian Department of Home Affairs (ImmiAccount) applications, your digital or physical identity photograph holds incredible weight. Whether you are submitting an ETA, applying for a Working Holiday Visa, or gaining entry clearance for Study pathways, the Australian government employs strictly standardized facial-metric validation systems.
            </p>

            <h3>Official Australian Visa Photo Requirements (2024 Guidelines)</h3>
            <p>
              The guidelines set forth by the Australian authorities are technically flexible regarding the physical frame, but exceptionally strict regarding facial percentages:
            </p>
            <ul>
              <li><strong>Physical Dimensions:</strong> Must measure between 35 mm to 40 mm wide and 45 mm to 50 mm high (a standard 35x45mm or 40x50mm frame).</li>
              <li><strong>Surgical Head Size Measurement:</strong> The size of the head, from the crown (top of the hair) to the point of the chin, MUST be between 32 mm and 36 mm. This is larger proportionally than most other countries. Your face must take up most of the frame.</li>
              <li><strong>Background:</strong> Plain, light-colored background completely free of shadows. The subject must be clearly contrasted against the background.</li>
              <li><strong>File Format:</strong> `.JPEG`/`.JPG` format only for digital ImmiAccount portal uploads.</li>
              <li><strong>File Size Constraints:</strong> Must strictly fall under 500 KB (maximum weight on newer portals). Usually 300KB is the sweet spot.</li>
              <li><strong>Age of Photograph:</strong> Taken within the last 6 months, perfectly mirroring your current appearance structure.</li>
              <li><strong>Print Quality:</strong> If providing physical copies, they must be printed on high-quality photographic paper with no digital manipulation.</li>
            </ul>

            <h3>Step-by-Step Editor Guide: Designing Your Australian Photo</h3>
            <ol>
              <li>
                <strong>Use Our Tool's Aspect Ratios:</strong> When uploading to the interactive canvas engine above, utilize the `MM` input selection instead of pure pixel resolution. Entering `35mm` width and `45mm` height is generally the safest consistent ratio.
              </li>
              <li>
                <strong>Crop Aggressively Centered:</strong> Position your face directly in the middle of the vertical box. Because the head size (chin to crown) must measure roughly 32 to 36 mm inside a 45mm frame, your face will appear much "closer" to the camera than a standard US photo.
              </li>
              <li>
                <strong>Verify KB Weight:</strong> Slide the digital quality metric bar leftwards if the download estimate exceeds your specific portal's requirements (generally 50KB-500KB limits).
              </li>
              <li>
                <strong>Secure Processing:</strong> Click Export to generate a flawless digital translation completely securely. Your image never travels to our backend servers; it compiles directly into a clean byte-array right inside your actual browser cache memory. 
              </li>
            </ol>

            <hr className="my-8" />

            <h2>Common Australian Visa & Passport Queries (FAQs)</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Can I apply light digital retouching to my Australian visa photo?</h4>
                <p className="text-sm mt-1"><strong>NO.</strong> The Australian government strictly forbids any and all forms of digital retouching, "red-eye" reduction, or airbrushing algorithms. Photographs must be completely unaltered digitally to pass facial recognition software.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Can I wear glasses in my Australian Visa photo?</h4>
                <p className="text-sm mt-1">Starting July 1st, 2018, glasses are no longer permitted in Australian passport or visa photos unless accompanied by a signed medical certificate stating they cannot be removed for severe medical reasons (e.g., severe light sensitivity). Standard corrective lenses must be removed.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Are shadows on the background acceptable?</h4>
                <p className="text-sm mt-1">No. Improper lighting that casts a heavy, dark shadow against the light-colored wall behind you is one of the leading causes of automated rejection within the ImmiAccount system. Ensure lighting is hitting your face evenly from the front.</p>
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
