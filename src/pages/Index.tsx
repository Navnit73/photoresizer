import { useImageEditor } from '@/hooks/useImageEditor';
import { UploadZone } from '@/components/editor/UploadZone';
import { EditorControls } from '@/components/editor/EditorControls';
import { ImagePreview } from '@/components/editor/ImagePreview';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContentSections } from '@/components/sections/ContentSections';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Index = () => {
  const {
    imageState,
    isProcessing,
    loadImage,
    updateDimensions,
    setRotation,
    setBackgroundColor,
    setQuality,
    setFormat,
    applyPreset,
    processAndDownload,
    generatePreview,
    reset,
  } = useImageEditor();

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        {/* Top Ad Banner */}
        <div className="container py-4">
          <AdPlaceholder position="top" />
        </div>

        {/* Main Editor Section */}
        <main className="container flex-1 py-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            {/* Left: Editor Area */}
            <div className="space-y-6">
              {!imageState.originalUrl ? (
                <UploadZone onFileSelect={loadImage} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid lg:grid-cols-[280px_1fr] gap-6"
                >
                  {/* Controls Panel */}
                  <Card variant="bordered" className="p-4 h-fit">
                    <EditorControls
                      imageState={imageState}
                      isProcessing={isProcessing}
                      onUpdateDimensions={updateDimensions}
                      onRotate={setRotation}
                      onBackgroundChange={setBackgroundColor}
                      onQualityChange={setQuality}
                      onFormatChange={setFormat}
                      onApplyPreset={applyPreset}
                      onDownload={processAndDownload}
                      onReset={reset}
                    />
                  </Card>

                  {/* Preview Panel */}
                  <div className="min-h-[400px]">
                    <ImagePreview 
                      imageState={imageState} 
                      generatePreview={generatePreview}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Sidebar Ad */}
            <aside className="hidden lg:block space-y-4">
              <AdPlaceholder position="sidebar" />
              <AdPlaceholder position="sidebar" />
            </aside>
          </div>
        </main>

        {/* Bottom Ad */}
        <div className="container pb-6">
          <AdPlaceholder position="bottom" />
        </div>

        {/* SEO Content Sections */}
        <ContentSections />

        <Footer />
      </div>
    </>
  );
};

export default Index;
