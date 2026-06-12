import { useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Scissors,
  Sparkles,
  Zap,
  ShieldCheck,
  Images,
  ImagePlus,
  RotateCcw,
  Download,
  ArrowRight,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import { useBackgroundRemoval } from "@/hooks/useBackgroundRemoval";
import type { BgColor, OutputFormat } from "@/hooks/useBackgroundRemoval";
import { BgRemovalUploadZone } from "@/components/bg-removal/BgRemovalUploadZone";
import { BgRemovalPreview } from "@/components/bg-removal/BgRemovalPreview";
import { BgRemovalControls } from "@/components/bg-removal/BgRemovalControls";
import { BulkImageGrid } from "@/components/bg-removal/BulkImageGrid";
import { BulkProgressTracker } from "@/components/bg-removal/BulkProgressTracker";

// ── Feature data ──────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-powered accuracy",
    description:
      "Deep learning model handles complex hair, fur, and semi-transparent edges precisely.",
  },
  {
    icon: ShieldCheck,
    title: "100% private",
    description:
      "All processing runs in your browser via WebAssembly. Your photos never leave your device.",
  },
  {
    icon: Images,
    title: "Bulk processing",
    description:
      "Upload up to 20 images at once, track progress per image, and download all as a ZIP.",
  },
  {
    icon: Zap,
    title: "Fast results",
    description:
      "Transparent PNG or WEBP in seconds. Choose custom backgrounds — white, black, or any color.",
  },
];

const HOW_TO_STEPS = [
  {
    step: "1",
    title: "Upload your image",
    desc: "Drop a photo or select from your device. JPG, PNG, and WEBP supported.",
  },
  {
    step: "2",
    title: "AI removes the background",
    desc: "The model runs in your browser and precisely isolates the subject.",
  },
  {
    step: "3",
    title: "Download your result",
    desc: "Pick a background color, choose PNG or WEBP, and save instantly.",
  },
];

// ── Component ────────────────────────────────────────────────────────

