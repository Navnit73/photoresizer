// Country code to currency mapping
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // North America
  US: "USD", CA: "CAD", MX: "MXN",

  // Europe
  GB: "GBP", EU: "EUR",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", IE: "EUR",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN", TR: "TRY", CZ: "CZK",

  // Asia Pacific
  IN: "INR", JP: "JPY", CN: "CNY", AU: "AUD", NZ: "NZD", SG: "SGD",
  HK: "HKD", TW: "TWD", KR: "KRW", ID: "IDR", MY: "MYR", PH: "PHP",
  TH: "THB", VN: "VND", PK: "PKR",

  // Latin America
  BR: "BRL", CO: "COP", CL: "CLP", AR: "ARS",

  // Middle East & Africa
  AE: "AED", SA: "SAR", IL: "ILS", ZA: "ZAR", NG: "NGN", EG: "EGP",
};

// Fixed price mapping per currency (PPP-adjusted)
export const FIXED_PRICES: Record<string, { amount: number; symbol: string; decimals: number; razorpayAmount: number }> = {
  // Tier 1: Base ($5.99)
  USD:  { amount: 5.99,  symbol: "$",    decimals: 2, razorpayAmount: 599 },
  EUR:  { amount: 5.99,  symbol: "€",    decimals: 2, razorpayAmount: 599 },
  GBP:  { amount: 5.99,  symbol: "£",    decimals: 2, razorpayAmount: 599 },
  CHF:  { amount: 5.99,  symbol: "CHF",  decimals: 2, razorpayAmount: 599 },
  CAD:  { amount: 5.99,  symbol: "C$",   decimals: 2, razorpayAmount: 599 },
  AUD:  { amount: 5.99,  symbol: "A$",   decimals: 2, razorpayAmount: 599 },
  NZD:  { amount: 5.99,  symbol: "NZ$", decimals: 2, razorpayAmount: 599 },
  JPY:  { amount: 899,   symbol: "¥",    decimals: 0, razorpayAmount: 899 },
  SGD:  { amount: 7.99,  symbol: "S$",   decimals: 2, razorpayAmount: 799 },
  HKD:  { amount: 45,    symbol: "HK$",  decimals: 0, razorpayAmount: 45   },

  // Tier 2: ~20-30% Discount
  KRW:  { amount: 6900,  symbol: "₩",    decimals: 0, razorpayAmount: 6900 },
  TWD:  { amount: 159,   symbol: "NT$",  decimals: 0, razorpayAmount: 159  },
  AED:  { amount: 22,    symbol: "AED",  decimals: 0, razorpayAmount: 22   },
  SAR:  { amount: 22,    symbol: "SAR",  decimals: 0, razorpayAmount: 22   },
  ILS:  { amount: 22,    symbol: "₪",    decimals: 0, razorpayAmount: 22   },
  PLN:  { amount: 19.99, symbol: "zł",   decimals: 2, razorpayAmount: 1999 },
  SEK:  { amount: 59,    symbol: "kr",   decimals: 0, razorpayAmount: 59   },
  NOK:  { amount: 59,    symbol: "kr",   decimals: 0, razorpayAmount: 59   },
  DKK:  { amount: 39,    symbol: "kr",   decimals: 0, razorpayAmount: 39   },

  // Tier 3: ~50% Discount
  INR:  { amount: 29,    symbol: "₹",    decimals: 0, razorpayAmount: 2900   },
  CNY:  { amount: 29,    symbol: "¥",    decimals: 0, razorpayAmount: 2900   },
  BRL:  { amount: 24,    symbol: "R$",   decimals: 0, razorpayAmount: 2400   },
  MXN:  { amount: 89,    symbol: "$",    decimals: 0, razorpayAmount: 8900   },
  TRY:  { amount: 99,    symbol: "₺",    decimals: 0, razorpayAmount: 9900   },
  ZAR:  { amount: 89,    symbol: "R",    decimals: 0, razorpayAmount: 8900   },
  MYR:  { amount: 14.99, symbol: "RM",   decimals: 2, razorpayAmount: 1499 },
  THB:  { amount: 129,   symbol: "฿",    decimals: 0, razorpayAmount: 129  },

  // Tier 4: ~70% Discount
  IDR:  { amount: 49000, symbol: "Rp",   decimals: 0, razorpayAmount: 49000 },
  PHP:  { amount: 149,   symbol: "₱",    decimals: 0, razorpayAmount: 149  },
  VND:  { amount: 79000, symbol: "₫",    decimals: 0, razorpayAmount: 79000 },
  PKR:  { amount: 799,   symbol: "Rs",   decimals: 0, razorpayAmount: 799  },
  NGN:  { amount: 4900,  symbol: "₦",    decimals: 0, razorpayAmount: 4900 },
  EGP:  { amount: 149,   symbol: "E£",   decimals: 0, razorpayAmount: 149  },
  COP:  { amount: 11900, symbol: "$",    decimals: 0, razorpayAmount: 11900 },
};

