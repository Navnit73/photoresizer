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
import AdUnit from "@/components/shared/AdUnit";

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
   

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <h1 className="sr-only">
          Free Photo Resizer for SSC, UPSC, Banking & Government Exam Forms
        </h1>

        <p className="sr-only">
          This online photo resizer and photo compressor helps you resize and compress images easily for government and exam forms in India. Using this photo resizer online, you can adjust image size in KB, pixel, or cm, making it ideal for photo resizer 20KB, photo resizer 50KB, photo resizer 100KB, and exact requirements like PAN card photo resizer, SSC photo resizer, UPSC photo resizer, TNPSC photo compressor, Aadhaar photo resize, and passport photo resizer online. The tool also works as a powerful photo compressor in KB, allowing you to compress images to 10KB, 15KB, 20KB, 30KB, 40KB, 50KB, 100KB, 200KB, or even 500KB, making it a reliable online photo compressor and image size reducer in India. Whether you need a JPG photo compressor, JPEG to JPG converter, JPG to JPEG converter, or a fast online image resizer free, this tool ensures accurate compression, high quality, and instant download—without uploads or watermarks.
        </p>

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
                      onQualityChange={setQuality}
                      onFormatChange={setFormat}
                      onApplyPreset={applyPreset}
                    />

                    {/* Sidebar Ad - Desktop Only */}
                    {/* <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 hidden lg:block">
                      <AdUnit />
                    </div> */}
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
                        
                        <LivePreview imageState={imageState} />
                      </motion.div>

                      <div className="sticky bottom-3 z-20">
                        <motion.div whileTap={{ scale: 0.96 }}>
                          <DownloadButton
                            onDownload={processAndDownload}
                            disabled={isProcessing}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* -------- DESKTOP -------- */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-2">
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
                        className="space-y-1"
                      >
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                          Preview
                        </div>

                        <motion.div whileTap={{ scale: 0.97 }}>
                          <DownloadButton
                            onDownload={processAndDownload}
                            disabled={isProcessing}
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
