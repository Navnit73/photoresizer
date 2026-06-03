import { getLocalPrice } from "@/utils/pricing";

interface StartPaymentParams {
  email?: string;
  name?: string;
  onSuccess?: (paymentId: string) => void;
  onDismiss?: () => void;
}

export const startPayment = ({
  email,
  name,
  onSuccess,
  onDismiss,
}: StartPaymentParams = {}) => {
  const price = getLocalPrice();

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SKJWoYJgKVXRjp";

  const options: RazorpayOptions = {
    key: keyId,
    amount: price.razorpayAmount,
    currency: price.currency,
    name: "Photo Resizer Tool",
    description: "HD Passport Photo Download",
    handler: function (response) {
      localStorage.setItem("payment_success", response.razorpay_payment_id);
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