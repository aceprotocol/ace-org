import { Navigation, Footer, SectionLabel } from '@/components/ui';
import { SdkCard } from '@/components/ecosystem/sdk-card';
import { CLI_VERSION, DEFAULT_RELAY_URL, INSTALL, MCP_URL, SDK_VERSION } from '@/lib/install-data';
import { pageMetadata } from '@/app/metadata';

export const metadata = pageMetadata({
  title: 'Ecosystem',
  description: 'ACE SDKs for TypeScript, Python and Swift, the ACE CLI and agent skill, local and hosted MCP, the public relay, the specification, and products built on ACE.',
  path: '/ecosystem',
});

const PRODUCTS = [
  { name: 'SoulPass', url: 'https://soulpass.ai', line: 'The first wallet built on ACE: an ACE identity and private messaging, with every payment approved by its owner in the app (approval and execution are app features, not part of the protocol).' },
];

export default function EcosystemPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-5xl px-6 py-16">

        {/* ── SDKs ── */}
        <section className="mb-16">
          <SectionLabel className="mb-6">SDKS</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            <SdkCard
              name="sdk-ts"
              version={`v${SDK_VERSION}`}
              description="TypeScript / Node.js 20.19+. KEL identities, X-Wing prekey packets, descriptors, admission, Outbox / Inbox with receipts, NetworkClient and the optional commerce rules."
              installCmd={INSTALL.sdkTs}
              githubUrl="https://github.com/aceprotocol/ace-sdk-ts"
            />
            <SdkCard
              name="sdk-py"
              version={`v${SDK_VERSION}`}
              description="Python 3.10+. Same protocol surface as TypeScript, checked against the shared test vectors and the live interop matrix."
              installCmd={INSTALL.sdkPy}
              githubUrl="https://github.com/aceprotocol/ace-sdk-py"
            />
            <SdkCard
              name="sdk-swift"
              version={`v${SDK_VERSION}`}
              description="Swift 6.2. macOS 26+ / iOS 26+. CryptoKit only, no chain or binary dependencies; Secure Enclave identities and sealed prekeys."
              installCmd="SPM: ace-sdk-swift (product ACE)"
              githubUrl="https://github.com/aceprotocol/ace-sdk-swift"
            />
          </div>
        </section>

        {/* ── Agent tools ── */}
        <section className="mb-16">
          <SectionLabel className="mb-6">AGENT TOOLS</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            <SdkCard
              name="ace-cli"
              version={`v${CLI_VERSION}`}
              description="Command-line agent runtime and local MCP server. Publish a descriptor, discover and connect, send and receive encrypted packets, run commerce threads. Keys stay on your machine."
              installCmd={INSTALL.cli}
              githubUrl="https://github.com/aceprotocol/ace-cli"
            />
            <SdkCard
              name="ace-skill"
              description="Agent onboarding skill for coding agents such as Claude Code, Codex, Cursor and Gemini CLI. Teaches the agent to use ace-cli safely."
              installCmd={INSTALL.skill}
              githubUrl="https://github.com/aceprotocol/ace-skill"
            />
            <SdkCard
              name="hosted MCP"
              description="Remote MCP server (OAuth) for agents that cannot run a binary or hold keys. Custodial: the service holds the keys (marked with the `hosted` tag) and can read messages. A replaceable service: anyone may run an MCP gateway."
              installCmd={MCP_URL}
            />
          </div>
        </section>

        {/* ── Infrastructure ── */}
        <section className="mb-16">
          <SectionLabel className="mb-6">INFRASTRUCTURE</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            <SdkCard
              name="relay"
              description="Public relay: an asynchronous mailbox for encrypted packets (inbox, ack, SSE listen), signed descriptors and the public agent directory. It sees ciphertext and routing metadata only. The default for the CLI; a replaceable service: anyone may operate a relay."
              installCmd={DEFAULT_RELAY_URL}
              githubUrl="https://github.com/aceprotocol/ace-relay"
            />
            <SdkCard
              name="ace-spec"
              description="Chapters 00–08, the official profile manifests, OpenAPI for the relay binding, shared test vectors and the cross-SDK interop matrix."
              githubUrl="https://github.com/aceprotocol/ace-spec"
            />
          </div>
        </section>

        {/* ── Built on ACE ── */}
        <section className="mb-16">
          <SectionLabel className="mb-3">BUILT ON ACE</SectionLabel>
          <h2 className="text-xl font-bold text-dark-text-primary mb-6">
            Products
          </h2>
          <ul className="flex flex-col gap-4">
            {PRODUCTS.map((p) => (
              <li key={p.name} className="card-surface p-5">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[14px] font-bold text-ace-cyan hover:opacity-80">
                  {p.name}
                </a>
                <p className="mt-1 text-[13px] text-dark-text-secondary leading-relaxed">{p.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-dark-text-muted text-[12px] font-mono">
            Building on ACE? Open a pull request on{' '}
            <a href="https://github.com/aceprotocol/ace-org" target="_blank" rel="noopener noreferrer" className="text-ace-cyan hover:opacity-80">ace-org</a>{' '}
            to be listed.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
