# Sanity CMS Setup Guide

This guide will walk you through setting up Sanity.io as a headless CMS for managing blog posts on your AstroWind site.

## Prerequisites

- Node.js 18.17.1 or higher
- npm or pnpm package manager
- A Sanity.io account (free to create at [sanity.io](https://www.sanity.io/))

## Step 1: Install Sanity CLI Globally (Optional)

While not required, installing the Sanity CLI globally can make things easier:

```bash
npm install -g sanity
```

Alternatively, you can use `npx sanity` for all commands.

## Step 2: Install Root Dependencies

First, install the new Sanity-related dependencies in the root project:

```bash
npm install
```

This will install:
- `@sanity/client` - For fetching data from Sanity
- `@sanity/image-url` - For generating optimized image URLs  
- `@portabletext/to-html` - For rendering Sanity's Portable Text to HTML
- `sanity` (devDependency) - Sanity CLI and Studio

## Step 3: Initialize Sanity Studio

Navigate to the studio directory and initialize your Sanity project:

```bash
cd studio
npx sanity init
```

When prompted:

1. **Login/Create Account**: Follow the prompts to log in or create a Sanity account
2. **Create a new project**: Choose "Yes" to create a new project
3. **Project name**: Enter a name like "AstroWind Blog"
4. **Dataset**: Use "production" (default)
5. **Project template**: Choose "Clean project with no predefined schemas"

The CLI will create a new Sanity project and provide you with a **Project ID**. Save this ID - you'll need it in the next step.

## Step 4: Install Studio Dependencies

Install the dependencies for the Sanity Studio:

```bash
npm install
```

## Step 5: Configure Environment Variables

### In the Studio Directory

Create a `.env` file in the `studio/` directory:

```bash
# studio/.env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
```

Replace `your_project_id_here` with the Project ID from Step 3.

### In the Root Directory

Create or update the `.env` file in the root directory:

```bash
# .env
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
```

Use the same Project ID from Step 3.

> **Note**: The `PUBLIC_` prefix is required for Astro to make these variables available to client-side code.

## Step 6: Run Sanity Studio Locally

From the studio directory, start the development server:

```bash
npm run dev
```

Or from the root directory:

```bash
npm run studio:dev
```

This will start Sanity Studio at `http://localhost:3333` (or another port if 3333 is taken).

## Step 7: Create Your First Content

### Create an Author

1. Open Sanity Studio in your browser (`http://localhost:3333`)
2. Click on "Author" in the sidebar
3. Click "Create new Author"
4. Fill in:
   - **Name**: Your name
   - **Slug**: Click "Generate" to auto-generate from name
   - **Image** (optional): Upload a profile photo
   - **Bio** (optional): Write a short bio
   - **Social Links** (optional): Add social media URLs
5. Click "Publish"

### Create a Category

1. Click on "Category" in the sidebar
2. Click "Create new Category"
3. Fill in:
   - **Title**: e.g., "Tutorial", "News", "Announcement"
   - **Slug**: Click "Generate"
   - **Description** (optional): Brief description of the category
4. Click "Publish"

### Create Your First Blog Post

1. Click on "Blog Post" in the sidebar
2. Click "Create new Blog Post"
3. Fill in:
   - **Title**: Your post title
   - **Slug**: Click "Generate"
   - **Excerpt**: A brief summary (recommended for SEO)
   - **Author**: Select the author you created
   - **Main Image**: Upload a featured image
     - Add **Alt Text** for accessibility
   - **Categories**: Select one or more categories
   - **Tags**: Add relevant tags (press Enter after each tag)
   - **Published at**: Set the publish date/time
   - **Body**: Write your post content using the rich text editor
     - Use the toolbar to add headings, lists, links, images, code blocks
   - **Draft**: Leave unchecked to publish, or check to keep as draft
   - **SEO Settings** (optional): Custom meta title and description
4. Click "Publish"

## Step 8: Deploy Sanity Studio (Production)

Once you're ready to make your Studio accessible online, deploy it:

```bash
cd studio
npx sanity deploy
```

Or from the root:

```bash
npm run studio:deploy
```

When prompted:
- Choose a Studio hostname (e.g., "astrowind-blog")
- Your Studio will be available at `https://your-hostname.sanity.studio`

## Step 9: Test the Integration Locally

1. Make sure you have at least one published (non-draft) blog post
2. Start your Astro development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:4321/blog` (adjust port if different)
4. You should see your blog posts from Sanity!

## Step 10: Build and Deploy to Cloudflare Pages

### Update Environment Variables in Cloudflare Pages

1. Go to your Cloudflare Pages dashboard
2. Navigate to your project → Settings → Environment Variables
3. Add the following variables:
   - `PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
   - `PUBLIC_SANITY_DATASET`: `production`

### Build and Deploy

When you push changes to your repository, Cloudflare Pages will automatically:
1. Install dependencies (including Sanity packages)
2. Build your Astro site with `npm run build`
3. Fetch blog posts from Sanity during build
4. Deploy the static site with all blog content

## Troubleshooting

### "Failed to fetch posts from Sanity"

- **Check Project ID**: Ensure `PUBLIC_SANITY_PROJECT_ID` in your `.env` matches your actual Sanity project ID
- **Check Dataset**: Verify the dataset name is correct (usually "production")
- **Check Network**: Make sure you have internet connectivity
- **CORS Issues**: By default, Sanity allows all origins. If you've restricted origins in your Sanity project settings, add your local and production URLs

### "No blog posts showing"

- **Check Draft Status**: Make sure your posts have `draft` set to `false` or unchecked
- **Check Published Date**: Ensure posts have a valid `publishedAt` date
- **Clear Cache**: Try clearing your browser cache and restarting the dev server
- **Check Query**: Verify posts exist in Sanity Studio under "Blog Post"

### Build Fails on Cloudflare Pages

- **Environment Variables**: Confirm all `PUBLIC_SANITY_*` variables are set in Cloudflare Pages settings
- **Build Command**: Ensure build command is `npm run build` or `npm run build:github`
- **Node Version**: Set Node version to 18 or higher in Cloudflare Pages settings

## Content Workflow

### Recommended Publishing Flow

1. **Create Draft**: Start with draft checkbox enabled
2. **Preview**: Use Sanity's preview features to review content
3. **Publish**: Uncheck draft when ready to publish
4. **Rebuild**: Trigger a rebuild on Cloudflare Pages (automatic with webhooks - see below)

### Setting Up Automatic Rebuilds (Optional)

To automatically rebuild your site when content changes in Sanity:

1. In Cloudflare Pages, create a Deploy Hook URL
2. In Sanity Studio settings, add the Deploy Hook as a webhook
3. Configure it to trigger on document publish/unpublish

Now your site will automatically rebuild whenever you publish or unpublish content!

## Schema Customization

All Sanity schemas are located in `studio/schemaTypes/`:

- `post.ts` - Blog post schema
- `author.ts` - Author schema  
- `category.ts` - Category schema
- `blockContent.ts` - Rich text editor configuration

Feel free to customize these to match your needs. After making changes:

1. Restart Sanity Studio (`npm run dev` in studio directory)
2. The changes will be reflected immediately in the Studio UI

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [Sanity + Astro Guide](https://www.sanity.io/guides/sanity-astro-blog)

## Support

- **Sanity Questions**: [Sanity Community Slack](https://slack.sanity.io/)
- **Astro Questions**: [Astro Discord](https://astro.build/chat)
- **This Template**: Open an issue on the GitHub repository

---

**Next Steps**: Once everything is working, consider adding:
- Author profile pages
- Category/tag filtering
- Search functionality
- Related posts
- Comments integration
- Newsletter signup
