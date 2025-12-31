import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContentSections } from "@/components/sections/ContentSections";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Undo2, RotateCcw } from "lucide-react";
import { BookmarkPopup } from "@/components/layout/BookmarkPopup";

const Index = () => {
  const {
    imageState,
    isProcessing,
    history,
    loadImage,
    updateDimensions,
    setRotation,
    setBackgroundColor,
    setQuality,
    setFormat,
    applyPreset,
    applyCrop,
    undo,
    processAndDownload,
    reset,
  } = useImageEditor();

  return (
    <>
      <SEO />
      <BookmarkPopup />
      
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="container max-w-8xl mx-auto px-2 py-4 flex-1">
          {!imageState.originalUrl ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto py-8"
            >
              <UploadZone onFileSelect={loadImage} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* === Top Bar === */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  {history.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={undo}
                      className="h-7 px-2 text-xs"
                    >
                      <Undo2 className="w-3 h-3 mr-1" />
                      Undo
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    className="h-7 px-2 text-xs"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* === Main Layout === */}
              <div className="p-2">
                <div className="grid lg:grid-cols-[320px_1fr] gap-3">
                  {/* === SETTINGS PANEL === */}
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide pb-2">
                      Settings
                    </div>

                    <EditorControls
                      imageState={imageState}
                      isProcessing={isProcessing}
                      onUpdateDimensions={updateDimensions}
                      onRotate={setRotation}
                      onBackgroundChange={setBackgroundColor}
                      onQualityChange={setQuality}
                      onFormatChange={setFormat}
                      onApplyPreset={applyPreset}
                    />
                  </div>

                  {/* === CANVAS AREA === */}
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                    {/* ===== MOBILE VIEW (NO PREVIEW) ===== */}
                    <div className="block lg:hidden space-y-3">
                      <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Edit
                      </div>

                      <InteractiveCanvas
                        imageState={imageState}
                        onCropApply={applyCrop}
                      />

                      <DownloadButton
                        onDownload={processAndDownload}
                        isProcessing={isProcessing}
                      />
                    </div>

                    {/* ===== DESKTOP VIEW (SIDE BY SIDE) ===== */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-3">
                      {/* Interactive */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Original
                        </div>

                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                      </div>

                      {/* Live Preview */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Preview
                        </div>

                        <DownloadButton
                          onDownload={processAndDownload}
                          isProcessing={isProcessing}
                        />

                        <LivePreview imageState={imageState} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <ContentSections />
        <Footer />
      </div>
    </>
  );
};

export default Index;