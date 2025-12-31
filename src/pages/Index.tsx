import { motion, AnimatePresence } from "framer-motion";
import { Undo2, RotateCcw } from "lucide-react";

import { useImageEditor } from "@/hooks/useImageEditor";
import { UploadZone } from "@/components/editor/UploadZone";
import { EditorControls } from "@/components/editor/EditorControls";
import { InteractiveCanvas } from "@/components/editor/InteractiveCanvas";
import { LivePreview } from "@/components/editor/LivePreview";
import { DownloadButton } from "@/components/editor/DownloadButton";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookmarkPopup } from "@/components/layout/BookmarkPopup";
import { ContentSections } from "@/components/sections/ContentSections";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

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

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1 w-full max-w-8xl mx-auto px-2 sm:px-4 py-3">
          <AnimatePresence mode="wait">
            {!imageState.originalUrl ? (
              /* ================= UPLOAD STATE ================= */
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-xl mx-auto py-10"
              >
                <UploadZone onFileSelect={loadImage} />
              </motion.div>
            ) : (
              /* ================= EDITOR STATE ================= */
              <motion.div
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {/* ===== TOP BAR ===== */}
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-100 dark:bg-blue-500 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    {history.length > 1 && (
                      <motion.div whileTap={{ scale: 0.94 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={undo}
                          className="h-8 px-2 text-xs"
                        >
                          <Undo2 className="w-3.5 h-3.5 mr-1" />
                          Undo
                        </Button>
                      </motion.div>
                    )}

                    <motion.div whileTap={{ rotate: -10 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={reset}
                        className="h-8 px-2 text-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Reset
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* ===== MAIN LAYOUT ===== */}
                <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                  {/* ================= SETTINGS ================= */}
                  <motion.aside
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
                      bg-white dark:bg-slate-800
                      rounded-2xl border
                      border-slate-200 dark:border-slate-700
                      p-3
                      lg:sticky lg:top-20
                      max-h-[85vh] overflow-y-auto
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
                      onBackgroundChange={setBackgroundColor}
                      onQualityChange={setQuality}
                      onFormatChange={setFormat}
                      onApplyPreset={applyPreset}
                    />
                  </motion.aside>

                  {/* ================= CANVAS ================= */}
                  <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
                      bg-white dark:bg-slate-800
                      rounded-2xl border
                      border-slate-200 dark:border-slate-700
                      p-2 sm:p-3
                    "
                  >
                    {/* -------- MOBILE -------- */}
                    <div className="block lg:hidden space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="rounded-xl overflow-hidden shadow-sm"
                      >
                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                      </motion.div>

                      <div className="sticky bottom-3 z-20">
                        <motion.div whileTap={{ scale: 0.96 }}>
                          <DownloadButton
                            onDownload={processAndDownload}
                            isProcessing={isProcessing}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* -------- DESKTOP -------- */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-3">
                      {/* Original */}
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                      >
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          Original
                        </div>

                        <InteractiveCanvas
                          imageState={imageState}
                          onCropApply={applyCrop}
                        />
                      </motion.div>

                      {/* Preview */}
                      <motion.div
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                      >
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          Preview
                        </div>

                        <motion.div whileTap={{ scale: 0.97 }}>
                          <DownloadButton
                            onDownload={processAndDownload}
                            isProcessing={isProcessing}
                          />
                        </motion.div>

                        <LivePreview imageState={imageState} />
                      </motion.div>
                    </div>
                  </motion.section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <ContentSections />
        <Footer />
      </div>
    </>
  );
};

export default Index;
