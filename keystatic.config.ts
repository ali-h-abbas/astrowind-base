import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    // Update this to match the repository where posts are stored.
    // When forking, set PUBLIC_KEYSTATIC_GITHUB_REPO in your environment
    // and replace this value accordingly.
    repo: 'ali-h-abbas/astrowind-base',
    branchPrefix: 'keystatic/',
  },
  ui: {
    brand: {
      name: 'AstroWind Blog',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishDate: fields.datetime({
          label: 'Publish Date',
          defaultValue: { kind: 'now' },
        }),
        updateDate: fields.datetime({ label: 'Update Date (optional)' }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        image: fields.url({ label: 'Image URL' }),
        category: fields.text({ label: 'Category' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        author: fields.text({ label: 'Author' }),
        body: fields.mdx({
          label: 'Body',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
