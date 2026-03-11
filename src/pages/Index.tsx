import { Undo2, RotateCcw } from "lucide-react";
import { lazy, Suspense } from "react";

import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";

import { Header } from "@/components/layout/Header";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { AmazonAd } from "@/components/shared/AmazonAd";

// Lazy-load below-fold content to reduce initial bundle / main-thread work
const ContentSections = lazy(() => import("@/components/sections/ContentSections").then(m => ({ default: m.ContentSections })));
const Footer = lazy(() => import("@/components/layout/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
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
    lastUploadedFile
  } = useImageEditor();

  return (
    <>
      <SEO />
   

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <h1 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mt-8 mb-2 px-4">
          Free Photo Resizer, Compressor & Editor for SSC, UPSC, Banking & Government Exam Forms
        </h1>

        <p className="sr-only">
          This online photo resizer, image compressor, and photo editor helps you resize and compress images easily for government and exam forms in India. Using this generic photo resizer, you can adjust image size in KB, pixel, or cm, making it ideal for photo resizer 20KB, photo resizer 50KB, photo resizer 100KB, and exact requirements like PAN card photo resizer, SSC photo resizer, UPSC photo resizer, TNPSC photo compressor, Aadhaar photo resize, and passport photo resizer online. The tool also works as a powerful generic photo compressor in KB, allowing you to compress images to 10KB, 15KB, 20KB, 30KB, 40KB, 50KB, 100KB, 200KB, or even 500KB, making it a reliable online photo compressor and image size reducer in India. Whether you need a JPG photo compressor, JPEG to JPG converter, JPG to JPEG converter, or a fast online image resizer free, this tool ensures accurate compression, high quality, and instant download—without uploads or watermarks.
        </p>

        <main className="flex-1 w-full max-w-8xl mx-auto px-2 sm:px-4 py-3">
            {!imageState.originalUrl ? (
              /* ================= UPLOAD STATE ================= */
              <div
                key="upload"
                className="max-w-xl mx-auto py-10 animate-[fadeInUp_0.35s_ease-out]"
              >
                <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
              </div>
            ) : (
              /* ================= EDITOR STATE ================= */
              <div
                key="editor"
                className="space-y-3 animate-[fadeIn_0.3s_ease-out]"
              >
                {/* ===== TOP BAR ===== */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-100 dark:bg-blue-500 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    {history.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={undo}
                        className="h-8 px-2 text-xs active:scale-95 transition-transform"
                      >
                        <Undo2 className="w-3.5 h-3.5 mr-1" />
                        Undo
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={reset}
                      className="h-8 px-2 text-xs active:scale-95 transition-transform"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* ===== MAIN LAYOUT ===== */}
                <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                  {/* ================= SETTINGS ================= */}
                  <aside
                    className="
                      bg-white dark:bg-slate-800
                      rounded-2xl border
                      border-slate-200 dark:border-slate-700
                      p-3
                      lg:sticky lg:top-20
                      max-h-[85vh] overflow-y-auto
                      animate-[fadeIn_0.3s_ease-out]
                    "
                  >
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Settings
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
                  </aside>

                  {/* ================= CANVAS ================= */}
                  <section
                    className="
                      bg-white dark:bg-slate-800
                      rounded-2xl border
                      border-slate-200 dark:border-slate-700
                      p-2 sm:p-3
                      animate-[fadeIn_0.3s_ease-out]
                    "
                  >
                    {/* -------- MOBILE -------- */}
                    <div className="block lg:hidden space-y-3">
                      <div className="rounded-xl overflow-hidden shadow-sm">
                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                        
                        <LivePreview imageState={imageState} />
                      </div>

                      <div className="sticky bottom-3 z-20">
                        <div className="active:scale-[0.96] transition-transform">
                          <DownloadButton
                            onDownload={() => processAndDownload()}
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                    </div>

                    {/* -------- DESKTOP -------- */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                      {/* Original */}
                      <div className="space-y-2 animate-[fadeIn_0.3s_ease-out]">
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          Original
                        </div>

                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                      </div>

                      {/* Preview */}
                      <div className="space-y-1 animate-[fadeIn_0.3s_ease-out]">
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          Preview
                        </div>

                        <div className="active:scale-[0.97] transition-transform">
                          <DownloadButton
                            onDownload={() => processAndDownload()}
                            disabled={isProcessing}
                          />
                        </div>

                        <LivePreview imageState={imageState} />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
        </main>

        <AmazonAd />

        <Suspense fallback={null}>
          <ContentSections />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
