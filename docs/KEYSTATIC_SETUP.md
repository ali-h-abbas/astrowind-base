# Keystatic CMS Setup

This project uses [Keystatic](https://keystatic.com/) as a Git-backed CMS for managing blog posts.
Writers authenticate with their own GitHub accounts and posts are committed as Markdown files
directly to the repository.

---

## Writer Workflow

1. Navigate to `/keystatic` (or `/admin` which redirects there) in your browser.
2. Click **Sign in with GitHub** and authorise Keystatic to access the repository.
3. Use the **Blog Posts** collection to create, edit, or delete posts.
4. When you save, Keystatic opens a pull-request branch named `keystatic/<slug>`.
5. A maintainer reviews and merges the PR; the site rebuilds automatically on Cloudflare Pages.

> **Tip:** Writers never need to touch Git or Markdown directly—the admin UI handles everything.

---

## Content Storage

- Blog posts live at **`src/content/blog/`** as Markdown (`.md`) or MDX (`.mdx`) files.
- Post images can be uploaded through the editor and are stored under **`public/images/blog/`**.
- The Astro content collection (`src/content/config.ts`) reads all `*.md` / `*.mdx` files from that directory.

### Compatible Frontmatter

Keystatic writes the following frontmatter fields, which match the Astro content schema:

```yaml
---
title: My Post Title
publishDate: 2024-01-15T00:00:00.000Z
updateDate: 2024-06-01T00:00:00.000Z   # optional
draft: false
excerpt: A short description of the post.
image: https://example.com/hero.jpg     # optional
category: Tutorial                      # optional
tags:
  - astro
  - cms
author: Jane Doe                        # optional
---

Post body here …
```

---

## Required Environment Variables

Keystatic uses GitHub OAuth for authentication. Set these variables in your Cloudflare Pages
dashboard (and locally in `.env`):

| Variable | Description |
|---|---|
| `PUBLIC_KEYSTATIC_GITHUB_APP_CLIENT_ID` | GitHub OAuth App Client ID |
| `KEYSTATIC_GITHUB_APP_CLIENT_SECRET` | GitHub OAuth App Client Secret (secret – keep server-side) |
| `KEYSTATIC_SECRET` | A long random string used to sign sessions (e.g. `openssl rand -hex 32`) |

### Creating a GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Set **Application name** to something like `AstroWind Keystatic`.
3. Set **Homepage URL** to your production site URL (e.g. `https://example.com`).
4. Set **Authorization callback URL** to `https://example.com/api/keystatic/github/oauth/callback`  
   (replace with your actual domain; for local dev use `http://localhost:4321/api/keystatic/github/oauth/callback`).
5. Note the **Client ID** and generate a **Client Secret**.
6. Add both values as environment variables (see table above).

> **Local development:** You can temporarily switch `keystatic.config.ts` → `storage.kind` to
> `'local'` during development so no GitHub OAuth is required.

---

## Admin UI URL

The admin UI is served by Keystatic at:

- **`/keystatic`** – primary admin route (injected by `@keystatic/astro`)
- **`/admin`** – redirect that points to `/keystatic` for convenience

---

## Cloudflare Pages Compatibility

Keystatic runs as a set of server-side API routes (`/api/keystatic/...`) inside the Cloudflare
Workers runtime.  No special `wrangler.toml` flags are needed because Keystatic communicates with
GitHub exclusively via the standard `fetch` API (no Node.js `fs` module is used in production).

If you see `crypto.subtle` or `TextEncoder` errors, ensure your Cloudflare Pages project has
**Compatibility Date** set to `2022-11-28` or later.

---

## Disabling Keystatic (Optional)

If you want to ship a build without the admin UI, remove `keystatic()` from the `integrations`
array in `astro.config.ts` and delete `keystatic.config.ts`.  The blog itself continues to work
from the static Markdown files in `src/content/blog/`.
