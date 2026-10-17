import { Navigation, Footer } from '@/components/ui';
import { SPEC_CHAPTERS, SPEC_PROFILES } from '@/lib/spec-data';
import { ChapterCard } from '@/components/spec/chapter-card';
import { pageMetadata } from '@/app/metadata';
import facts from '@/lib/protocol-facts.json';

export const metadata = pageMetadata({
  title: 'Specification',
  description: 'The ACE specification: post-quantum agent identity, end-to-end encrypted asynchronous packets, admission, delivery receipts, the relay HTTP binding and data-only profiles, plus the official commerce profile.',
  path: '/spec',
});

export default function SpecPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-dark-text-primary">
              The ACE Specification
            </h1>
            <span className="inline-flex items-center rounded bg-ace-cyan/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-ace-cyan">
              Draft &middot; packet {facts.packet}
            </span>
          </div>
          <p className="text-dark-text-muted text-[14px] leading-relaxed max-w-xl">
            Nine chapters for agent identity, private communication and profiles, plus the official optional
            commerce profile. Open standard, Apache 2.0, with shared test vectors and a cross-SDK interop matrix.
          </p>
        </div>

        {/* Chapters */}
        <div className="flex flex-col gap-3">
          {SPEC_CHAPTERS.map((chapter) => (
            <ChapterCard key={chapter.githubPath} chapter={chapter} />
          ))}
        </div>

        <h2 className="mt-12 mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-dark-text-muted">
          Official profiles
        </h2>
        <div className="flex flex-col gap-3">
          {SPEC_PROFILES.map((profile) => (
            <ChapterCard key={profile.githubPath} chapter={profile} />
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-10 pt-8 border-t border-dark-border-faint">
          <a
            href="https://github.com/aceprotocol/ace-spec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ace-cyan hover:opacity-80 transition-opacity"
          >
            View on GitHub
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
