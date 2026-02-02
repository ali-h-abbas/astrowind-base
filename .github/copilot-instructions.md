# GitHub Copilot Instructions for AstroWind Course Signup Site

## Project Overview

This is an **Astro-based landing site** designed for a **simple course enrollment flow** with Stripe payment integration. The primary goal is to convert visitors into paying customers who will be automatically enrolled in a course via Zapier automation.

### Business Flow
1. Visitor lands on the site and learns about the course
2. Visitor clicks signup/CTA button
3. Visitor is redirected to Stripe Checkout
4. Upon successful payment, Stripe triggers Zapier webhook
5. Zapier enrolls the user in Sutra (course platform)

### Tech Stack
- **Framework**: Astro 5.0 (Static Site Generation)
- **Styling**: Tailwind CSS with dark mode support
- **Payment**: Stripe Checkout (external)
- **Analytics**: Google Analytics (configured in `src/config.yaml`)
- **Automation**: Zapier (external, triggered by Stripe webhooks)
- **Deployment**: GitHub Pages (`https://ali-h-abbas.github.io/astrowind-base`)

---

## Code Standards & Conventions

### File Structure
```
src/
├── pages/           # Route pages (.astro files)
├── components/      # Reusable Astro components
│   ├── widgets/    # Pre-built UI sections (Hero, CTA, Pricing, etc.)
│   └── ui/         # Smaller UI components
├── layouts/         # Page layouts (PageLayout, LandingLayout)
├── content/         # Blog posts (MDX/Markdown)
├── assets/          # Images, styles (processed)
├── config.yaml      # Site configuration
└── navigation.ts    # Navigation menu configuration
```

### Astro Component Conventions
- Use `.astro` files for components (supports JSX-like syntax)
- Define TypeScript interfaces for props at the top of files
- Use `---` fences for component logic (frontmatter)
- Use fragments (`<Fragment>`) for slots
- Keep components pure and focused on presentation

### Styling Guidelines
- **Use Tailwind utility classes** for styling
- Follow existing Tailwind configuration in `tailwind.config.js`
- Support dark mode with `dark:` prefix classes
- Custom styles go in `src/assets/styles/tailwind.css`
- Component-specific styles in `src/components/CustomStyles.astro`

### Configuration Management
- **Primary config**: `src/config.yaml`
  - Site metadata, SEO, analytics
  - Blog settings (currently enabled)
  - UI theme preferences
- **Navigation**: `src/navigation.ts`
  - Header links and actions
  - Footer structure

---

## Development Guidelines

### Creating New Pages
1. Create `.astro` files in `src/pages/` directory
2. Use existing layouts: `PageLayout.astro` or `LandingLayout.astro`
3. Import and compose pre-built widgets from `src/components/widgets/`
4. Set metadata for SEO (title, description)

**Example: New signup page**
```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const metadata = {
  title: 'Course Signup',
  description: 'Enroll in our transformative course today',
};
---

<Layout metadata={metadata}>
  <Hero 
    title="Transform Your Skills"
    actions={[
      { 
        variant: 'primary', 
        text: 'Enroll Now', 
        href: 'https://checkout.stripe.com/...' 
      }
    ]}
  />
</Layout>
```

### Stripe Integration Guidelines
- **Do NOT** handle payments directly in the app
- **Use Stripe Checkout** (hosted payment page)
- Link CTA buttons to Stripe Checkout URLs
- Include UTM parameters for tracking: `?utm_source=website&utm_medium=cta&utm_campaign=course_signup`
- Store Stripe Checkout URLs as environment variables or in config

**Example CTA with Stripe:**
```astro
<CallToAction
  title="Ready to start learning?"
  actions={[
    {
      variant: 'primary',
      text: 'Enroll Now - $99',
      href: 'https://buy.stripe.com/your-checkout-link',
      target: '_blank',
      icon: 'tabler:credit-card'
    }
  ]}
/>
```

### Analytics & Tracking
- Configure Google Analytics ID in `src/config.yaml`:
  ```yaml
  analytics:
    vendors:
      googleAnalytics:
        id: "G-XXXXXXXXXX"
  ```
