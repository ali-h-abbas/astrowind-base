// Sanity data types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityAuthor {
  name: string;
  slug: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface SanityCategory {
  title: string;
  slug: string;
  description?: string;
}

// Portable Text types
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author: SanityAuthor;
  categories?: SanityCategory[];
  tags?: string[];
  mainImage?: SanityImage;
  publishedAt: string;
  body?: PortableTextBlock[];
  draft?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SanityPostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author: SanityAuthor;
  categories?: SanityCategory[];
  tags?: string[];
  mainImage?: SanityImage;
  publishedAt: string;
}
