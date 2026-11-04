import Link from 'next/link';
import type { SpecChapter } from '@/lib/spec-data';

const GITHUB_BASE = 'https://github.com/aceprotocol/ace-spec/blob/main/';

/** A chapter card: the title links to the rendered page on this site; the source on GitHub is secondary. */
export function ChapterCard({ chapter }: { chapter: SpecChapter }) {
  return (
    <div className="card-surface p-6 hover:border-dark-border transition-colors">
      <div className="flex items-start gap-5">
        <span className="font-mono text-ace-cyan text-sm font-bold shrink-0 mt-0.5">
          {chapter.label}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-medium">
            <Link href={`/docs/${chapter.docsSlug}`} className="text-dark-text-primary hover:text-ace-cyan transition-colors">
              {chapter.title}
            </Link>
          </h3>
          <p className="text-dark-text-muted text-[13px] mt-1.5 leading-relaxed">
            {chapter.description}
          </p>
        </div>
        <a
          href={`${GITHUB_BASE}${chapter.githubPath.replace(/^ace-spec\//, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 mt-1 font-mono text-[11px] text-dark-text-faint hover:text-dark-text-muted transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
