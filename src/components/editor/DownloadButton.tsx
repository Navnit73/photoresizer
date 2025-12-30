import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  isProcessing: boolean;
  disabled?: boolean;
}

export function DownloadButton({ onDownload, isProcessing, disabled }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    setIsComplete(false);

    // Simulate progress over ~3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      await onDownload();
      clearInterval(progressInterval);
      setProgress(100);
      setIsComplete(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsDownloading(false);
        setIsComplete(false);
        setProgress(0);
      }, 2000);
    } catch (error) {
      clearInterval(progressInterval);
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="wait">
        {isDownloading ? (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                {isComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Download Complete!
                  </>
                ) : (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Processing image...
                  </>
                )}
              </span>
              <span className="font-mono text-xs">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {!isComplete && (
              <p className="text-xs text-muted-foreground text-center">
                Applying edits and optimizing for download
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <Button
              className="w-full h-12 text-base font-medium"
              onClick={handleDownload}
              disabled={disabled || isProcessing}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Image
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
