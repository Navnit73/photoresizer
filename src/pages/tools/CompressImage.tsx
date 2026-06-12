import { Helmet } from "react-helmet-async";
import { Minimize2, Download, Gauge, FileImage } from "lucide-react";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { HeroSection } from "@/components/shared/HeroSection";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
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

import AdUnit from "@/components/shared/AdUnit";

const features = [
  {
    icon: Minimize2,
    title: "Smart Compression",
    description: "Advanced compression algorithm automatically reduces file size while maintaining visual quality.",
  },
  {
    icon: Gauge,
    title: "Target File Sizes",
    description: "Compress images to exact sizes: 10KB, 20KB, 30KB, 50KB, 100KB, or any custom size you need.",
  },
  {
    icon: FileImage,
    title: "All Formats Supported",
    description: "Compress JPEG, JPG, PNG, and WEBP images. Convert between formats during compression.",
  },
  {
    icon: Download,
    title: "Batch Processing",
    description: "Compress multiple images one after another with consistent quality settings.",
  },
];

const steps = [
  {
    title: "Upload Your Image",
    description: "Select the image you want to compress. Supports JPG, JPEG, PNG, and WEBP formats up to 50MB.",
  },
  {
    title: "Set Target Size",
    description: "Choose from preset sizes (20KB, 50KB, 100KB) or use the quality slider to control compression level.",
  },
  {
    title: "Download Compressed Image",
    description: "Preview the result and download your compressed image with reduced file size.",
  },
];

export default function CompressImage() {
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
        <title>Compress Image Online Free - Reduce Photo Size to KB | Photo Compressor</title>
        <meta
          name="description"
          content="Free online image compressor. Reduce photo size to 10KB, 20KB, 50KB, or 100KB. Compress JPG, JPEG, PNG images without losing quality. Fast and secure."
        />
        <meta
          name="keywords"
          content="compress image, image compressor, reduce photo size, compress jpg, compress png, photo compressor in kb, online image compressor"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/compress-image" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <HeroSection
          Icon={Minimize2}
          subtitle="Image Optimizer"
          title="Compress Image Online Free"
          description="Reduce image file size without losing quality. Compress JPG, PNG, and WEBP images to specific sizes like 50KB or 100KB instantly."
        />

        <main className="flex-1">
          {/* Editor Section */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div
                  className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                    Upload Image to Compress
                  </h2>
                  <UploadZone 
                    onFileSelect={loadImage} 
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
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
                      <div className="w-full relative py-2 flex justify-center mb-4 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                          {/* <AdUnit type="sidebar" /> */}

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

     

          {/* Features */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Powerful Image Compression
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Compress Images" />

          {/* Info Section */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
                  When to Compress Images
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Government Forms</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      SSC, UPSC, banking exams, passport, Aadhaar, and PAN card applications often require photos under 50KB or 100KB.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Web Optimization</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Reduce image sizes for faster website loading, better SEO, and improved user experience.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Email Attachments</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Compress images to meet email size limits while maintaining readable quality.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Social Media</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Optimize images for faster uploads to Instagram, Facebook, Twitter, and other platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SEO ARTICLE & FAQs ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>Ultimate Guide to Compressing Images Online</h2>
            <p>
              When applying for jobs, registering for government portals, or maintaining a fast website, file size weight plays a huge role. Large images cause "file too large" errors on application portals and slow down web pages. Our free image compressor tool takes heavy 5MB photos and reliably squeezes them into tight 20KB, 50KB, or 100KB limits required by various guidelines without destroying the image data.
            </p>

            <h3>How Image Compression Actually Works</h3>
            <p>
              Digital images are made up of millions of pixels. Our intelligent web-based compression engine analyzes these pixels and groups similar colors together. By stripping out metadata (like location tracking from your smartphone camera) and selectively lowering the resolution, the physical file weight drops dramatically. We utilize a localized processing mechanism, meaning your browser's own computing power compresses the image. Your personal photos are never uploaded to our external servers.
            </p>

            <h3>Frequently Asked Questions (FAQ)</h3>
            
            <h4>Does compressing reduce my image quality?</h4>
            <p>
              Slightly, yes, because it uses "lossy" compression. However, the compression algorithms we use prioritize visual fidelity. At 50KB or 100KB, the naked eye can rarely detect any severe pixelation, making the compressed images perfectly fine for official documentation, ID cards, and web usage.
            </p>

            <h4>Why is my photo being rejected by a portal even after compressing?</h4>
            <p>
              Some portals are extremely strict. Make sure you are also checking the physical dimensions (width and height). A photo might be 40KB (which is good), but if the portal expects 200x230 pixels and your photo is 2000x3000 pixels, it will still reject it. Use our built-in cropping and dimension tools to fix both size constraint rules at once.
            </p>
          </article>

          <InternalLinks links={[
            { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
            { label: "SSC Photo Resizer", href: "/ssc-photo-resizer" },
            { label: "UPSC Photo Size", href: "/upsc-photo-size" },
          ]} />
        </main>

        <Footer />
      </div>
    </>
  );
}