- Track conversion events by adding data attributes to CTAs:
  ```astro
  <a 
    href="..." 
    data-event="click_enroll_cta"
    data-location="hero_section"
  >
  ```
- Consider adding Facebook Pixel or other tracking pixels in `src/layouts/Layout.astro`

### Zapier Automation Context
- Stripe webhooks are handled **outside this codebase** (in Zapier)
- Ensure Stripe is configured to send `checkout.session.completed` events
- No backend logic needed in this static site
- Focus on clear messaging about what happens after payment

---

## Widget Reference

The template includes pre-built widgets in `src/components/widgets/`. Use these for consistent UI:

| Widget | Purpose | Best for Course Site |
|--------|---------|---------------------|
| `Hero.astro` | Landing section with headline & CTA | Main course pitch |
| `Hero2.astro` | Alternative hero layout | Secondary pages |
| `CallToAction.astro` | Conversion-focused section | Bottom of pages |
| `Pricing.astro` | Pricing table | Course tiers/options |
| `Features.astro` | Feature grid | Course benefits |
| `Features3.astro` | Feature list with icons | What students learn |
| `Content.astro` | Text + image layout | Course details |
| `Steps.astro` | Sequential steps | Enrollment process |
| `FAQs.astro` | FAQ accordion | Common questions |
| `Testimonials.astro` | Social proof | Student reviews |
| `BlogLatestPosts.astro` | Recent blog posts | Course updates/blog |

### Example: Simple Course Landing Page
```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features3 from '~/components/widgets/Features3.astro';
import Pricing from '~/components/widgets/Pricing.astro';
import FAQs from '~/components/widgets/FAQs.astro';
import CallToAction from '~/components/widgets/CallToAction.astro';

const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/your-link';
---

<Layout metadata={{ title: 'Course Name' }}>
  <Hero 
    title="Master [Skill] in 30 Days"
    subtitle="Join 1,000+ students who transformed their careers"
    actions={[{ 
      variant: 'primary', 
      text: 'Start Learning', 
      href: STRIPE_CHECKOUT_URL,
      target: '_blank'
    }]}
  />
  
  <Features3 
    title="What You'll Learn"
    items={[...]}  
  />
  
  <Pricing 
    title="Simple Pricing"
    prices={[{
      title: 'Full Course Access',
      price: 99,
      callToAction: {
        text: 'Enroll Now',
        href: STRIPE_CHECKOUT_URL,
        target: '_blank'
      }
    }]}
  />
  
  <FAQs 
    title="Common Questions"
    items={[...]}  
  />
  
  <CallToAction 
    title="Ready to Transform Your Skills?"
    actions={[{
      text: 'Get Started',
      href: STRIPE_CHECKOUT_URL,
      target: '_blank'
    }]}
  />
</Layout>
```

---

## Testing & Quality

### Before Committing
```bash
npm run check      # Type checking
npm run fix        # ESLint + Prettier formatting
npm run build      # Production build test
npm run preview    # Preview production build locally
```

### Pre-deployment Checklist
- [ ] Update `src/config.yaml` with correct site name, description
- [ ] Set Google Analytics ID
- [ ] Replace placeholder content with real course information
- [ ] Test all Stripe Checkout links
- [ ] Verify UTM parameters on tracking links
- [ ] Test on mobile devices
- [ ] Check dark mode appearance
- [ ] Validate SEO metadata (Open Graph, Twitter cards)
- [ ] Test page speed (should score 90+ on PageSpeed Insights)

---

## Deployment

### GitHub Pages
- Automatically deploys via `.github/workflows/deploy.yml`
- Triggered on push to `main` branch
- Base URL configured in `src/config.yaml` and `.env.github`
- Site URL: `https://ali-h-abbas.github.io/astrowind-base`

### Environment-Specific Configs
- GitHub Pages: `.env.github`
- Vercel: `.env.vercel` (if switching platforms)
- Local development: `.env` (create from `.env.example`)

---

## Common Tasks

### Update Site Name & Branding
1. Edit `src/config.yaml` → `site.name` and `metadata.title.default`
2. Update `src/components/Logo.astro` with new logo
3. Replace favicons in `src/assets/favicons/`

