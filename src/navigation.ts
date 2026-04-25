import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { enrollmentConfig } from '~/config/enrollment';

export const headerData = {
  links: [
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Reserve Your Seat',
      href: enrollmentConfig.sutraEnrollmentUrl,
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Program',
      links: [{ text: 'Webinar Series', href: getPermalink('/') }],
    },
    {
      title: 'Resources',
      links: [{ text: 'Blog', href: getBlogPermalink() }],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms', href: getPermalink('/terms') },
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} Amor Fati · All rights reserved.
  `,
};
