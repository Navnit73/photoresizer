import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle2, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  disabled?: boolean;
}

export function DownloadButton({ onDownload, disabled }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setIsComplete(false);
    setProgress(0);

    const TOTAL_TIME = 5000;
    const INTERVAL = 100;
    const STEPS = TOTAL_TIME / INTERVAL;
    const STEP_VALUE = 100 / STEPS;

    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(currentStep * STEP_VALUE, 100));

      if (currentStep >= STEPS) {
        clearInterval(progressTimer);
      }
    }, INTERVAL);

    try {
      await new Promise((res) => setTimeout(res, TOTAL_TIME));
      await onDownload();

      setProgress(100);
      setIsComplete(true);

      setTimeout(() => {
        setIsDownloading(false);
        setIsComplete(false);
        setProgress(0);
      }, 2000);
    } catch (err) {
      clearInterval(progressTimer);
      setIsDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-3">
      {isDownloading ? (
        <div className="space-y-3 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              {isComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Download complete
                </>
              ) : (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  Image is processing…
                </>
              )}
            </span>
            <span className="font-mono text-xs">
              {Math.round(progress)}%
            </span>
          </div>

          <Progress value={progress} className="h-2" />

          {!isComplete && (
            <p className="text-xs text-muted-foreground text-center">
              Applying edits, resizing, and optimizing image
            </p>
          )}
        </div>
      ) : (
        <div className="animate-[fadeIn_0.2s_ease-out]">
          <Button
            className="w-full h-12 text-base font-medium"
            onClick={handleDownload}
            disabled={disabled}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
}
