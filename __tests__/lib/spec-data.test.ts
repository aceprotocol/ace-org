import { describe, it, expect } from 'vitest';
import { SPEC_CHAPTERS, SPEC_PROFILES } from '@/lib/spec-data';
import { getDocBySlug } from '@/lib/docs-data';

describe('SPEC_CHAPTERS', () => {
  it('numbers chapters 0..8 in order, each linked to its ace-spec/NN-*.md file', () => {
    expect(SPEC_CHAPTERS).toHaveLength(9);
    SPEC_CHAPTERS.forEach((c, i) => {
      const label = String(i).padStart(2, '0');
      expect(c.label).toBe(label);
      expect(c.githubPath).toMatch(new RegExp(`^ace-spec/${label}-[a-z0-9-]+\\.md$`));
    });
  });

  it('every chapter and profile has a title, description and a docs page', () => {
    for (const chapter of [...SPEC_CHAPTERS, ...SPEC_PROFILES]) {
      expect(chapter.title).toBeTruthy();
      expect(chapter.description).toBeTruthy();
      expect(getDocBySlug(chapter.docsSlug), chapter.docsSlug).toBeDefined();
    }
  });

  it('describes the relay chapter without webhooks', () => {
    expect(SPEC_CHAPTERS.map((c) => c.description).join(' ')).not.toMatch(/webhook/i);
  });

  it('lists the commerce and delegation profiles from ace-spec/profiles', () => {
    expect(SPEC_PROFILES.map((p) => p.githubPath)).toEqual(['ace-spec/profiles/commerce.md', 'ace-spec/profiles/delegation.md']);
  });
});
