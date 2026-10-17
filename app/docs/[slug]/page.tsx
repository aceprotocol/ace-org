import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getDocBySlug, getAllSlugs, getSectionOf } from '@/lib/docs-data';
import { docDescription } from '@/lib/docs-content';
import { pageMetadata } from '@/app/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { techArticle } from '@/lib/structured-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface DocsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: docDescription(slug), path: `/docs/${slug}`, type: 'article' });
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();
  const allSlugs = getAllSlugs();
  const currentIndex = allSlugs.indexOf(slug);

  const { default: Content } = await import(`@/content/docs/${slug}.mdx`);

  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
  const prevDoc = prevSlug ? getDocBySlug(prevSlug) : null;
  const nextDoc = nextSlug ? getDocBySlug(nextSlug) : null;

  return (
    <article className="max-w-2xl">
      <JsonLd data={techArticle({ title: doc.title, description: docDescription(slug), path: `/docs/${slug}`, section: getSectionOf(slug)?.title })} />
      <Content />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-dark-border-faint">
        {prevDoc ? (
          <Link
            href={`/docs/${prevSlug}`}
            className="flex items-center gap-1.5 font-mono text-[12px] text-dark-text-muted hover:text-dark-text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {prevDoc.title}
          </Link>
        ) : (
          <span />
        )}
        {nextDoc ? (
          <Link
            href={`/docs/${nextSlug}`}
            className="flex items-center gap-1.5 font-mono text-[12px] text-dark-text-muted hover:text-dark-text-primary transition-colors"
          >
            {nextDoc.title}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
