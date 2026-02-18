import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
// import compress from 'astro-compress'; // Disabled for Cloudflare Pages deployment
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

// NOTE: The 'site' and 'base' values must match the values in src/config.yaml
// for proper asset path generation. Use environment variables (SITE and BASE_PATH)
// to override these defaults for different deployment targets.
export default defineConfig({
  site: import.meta.env.SITE || 'https://ali-h-abbas.github.io',
  base: import.meta.env.BASE_PATH || '/astrowind-base',
  output: 'static', // Keep static for GitHub Pages; API route uses prerender: false

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    // Temporarily disabled due to conflicts with Cloudflare Pages compression.
    // Issue: astro-compress compresses files during build, then Cloudflare Pages
    // compresses them again, resulting in NS_ERROR_CORRUPTED_CONTENT errors for
    // CSS and JavaScript files in the browser.
    // Solution: Let Cloudflare handle compression at the edge for optimal performance.
    // Note: If deploying to GitHub Pages, Vercel, or other platforms that don't
    // automatically compress assets, you can re-enable this integration.
    // compress({
    //   CSS: true,
    //   HTML: {
    //     'html-minifier-terser': {
    //       removeAttributeQuotes: false,
    //     },
    //   },
    //   Image: false,
    //   JavaScript: true,
    //   SVG: false,
    //   Logger: 1,
    // }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com', 'cdn.sanity.io'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
