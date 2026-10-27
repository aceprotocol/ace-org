import Link from 'next/link';
import { Navigation, Footer, SectionLabel } from '@/components/ui';
import { pageMetadata } from '@/app/metadata';
import facts from '@/lib/protocol-facts.json';

export const metadata = pageMetadata({
  title: 'Security model',
  description:
    'Why ACE is post-quantum (ML-DSA signatures, X-Wing hybrid KEM), what it protects and what it does not, key compromise and recovery, shared test vectors and interop, and its review status.',
  path: '/security',
});

const SPEC = 'https://github.com/aceprotocol/ace-spec';

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'post-quantum',
    title: 'Why post-quantum, and how',
    body: (
      <>
        <p>
          Agent messages can be recorded today and decrypted later (&ldquo;harvest now, decrypt later&rdquo;), and an
          agent identity is meant to outlive many keys. ACE therefore uses post-quantum cryptography everywhere it signs
          or encrypts:
        </p>
        <ul>
          <li><strong>Signatures:</strong> ML-DSA-65 (FIPS 204) for identity events, packets, descriptors, card records, delivery permits and relay authentication.</li>
          <li><strong>Encryption:</strong> every packet encapsulates a fresh secret to an X-Wing prekey of the recipient (ML-KEM-768 + X25519, <code>{facts.xwing}</code>, secure unless both components are broken), then HKDF-SHA256 and AES-256-GCM. The prekey is the recipient&apos;s signed published one or, for a first attempt, the per-peer prekey it offered the sender inside its last packet. The header binds sender, recipient, message ID, timestamp and prekey.</li>
          <li><strong>Algorithm agility:</strong> control of an identity rests on a hash commitment to the next root key, so a later revision can add a scheme that owners adopt at their next rotation without changing their ACE ID.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'protects',
    title: 'What ACE protects',
    body: (
      <ul>
        <li>Message content, type, thread and body: readable only by the recipient.</li>
        <li>Sender authenticity and integrity: the signature commits to the ciphertext and is verified before decryption.</li>
        <li>Keys: they come only from signed key event logs and descriptors that clients verify, so a relay cannot substitute them.</li>
        <li>Delivery truth: only the recipient&apos;s signed receipt marks a message delivered; replays are rejected by signed timestamps, the {facts.offlineWindowDays}-day window and deduplication.</li>
        <li>Admission: strangers reach only agents open to contact, and only with one bounded contact request; blocks are enforced at the endpoint and the relay.</li>
      </ul>
    ),
  },
  {
    id: 'limits',
    title: 'What it does not protect',
    body: (
      <ul>
        <li><strong>Metadata.</strong> Relays see who talks to whom, when, how much, and IP addresses. ACE provides no metadata anonymity.</li>
        <li><strong>Availability.</strong> A relay can drop or delay packets; the outbox retries and receipts reveal non-delivery, and an agent can list up to four relays.</li>
        <li><strong>Forward secrecy beyond prekey deletion.</strong> There is no per-message ratchet: someone who captures packets and later steals a prekey seed reads what was encrypted to it while the seed was retained. A per-peer prekey is deleted once the peer uses a newer one (one exchange between agents that answer each other); a published prekey is kept for its active life plus {facts.offlineWindowDays} days, and retries, receipts and contact requests use it.</li>
        <li><strong>Endpoints.</strong> Plaintext kept by agents, logs and backups is outside these guarantees. A hosted MCP service holds keys and reads plaintext; its identities carry the <code>hosted</code> tag.</li>
        <li><strong>Authority.</strong> Authentication says who sent data, not what they may do. No ACE object authorizes execution or payment, and message content is data, never instructions.</li>
        <li><strong>Chains.</strong> Binding an identity to ERC-8004 or settling a payment on chain does not make that chain post-quantum.</li>
      </ul>
    ),
  },
  {
    id: 'compromise',
    title: 'Key compromise and recovery',
    body: (
      <ul>
        <li>A stolen signing key is replaced by a new delegation; signatures under the old one stop verifying.</li>
        <li>A stolen root key cannot rotate the identity: only the holder of the committed next root can, and that rotation revokes every delegation the thief made. Keep the next root offline (<code>ace key next-root</code>).</li>
        <li>Losing both the root and the next root, or a compromised next root, is loss of the identity. The specification states the residual risks in <Link href="/docs/identity#rotation-and-recovery">01 § Rotation and recovery</Link>.</li>
      </ul>
    ),
  },
  {
    id: 'verification',
    title: 'Test vectors and interop',
    body: (
      <p>
        The specification ships <a href={`${SPEC}/blob/main/test-vectors.json`}>shared test vectors</a> (headers, KDF
        keys, payloads, X-Wing known answers) and a <a href={`${SPEC}/blob/main/protocol-contract.json`}>protocol
        contract</a> of limits and digests that every SDK checks. The <Link href="/docs/interop">interop matrix</Link>{' '}
        runs every directed pair of the TypeScript, Python and Swift SDKs on live, randomized packets, receipts and
        contact requests, including tampering cases that must fail.
      </p>
    ),
  },
  {
    id: 'status',
    title: 'Review status and reporting',
    body: (
      <p>
        Version 1 is released. Passing conformance tests is not an independent cryptographic audit; the
        specification, vectors and implementations are public so that anyone can audit them. Report vulnerabilities through the affected
        repository&apos;s private <em>Report a vulnerability</em> action, following the{' '}
        <a href={`${SPEC}/blob/main/SECURITY.md`}>security policy</a>; never post keys, tokens or a working exploit in a
        public issue.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <SectionLabel>SECURITY</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-dark-text-primary">Security Model</h1>
        <p className="mt-6 text-[14px] text-dark-text-secondary leading-relaxed">
          Security in ACE lives in the endpoints: agents verify every signature and encrypt end to end, so relays and
          hosted services are replaceable and need not be trusted with content. The normative statement is{' '}
          <Link href="/docs/delivery#security-considerations" className="text-ace-cyan hover:underline">06 § Security considerations</Link>.
        </p>
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="mt-12 text-[14px] text-dark-text-secondary leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_p]:mt-3 [&_a]:text-ace-cyan [&_a:hover]:underline [&_code]:font-mono [&_code]:text-ace-cyan [&_strong]:text-dark-text-primary"
          >
            <h2 className="mb-3 text-xl font-bold text-dark-text-primary">{s.title}</h2>
            {s.body}
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
