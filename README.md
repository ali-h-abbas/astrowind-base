# 🚀 AstroWind

<img src="https://raw.githubusercontent.com/arthelokyo/.github/main/resources/astrowind/lighthouse-score.png" align="right"
     alt="AstroWind Lighthouse Score" width="100" height="358">

🌟 _Most *starred* & *forked* Astro theme in 2022, 2023 & 2024_. 🌟

**AstroWind** is a free and open-source template to make your website using **[Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/)**. Ready to start a new project and designed taking into account web best practices.

- ✅ **Production-ready** scores in **PageSpeed Insights** reports.
- ✅ Integration with **Tailwind CSS** supporting **Dark mode** and **_RTL_**.
- ✅ **Fast and SEO friendly blog** with automatic **RSS feed**, **MDX** support, **Categories & Tags**, **Social Share**, ...
- ✅ **Image Optimization** (using new **Astro Assets** and **Unpic** for Universal image CDN).
- ✅ Generation of **project sitemap** based on your routes.
- ✅ **Open Graph tags** for social media sharing.
- ✅ **Analytics** built-in Google Analytics, and Splitbee integration.

<br>

![AstroWind Theme Screenshot](https://raw.githubusercontent.com/arthelokyo/.github/main/resources/astrowind/screenshot-astrowind-1.0.png)

[![arthelokyo](https://custom-icon-badges.demolab.com/badge/made%20by%20-arthelokyo-556bf2?style=flat-square&logo=arthelokyo&logoColor=white&labelColor=101827)](https://github.com/arthelokyo)
[![License](https://img.shields.io/github/license/arthelokyo/astrowind?style=flat-square&color=dddddd&labelColor=000000)](https://github.com/arthelokyo/astrowind/blob/main/LICENSE.md)
[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg?style=flat-square)](https://github.com/arthelokyo)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/arthelokyo/astrowind#contributing)
[![Known Vulnerabilities](https://snyk.io/test/github/arthelokyo/astrowind/badge.svg?style=flat-square)](https://snyk.io/test/github/arthelokyo/astrowind)
[![Stars](https://img.shields.io/github/stars/arthelokyo/astrowind.svg?style=social&label=stars&maxAge=86400&color=ff69b4)](https://github.com/arthelokyo/astrowind)
[![Forks](https://img.shields.io/github/forks/arthelokyo/astrowind.svg?style=social&label=forks&maxAge=86400&color=ff69b4)](https://github.com/arthelokyo/astrowind)

<br>

<details open>
<summary>Table of Contents</summary>

- [Demo](#demo)
- [Upcoming: AstroWind 2.0 – We Need Your Vision!](#-upcoming-astrowind-20--we-need-your-vision)
- [TL;DR](#tldr)
- [Getting started](#getting-started)
  - [Project structure](#project-structure)
  - [Commands](#commands)
  - [Configuration](#configuration)
  - [Deploy](#deploy)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

<br>

## Demo

📌 [https://astrowind.vercel.app/](https://astrowind.vercel.app/)

<br>

## 🔔 Upcoming: AstroWind 2.0 – We Need Your Vision!

We're embarking on an exciting journey with **AstroWind 2.0**, and we want you to be a part of it! We're currently taking the first steps in developing this new version and your insights are invaluable. Join the discussion and share your feedback, ideas, and suggestions to help shape the future of **AstroWind**. Let's make **AstroWind 2.0** even better, together!

[Share Your Feedback in Our Discussion!](https://github.com/arthelokyo/astrowind/discussions/392)

<br>

## TL;DR

```shell
npm create astro@latest -- --template arthelokyo/astrowind
```

## Getting started

**AstroWind** tries to give you quick access to creating a website using [Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/). It's a free theme which focuses on simplicity, good practices and high performance.

Very little vanilla javascript is used only to provide basic functionality so that each developer decides which framework (React, Vue, Svelte, Solid JS...) to use and how to approach their goals.

In this version the template supports all the options in the `output` configuration, `static`, `hybrid` and `server`, but the blog only works with `prerender = true`. We are working on the next version and aim to make it fully compatible with SSR.

### Project structure

Inside **AstroWind** template, you'll see the following folders and files:

```
/
├── public/
│   ├── _headers
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── ui/
│   │   ├── widgets/
│   │   │   ├── Header.astro
│   │   │   └── ...
│   │   ├── CustomStyles.astro
│   │   ├── Favicons.astro
│   │   └── Logo.astro
│   ├── content/
│   │   ├── post/
│   │   │   ├── post-slug-1.md
│   │   │   ├── post-slug-2.mdx
│   │   │   └── ...
│   │   └-- config.ts
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── MarkdownLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── [...blog]/
│   │   │   ├── [category]/
│   │   │   ├── [tag]/
│   │   │   ├── [...page].astro
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├-- rss.xml.ts
│   │   └── ...
│   ├── utils/
│   ├── config.yaml
│   └── navigation.js
├── package.json
├── astro.config.ts
└── ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

[![Edit AstroWind on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/arthelokyo/astrowind/tree/main) [![Open in Gitpod](https://svgshare.com/i/xdi.svg)](https://gitpod.io/?on=gitpod#https://github.com/arthelokyo/astrowind) [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/arthelokyo/astrowind)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file `README.md`. Update `src/config.yaml` and contents. Have fun!

<br>

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Installs dependencies                              |
| `npm run dev`       | Starts local dev server at `localhost:4321`        |
| `npm run build`     | Build your production site to `./dist/`            |
| `npm run preview`   | Preview your build locally, before deploying       |
| `npm run check`     | Check your project for errors                      |
| `npm run fix`       | Run Eslint and format codes with Prettier          |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://example.com'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true # If the blog will be enabled
    postsPerPage: 6 # Number of posts per page

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
    relatedPostsCount: 4 # Number of related posts to display

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

<br>

#### Customize Design

To customize Font families, Colors or more Elements refer to the following files:

- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`

### Deploy

#### Deploy to production (manual)

You can create an optimized production build with:

```shell
npm run build
```

Now, your website is ready to be deployed. All generated files are located at
`dist` folder, which you can deploy the folder to any hosting service you
prefer.

#### Deploy to Netlify

Clone this repository on your own GitHub account and deploy it to Netlify:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/arthelokyo/astrowind)

#### Deploy to Vercel

Clone this repository on your own GitHub account and deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farthelokyo%2Fastrowind)

#### Deploy to Cloudflare Pages

This template is optimized for Cloudflare Pages with SSR support via Cloudflare Functions.

1. **Connect your repository** to Cloudflare Pages
2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `18` or higher

3. **Environment Variables** (in Cloudflare Pages Dashboard):
   - `SITE`: Your Cloudflare Pages URL (e.g., `https://your-site.pages.dev`)
   - `BASE_PATH`: `/` (for root domain deployment)
   - `CONVERTKIT_API_KEY`: (secret) Your ConvertKit API key
   - `CONVERTKIT_FORM_ID`: (text) Your ConvertKit form ID

4. **KV Namespace Setup** (Required for email subscriptions):
   - See the [Cloudflare KV Setup](#cloudflare-kv-setup) section below for detailed instructions
   - This is required for the `/api/subscribe` endpoint to work

5. **Update Sutra URL**: Edit `src/pages/landing/meditation-bootcamp.astro` and replace `https://sutra.co/checkout/your-course-id-here` with your actual Sutra checkout URL

The API route will work automatically with Cloudflare Pages Functions once KV is properly configured.

<br>

## Frequently Asked Questions

- Why?
-
-

<br>

## Related projects

- [TailNext](https://tailnext.vercel.app/) - Free template using Next.js 14 and Tailwind CSS with the new App Router.
- [Qwind](https://qwind.pages.dev/) - Free template to make your website using Qwik + Tailwind CSS.

## Contributing

If you have any ideas, suggestions or find any bugs, feel free to open a discussion, an issue or create a pull request.
That would be very useful for all of us and we would be happy to listen and take action.

## Acknowledgements

Initially created by **Arthelokyo** and maintained by a community of [contributors](https://github.com/arthelokyo/astrowind/graphs/contributors).

## License

**AstroWind** is licensed under the MIT license — see the [LICENSE](./LICENSE.md) file for details.

---

## 📝 Blog Management with Sanity CMS

This repository includes integration with **Sanity.io**, a powerful headless CMS for managing blog posts. This allows content authors to create, edit, and publish blog content through an intuitive web-based interface without touching code.

### Why Sanity?

- **🎨 Intuitive Editor**: Rich text editing with real-time preview
- **🚀 Fast & Scalable**: Built-in CDN for images and content
- **🔄 Real-time Collaboration**: Multiple editors can work simultaneously
- **📱 Portable Content**: Content as structured data, not HTML
- **🌐 Hosted Studio**: Deploy your Studio to Sanity's cloud for free

### Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Initialize Sanity project**:

   ```bash
   cd studio
   npx sanity init
   ```

3. **Configure environment variables** with your Sanity project ID (obtained from step 2)

4. **Run Sanity Studio locally**:

   ```bash
   npm run studio:dev
   ```

5. **Create content** and publish your first blog post!

### Detailed Setup Guide

For complete setup instructions, see **[docs/SANITY_SETUP.md](./docs/SANITY_SETUP.md)**

The guide covers:

- Creating a Sanity account and project
- Configuring environment variables
- Running Sanity Studio locally and deploying it
- Creating authors, categories, and blog posts
- Deploying to Cloudflare Pages with Sanity integration
- Troubleshooting common issues

### Blog Features

The Sanity integration provides:

- **📄 Blog Posts**: Full-featured blog posts with rich text editing
- **👤 Authors**: Author profiles with bio and social links
- **🏷️ Categories**: Organize posts into categories
- **🔖 Tags**: Add tags for better discoverability
- **🖼️ Image Optimization**: Automatic image optimization via Sanity CDN
- **✍️ Rich Text**: Support for headings, lists, links, images, and code blocks
- **📝 Draft Mode**: Work on posts privately before publishing
- **🔍 SEO**: Custom meta titles and descriptions per post

### Content Workflow

1. **Create/Edit** content in Sanity Studio (locally or hosted)
2. **Preview** your changes in the Studio
3. **Publish** when ready (uncheck "Draft")
4. **Deploy** to Cloudflare Pages (automatically rebuilds with new content)

### Available NPM Scripts

```bash
# Run Sanity Studio locally
npm run studio:dev

# Build Sanity Studio for production
npm run studio:build

# Deploy Sanity Studio to Sanity's hosted platform
npm run studio:deploy
```

### Blog Routes

- `/blog` - Blog index page with all published posts
- `/blog/[slug]` - Individual blog post pages

### Coexistence with Existing Blog

The Sanity blog integration is set up in a new `/blog` route, separate from the existing `[...blog]` route that uses markdown files. Both can coexist:

- **Sanity blog**: `/blog/` - CMS-managed content
- **Markdown blog** (if present): `/[...blog]/` - File-based content

This allows you to:

- Gradually migrate content from markdown to Sanity
- Keep some content as markdown while using Sanity for new posts
- Use Sanity for blog posts while planning future Sutra integration for course content

### Important Notes

- **Project ID Required**: You must run `npx sanity init` and add your project ID to environment variables
- **Static Build**: Blog posts are fetched at build time (static site generation)
- **Cloudflare Compatible**: Fully compatible with Cloudflare Pages deployment
- **No Breaking Changes**: Existing site functionality remains intact

---

## 🧘 Meditation Platform Setup

This repository has been configured as a meditation teacher/course website with email capture and ConvertKit integration.

### Features

- **Teacher-focused Homepage**: Showcases meditation teacher Sarah Chen with bio, journey, and offerings
- **Meditation Bootcamp Landing Page**: Conversion-optimized page with email capture form
- **Offerings Page**: Displays available meditation programs and courses
- **API Email Capture**: Server-side API route for collecting emails and integrating with ConvertKit
- **Database Tracking**: Local JSON database for storing subscriber information and analytics

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Site Configuration
SITE=https://ali-h-abbas.github.io
BASE_PATH=/astrowind-base

# ConvertKit API Configuration
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=your_form_id_here

# Sutra Checkout (optional)
SUTRA_CHECKOUT_URL=https://sutra.co/checkout/meditation-bootcamp-id
```

### ConvertKit Setup

1. **Get API Key**:
   - Log in to ConvertKit
   - Go to Settings > Advanced > API & Webhooks
   - Copy your API Key

2. **Get Form ID**:
   - Create a new Form in ConvertKit or use an existing one
   - The Form ID is in the URL when editing the form
   - Example: `https://app.convertkit.com/forms/123456` → Form ID is `123456`

3. **Add to Environment Variables**:
   ```bash
   CONVERTKIT_API_KEY=your_actual_api_key
   CONVERTKIT_FORM_ID=123456
   ```

### Cloudflare KV Setup

The email subscription system uses **Cloudflare Workers KV** for persistent storage of subscriber data. This setup is required for the `/api/subscribe` endpoint to work in production.

1. **Create KV Namespace:**
   - Go to Cloudflare Dashboard → **Workers & Pages** → **KV**
   - Click "**Create a namespace**"
   - Production namespace name: `astrowind_subscribers`
   - Preview namespace name (for preview deployments): `astrowind_subscribers_preview`

2. **Bind KV to Pages Project:**
   - Go to your Pages project in Cloudflare Dashboard
   - Navigate to **Settings** → **Functions**
   - Scroll down to "**KV namespace bindings**"
   - Click "**Add binding**"
   - For **Production**:
     - Variable name: `SUBSCRIBERS`
     - KV namespace: Select `astrowind_subscribers`
   - For **Preview** (optional but recommended):
     - Add another binding with variable name: `SUBSCRIBERS`
     - KV namespace: Select `astrowind_subscribers_preview`

3. **Configure Environment Variables:**
   - In the same Cloudflare Pages settings, go to **Environment variables**
   - Add the following variables:
     - `CONVERTKIT_API_KEY` (secret) - Your ConvertKit API key
     - `CONVERTKIT_FORM_ID` (text) - Your ConvertKit form ID

4. **Redeploy:**
   - After adding KV bindings and environment variables, trigger a new deployment
   - KV bindings only take effect on new deployments
   - You can trigger a redeploy by pushing a new commit or manually in the Cloudflare dashboard

**Note:** The KV namespace variable name MUST be `SUBSCRIBERS` (all caps) as this is what the code expects.

### Deployment Considerations

#### API Route Limitations

The `/api/subscribe` endpoint requires **server-side rendering** and will NOT work on static hosting platforms like GitHub Pages.

**Deployment Options:**

1. **Vercel (Recommended)**:

   ```bash
   npm install @astrojs/vercel
   ```

   Update `astro.config.ts`:

   ```typescript
   import vercel from '@astrojs/vercel/serverless';

   export default defineConfig({
     output: 'static',
     adapter: vercel(),
     // ... rest of config
   });
   ```

   Then uncomment `export const prerender = false;` in `src/pages/api/subscribe.ts`

2. **Netlify**:

   ```bash
   npm install @astrojs/netlify
   ```

   Update `astro.config.ts`:

   ```typescript
   import netlify from '@astrojs/netlify';

   export default defineConfig({
     output: 'static',
     adapter: netlify(),
     // ... rest of config
   });
   ```

   Then uncomment `export const prerender = false;` in `src/pages/api/subscribe.ts`

3. **Alternative for GitHub Pages**:
   If you must use GitHub Pages, consider these alternatives:
   - Use a third-party form service like [FormSpree](https://formspree.io/) or [Basin](https://usebasin.com/)
   - Use ConvertKit's embeddable forms instead of the custom form
   - Use a serverless function (AWS Lambda, Cloudflare Workers) as a separate endpoint

### Customization Guide

#### Update Teacher Information

1. **Name and Bio**:
   - Edit `src/pages/index.astro`
   - Search for "Sarah Chen" and replace with actual teacher name
   - Update the bio and journey content

2. **Images**:
   - Replace Unsplash URLs with actual teacher photos
   - Update image URLs in:
     - `src/pages/index.astro` (Hero, About, Testimonials)
     - `src/pages/landing/meditation-bootcamp.astro`
     - `src/pages/offerings.astro`

3. **Course Content**:
   - Edit `src/pages/landing/meditation-bootcamp.astro`
   - Update program details, pricing, and benefits
   - Modify FAQ section with actual questions

4. **Sutra Checkout Integration**:
   - Get your actual Sutra checkout URL
   - Update `.env` with `SUTRA_CHECKOUT_URL`
   - Or directly update the URL in `src/pages/landing/meditation-bootcamp.astro`

#### Update Navigation

Edit `src/navigation.ts` to customize:

- Header links
- Footer links
- Social media links
- CTA buttons

### Database

Subscriber data is stored locally in `data/subscribers.json` (gitignored).

**Access subscriber data**:

```typescript
import { getSubscribers, getStats } from '~/lib/db';

// Get all subscribers
const subscribers = getSubscribers();

// Get statistics
const stats = getStats();
console.log(stats);
// {
//   total: 150,
//   bySource: { 'meditation-bootcamp': 150 },
//   convertKit: { success: 145, error: 5, pending: 0 }
// }
```

**Note**: For production, consider migrating to a proper database like Supabase or Firebase.

### Testing Locally

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Test email capture**:
   - Visit `http://localhost:4321/landing/meditation-bootcamp`
   - Fill out the email form
   - Check `data/subscribers.json` for the new entry

4. **Build for production**:
   ```bash
   npm run build
   ```

### Project Structure (Meditation Platform Additions)

```
/
├── src/
│   ├── lib/
│   │   └── db.ts                              # Database helper functions
│   ├── pages/
│   │   ├── api/
│   │   │   └── subscribe.ts                   # Email capture API endpoint
│   │   ├── landing/
│   │   │   └── meditation-bootcamp.astro      # Bootcamp landing page
│   │   ├── offerings.astro                    # Offerings page
│   │   └── index.astro                        # Teacher homepage
│   └── navigation.ts                           # Updated navigation
├── data/
│   ├── .gitkeep
│   └── subscribers.json                        # (gitignored) Subscriber database
└── .env.example                                # Environment variables template
```

### Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Rate limiting**: The API route includes basic rate limiting (5 requests/minute per IP)
3. **Email validation**: Both client-side and server-side validation
4. **HTTPS only**: Always use HTTPS in production
5. **CORS**: Configure CORS headers if needed for your deployment

### Troubleshooting

**Build fails with "No adapter installed"**:

- The API route requires server-side rendering
- Either install an adapter (Vercel/Netlify) or comment out the `export const prerender = false;` line in `src/pages/api/subscribe.ts`

**ConvertKit subscription fails**:

- Check that `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID` are set correctly
- Verify the API key has proper permissions in ConvertKit
- Check the console/logs for specific error messages

**Emails not appearing in ConvertKit**:

- Check spam filters
- Verify the form ID is correct
- Check ConvertKit dashboard for new subscribers
- Review `data/subscribers.json` to see if the API call succeeded locally

### Future Enhancements

- [ ] Migration to Supabase/Firebase for database
- [ ] Advanced analytics dashboard
- [ ] Email automation sequences in ConvertKit
- [ ] Payment tracking integration with Stripe
- [ ] User authentication for course access
- [ ] CMS integration for content management

### Support

For issues or questions about the meditation platform setup:

1. Check the troubleshooting section above
2. Review the inline code comments
3. Open an issue on GitHub

---
