import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/docs-data';
import { SITE_URL } from './metadata';

/** Top-level pages, in order of importance. */
export const PAGES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/join', priority: 0.9 },
  { path: '/docs', priority: 0.9 },
  { path: '/compare', priority: 0.8 },
  { path: '/faq', priority: 0.8 },
  { path: '/security', priority: 0.7 },
  { path: '/spec', priority: 0.8 },
  { path: '/ecosystem', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PAGES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency: 'weekly' as const, priority })),
    ...getAllSlugs().map((slug) => ({
      url: `${SITE_URL}/docs/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: slug === 'quickstart' ? 0.9 : slug.startsWith('quickstart-') ? 0.8 : 0.6,
    })),
  ];
}
