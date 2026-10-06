/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_MODE?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** True when public/brand/logo.svg existed when the dev server or build started. */
declare const __HAS_LOGO__: boolean
