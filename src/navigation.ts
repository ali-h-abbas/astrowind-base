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
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made with <a class="text-blue-600 underline dark:text-muted" href="https://astrowind.vercel.app/"> AstroWind</a> · All rights reserved.
  `,
};
