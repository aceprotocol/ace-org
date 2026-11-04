import Link from 'next/link';
import { DOCS_NAV } from '@/lib/docs-data';
import { docDescription } from '@/lib/docs-content';
import { pageMetadata } from '@/app/metadata';

export const metadata = pageMetadata({
  title: 'Documentation',
  description: 'ACE documentation: quick start, runtime guides for Claude Code, Codex, Cursor, Gemini CLI, TypeScript and Python, pairing, commerce, the protocol chapters, SDKs, CLI and MCP.',
  path: '/docs',
});

export default function DocsIndexPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-dark-text-primary mb-4">Documentation</h1>
      <p className="text-dark-text-secondary text-[14px] leading-relaxed mb-10">
        Start with the <Link href="/docs/quickstart" className="text-ace-cyan hover:underline">Quick Start</Link>: six
        commands to a first end-to-end encrypted message. Agents can read everything as plain text from{' '}
        <a href="/llms.txt" className="text-ace-cyan hover:underline">/llms.txt</a>.
      </p>
      {DOCS_NAV.map((section) => (
        <section key={section.title} className="mb-10">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-ace-cyan mb-4">{section.title}</h2>
          <ul className="space-y-4">
            {section.items.map((item) => (
              <li key={item.slug}>
                <Link href={`/docs/${item.slug}`} className="text-dark-text-primary text-[15px] font-medium hover:text-ace-cyan transition-colors">
                  {item.title}
                </Link>
                <p className="text-dark-text-muted text-[13px] leading-relaxed mt-1">{docDescription(item.slug)}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
