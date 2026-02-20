# Rolling Back to Email Capture Flow

This document describes how to restore the ConvertKit email capture flow that was
replaced by a direct Sutra enrollment link.

## Quick Rollback Steps

### 1. Update Configuration (`src/config/enrollment.ts`)

```typescript
mode: 'email-capture'
```

### 2. Enable Environment Variables (`.env` / Cloudflare Pages settings)

```bash
CONVERTKIT_API_KEY=your_actual_key
CONVERTKIT_FORM_ID=your_actual_form_id
```

### 3. Restore the Email Capture Form

In `src/pages/landing/meditation-bootcamp.astro`, uncomment the preserved
`<section id="signup">` block (the HTML comment that wraps the form section).

### 4. Re-enable the Form-Handling Script

In the same file, uncomment the preserved `<script>` block at the bottom
(the HTML comment that wraps the client-side JS).

### 5. Update Hero CTA (optional)

If you want the Hero button to scroll to the form instead of linking directly
to Sutra, change the hero action back to:

```astro
{
  variant: 'primary',
  text: 'Reserve Your Spot',
  href: '#signup',
  icon: 'tabler:arrow-down-circle',
}
```

### 6. Test

- Submit the form with a test email and verify it appears in ConvertKit.
- Confirm the redirect to Sutra fires after the success message.

---

## Files Preserved for Rollback

| File | Purpose |
|------|---------|
| `src/pages/api/subscribe.ts` | ConvertKit API integration + KV storage |
| `src/pages/landing/meditation-bootcamp.astro` | Email form HTML and JS (commented out) |
| `src/config/enrollment.ts` | Central mode toggle |
| `.env.example` | Documents all environment variables |

## Support

For full context on the simplification, refer to the PR that introduced the
`src/config/enrollment.ts` configuration file.