export default function RemoveBackground() {
  const {
    singleResult,
    removeSingleBackground,
    bulkResults,
    removeBulkBackgrounds,
    isProcessing,
    overallProgress,
    cancelProcessing,
    reset,
    compositeWithBg,
  } = useBackgroundRemoval();

  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [selectedBulkIndex, setSelectedBulkIndex] = useState<number | null>(null);
  const bulkStartTime = useRef<number | null>(null);

  const hasUploaded =
    activeTab === "single" ? singleResult !== null : bulkResults.length > 0;

  // ─── Handlers ────────────────────────────────────────────────────

  const handleSingleUpload = useCallback(
    (file: File) => {
      removeSingleBackground(file);
    },
    [removeSingleBackground]
  );

  const handleBulkUpload = useCallback(
    (files: File[]) => {
      bulkStartTime.current = Date.now();
      setSelectedBulkIndex(0);
      removeBulkBackgrounds(files);
    },
    [removeBulkBackgrounds]
  );

  // Bug fix: reset selectedBulkIndex and bulkStartTime on reset
  const handleReset = useCallback(() => {
    reset();
    setSelectedBulkIndex(null);
    bulkStartTime.current = null;
  }, [reset]);

  // Bug fix: also reset state on tab switch, not just call handleReset without resetting tab
  const handleTabChange = useCallback(
    (tab: "single" | "bulk") => {
      if (isProcessing) return;
      // Reset everything before switching
      reset();
      setSelectedBulkIndex(null);
      bulkStartTime.current = null;
      setActiveTab(tab);
    },
    [isProcessing, reset]
  );

  // ─── Download logic ─────────────────────────────────────────────

  const handleDownloadSingle = useCallback(
    async (bgColor: BgColor, format: OutputFormat, quality: number) => {
      if (!singleResult?.resultBlob) return;
      const finalBlob = await compositeWithBg(singleResult.resultBlob, bgColor, format, quality);
      const ext = format === "image/webp" ? "webp" : "png";
      const name = singleResult.originalFile.name.replace(/\.[^.]+$/, `-no-bg.${ext}`);
      saveAs(finalBlob, name);
    },
    [singleResult, compositeWithBg]
  );

  const handleDownloadAll = useCallback(
    async (bgColor: BgColor, format: OutputFormat, quality: number) => {
      const doneItems = bulkResults.filter((r) => r.status === "done" && r.resultBlob);
      if (doneItems.length === 0) return;
      const zip = new JSZip();
      const ext = format === "image/webp" ? "webp" : "png";
      for (const item of doneItems) {
        const finalBlob = await compositeWithBg(item.resultBlob!, bgColor, format, quality);
        const name = item.originalFile.name.replace(/\.[^.]+$/, `-no-bg.${ext}`);
        zip.file(name, finalBlob);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `bg-removed-${doneItems.length}-images.zip`);
    },
    [bulkResults, compositeWithBg]
  );

  // Bug fix: guard selectedBulkIndex against out-of-bounds after reset
  const selectedBulkItem =
    selectedBulkIndex !== null &&
    bulkResults[selectedBulkIndex] != null
      ? bulkResults[selectedBulkIndex]
      : null;

  return (
    <>
      <Helmet>
        <title>
          Remove Background from Image Free — AI Background Remover | PhotoResizer
        </title>
        <meta
          name="description"
          content="Free AI background remover. Remove backgrounds in your browser instantly. Bulk processing, transparent PNG, custom colors. 100% private — no uploads."
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/remove-background" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        {/* ── Hero ── */}
        <section className="py-10 md:py-14 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="container px-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-4">
              <Scissors className="w-3.5 h-3.5" />
              AI Background Remover
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              Remove image<br className="hidden sm:block" /> backgrounds instantly
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
              AI-powered, runs entirely in your browser. Single image or bulk — always free, always private.
            </p>
          </div>
        </section>

        <main className="flex-1">
          {/* ═══════ Editor ═══════ */}
          <section className="py-8 md:py-12">
            <div className="container px-3 sm:px-4 max-w-7xl mx-auto">

              {/* Tab switcher */}
              <div className="max-w-xs mx-auto mb-6">
                <div className="flex p-1 bg-slate-200 dark:bg-slate-700 rounded-xl">
                  {(["single", "bulk"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      disabled={isProcessing}
                      className={`
                        flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold
                        transition-all duration-200 disabled:opacity-50
                        ${activeTab === tab
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        }
                      `}
                    >
                      {tab === "single" ? (
                        <><ImagePlus className="w-3.5 h-3.5" /> Single</>
                      ) : (
                        <><Images className="w-3.5 h-3.5" /> Bulk</>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Upload state ── */}
              {!hasUploaded && (
                <div className="max-w-xl mx-auto animate-[fadeInUp_0.4s_ease-out]">
                  <BgRemovalUploadZone
                    mode={activeTab}
                    onFileSelect={handleSingleUpload}
                    onFilesSelect={handleBulkUpload}
                    disabled={isProcessing}
                  />
                </div>
              )}

              {/* ── Single mode: after upload ── */}
              {hasUploaded && activeTab === "single" && singleResult && (
                <div className="animate-[fadeIn_0.4s_ease-out]">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" />
                      New image
                    </Button>
                    {singleResult.status === "done" && (
                      <Button
                        size="sm"
                        onClick={() => handleDownloadSingle("transparent", "image/png", 0.92)}
                        className="text-xs gap-1.5 bg-violet-600 hover:bg-violet-700 text-white"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Quick download PNG
                      </Button>
                    )}
                  </div>

                  {/* Layout — controls sidebar + preview */}
                  <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto order-2 lg:order-1">
                      <BgRemovalControls
                        mode="single"
                        singleResult={singleResult}
                        bulkResults={[]}
                        isProcessing={isProcessing}
                        onDownloadSingle={handleDownloadSingle}
                        onDownloadAll={handleDownloadAll}
                        onReset={handleReset}
                      />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 order-1 lg:order-2">
                      <BgRemovalPreview result={singleResult} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Bulk mode: after upload ── */}
              {hasUploaded && activeTab === "bulk" && bulkResults.length > 0 && (
                <div className="animate-[fadeIn_0.4s_ease-out]">
                  {/* Toolbar */}
                  <div className="flex items-center justify-between mb-3 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      disabled={isProcessing}
                      className="text-xs gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Start over
                    </Button>
                  </div>

                  {/* Progress tracker */}
                  <div className="mb-3">
                    <BulkProgressTracker
                      results={bulkResults}
                      overallProgress={overallProgress}
                      isProcessing={isProcessing}
                      onCancel={cancelProcessing}
                      startTime={bulkStartTime.current}
                    />
                  </div>

                  {/* Layout — controls + main area */}
                  <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-3">
                    {/* Controls sidebar */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto order-last lg:order-first">
                      <BgRemovalControls
                        mode="bulk"
                        singleResult={null}
                        bulkResults={bulkResults}
                        isProcessing={isProcessing}
                        onDownloadSingle={handleDownloadSingle}
                        onDownloadAll={handleDownloadAll}
                        onReset={handleReset}
                      />
                    </div>

                    {/* Grid + selected preview */}
                    <div className="space-y-3 min-w-0">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                        <BulkImageGrid
                          results={bulkResults}
                          onSelectItem={setSelectedBulkIndex}
                          selectedIndex={selectedBulkIndex}
                        />
                      </div>

                      {selectedBulkItem && (
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4">
                          <BgRemovalPreview result={selectedBulkItem} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ═══════ Features ═══════ */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
            <div className="container px-4 max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
                Why use our background remover
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {FEATURES.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ How it works ═══════ */}
          <section className="py-12 md:py-16">
            <div className="container px-4 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
                How it works
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {HOW_TO_STEPS.map(({ step, title, desc }, i) => (
                  <div key={step} className="flex sm:flex-col items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-600 text-white font-bold text-sm flex items-center justify-center">
                      {step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                    {i < HOW_TO_STEPS.length - 1 && (
                      <ArrowRight className="hidden sm:block text-slate-300 dark:text-slate-600 w-5 h-5 absolute" style={{ display: "none" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ Use cases ═══════ */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
            <div className="container px-4 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                When to use background removal
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    title: "E-commerce & product photos",
                    desc: "Clean product listings with transparent or white backgrounds for Amazon, Shopify, and more.",
                  },
                  {
                    title: "Social media & marketing",
                    desc: "Design thumbnails and posts with custom backgrounds to match your brand.",
                  },
                  {
                    title: "Passport & ID photos",
                    desc: "Replace backgrounds with solid white or light blue as required by agencies worldwide.",
                  },
                  {
                    title: "Presentations & design",
                    desc: "Extract subjects for use in slides, flyers, banners, and graphic design projects.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════ FAQ ═══════ */}
          <article className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Frequently asked questions
            </h2>
            {[
              {
                q: "Is it really free?",
                a: "Yes — no watermarks, no sign-ups, no hidden limits. The AI model runs in your browser, so there are no server costs to recover.",
              },
              {
                q: "Are my photos safe?",
                a: "Your images are processed entirely on your device using WebAssembly. They are never sent to any server, and disappear when you close the tab.",
              },
              {
                q: "What formats are supported?",
                a: "You can upload JPG, PNG, and WEBP images. Output can be PNG (for transparency) or WEBP (for smaller files). You can also apply a solid background color before downloading.",
              },
              {
                q: "Why does the first image take longer?",
                a: "The AI model (~40MB) downloads and initializes the first time. Your browser caches it, so subsequent images process much faster.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-200 dark:border-slate-700 pb-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}