### Add Google Analytics
1. Get tracking ID from Google Analytics
2. Update `src/config.yaml`:
   ```yaml
   analytics:
     vendors:
       googleAnalytics:
         id: "G-XXXXXXXXXX"
   ```

### Configure Stripe Checkout
1. Create product in Stripe Dashboard
2. Generate Checkout link
3. Add link to CTA components
4. Test in Stripe test mode first

### Modify Navigation
Edit `src/navigation.ts`:
```typescript
export const headerData = {
  links: [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Pricing', href: '/pricing' },
  ],
  actions: [
    { text: 'Enroll Now', href: 'STRIPE_URL', target: '_blank' }
  ]
};
```

### Disable Blog (Optional)
If you don't need the blog:
```yaml
# src/config.yaml
apps:
  blog:
    isEnabled: false
```

---

## Stripe → Zapier → Sutra Integration

### How It Works (External to This Repo)
1. **Stripe**: Configure webhook for `checkout.session.completed`
2. **Zapier**: 
   - Trigger: Stripe webhook
   - Action: API call to Sutra to enroll user
   - Map: `customer_email`, `customer_name`, `product_id` → Sutra fields
3. **Sutra**: Receives enrollment request and creates/updates user account

### What This Site Does
- Provides clear course information
- Collects email on landing (optional - use email capture widget)
- Redirects to Stripe for payment
- Confirms enrollment will happen automatically
- Optionally: Shows "What happens next" steps

### Recommended: Add Success Page
Create `src/pages/success.astro` for post-purchase redirect:
```astro
---
const metadata = {
  title: 'Welcome to the Course!',
  robots: { index: false, follow: false }
};
---

<Layout metadata={metadata}>
  <Hero 
    title="Payment Successful! 🎉"
    subtitle="You'll receive an email with course access details within 5 minutes."
  />
  <Steps 
    title="What Happens Next"
    items={[
      { 
        title: 'Check Your Email',
        description: 'Look for course access credentials from Sutra'
      },
      { 
        title: 'Create Your Account',
        description: 'Follow the link to set up your course portal'
      },
      { 
        title: 'Start Learning',
        description: 'Access your first lesson immediately'
      }
    ]}
  />
</Layout>
```

Set this as Stripe's success URL: `https://ali-h-abbas.github.io/astrowind-base/success`

---

## Performance & SEO

### Best Practices (Already Implemented)
- ✅ Static site generation (fast load times)
- ✅ Image optimization via Astro Assets
- ✅ Tailwind CSS (minimal CSS bundle)
- ✅ Dark mode support
- ✅ RSS feed for blog
- ✅ Sitemap generation
- ✅ Open Graph tags

### Additional Recommendations
- Add structured data (JSON-LD) for course/product schema
- Use `loading="lazy"` for below-fold images
- Optimize hero images (WebP format, < 200KB)
- Add `rel="noopener"` to external Stripe links (already recommended for `target="_blank"`)

---

## Troubleshooting

### Build Fails
- Check `npm run check` for TypeScript errors
- Verify all imports use `~` alias (e.g., `~/components/...`)
- Ensure blog posts have valid frontmatter

### Styling Issues
- Check Tailwind classes are valid
- Verify dark mode classes work: `dark:bg-gray-900`
- Clear browser cache if styles don't update

### GitHub Pages 404
- Verify `base: '/astrowind-base'` in `src/config.yaml`
- Check GitHub Pages is enabled in repo settings
- Ensure workflow has proper permissions (see `.github/workflows/deploy.yml`)

### Analytics Not Tracking
- Verify GA4 ID is correct in config
- Check browser ad blockers aren't blocking
- Use Google Tag Assistant to debug

---

## Questions?

When working with this codebase:
1. **Prefer existing widgets** over creating new components
2. **Keep it simple** - this is a static landing site, not a complex app
3. **Focus on conversion** - every change should support the signup goal
4. **Test Stripe links** in test mode before going live
5. **Mobile-first** - most visitors will be on mobile

For Zapier/Sutra integration questions, those are handled outside this codebase.