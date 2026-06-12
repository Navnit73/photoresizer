export const GA4_MEASUREMENT_ID = "G-Y3N6YXK7VE";
export const GA4_API_SECRET = import.meta.env.VITE_GA4_API_SECRET || "cXMnqLRERoOYgL6BWdAJqQ";

export interface GA4Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
}

export interface GA4PurchaseParams {
  clientId: string;
  transactionId: string;
  amount: number;
  currency: string;
  items: GA4Item[];
}

/**
 * Sends a purchase event to GA4 via the Measurement Protocol.
 */
export async function sendGA4PurchaseEvent({
  clientId,
  transactionId,
  amount,
  currency,
  items,
}: GA4PurchaseParams) {
  if (!clientId) {
    console.warn("[GA4] No client ID provided, skipping event.");
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const payload = {
    client_id: clientId,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: transactionId,
          value: amount,
          currency: currency,
          items: items,
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[GA4] Failed to send event: ${response.status} ${errorText}`);
    } else {
      console.log(`[GA4] Purchase event sent for transaction ${transactionId}`);
    }
  } catch (error) {
    console.error("[GA4] Network error sending event:", error);
  }
}

/**
 * Helper function to get the current GA4 client ID from the gtag cookie.
 */
export function getGA4ClientId(): string {
  try {
    // Try to get client ID from _ga cookie
    const match = document.cookie.match(/(?:^|;)\s*_ga=([^;]+)/);
    if (match) {
      // GA cookie format: GA1.1.123456789.1234567890
      const parts = match[1].split('.');
      if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
      }
    }
  } catch (e) {
    console.warn("[GA4] Could not parse _ga cookie, generating fallback ID");
  }
  
  // Fallback to generating a random one if not found
  return crypto.randomUUID();
}
