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
  { label: "IELTS Photo Size", href: "/ielts-photo-size" },
  { label: "TOEFL Photo Size", href: "/toefl-photo-size" },
  { label: "GMAT Photo Size", href: "/gmat-photo-size" },
];

export default function PTEPhotoSize() {
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
        <title>PTE Exam Photo Size Requirements | Resize Image Online</title>
        <meta
          name="description"
          content="Prepare your digital application profile picture for the Pearson PTE Academic test. Free online cropping and photo size compression."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/pte-photo-size" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  PTE Exam Photo Resizer Plugin
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Quickly setup your candidate profile image in accordance with Pearson VUE and PTE academic parameters.
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
            <h2>The Importance of PTE Candidate Profiles</h2>
            <p>
              The Pearson Test of English (PTE) Academic primarily takes your official biometric test-day photo right at their examination centers before you sit for the exam. However, occasionally candidates require standard profile photos or specific digital visa documentation associated directly with their PTE scorecards. Ensuring that any digitally uploaded materials represent you correctly and professionally remains an essential piece of successful English language certification. 
            </p>

            <h3>General Application Requirements</h3>
            <p>
              If your specific Pearson VUE gateway or integrated visa application requests a standard identification profile picture to verify your account prior to your testing day, adhere strictly to these benchmarks to prevent sudden administrative headaches:
            </p>
            <ul>
              <li><strong>Physical Dimensions:</strong> Generally standard passport dimensions. About 2 x 2 inches, or 35 mm x 45 mm, depending strictly on your localized testing center/embassy requirements.</li>
              <li><strong>Backdrop & Lighting:</strong> Plain white background. Even, shadowless lighting across both cheeks and the bridge of the nose.</li>
              <li><strong>Focus on Subject:</strong> Only the test taker can be present in the photo. No visible hands, pets, friends, or props whatsoever.</li>
              <li><strong>Pixel Dimensions:</strong> A recognizable minimum such as 600 x 600 pixels normally prevents "blurry upload" errors on academic portals.</li>
            </ul>

            <h3>Our Cropping Tool Makes Standardizing Simple</h3>
            <ol>
              <li>
                <strong>Easy Image Upload:</strong> Grab any relatively well-lit selfie or headshot you have, avoiding dim bedroom lighting or heavy shadows.
              </li>
              <li>
                <strong>Drag and Center:</strong> Use our on-canvas interactive guides. Slide the crop borders so it focuses entirely from the middle of your chest to exactly above your head.
              </li>
              <li>
                <strong>Shrink the File Size:</strong> Large megapixel smartphone images often choke older university or Pearson VUE portals. Compress your image size via the slider down beneath 500 KB to absolutely guarantee a successful server upload.
              </li>
              <li>
                <strong>One-Click Download:</strong> Secure your fully-processed .jpg instantaneously. Zero images are retained on our servers.
              </li>
            </ol>

            <h3>Privacy Concerns During Your Application</h3>
            <p>
              When dealing with international visas, English proficiencies, and Pearson Scorecards, privacy becomes paramount. Free internet photo tools frequently harvest user's facial biometrics. You can trust our application, as the JavaScript rendering engine processes your image strictly within your local browser, transmitting nothing to backend storage buckets online.
            </p>

            <hr className="my-8" />

            <h2>Common Queries Relative to PTE Profiles</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Won't Pearson take my photo on test day anyway?</h4>
                <p className="text-sm mt-1">Yes, the official test day photo acts as biometric proof. However, creating profiles linking to universities or visas sometimes demands an independently verified standard profile picture ahead of time.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Does my ears need to be visibly showing?</h4>
                <p className="text-sm mt-1">It is strongly encouraged. Unless you wear a head covering for deep religious purposes, tucking your hair behind your ears guarantees rapid identity verification during stringent application procedures.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">My original photo is 4 Megabytes. Will this work?</h4>
                <p className="text-sm mt-1">Absolutely. Our tool processes heavy 4MB files directly on your machine, allowing you to use the compression slider to reduce it precisely into a manageable size like 150KB for rapid portal uploads.</p>
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
