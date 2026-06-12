import { getLocalPrice } from "@/utils/pricing";
import { sendGA4PurchaseEvent, getGA4ClientId } from "./ga4";

interface StartPaymentParams {
  email?: string;
  name?: string;
  amount?: number;
  currency?: string;
  onSuccess?: (paymentId: string) => void;
  onDismiss?: () => void;
}

export const startPayment = ({
  email,
  name,
  amount,
  currency,
  onSuccess,
  onDismiss,
}: StartPaymentParams = {}) => {
  const price = getLocalPrice();
  const finalAmount = amount ?? price.razorpayAmount;
  const finalCurrency = currency ?? price.currency;

  console.log("[Razorpay] Price Debug:", {
    detectedCurrency: price.currency,
    detectedAmount: price.razorpayAmount,
    finalCurrency,
    finalAmount,
    formatted: price.formatted
  });

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SKJWoYJgKVXRjp";

  const options: RazorpayOptions = {
    key: keyId,
    amount: finalAmount,
    currency: finalCurrency,
    name: "Photo Resizer Tool",
    description: "HD Passport Photo Download",
    handler: function (response) {
      localStorage.setItem("payment_success", response.razorpay_payment_id);
      
      // GA4 Purchase Event Tracking
      const ga4Items = [{
        item_id: "HD_PASSPORT_PHOTO",
        item_name: "HD Passport Photo Download",
        price: price.amount,
        quantity: 1,
        item_category: "Digital Good"
      }];

      sendGA4PurchaseEvent({
        clientId: getGA4ClientId(),
        transactionId: response.razorpay_payment_id,
        amount: price.amount,
        currency: finalCurrency,
        items: ga4Items
      });

      onSuccess?.(response.razorpay_payment_id);
    },
    prefill: {
      name: name || "",
      email: email || "",
    },
    theme: {
      color: "#2563eb",
    },
    modal: {
      ondismiss: function () {
        onDismiss?.();
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export const checkPaymentStatus = (): string | null => {
  return localStorage.getItem("payment_success");
};

export const clearPaymentStatus = (): void => {
  localStorage.removeItem("payment_success");
};