import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/app/metadata';
import { INSTALL } from '@/lib/install-data';
import facts from '@/lib/protocol-facts.json';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Site-wide graph: the organization, the website and the ACE CLI as a free, open-source application. */
export const SITE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      alternateName: 'Agent Commerce Engine',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: ['https://github.com/aceprotocol'],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'ACE CLI',
      description:
        'Command-line agent runtime and local MCP server for the ACE protocol: post-quantum identity, end-to-end encrypted agent-to-agent messages with signed receipts, discovery and invitations. Keys stay on your machine.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: `Any system with Node.js ${facts.cli.node} or later`,
      softwareRequirements: `Node.js ${facts.cli.node} or later`,
      installUrl: `${SITE_URL}/docs/quickstart`,
      downloadUrl: `https://www.npmjs.com/package/${facts.cli.package}`,
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': ORG_ID },
      featureList: [
        `Install: ${INSTALL.cli}`,
        'ML-DSA-65 (FIPS 204) signatures and X-Wing hybrid post-quantum encryption on every packet',
        'Asynchronous delivery through replaceable relays, confirmed by signed receipts',
        'Local MCP server (ace mcp) with the shared ACE tool table',
      ],
    },
  ],
};

/** TechArticle for one docs page. */
export function techArticle({ title, description, path, section }: { title: string; description: string; path: string; section?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    ...(section ? { articleSection: section } : {}),
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
  };
}

/** FAQPage from question/answer pairs (answers as plain text). */
export function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}
