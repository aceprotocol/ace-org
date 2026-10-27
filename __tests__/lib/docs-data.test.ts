import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DOCS_NAV, getAllSlugs, getDocBySlug } from '@/lib/docs-data';

describe('docs-data', () => {
  it('has nav sections and first section is Getting Started', () => {
    expect(DOCS_NAV.length).toBeGreaterThan(0);
    expect(DOCS_NAV[0].title).toBe('Getting Started');
  });

  it('getDocBySlug returns quickstart doc', () => {
    expect(getDocBySlug('quickstart')).toEqual({ slug: 'quickstart', title: 'Quick Start' });
  });

  it('getDocBySlug returns undefined for unknown slug', () => {
    expect(getDocBySlug('nonexistent')).toBeUndefined();
  });

  it('places the Guides group right after Getting Started', () => {
    expect(DOCS_NAV[1].title).toBe('Guides');
    expect(DOCS_NAV[1].items.map((i) => i.slug)).toEqual(['pairing', 'agent-commerce', 'delegation', 'erc-8004', 'hosted-mcp']);
  });

  it('offers a quickstart per runtime under Getting Started', () => {
    expect(DOCS_NAV[0].items.map((i) => i.slug)).toEqual([
      'quickstart', 'concepts', 'quickstart-claude-code', 'quickstart-codex', 'quickstart-cursor', 'quickstart-gemini-cli', 'quickstart-typescript', 'quickstart-python',
    ]);
  });

  it('groups tools and reference pages', () => {
    expect(DOCS_NAV.find((s) => s.title === 'Tools')?.items.map((i) => i.slug)).toEqual(['cli', 'local-mcp', 'mcp']);
    expect(DOCS_NAV.find((s) => s.title === 'Reference')?.items.map((i) => i.slug)).toEqual(['limits', 'interop', 'agent-entrypoints']);
  });

  it('renders the protocol chapters 00-08 and the commerce and delegation profiles', () => {
    expect(DOCS_NAV.find((s) => s.title === 'Protocol')?.items.map((i) => i.slug)).toEqual([
      'overview', 'identity', 'encoding', 'packet', 'descriptor', 'admission', 'delivery', 'relay', 'profiles', 'commerce', 'delegation-profile',
    ]);
  });

  it('has an MDX file for every nav slug and no orphan MDX files', () => {
    for (const slug of getAllSlugs()) expect(existsSync(join(process.cwd(), 'content/docs', `${slug}.mdx`)), slug).toBe(true);
    const files = readdirSync(join(process.cwd(), 'content/docs')).filter((f) => f.endsWith('.mdx')).map((f) => f.slice(0, -4));
    expect(files.sort()).toEqual([...getAllSlugs()].sort());
  });

  it('lists every docs page in public/llms.txt', () => {
    const llms = readFileSync(join(process.cwd(), 'public/llms.txt'), 'utf8');
    for (const slug of getAllSlugs()) expect(llms, slug).toMatch(new RegExp(`https://aceprotocol\\.org/docs/${slug}(?![\\w-])`));
  });

  it('splits the pages between llms-full.txt (using ACE) and llms-spec.txt (implementing it)', () => {
    const full = readFileSync(join(process.cwd(), 'public/llms-full.txt'), 'utf8');
    const spec = readFileSync(join(process.cwd(), 'public/llms-spec.txt'), 'utf8');
    for (const section of DOCS_NAV) {
      for (const { slug } of section.items) {
        const source = `Source: https://aceprotocol.org/docs/${slug}\n`;
        expect(section.llms === 'full' ? full : spec, slug).toContain(source);
        expect(section.llms === 'full' ? spec : full, slug).not.toContain(source);
      }
    }
  });

  it('keeps stale vocabulary out of the hand-written and generated pages', () => {
    for (const slug of getAllSlugs()) {
      const text = readFileSync(join(process.cwd(), 'content/docs', `${slug}.mdx`), 'utf8');
      for (const gone of [/webhook/i, /ace:commerce:receipt:1/, /"ttl"/, /"version": 1/, /packet 3/, /ml-dsa-87/]) expect(text, `${slug} ${gone}`).not.toMatch(gone);
    }
  });

  it('describes no removed protocol concepts in the published agent entrypoints', () => {
    for (const file of ['public/llms.txt', 'public/llms-full.txt', 'public/llms-spec.txt', 'public/.well-known/ace-network.json']) {
      const text = readFileSync(join(process.cwd(), file), 'utf8');
      for (const gone of [/\bMLS\b/, /session-core/i, /secure-delivery/i, /SecureMailbox/, /link record/i, /resource grant/i, /\bA2A\b/, /registration file \(key event log/i, /broadcast intent/i, /ace_list_intents/]) {
        expect(text, `${file} ${gone}`).not.toMatch(gone);
      }
    }
  });
});
