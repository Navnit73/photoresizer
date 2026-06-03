import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { startPayment, checkPaymentStatus, clearPaymentStatus } from "@/lib/razorpay";
import { Download, Lock } from "lucide-react";
import { getLocalPrice } from "@/utils/pricing";

interface PaymentDownloadButtonProps {
  onDownload: () => Promise<void>;
  disabled?: boolean;
}

export function PaymentDownloadButton({
  onDownload,
  disabled,
}: PaymentDownloadButtonProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const price = getLocalPrice();

  useEffect(() => {
    const paid = checkPaymentStatus();
    setIsPaid(!!paid);
  }, []);

  const handlePaymentClick = () => {
    startPayment({
      onSuccess: (paymentId) => {
        console.log("Payment successful:", paymentId);
        setIsPaid(true);
      },
      onDismiss: () => {
        // User dismissed payment modal
      },
    });
  };

  const handleDownload = async () => {
    if (!isPaid) {
      handlePaymentClick();
      return;
    }

    setIsDownloading(true);
    setIsComplete(false);

    await new Promise((res) => setTimeout(res, 2000));

    try {
      await onDownload();
      setIsComplete(true);
      setTimeout(() => {
        setIsDownloading(false);
        setIsComplete(false);
      }, 2000);
    } catch {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    clearPaymentStatus();
    setIsPaid(false);
  };

  return (
    <div className="space-y-3">
      {isDownloading ? (
        <div className="animate-[fadeIn_0.2s_ease-out]">
          <Button className="w-full h-12" disabled>
            <Lock className="w-4 h-4 mr-2" />
            {isComplete ? "Download Complete!" : "Processing..."}
          </Button>
        </div>
      ) : (
        <Button
          className="w-full h-12"
          onClick={handleDownload}
          disabled={disabled}
        >
          <Download className="w-5 h-5 mr-2" />
          {isPaid ? "Download HD Photo" : `Unlock Download ${price.formatted}`}
        </Button>
      )}

      {!isPaid && (
        <p className="text-xs text-muted-foreground text-center">
          One-time payment for HD photo download
        </p>
      )}

      {isPaid && (
        <button
          onClick={handleReset}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Reset payment (demo only)
        </button>
      )}
    </div>
  );
}