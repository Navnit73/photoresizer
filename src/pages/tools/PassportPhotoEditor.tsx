import { Helmet } from "react-helmet-async";
import { Camera, Check, Globe, Shield } from "lucide-react";
import { InternalLinks } from "@/components/shared/InternalLinks";
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
import { AmazonAd } from "@/components/shared/AmazonAd";
import AdUnit from "@/components/shared/AdUnit";

const features = [
  {
    icon: Globe,
    title: "Universal Standards",
    description: "Supports all international passport photo requirements: India, US, UK, Canada, Australia, and more.",
  },
  {
    icon: Check,
    title: "Auto-Crop & Resize",
    description: "Automatically adjusts to exact passport dimensions: 2x2 inch (51x51mm), 35x45mm, and other standard sizes.",
  },
  {
    icon: Shield,
    title: "Background Editor",
    description: "Change background color to white, light grey, or any required color for your passport photo.",
  },
  {
    icon: Camera,
    title: "Professional Quality",
    description: "High-quality output that meets official photo requirements for passports, visas, and ID cards.",
  },
];

const steps = [
  {
    title: "Upload Your Photo",
    description: "Upload a clear, front-facing photo of yourself with good lighting and a neutral expression.",
  },
  {
    title: "Select Country & Size",
    description: "Choose your country from the presets to automatically apply the correct dimensions and specifications.",
  },
  {
    title: "Adjust & Download",
    description: "Fine-tune the crop, adjust background if needed, and download your compliant passport photo.",
  },
];

const passportSizes = [
  { country: "India", size: "2x2 inch (51x51mm)", bg: "White" },
  { country: "United States", size: "2x2 inch (51x51mm)", bg: "White/Light Grey" },
  { country: "United Kingdom", size: "35x45mm", bg: "Light Grey" },
  { country: "Canada", size: "50x70mm", bg: "White" },
  { country: "Australia", size: "35x45mm", bg: "Light Grey" },
  { country: "Schengen Visa", size: "35x45mm", bg: "Light Grey" },
];

export default function PassportPhotoEditor() {
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
        <title>Passport Photo Editor - Create Compliant Passport Photos Online</title>
        <meta
          name="description"
          content="Free online passport photo editor. Create compliant passport photos for India, US, UK, Canada. Auto-resize to exact dimensions with background editor."
        />
        <meta
          name="keywords"
          content="passport photo editor, passport photo maker, visa photo editor, passport size photo, id photo maker, passport photo online"
        />
        <link rel="canonical" href="https://www.photoresizer.co.in/passport-photo-editor" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="flex-1">
          {/* Editor */}
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
                    Upload Your Photo
                  </h2>
                  <UploadZone 
                    onFileSelect={loadImage} 
                    recentFile={lastUploadedFile}
                  />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
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
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="w-full relative py-2 flex justify-center mb-4 min-h-[100px] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <AdUnit type="sidebar" />
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

          <div className="py-2">
            <AmazonAd />
          </div>

          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                Professional Passport Photo Features
              </h2>
              <FeatureGrid>
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} index={index} />
                ))}
              </FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Create Passport Photos" />

          {/* Country Requirements */}
          <section className="py-12 md:py-16 bg-white dark:bg-slate-800">
            <div className="container px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white text-center">
                  Passport Photo Requirements by Country
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {passportSizes.map((spec) => (
                    <div key={spec.country} className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50">
                      <h3 className="font-semibold text-lg mb-3 text-slate-900 dark:text-white">{spec.country}</h3>
                      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <p className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          Size: {spec.size}
                        </p>
                        <p className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary" />
                          Background: {spec.bg}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                    <strong>📸 Pro Tip:</strong> Ensure your photo shows a clear, front-facing view with neutral expression, no glasses, and good lighting for best results.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SEO ARTICLE & FAQs ================= */}
          <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto px-4 py-12 lg:prose-lg">
            <h2>The Challenge of DIY Passport Photos</h2>
            <p>
              Getting a passport photo taken at a physical studio can be time-consuming and unnecessarily expensive. While modern smartphones pack incredible camera quality capable of capturing perfect portraits, the challenge lies in formatting those photos to meet strict international standards. Different countries demand entirely different ratios, biometric positioning rules, and background colors.
            </p>

            <h3>How Our Passport Photo Maker Works</h3>
            <p>
              Our free Passport Photo Maker takes the friction out of DIY official portraits. 
              Instead of manually calculating millimeters to pixels and hoping for the best, our preset templates automatically enforce the exact physical ratios required by governments in India, the US, the UK, Canada, and the Schengen Area. 
            </p>
            <p>
              Simply upload a well-lit photo taken against a plain wall. The editor allows you to precisely align your face using the interactive crop grid, ensuring your biometric data (like eye-to-chin distance) satisfies computerized validators used by border agencies.
            </p>

            <h3>Frequently Asked Questions (FAQ)</h3>
            
            <h4>Can I submit a selfie as a passport photo?</h4>
            <p>
              Technically yes, if it meets all the strict rules. However, <strong>do not use the front-facing "selfie" camera</strong>. Front-facing cameras often distort facial proportions (making the nose look larger), causing biometric validators to reject the photo. Have a friend take your photo using the rear camera from about 4 to 6 feet away, at eye level.
            </p>

            <h4>What color should the background be?</h4>
            <p>
              This strictly depends on the country. Most international passports, including the US and India, require a pure white or off-white background. The UK and Schengen countries explicitly request a light grey or cream background (to provide better contrast with standard white photographic paper).
            </p>

            <h4>Is this tool safe for official documents?</h4>
            <p>
              Absolutely. Our editor operates entirely within your local browser ecosystem. We do not transmit your sensitive facial identification data to any cloud storage or database, ensuring your fundamental privacy and security.
            </p>
          </article>

          <InternalLinks links={[
            { label: "Resize Photo to 20KB", href: "/resize-photo-20kb" },
            { label: "Photo Resizer for Instagram", href: "/photo-resizer-for-instagram" },
            { label: "UPSC Photo Size", href: "/upsc-photo-size" },
          ]} />
        </main>

        <Footer />
      </div>
    </>
  );
}
