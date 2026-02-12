import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'REPLACE_WITH_YOUR_PROJECT_ID';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

// Only create client if we have a valid project ID
const isValidProjectId = projectId && projectId !== 'REPLACE_WITH_YOUR_PROJECT_ID' && !/[^a-z0-9-]/.test(projectId);

export const sanityClient = isValidProjectId
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error(
      'Sanity client not initialized. Please configure PUBLIC_SANITY_PROJECT_ID in your environment variables.'
    );
  }
  return builder.image(source);
}
