import { useImageEditor } from '@/hooks/useImageEditor';
import { UploadZone } from '@/components/editor/UploadZone';
import { EditorControls } from '@/components/editor/EditorControls';
import { InteractiveCanvas } from '@/components/editor/InteractiveCanvas';
import { LivePreview } from '@/components/editor/LivePreview';
import { DownloadButton } from '@/components/editor/DownloadButton';
import { AdPlaceholder } from '@/components/layout/AdPlaceholder';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContentSections } from '@/components/sections/ContentSections';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Undo2, RotateCcw } from 'lucide-react';

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
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
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
                  {/* Action Bar */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      {history.length > 1 && (
                        <Button variant="outline" size="sm" onClick={undo}>
                          <Undo2 className="w-4 h-4 mr-1" />
                          Undo
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={reset}>
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Start Over
                      </Button>
                    </div>
                  </div>

                  {/* Main Editor Grid */}
                  <div className="grid xl:grid-cols-[1fr_280px] gap-6">
                    {/* Interactive Canvas */}
                    <InteractiveCanvas
                      imageState={imageState}
                      onCropApply={applyCrop}
                    />

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
                      />
                      
                      {/* Download Button */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <DownloadButton
                          onDownload={processAndDownload}
                          isProcessing={isProcessing}
                        />
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Sidebar */}
            <aside className="space-y-4">
              {/* Live Preview */}
              {imageState.originalUrl && (
                <LivePreview imageState={imageState} />
              )}
              
              {/* Sidebar Ads */}
              <AdPlaceholder position="sidebar" />
              {!imageState.originalUrl && <AdPlaceholder position="sidebar" />}
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
