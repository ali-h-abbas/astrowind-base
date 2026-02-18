// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

// Cloudflare Workers/Pages runtime types
declare namespace App {
  interface Locals {
    runtime?: {
      env?: {
        SUBSCRIBERS?: import('./lib/db').KVNamespace;
        CONVERTKIT_API_KEY?: string;
        CONVERTKIT_FORM_ID?: string;
      };
    };
  }
}
