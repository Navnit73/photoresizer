import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Target, Download, Check, TrendingDown, Settings2 } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { SEOContent50KB } from "@/components/sections/SEOContent50KB";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Undo2, RotateCcw } from "lucide-react";
import { AmazonAd } from "@/components/shared/AmazonAd";

export default function ReducePhotoSize50KB() {
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

  const [targetSize, setTargetSize] = useState<number>(50);

  return (
    <>
      <Helmet>
        <title>Photo Compressor – Reduce Image Size to 50KB Online</title>
        <meta
          name="description"
          content="Compress images to exact KB or MB size instantly. Free, fast & secure photo compressor for government forms."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-10">
          <header className="text-center space-y-4 mb-8 sm:mb-12">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
              Free Online Photo Compressor
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              Reduce photo size to 10KB, 20KB, 50KB, 100KB or any custom size.
              Works fully in your browser.
            </p>
          </header>

          {!imageState.originalUrl ? (
            /* ================= UPLOAD STATE ================= */
            <div className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
              <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
            </div>
          ) : (
            /* ================= EDITOR STATE ================= */
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
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

              {/* Main Grid */}
              <div className="grid lg:grid-cols-[380px_1fr] gap-4 sm:gap-6">
                
                {/* SETTINGS COLUMN */}
                <aside className="space-y-4 h-fit">
                  
               

                  {/* Standard Controls */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
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
                </aside>

                {/* PREVIEW COLUMN */}
                <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 sm:p-4 shadow-sm">
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
                        Original
                      </div>
                      <InteractiveCanvas
                        imageState={imageState}
                        onCropApply={applyCrop}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
                        Preview
                      </div>
                      <div className="space-y-4">
                        <DownloadButton
                          onDownload={() => processAndDownload(targetSize)}
                          disabled={isProcessing}
                        />
                        <LivePreview imageState={imageState} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="block lg:hidden space-y-4">
                    <InteractiveCanvas
                      imageState={imageState}
                      onCropApply={applyCrop}
                    />
                    
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 lg:static lg:border-none lg:bg-transparent lg:p-0">
                       <DownloadButton
                          onDownload={() => processAndDownload(targetSize)}
                          disabled={isProcessing}
                        />
                    </div>
                     <LivePreview imageState={imageState} />
                  </div>
                </section>

          <div className="py-2">
            <AmazonAd />
          </div>
              </div>
            </div>
          )}

          <div className="mt-12 sm:mt-24">
            <SEOContent50KB />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
