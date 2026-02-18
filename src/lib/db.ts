/**
 * Cloudflare KV-based database for storing subscriber information
 * This implementation uses Cloudflare Workers KV for persistent storage
 *
 * ✅ PRODUCTION-READY for Cloudflare Pages
 * - Data is persisted across deployments
 * - Encrypted at rest by Cloudflare
 * - Global edge network for low latency
 *
 * ⚠️ IMPORTANT: Requires KV namespace binding in Cloudflare Pages
 * - KV namespace must be named "SUBSCRIBERS" in Cloudflare Pages settings
 * - See README.md for setup instructions
 */

/**
 * Cloudflare KV Namespace type
 * This represents the KV storage interface provided by Cloudflare Workers
 */
export interface KVNamespace {
  get(key: string, options?: { type: 'text' }): Promise<string | null>;
  get<T = unknown>(key: string, options: { type: 'json' }): Promise<T | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string; expiration?: number; metadata?: unknown }>;
    list_complete: boolean;
    cursor?: string;
  }>;
}

export interface Subscriber {
  email: string;
  name: string;
  source: string; // landing page identifier (e.g., 'meditation-bootcamp')
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  convertKitStatus?: 'success' | 'error' | 'pending';
  convertKitError?: string;
}

/**
 * Read all subscribers from KV storage
 * @param kv - Cloudflare KV namespace
 * @returns Array of all subscribers
 */
export async function getSubscribers(kv: KVNamespace): Promise<Subscriber[]> {
  try {
    const subscribers: Subscriber[] = [];
    let cursor: string | undefined = undefined;
    let hasMore = true;

    // KV list operation returns paginated results
    while (hasMore) {
      const result = await kv.list({ prefix: 'subscriber:', limit: 1000, cursor });

      // Fetch each subscriber's data
      for (const key of result.keys) {
        const subscriber = await kv.get<Subscriber>(key.name, { type: 'json' });
        if (subscriber) {
          subscribers.push(subscriber);
        }
      }

      hasMore = !result.list_complete;
      cursor = result.cursor;
    }

    return subscribers;
  } catch (error) {
    console.error('Error reading subscribers from KV:', error);
    return [];
  }
}

/**
 * Add a new subscriber to KV storage
 * @param kv - Cloudflare KV namespace
 * @param subscriber - Subscriber data to store
 */
export async function addSubscriber(kv: KVNamespace, subscriber: Subscriber): Promise<void> {
  try {
    // Use lowercased email as the key for consistency and duplicate prevention
    const key = `subscriber:${subscriber.email.toLowerCase()}`;

    // Store the full subscriber object as JSON
    await kv.put(key, JSON.stringify(subscriber));
  } catch (error) {
    console.error('Error adding subscriber to KV:', error);
    throw new Error('Failed to save subscriber to database');
  }
}

/**
 * Check if an email already exists in KV storage
 * @param kv - Cloudflare KV namespace
 * @param email - Email address to check
 * @returns True if email exists, false otherwise
 */
export async function emailExists(kv: KVNamespace, email: string): Promise<boolean> {
  try {
    const key = `subscriber:${email.toLowerCase()}`;
    const subscriber = await kv.get(key);
    return subscriber !== null;
  } catch (error) {
    console.error('Error checking email existence in KV:', error);
    return false;
  }
}

/**
 * Get subscribers by source (landing page)
 * @param kv - Cloudflare KV namespace
 * @param source - Source identifier to filter by
 * @returns Array of subscribers from the specified source
 */
export async function getSubscribersBySource(kv: KVNamespace, source: string): Promise<Subscriber[]> {
  const subscribers = await getSubscribers(kv);
  return subscribers.filter((sub) => sub.source === source);
}

/**
 * Get subscription statistics from KV storage
 * @param kv - Cloudflare KV namespace
 * @returns Statistics object with counts by source and ConvertKit status
 */
export async function getStats(kv: KVNamespace) {
  const subscribers = await getSubscribers(kv);
  const total = subscribers.length;
  const bySource = subscribers.reduce(
    (acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const convertKitSuccess = subscribers.filter((sub) => sub.convertKitStatus === 'success').length;
  const convertKitError = subscribers.filter((sub) => sub.convertKitStatus === 'error').length;

  return {
    total,
    bySource,
    convertKit: {
      success: convertKitSuccess,
      error: convertKitError,
      pending: total - convertKitSuccess - convertKitError,
    },
  };
}
