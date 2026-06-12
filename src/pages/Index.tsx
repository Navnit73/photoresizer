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
import { ExamDirectory } from "@/components/shared/ExamDirectory";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              The ultimate tool for SSC, UPSC, and government exams. Resize to exact dimensions or KB limits instantly in your browser.
            </p>
            <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/more-tools" className="inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-full font-semibold transition-colors">
                View All State & Central Exam Resizer Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Ad Slot 1: Below Hero */}
            <div className="mb-8">
               <AdUnit type="sidebar" />
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
                  <div className="py-3">
                     <AdUnit type="sidebar" />
                  </div>
                </aside>

                {/* ================= CANVAS AREA ================= */}
                <section className="order-1 lg:order-2 bg-card rounded-2xl border border-border p-3 sm:p-4 shadow-sm w-full max-w-full overflow-hidden">
                  
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
          <div className="mb-2">
            <AdUnit type="sidebar" />
          </div>

          <div style={{ border: "1px solid #eee", padding: "22px", borderRadius: "14px", background: "#f9fafc", textAlign: "center", marginTop: "20px", marginBottom: "40px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "10px", color: "#111827" }}>
              Didn’t crack your government exam? Your journey doesn’t end here 🌍
            </h3>
            <p style={{ fontSize: "14px", color: "#555", marginBottom: "18px", lineHeight: 1.6 }}>
              Thousands of students and professionals are exploring opportunities abroad for higher studies, jobs, and travel. 
              The first step? Get your documents ready — starting with a perfect visa or passport photo.
            </p>
            <div style={{ marginBottom: "10px" }}>
              <a 
                href="https://www.pixpassport.com/" 
                target="_blank" 
                rel="dofollow noopener noreferrer"
                style={{ display: "inline-block", margin: "6px", padding: "10px 16px", background: "#111827", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                Visit PixPassport
              </a>
            </div>
            <div>
              <a 
                href="https://www.pixpassport.com/schengen-visa-photo-editor" 
                target="_blank" 
                rel="dofollow noopener noreferrer"
                style={{ display: "inline-block", margin: "6px", padding: "10px 16px", background: "#4f46e5", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                Schengen Visa Photo Tool
              </a>
              <a 
                href="https://www.pixpassport.com/us-visa-photo-editor" 
                target="_blank" 
                rel="dofollow noopener noreferrer"
                style={{ display: "inline-block", margin: "6px", padding: "10px 16px", background: "#2563eb", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                US Visa Photo Tool
              </a>
              <a 
                href="https://www.pixpassport.com/uk-visa-photo-editor" 
                target="_blank" 
                rel="dofollow noopener noreferrer"
                style={{ display: "inline-block", margin: "6px", padding: "10px 16px", background: "#059669", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                UK Visa Photo Tool
              </a>
              <a
                href="https://www.pixpassport.com/australia-visa-photo-editor"
                target="_blank"
                rel="dofollow noopener noreferrer"
                style={{ display: "inline-block", margin: "6px", padding: "10px 16px", background: "#dc2626", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                Australia Visa Photo Tool
              </a>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Link
                to="/passport-photo-print-template-generator"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: "6px", padding: "10px 16px", background: "#059669", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                Passport Photo Print Template
              </Link>
              <Link
                to="/bg-removal"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", margin: "6px", padding: "10px 16px", background: "#7c3aed", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>
                AI Background Remover
              </Link>
            </div>
          </div>
        </main>

        <Suspense fallback={null}>
          <ContentSections />
        </Suspense>
        
        <ExamDirectory />
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
