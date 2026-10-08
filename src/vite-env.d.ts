/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_PAYFAST_MERCHANT_ID?: string;
  readonly VITE_PAYFAST_MERCHANT_KEY?: string;
  readonly VITE_PAYFAST_PASSPHRASE?: string;
  readonly VITE_PAYFAST_SANDBOX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
