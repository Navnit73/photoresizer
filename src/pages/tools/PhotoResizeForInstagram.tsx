import { Helmet } from "react-helmet-async";
import { Instagram, Download, Image, Zap } from "lucide-react";
import { FeatureCard, FeatureGrid } from "@/components/shared/FeatureCard";
import { HowToGuide } from "@/components/shared/HowToGuide";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
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

const features = [
  { icon: Instagram, title: "Avoid the IG Crop Misfire", description: "Stop Instagram from butchering your photos. Natively resize images to the exact 4:5 portrait (1080x1350) or 1:1 square (1080x1080) dimensions required for maximum feed dominance." },
  { icon: Image, title: "Reels & Story Formats", description: "Perfect the 9:16 vertical orientation (1080x1920). Use our canvas padding feature to fit wide cinematic shots seamlessly into vertical Reels covers without awkward zooming." },
  { icon: Zap, title: "Bypass App Compression", description: "Instagram heavily crushes large images upon upload. Pre-sizing your photos with our algorithm bypasses the worst of IG's aggressive compression filters." },
  { icon: Download, title: "No Watermarks", description: "Your aesthetic shouldn't include our logo. Export razor-sharp, watermark-free images that are instantly ready for your professional grid." },
];

const steps = [
  { title: "Drop Media", description: "Upload your raw DSLR export or high-megapixel smartphone shot. We process dense PNGs, JPGs, and WEBPs locally." },
  { title: "Select IG Asset Type", description: "Choose the target dimension: Feed Portrait (4:5), Square (1:1), Landscape (1.91:1), or Story/Reel Cover (9:16). Use the crop tool to compose." },
  { title: "Export and Post", description: "Download the tailored JPG. Upload directly to the Instagram app knowing the dimensions are mathematically perfect." },
];

const faqs = [
  { question: "Why do my photos look blurry after uploading to Instagram?", answer: "When you upload a massive 4K or 8K photo, Instagram applies an aggressive downscaling algorithm that often ruins sharpness. By pre-resizing your image to exactly 1080 pixels wide using our tool, you bypass Instagram's harsh secondary compression." },
  { question: "How do I fit a landscape photo into a vertical Reel cover or Story without cropping?", answer: "In our editor, select the 9:16 aspect ratio. Instead of 'cropping' away the edges of your landscape shot, you can scale the image down to fit within the vertical frame, leaving solid color padding (or a blurred background) at the top and bottom." },
  { question: "What is the absolute best format for maximum screen space in the main feed?", answer: "The 4:5 Portrait format (1080x1350 pixels). This orientation takes up significantly more vertical screen real estate on a smartphone compared to traditional 1:1 squares, keeping users engaged with your post longer." },
];

const relatedLinks = [
  { label: "Photo Resize by Pixel", href: "/photo-resize-pixel" },
  { label: "Photo Resize and Crop", href: "/photo-resize-and-crop" },
];

export default function PhotoResizeForInstagram() {
  const { imageState, isProcessing, history, loadImage, updateDimensions, setRotation, setQuality, setFormat, applyPreset, applyCrop, undo, processAndDownload, reset, lastUploadedFile } = useImageEditor();

  return (
    <>
      <Helmet>
        <title>Photo Resize for Instagram – Perfect Fit</title>
        <meta name="description" content="Resize photos for Instagram posts, stories, and reels. Perfect 1080×1080, 1080×1350, 1080×1920 dimensions. Free online tool, no signup needed." />
        <meta name="keywords" content="photo resize for instagram, instagram photo size, resize image for instagram, instagram photo dimensions" />
        <link rel="canonical" href="https://www.photoresizer.co.in/photo-resize-for-instagram" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16">
            <div className="container px-2 sm:px-4">
              {!imageState.originalUrl ? (
                <div key="upload" className="max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
                  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">Resize Photos for Instagram – Perfect Dimensions</h1>
                  <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Get the perfect size for Instagram posts, stories, reels, and profile pictures</p>
                  <UploadZone onFileSelect={loadImage} recentFile={lastUploadedFile} />
                </div>
              ) : (
                <div key="editor" className="space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (<Button variant="ghost" size="sm" onClick={undo}><Undo2 className="w-3.5 h-3.5 mr-1" />Undo</Button>)}
                      <Button variant="ghost" size="sm" onClick={reset}><RotateCcw className="w-3.5 h-3.5 mr-1" />Reset</Button>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 text-sm font-semibold">Instagram Size</div>
                  </div>
                  <div className="grid lg:grid-cols-[400px_1fr] gap-3">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <EditorControls imageState={imageState} isProcessing={isProcessing} onUpdateDimensions={updateDimensions} onRotate={setRotation} onQualityChange={setQuality} onFormatChange={setFormat} onApplyPreset={applyPreset} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3">
                      <div className="hidden lg:grid lg:grid-cols-2 gap-2">
                        <div><InteractiveCanvas imageState={imageState} onCropApply={applyCrop} /></div>
                        <div><DownloadButton onDownload={() => processAndDownload()} /><LivePreview imageState={imageState} /></div>
                      </div>
                      <div className="block lg:hidden space-y-3">
                        <InteractiveCanvas imageState={imageState} onCropApply={applyCrop} />
                        <LivePreview imageState={imageState} />
                        <DownloadButton onDownload={() => processAndDownload()} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Instagram Photo Size Guide</h2>
              <FeatureGrid>{features.map((f, i) => (<FeatureCard key={i} {...f} index={i} />))}</FeatureGrid>
            </div>
          </section>

          <HowToGuide steps={steps} title="How to Resize Photos for Instagram" />
          <FAQSection faqs={faqs} />
          <InternalLinks links={relatedLinks} />
        </main>
        <Footer />
      </div>
    </>
  );
}
