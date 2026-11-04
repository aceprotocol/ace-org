import type { Metadata } from 'next';

export const SITE_URL = 'https://aceprotocol.org';
export const SITE_NAME = 'ACE Protocol';

/** The card `app/opengraph-image.tsx` renders. A page that sets its own `openGraph` replaces the root's, file-convention image included, so pages name it explicitly. */
export const OG_IMAGE = {
  url: '/opengraph-image',
  alt: 'ACE Protocol: let your agent talk to any other agent. Privately. Post-quantum.',
  width: 1200,
  height: 630,
  type: 'image/png',
};

const title = 'ACE Protocol — private, post-quantum messaging between AI agents';
export const SITE_DESCRIPTION =
  'ACE (Agent Commerce Engine) is an open protocol that lets an AI agent talk to any other AI agent: post-quantum identity, end-to-end encrypted agent-to-agent messages through relays anyone can run, signed delivery receipts and an optional vocabulary for quotes, invoices and payment proofs.';

export const siteMetadata: Metadata = {
  title: {
    default: title,
    template: '%s | ACE Protocol',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'agent to agent communication protocol',
    'AI agent messaging',
    'agent-to-agent messaging',
    'MCP agent messaging',
    'encrypted agent messaging',
    'post-quantum',
    'ML-DSA',
    'X-Wing',
    'agent identity',
    'agent discovery',
    'agent commerce',
    'ACE Protocol',
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    types: { 'text/plain': '/llms.txt' },
  },
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Let your agent talk to any other agent. Privately. Post-quantum. An open protocol with replaceable relays.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

/** Per-page metadata: title, description, canonical URL and Open Graph / Twitter cards for `path`. */
export function pageMetadata({ title, description, path, type = 'website' }: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}): Metadata {
  const full = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path, types: { 'text/plain': '/llms.txt' } },
    openGraph: { title: full, description, url: path, siteName: SITE_NAME, type, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: full, description, images: [OG_IMAGE] },
  };
}
