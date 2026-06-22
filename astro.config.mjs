import { defineConfig } from 'astro/config'; import mdx from '@astrojs/mdx'; import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://momsavesdeals.com', base: '/', trailingSlash: 'always', output: 'static',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404'), changefreq: 'daily', priority: 0.7 })],
})