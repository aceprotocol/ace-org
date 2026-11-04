export interface DocItem {
  slug: string;
  title: string;
}

export interface DocSection {
  title: string;
  /** Which agent entrypoint carries the section's pages: llms-full.txt (using ACE) or llms-spec.txt (implementing it). */
  llms: 'full' | 'spec';
  items: DocItem[];
}

export const DOCS_NAV: DocSection[] = [
  { title: 'Getting Started', llms: 'full', items: [
    { slug: 'quickstart', title: 'Quick Start' },
    { slug: 'concepts', title: 'Concepts' },
    { slug: 'quickstart-agents', title: 'Coding Agents' },
  ]},
  { title: 'Guides', llms: 'full', items: [
    { slug: 'pairing', title: 'Pairing & Invitations' },
    { slug: 'agent-commerce', title: 'Agent Commerce' },
    { slug: 'delegation', title: 'Delegation' },
    { slug: 'erc-8004', title: 'ERC-8004 Binding' },
    { slug: 'hosted-mcp', title: 'Hosted MCP' },
  ]},
  { title: 'Protocol', llms: 'spec', items: [
    { slug: 'overview', title: 'Overview' },
    { slug: 'identity', title: 'Identity' },
    { slug: 'encoding', title: 'Encoding' },
    { slug: 'packet', title: 'Packet' },
    { slug: 'descriptor', title: 'Descriptor' },
    { slug: 'admission', title: 'Admission' },
    { slug: 'delivery', title: 'Delivery' },
    { slug: 'relay', title: 'Relay' },
    { slug: 'profiles', title: 'Profiles' },
    { slug: 'commerce', title: 'Commerce Profile' },
    { slug: 'delegation-profile', title: 'Delegation Profile' },
  ]},
  { title: 'SDKs', llms: 'spec', items: [
    { slug: 'sdk-typescript', title: 'TypeScript SDK' },
    { slug: 'sdk-python', title: 'Python SDK' },
    { slug: 'sdk-swift', title: 'Swift SDK' },
  ]},
  { title: 'Tools', llms: 'full', items: [
    { slug: 'cli', title: 'CLI Reference' },
    { slug: 'local-mcp', title: 'Local MCP' },
    { slug: 'mcp', title: 'Hosted MCP Server' },
  ]},
  { title: 'Reference', llms: 'spec', items: [
    { slug: 'limits', title: 'Limits & Error Codes' },
    { slug: 'interop', title: 'Interop Matrix' },
    { slug: 'agent-entrypoints', title: 'llms.txt & Entry Points' },
  ]},
];

export function getDocBySlug(slug: string): DocItem | undefined {
  for (const section of DOCS_NAV) {
    const item = section.items.find(i => i.slug === slug);
    if (item) return item;
  }
  return undefined;
}

export function getSectionOf(slug: string): DocSection | undefined {
  return DOCS_NAV.find((s) => s.items.some((i) => i.slug === slug));
}

export function getAllSlugs(): string[] {
  return DOCS_NAV.flatMap(s => s.items.map(i => i.slug));
}
