/// <reference types="vite/client" />
/// <reference path="./types/razorpay.d.ts" />


interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
