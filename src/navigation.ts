import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/#about'),
    },
    {
      text: 'Offerings',
      href: getPermalink('/offerings'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      text: 'Join Bootcamp',
      href: getPermalink('/landing/meditation-bootcamp'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Programs',
      links: [
        { text: 'Meditation Bootcamp', href: getPermalink('/landing/meditation-bootcamp') },
        { text: 'All Offerings', href: getPermalink('/offerings') },
        { text: 'One-on-One Sessions', href: '#' },
        { text: 'Corporate Wellness', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'About', href: getPermalink('/#about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'FAQs', href: '#' },
        { text: 'Community', href: '#' },
      ],
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
