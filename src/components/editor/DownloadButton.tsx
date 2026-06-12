import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle2, Loader2, Clock, Zap } from 'lucide-react';
import { startPayment, checkPaymentStatus } from '@/lib/razorpay';
import { getLocalPrice } from '@/utils/pricing';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  disabled?: boolean;
}

export function DownloadButton({ onDownload, disabled }: DownloadButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 3 minutes
  const price = getLocalPrice();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDownloading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress(((120 - (timeLeft - 1)) / 120) * 100);
      }, 1000);
    } else if (isDownloading && timeLeft <= 0 && !isComplete) {
      handleCompleteDownload();
    }
    return () => clearInterval(timer);
  }, [isDownloading, timeLeft, isComplete]);

  const handleCompleteDownload = async () => {
    try {
      await onDownload();
      setIsComplete(true);
      setTimeout(() => {
        setIsDownloading(false);
        setIsComplete(false);
        setShowOptions(false);
        setProgress(0);
        setTimeLeft(120);
      }, 3000);
    } catch (err) {
      setIsDownloading(false);
      setProgress(0);
      setTimeLeft(120);
    }
  };

  const handleFreeDownload = () => {
    setIsDownloading(true);
    setIsComplete(false);
    setProgress(0);
    setTimeLeft(120);
  };

  const handlePaidDownload = () => {
    if (checkPaymentStatus()) {
       handleInstantComplete();
       return;
    }

    startPayment({
      onSuccess: () => {
        handleInstantComplete();
      },
    });
  };

  const handleInstantComplete = async () => {
    setIsDownloading(true);
    setIsComplete(true); // skip waiting text
    setProgress(100);
    setTimeLeft(0);
    await handleCompleteDownload();
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

  if (showOptions) {
    if (isDownloading) {
      return (
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
                  Processing... {timeLeft > 0 ? timeString : ''}
                </>
              )}
            </span>
            <span className="font-mono text-xs">
              {Math.round(progress)}%
            </span>
          </div>

          <Progress value={progress} className="h-2" />

          {!isComplete && timeLeft > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Please wait while we prepare your high-quality image
              </p>
              <button 
                onClick={() => {
                  setIsDownloading(false);
                  setProgress(0);
                  setTimeLeft(180);
                }}
                className="w-full text-xs text-primary hover:text-primary/80 transition-colors text-center underline font-medium"
              >
                Cancel and view instant download options
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="outline"
            className="w-full h-16 flex flex-col items-center justify-center gap-1 border-primary/20 hover:bg-primary/5 whitespace-normal h-auto py-3"
            onClick={handleFreeDownload}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Free Download</span>
            </div>
            <span className="text-xs text-muted-foreground">Wait 2 minutes</span>
          </Button>

          <Button
            className="w-full h-16 flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 whitespace-normal h-auto py-3"
            onClick={handlePaidDownload}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="font-medium text-white">Instant Download</span>
            </div>
            <span className="text-xs text-white/80">Pay {price.formatted} to skip waiting</span>
          </Button>
        </div>
        <button 
          onClick={() => setShowOptions(false)}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.2s_ease-out]">
      <Button
        className="w-full h-12 text-base font-medium"
        onClick={() => setShowOptions(true)}
        disabled={disabled}
      >
        <Download className="w-5 h-5 mr-2" />
        Download Image
      </Button>
    </div>
  );
}
