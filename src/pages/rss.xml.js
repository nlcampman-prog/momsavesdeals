import rss from '@astrojs/rss';

export async function GET(context) {
  const globResult = import.meta.glob('../content/articles/*.mdx', { eager: true });
  const articles = Object.values(globResult);
  const items = articles
    .sort((a, b) => new Date(b.frontmatter?.pubDate || 0).getTime() - new Date(a.frontmatter?.pubDate || 0).getTime())
    .map((article) => {
      const { title, description, pubDate, category } = article.frontmatter;
      const url = article.url || '';
      const slug = url.split('/').pop()?.replace('.mdx', '') || '';
      return { title, description, pubDate: new Date(pubDate), link: `/articles/${slug}/`, categories: category ? [category] : [] };
    });
  return rss({
    title: 'Mom Saves Deals — Parenting Deals & Discount Codes',
    description: 'Save on baby gear, strollers, car seats, toys, and parenting essentials with exclusive discount codes.',
    site: context.site || 'https://momsavesdeals.com',
    items,
    trailingSlash: true,
  });
}