export interface LocalPrice {
  currency: string;
  amount: number;
  formatted: string;
  symbol: string;
  razorpayAmount: number; // in paise/smallest unit
}

export function getLocalPrice(): LocalPrice {
  // Detect currency from browser timezone
  const currency = getClientTimezoneCurrency();
  const fixed = FIXED_PRICES[currency] || FIXED_PRICES["USD"];

  const formatted = fixed.decimals === 0
    ? `${fixed.symbol}${fixed.amount}`
    : `${fixed.symbol}${fixed.amount.toFixed(fixed.decimals)}`;

  return {
    currency,
    amount: fixed.amount,
    formatted,
    symbol: fixed.symbol,
    razorpayAmount: fixed.razorpayAmount,
  };
}

// Client-side timezone-based currency detection
export function getClientTimezoneCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // India - check various patterns
    if (tz.includes('Mumbai') || tz.includes('Mumbai') ||
        tz.includes('Asia/Kolkata') || tz.includes('Asia/India') ||
        tz.includes('Asia/Calcutta') || tz.startsWith('Asia/Kolkata') ||
        tz.includes('Delhi') || tz.includes('Mumbai') || tz.includes('Chennai') ||
        tz.includes('Bangalore')) return 'INR';
    if (tz.includes('London')) return 'GBP';
    if (tz.startsWith('Europe/')) {
      if (tz.includes('Zurich'))    return 'CHF';
      if (tz.includes('Stockholm'))  return 'SEK';
      if (tz.includes('Oslo'))       return 'NOK';
      if (tz.includes('Copenhagen'))  return 'DKK';
      if (tz.includes('Warsaw'))     return 'PLN';
      if (tz.includes('Istanbul'))   return 'TRY';
      if (tz.includes('Prague'))     return 'CZK';
      return 'EUR';
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver')) return 'CAD';
    if (tz.startsWith('Australia/')) return 'AUD';
    if (tz.includes('Auckland')) return 'NZD';
    if (tz.includes('Tokyo'))   return 'JPY';
    if (tz.includes('Shanghai')) return 'CNY';
    if (tz.includes('Seoul'))   return 'KRW';
    if (tz.includes('Taipei'))  return 'TWD';
    if (tz.includes('Hong_Kong')) return 'HKD';
    if (tz.includes('Singapore')) return 'SGD';
    if (tz.includes('Jakarta')) return 'IDR';
    if (tz.includes('Kuala_Lumpur')) return 'MYR';
    if (tz.includes('Manila'))  return 'PHP';
    if (tz.includes('Bangkok')) return 'THB';
    if (tz.includes('Ho_Chi_Minh')) return 'VND';
    if (tz.includes('Karachi')) return 'PKR';
    if (tz.includes('Mexico_City')) return 'MXN';
    if (tz.includes('Sao_Paulo')) return 'BRL';
    if (tz.includes('Dubai'))   return 'AED';
    if (tz.includes('Riyadh'))   return 'SAR';
    if (tz.includes('Jerusalem')) return 'ILS';
    if (tz.includes('Johannesburg')) return 'ZAR';
    if (tz.includes('Lagos'))   return 'NGN';
    if (tz.includes('Cairo'))   return 'EGP';
    return 'USD';
  } catch {
    return 'USD';
  }
}