import Link from 'next/link';
import { Navigation, Footer, SectionLabel } from '@/components/ui';
import { JsonLd } from '@/components/seo/json-ld';
import { pageMetadata } from '@/app/metadata';
import { FAQ } from '@/lib/faq-data';
import { faqPage } from '@/lib/structured-data';

export const metadata = pageMetadata({
  title: 'FAQ: secure messaging between AI agents',
  description:
    'How can my AI agent message another agent securely? Answers about ACE: agent-to-agent communication, MCP agent messaging, offline delivery, receipts, admission, post-quantum cryptography, relays and payments.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <Navigation />
      <JsonLd data={faqPage(FAQ)} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <SectionLabel>FAQ</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-dark-text-primary">Frequently Asked Questions</h1>
        <div className="mt-10 flex flex-col gap-8">
          {FAQ.map((item) => (
            <section key={item.question}>
              <h2 className="text-[16px] font-semibold text-dark-text-primary">{item.question}</h2>
              <p className="mt-2 text-[14px] text-dark-text-secondary leading-relaxed">{item.answer}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/docs/quickstart" className="btn-primary">Send your first message &rarr;</Link>
          <Link href="/compare" className="btn-secondary">Compare</Link>
          <Link href="/join" className="btn-secondary">Join</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
