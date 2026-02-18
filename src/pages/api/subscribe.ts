/**
 * API Route: Email Subscription with ConvertKit Integration
 *
 * This endpoint handles email capture from landing pages and:
 * 1. Validates the input data
 * 2. Subscribes the user to ConvertKit
 * 3. Stores the submission in a local database for analytics
 *
 * POST /api/subscribe
 * Body: { email: string, name: string, source: string }
 *
 * Environment Variables Required:
 * - CONVERTKIT_API_KEY: Your ConvertKit API key
 * - CONVERTKIT_FORM_ID: The form ID to subscribe users to
 */

import type { APIRoute } from 'astro';
import { addSubscriber, emailExists } from '~/lib/db';

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting: simple in-memory store (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

/**
 * Simple rate limiting check
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

/**
 * Subscribe to ConvertKit
 */
async function subscribeToConvertKit(email: string, name: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = import.meta.env.CONVERTKIT_API_KEY;
  const formId = import.meta.env.CONVERTKIT_FORM_ID;

  // If ConvertKit is not configured, skip but don't fail
  if (!apiKey || !formId) {
    console.warn('ConvertKit not configured. Set CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID environment variables.');
    return { success: true }; // Allow submission to continue
  }

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('ConvertKit API error:', errorData);
      return {
        success: false,
        error: errorData.message || 'Failed to subscribe to ConvertKit',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('ConvertKit subscription error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Access Cloudflare KV namespace from runtime environment
    // IMPORTANT: This requires KV namespace binding in Cloudflare Pages settings
    // Variable name: SUBSCRIBERS
    // See README.md for setup instructions
    const kv = locals.runtime?.env?.SUBSCRIBERS;

    if (!kv) {
      console.error('KV namespace SUBSCRIBERS is not bound. Please configure in Cloudflare Pages settings.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Database configuration error. Please contact support.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get client IP for rate limiting (in production, use proper IP extraction)
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    let body: { email?: string; name?: string; source?: string };
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON payload',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { email, name, source } = body;

    // Validate required fields
    if (!email || !name || !source) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: email, name, and source are required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email format',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if email already exists (optional - you might want to allow resubscriptions)
    if (await emailExists(kv, email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'This email is already subscribed',
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Subscribe to ConvertKit
    const convertkitResult = await subscribeToConvertKit(email, name);

    // Store in database regardless of ConvertKit result
    const subscriber = {
      email,
      name,
      source,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
      convertKitStatus: convertkitResult.success ? ('success' as const) : ('error' as const),
      convertKitError: convertkitResult.error,
    };

    await addSubscriber(kv, subscriber);

    // Return success even if ConvertKit failed (we still have the lead)
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed!',
        convertkitStatus: convertkitResult.success ? 'success' : 'partial',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

/**
 * DEPLOYMENT CONFIGURATION:
 *
 * This API route uses `prerender: false` which requires server-side rendering.
 * This is enabled for Cloudflare Pages deployment which supports SSR via Functions.
 *
 * ✅ CLOUDFLARE PAGES (SSR enabled):
 * - The `prerender: false` line below enables server-side rendering
 * - This route will be handled by Cloudflare Workers/Functions
 * - Make sure astro.config.ts has output: 'server' and adapter: cloudflare()
 *
 * For other platforms (Vercel, Netlify, etc.):
 * - Install the appropriate adapter (@astrojs/vercel, @astrojs/netlify)
 * - Update astro.config.ts with the correct adapter
 */
export const prerender = false;
