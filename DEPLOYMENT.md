# Deployment Guide

This guide explains how to deploy the AstroWind site to different platforms and how to configure environment variables for each deployment target.

## Table of Contents

- [Quick Start](#quick-start)
- [Understanding Base Path](#understanding-base-path)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Switching Between Platforms](#switching-between-platforms)

## Quick Start

The project uses environment variables to configure the site URL and base path for different deployment platforms. This means you can deploy to different platforms without changing any code.

## Understanding Base Path

### What is a Base Path?

The base path is the URL prefix where your site is hosted. It's crucial for:

- Loading CSS and JavaScript files correctly
- Generating proper asset URLs
- Creating working navigation links

### When Do You Need a Base Path?

- **GitHub Pages (Project Sites)**: Requires `/repository-name`
  - Example: `https://username.github.io/repository-name`
  - Base path: `/repository-name`
- **GitHub Pages (User/Org Sites)**: No base path needed
  - Example: `https://username.github.io`
  - Base path: `/`

- **Vercel/Netlify (Root Domain)**: No base path needed
  - Example: `https://your-site.vercel.app`
  - Base path: `/`

- **Subdirectory Deployments**: Requires the subdirectory path
  - Example: `https://yourdomain.com/subdirectory`
  - Base path: `/subdirectory`

### Why the Base Path Matters

Without the correct base path:

- ❌ CSS files return 404 errors
- ❌ JavaScript files fail to load
- ❌ Images and assets are broken
- ❌ Navigation links don't work
- ❌ Site appears unstyled with default fonts

With the correct base path:

- ✅ All assets load correctly
- ✅ Styling and functionality work as expected
- ✅ Navigation works properly
- ✅ Site looks professional

## GitHub Pages Deployment

### Current Setup

This repository is already configured for GitHub Pages deployment to:

- Site: `https://ali-h-abbas.github.io`
- Repository: `astrowind-base`
- Full URL: `https://ali-h-abbas.github.io/astrowind-base`

### Configuration

The deployment uses `.env.github` configuration:

```bash
SITE=https://ali-h-abbas.github.io
BASE_PATH=/astrowind-base
```

### How It Works

1. The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys on push to main
2. The configuration in `astro.config.ts` uses environment variables with fallback values
3. Both `astro.config.ts` and `src/config.yaml` must match for proper asset loading

### Manual Build for GitHub Pages

```bash
# Build with GitHub Pages configuration (uses defaults)
npm run build

# Or explicitly specify environment variables
SITE=https://ali-h-abbas.github.io BASE_PATH=/astrowind-base npm run build
```

### Deploying to Your Own Repository

To deploy to your own GitHub Pages:

1. Fork or clone this repository
2. Update `.env.github`:
   ```bash
   SITE=https://your-username.github.io
   BASE_PATH=/your-repository-name
   ```
3. Update `src/config.yaml` to match
4. Enable GitHub Pages in repository settings
5. Push to main branch (deployment is automatic)

## Vercel Deployment

### Setup

1. Import your repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - `SITE`: Your Vercel domain (e.g., `https://your-site.vercel.app`)
   - `BASE_PATH`: `/`

### Using .env.vercel Locally

```bash
# Copy the Vercel configuration
cp .env.vercel .env

# Update with your Vercel domain
# Edit .env and change SITE to your domain

# Build
npm run build
```

### Build Command

Vercel will automatically run:

```bash
npm run build
```

The environment variables set in Vercel dashboard will be used automatically.

## Netlify Deployment

### Setup

1. Connect your repository to Netlify
2. Configure environment variables in Netlify dashboard:
   - `SITE`: Your Netlify domain (e.g., `https://your-site.netlify.app`)
   - `BASE_PATH`: `/`

### Build Configuration

Build command:

```bash
npm run build
```

Publish directory:

```
dist
```

### Using netlify.toml

The repository includes a `netlify.toml` file. You can add environment variables there:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  SITE = "https://your-site.netlify.app"
  BASE_PATH = "/"
```

## Local Development

### Starting the Dev Server

```bash
npm run dev
```

For local development, you typically don't need a base path:

```bash
# Create .env for local development
cp .env.example .env

# Edit .env
SITE=http://localhost:4321
BASE_PATH=/
```

### Testing Production Build Locally

```bash
# Build the site
npm run build

# Preview the production build
npm run preview
```

## Environment Variables

### Available Variables

- **SITE**: The full URL where your site will be hosted
  - Example: `https://ali-h-abbas.github.io`
- **BASE_PATH**: The base path for your deployment
  - Example: `/astrowind-base` (for GitHub Pages project sites)
  - Example: `/` (for Vercel/Netlify root deployments)

### Configuration Files

- `.env.example`: Template with documentation
- `.env.github`: GitHub Pages configuration
- `.env.vercel`: Vercel deployment configuration
- `.env`: Local environment (not committed to git)

### Priority

Environment variables are loaded in this order:

1. System environment variables (highest priority)
2. `.env` file
3. Default values in `astro.config.ts` (fallback)

## Switching Between Platforms

### Method 1: Using Environment Files (Recommended)

```bash
# For GitHub Pages
cp .env.github .env
npm run build

# For Vercel
cp .env.vercel .env
npm run build

# For local development
cp .env.example .env
# Edit .env to set SITE=http://localhost:4321 and BASE_PATH=/
npm run dev
```

### Method 2: Inline Environment Variables

```bash
# GitHub Pages
SITE=https://ali-h-abbas.github.io BASE_PATH=/astrowind-base npm run build

# Vercel/Netlify
SITE=https://your-domain.vercel.app BASE_PATH=/ npm run build

# Local development
SITE=http://localhost:4321 BASE_PATH=/ npm run dev
```

### Method 3: Platform-Specific Scripts

The `package.json` includes convenience scripts for reference:

```bash
# All build scripts are equivalent - they use environment variables or fallback to defaults
npm run build
npm run build:github
npm run build:vercel
```

To deploy to a specific platform, either:

1. Copy the appropriate `.env` file before building:

```bash
# For GitHub Pages
cp .env.github .env
npm run build

# For Vercel
cp .env.vercel .env
npm run build
```

2. Or set environment variables inline:

```bash
# For GitHub Pages
SITE=https://ali-h-abbas.github.io BASE_PATH=/astrowind-base npm run build

# For Vercel
SITE=https://your-domain.vercel.app BASE_PATH=/ npm run build
```

## Configuration Consistency

**Important**: Both `astro.config.ts` and `src/config.yaml` must have matching `site` and `base` values.

### astro.config.ts

```typescript
export default defineConfig({
  site: import.meta.env.SITE || 'https://ali-h-abbas.github.io',
  base: import.meta.env.BASE_PATH || '/astrowind-base',
  // ...
});
```

### src/config.yaml

```yaml
site:
  name: AstroWind
  site: 'https://ali-h-abbas.github.io'
  base: '/astrowind-base'
  # ...
```

The `src/config.yaml` provides fallback values used by the site's internal configuration. The Astro config takes precedence for build-time asset path generation.

## Troubleshooting

### CSS Not Loading

**Symptoms**: Site appears unstyled, default fonts, no formatting

**Solution**: Check that base path matches in both config files

```bash
# Verify astro.config.ts base path
grep -A 2 "defineConfig" astro.config.ts

# Verify config.yaml base path
grep -A 3 "^site:" src/config.yaml
```

### Assets Return 404

**Symptoms**: Images, fonts, or JavaScript files not found

**Solution**: Ensure `SITE` and `BASE_PATH` environment variables are set correctly for your deployment platform.

### Navigation Links Broken

**Symptoms**: Clicking links leads to 404 pages

**Solution**: Verify that the base path in both configs matches your actual deployment URL structure.

## Testing Your Configuration

Before deploying, test your configuration locally:

```bash
# 1. Build with your target configuration
SITE=https://your-domain.com BASE_PATH=/your-path npm run build

# 2. Preview the build
npm run preview

# 3. Open http://localhost:4321 in your browser
#    Note: The preview server serves from root, so navigate to
#    http://localhost:4321 and not http://localhost:4321/your-path

# 4. Check that:
#    - CSS and styles load correctly
#    - Navigation links work (they will include the base path)
#    - Images and assets display
#    - No 404 errors in browser console
```

## Need Help?

- Check that environment variables are set correctly
- Verify both config files have matching values
- Review the browser console for 404 errors
- Ensure your deployment platform has the correct environment variables configured

## Summary

1. **GitHub Pages (Project)**: Use `BASE_PATH=/repository-name`
2. **Vercel/Netlify (Root)**: Use `BASE_PATH=/`
3. **Always keep** `astro.config.ts` and `src/config.yaml` in sync
4. **Use environment variables** to avoid code changes when switching platforms
5. **Test locally** before deploying to production
