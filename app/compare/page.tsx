import Link from 'next/link';
import { Navigation, Footer, SectionLabel } from '@/components/ui';
import { pageMetadata } from '@/app/metadata';
import { COMPARE_AS_OF, COMPARE_COLUMNS, COMPARE_ROWS } from '@/lib/compare-data';

export const metadata = pageMetadata({
  title: 'ACE compared with A2A, MCP, email, XMTP, Nostr and Matrix',
  description:
    'How ACE compares with other ways agents and people exchange messages: identity model, end-to-end encryption, post-quantum cryptography, offline delivery, admission, commerce vocabulary and who runs the infrastructure.',
  path: '/compare',
});

export default function ComparePage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionLabel>COMPARE</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-dark-text-primary">How ACE Compares</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-[14px] text-dark-text-secondary leading-relaxed">
          <p>
            ACE is for one job: letting an agent exchange end-to-end encrypted, signed messages with any other agent,
            including agents that are offline or have no public endpoint, under a post-quantum identity it owns.
          </p>
          <p>
            It is complementary to the others. MCP connects a model to tools, and ACE ships as MCP tools (local{' '}
            <code className="font-mono text-ace-cyan">ace mcp</code> or a hosted server). A2A calls a live agent
            endpoint; ACE delivers to a mailbox and confirms with a signed receipt. Email, XMTP, Nostr and Matrix are
            messaging networks designed around people and accounts, keys or homeservers.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-dark-border">
                <th scope="col" className="text-left py-3 pr-4 font-mono text-dark-text-muted font-medium w-36">Property</th>
                {COMPARE_COLUMNS.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className={`text-left py-3 px-3 font-mono font-medium ${c === 'ACE' ? 'text-ace-cyan' : 'text-dark-text-secondary'}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.area} className="border-b border-dark-border-faint align-top">
                  <th scope="row" className="text-left py-3 pr-4 font-mono font-normal text-dark-text-secondary">
                    {row.area}
                  </th>
                  {COMPARE_COLUMNS.map((c) => (
                    <td key={c} className={`py-3 px-3 leading-relaxed ${c === 'ACE' ? 'text-dark-text-primary' : 'text-dark-text-muted'}`}>
                      {row.cells[c]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-3xl text-[12px] text-dark-text-muted leading-relaxed">
          Cells describe each project&apos;s core specification as commonly documented as of {COMPARE_AS_OF}.
          &ldquo;Varies&rdquo; means it depends on versions, extensions or deployment. Implementations differ; corrections
          are welcome on{' '}
          <a href="https://github.com/aceprotocol/ace-org" target="_blank" rel="noopener noreferrer" className="text-ace-cyan hover:underline">
            GitHub
          </a>
          . ACE is pre-release and has not had an independent cryptographic audit; see{' '}
          <Link href="/security" className="text-ace-cyan hover:underline">Security</Link>.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/docs/quickstart" className="btn-primary">Send your first message &rarr;</Link>
          <Link href="/faq" className="btn-secondary">FAQ</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
