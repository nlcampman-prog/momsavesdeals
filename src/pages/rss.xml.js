import rss from '@astrojs/rss';

export async function GET(context) {
  const globResult = import.meta.glob('../content/articles/*.mdx', { eager: true });
  const articles = Object.values(globResult);
  const items = articles
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.pubDate || a.frontmatter?.date || 0);
      const dateB = new Date(b.frontmatter?.pubDate || b.frontmatter?.date || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .map((article) => {
      const fm = article.frontmatter || {};
      const title = fm.title || '';
      const description = fm.description || fm.metaDescription || '';
      const pubDate = fm.pubDate || fm.date || new Date();
      const category = fm.category || '';
      const slug = (article.file?.split('/')?.pop()?.replace(/\.(mdx|md)$/, '')) || '';
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