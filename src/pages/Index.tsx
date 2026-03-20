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
import AdUnit from "@/components/shared/AdUnit";

// Lazy-load below-fold content
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

      <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/20">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hero Section */}
          <div className="py-12 md:py-20 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
              Resize your photos 
              <br />
              <span className="text-primary">perfectly every time</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              The ultimate tool for SSC, UPSC, and government exams. Resize to exact dimensions or KB limits instantly in your browser.
            </p>
            
            {/* Ad Slot 1: Below Hero */}
            <div className="mb-8">
               <AdUnit slotId="8924610486" format="auto" />
            </div>
          </div>

          {!imageState.originalUrl ? (
            /* ================= UPLOAD STATE ================= */
            <div key="upload" className="max-w-2xl mx-auto mb-20 animate-fade-up">
              <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
            </div>
          ) : (
            /* ================= EDITOR STATE ================= */
            <div key="editor" className="mb-20 animate-fade-up">
              
              {/* ===== TOP BAR ===== */}
              <div className="flex items-center justify-between px-4 py-3 mb-6 rounded-xl bg-muted border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground pr-4 border-r border-border hidden sm:inline-block">
                    Edit Image
                  </span>
                  {history.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={undo} className="h-8">
                      <Undo2 className="w-4 h-4 mr-1.5" />
                      Undo
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={reset} className="h-8">
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* ===== MAIN LAYOUT ===== */}
              <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
                
                {/* ================= SETTINGS SIDEBAR ================= */}
                <aside className="order-2 lg:order-1 flex flex-col gap-6 lg:sticky lg:top-20">
                  <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
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
                  </div>
                  
                  {/* Ad Slot 3: Sidebar */}
                  <div className="hidden lg:block">
                     <AdUnit slotId="8924610486" style={{ display: 'inline-block', width: '300px', height: '250px' }} />
                  </div>
                </aside>

                {/* ================= CANVAS AREA ================= */}
                <section className="order-1 lg:order-2 bg-card rounded-2xl border border-border p-3 sm:p-4 shadow-sm">
                  
                  {/* -------- MOBILE -------- */}
                  <div className="block lg:hidden space-y-4">
                    <div className="rounded-xl overflow-hidden border border-border">
                      <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                      <div className="border-t border-border">
                        <LivePreview imageState={imageState} />
                      </div>
                    </div>
                    <div className="sticky bottom-4 z-20 bg-background/80 backdrop-blur pb-2 pt-2">
                      <DownloadButton onDownload={() => processAndDownload()} disabled={isProcessing} />
                    </div>
                  </div>

                  {/* -------- DESKTOP -------- */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Original Document
                      </div>
                      <div className="border border-border rounded-xl overflow-hidden bg-muted/30">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Live Preview
                      </div>
                      <div className="border border-border rounded-xl overflow-hidden bg-muted/30 mb-4">
                        <LivePreview imageState={imageState} />
                      </div>
                      <DownloadButton onDownload={() => processAndDownload()} disabled={isProcessing} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
          
          {/* Ad Slot 2: Below Editor/Upload */}
          <div className="mb-20">
            <AdUnit slotId="8924610486" format="horizontal" />
          </div>
        </main>

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
