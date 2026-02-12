import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_YOUR_PROJECT_ID',
    dataset: 'production',
  },
  studioHost: 'astrowind-blog',
});
