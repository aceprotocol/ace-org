import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Markdown inline syntax and MDX escapes removed: link text kept, code ticks and emphasis dropped. */
function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\\([{}])/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Shorten to at most `max` characters, at a sentence end when one fits, else at a word boundary. */
function clip(text: string, max = 200): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > max / 2) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

/** The first prose paragraph of a docs page (after its title), as a meta description. */
export function docDescription(slug: string): string {
  const source = readFileSync(join(process.cwd(), 'content/docs', `${slug}.mdx`), 'utf8');
  const blocks = source.split(/\n\s*\n/);
  let fenced = false;
  for (const block of blocks) {
    const fences = (block.match(/^\s*(```|~~~)/gm) ?? []).length;
    if (fenced || fences > 0) { if (fences % 2 === 1) fenced = !fenced; continue; }
    const text = block.trim();
    if (/^(#|\||-|\*|>|\d+\.|<)/.test(text) || text === '') continue;
    if (text.endsWith(':')) continue; // a lead-in to a list
    return clip(plainText(text));
  }
  return 'ACE Protocol documentation.';
}
