import { Undo2, RotateCcw, Sparkles } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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
   

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[100px] animate-pulse-slow mix-blend-multiply dark:mix-blend-lighten" />
          <div className="absolute top-[20%] right-[-5%] w-[35%] h-[50%] rounded-full bg-secondary/20 dark:bg-secondary/10 blur-[100px] animate-pulse-slow mix-blend-multiply dark:mix-blend-lighten" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent/20 dark:bg-accent/10 blur-[120px] animate-pulse-slow mix-blend-multiply dark:mix-blend-lighten" style={{ animationDelay: "4s" }} />
        </div>

        <Header />
        
        <div className="w-full max-w-4xl mx-auto mt-12 mb-6 px-4 relative z-10 animate-fade-up">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mx-auto mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm table">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free & Private
            </span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            Compress & Resize <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-slow">Perfectly Every Time</span>
          </h1>
          <p className="mt-4 text-center text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            The ultimate tool for SSC, UPSC, and government exams. Resize to exact dimensions or KB limits instantly in your browser.
          </p>
        </div>

        <p className="sr-only">
          This online photo resizer, image compressor, and photo editor helps you resize and compress images easily for government and exam forms in India. Using this generic photo resizer, you can adjust image size in KB, pixel, or cm, making it ideal for photo resizer 20KB, photo resizer 50KB, photo resizer 100KB, and exact requirements like PAN card photo resizer, SSC photo resizer, UPSC photo resizer, TNPSC photo compressor, Aadhaar photo resize, and passport photo resizer online. The tool also works as a powerful generic photo compressor in KB, allowing you to compress images to 10KB, 15KB, 20KB, 30KB, 40KB, 50KB, 100KB, 200KB, or even 500KB, making it a reliable online photo compressor and image size reducer in India. Whether you need a JPG photo compressor, JPEG to JPG converter, JPG to JPEG converter, or a fast online image resizer free, this tool ensures accurate compression, high quality, and instant download—without uploads or watermarks.
        </p>

        <main className="flex-1 w-full max-w-8xl mx-auto px-2 sm:px-4 py-3 relative z-10">
            {!imageState.originalUrl ? (
              /* ================= UPLOAD STATE ================= */
              <div
                key="upload"
                className="max-w-xl mx-auto py-6"
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
{/* 
        <AmazonAd /> */}

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
