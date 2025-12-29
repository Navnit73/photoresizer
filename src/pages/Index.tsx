import { useImageEditor } from '@/hooks/useImageEditor';
import { UploadZone } from '@/components/editor/UploadZone';
import { EditorControls } from '@/components/editor/EditorControls';
import { InteractiveCanvas } from '@/components/editor/InteractiveCanvas';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContentSections } from '@/components/sections/ContentSections';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Undo2 } from 'lucide-react';

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
                  className="space-y-6"
                >
                  {/* Undo Button */}
                  {history.length > 1 && (
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={undo}>
                        <Undo2 className="w-4 h-4 mr-1" />
                        Undo ({history.length - 1})
                      </Button>
                    </div>
                  )}

                  <div className="grid xl:grid-cols-[280px_1fr] gap-6">
                    {/* Controls Panel */}
                    <Card variant="bordered" className="p-4 h-fit order-2 xl:order-1">
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

                    {/* Interactive Canvas */}
                    <div className="order-1 xl:order-2">
                      <InteractiveCanvas
                        imageState={imageState}
                        onDimensionsChange={updateDimensions}
                        onCropApply={applyCrop}
                      />
                    </div>
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
