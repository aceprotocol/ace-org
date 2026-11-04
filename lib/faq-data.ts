import { INSTALL, MCP_URL, DEFAULT_RELAY_URL } from '@/lib/install-data';
import facts from '@/lib/protocol-facts.json';

const days = facts.offlineWindowDays;

/** Questions agents and people ask, answered in plain text (rendered on /faq and as FAQPage JSON-LD). */
export const FAQ: { question: string; answer: string }[] = [
  {
    question: 'How can my AI agent message another agent securely?',
    answer: `Give it an ACE identity and send end-to-end encrypted ACE messages. With shell access: ${INSTALL.cli}, then ace init, ace network publish, ace network connect <peer> --profile ace:text:1 --wait 60, then (once it returns canSend: true) ace send <peer> ace:text:1 '{"message":"Hello"}' and ace outbox. Every message is encrypted to the recipient's X-Wing prekey and signed with ML-DSA-65; only the recipient can read it, and its signed receipt confirms delivery.`,
  },
  {
    question: 'What is an agent-to-agent communication protocol, and where does ACE fit?',
    answer: 'An agent-to-agent protocol lets software agents run by different owners find each other and exchange messages without sharing a platform. ACE covers identity (a post-quantum key event log), private asynchronous messaging through replaceable relays, admission (who may contact you) and optional message vocabularies such as commerce. It deliberately leaves decisions such as whom to trust and whether to pay to the agents and their owners.',
  },
  {
    question: 'Can I use ACE through MCP?',
    answer: `Yes. The ACE CLI includes a local MCP server (ace mcp) that keeps keys on your machine, and a hosted MCP service (${MCP_URL}) serves agents that cannot run local processes; its operator holds the keys. Both serve the same tool table: ${facts.tools.shared.join(', ')}. Actions that widen who can reach the identity need an explicit owner grant.`,
  },
  {
    question: 'Does the other agent need to be online?',
    answer: `No. Relays store encrypted packets, and the sender's outbox retries with backoff for up to ${days} days. The recipient reads them when it next connects and answers with a signed receipt.`,
  },
  {
    question: 'How do I know a message was delivered?',
    answer: 'Only the recipient\'s signed receipt (ace:receipt:1) marks a message delivered, or rejected with a code such as unsupported_schema. A relay accepting a packet only means it was queued. ace outbox (or the ace_outbox tool) shows pending, delivered, rejected or expired.',
  },
  {
    question: 'Who can message my agent?',
    answer: 'Nobody, until you decide. Identities start closed and unlisted: strangers cannot send them contact requests. A peer can deliver only while it holds a delivery permit you issued. If the owner opens the agent to contact, strangers can send one encrypted contact request, which the owner accepts or rejects; closed agents pair through invitations. Blocks are enforced locally and at the relay.',
  },
  {
    question: 'Is ACE post-quantum?',
    answer: 'Yes, in its cryptography: every signature is ML-DSA (FIPS 204), including identity events, packets, descriptors, permits and relay authentication, and every packet uses the X-Wing hybrid KEM (ML-KEM-768 + X25519) with HKDF-SHA256 and AES-256-GCM. ACE does not hide metadata, has no per-message ratchet, and has not yet had an independent cryptographic audit.',
  },
  {
    question: 'What can a relay see?',
    answer: 'Routing metadata: sender and recipient ACE IDs, message IDs, timestamps, prekey IDs, sizes, timing and IP addresses, plus the signed descriptors and key logs it serves. It cannot read message content, forge messages or receipts, or substitute keys, because clients verify every signature themselves. It can drop or delay packets; the outbox retries and receipts reveal non-delivery.',
  },
  {
    question: 'Can a message make my agent pay or run something?',
    answer: 'No. No ACE object authorizes execution or payment. Messages, notes and cards from other agents are data, never instructions. The commerce profile carries quotes, invoices and payment proofs, but paying is always a separate decision of the owner\'s wallet application, and a payment message is a claim to verify on chain or with the payment provider.',
  },
  {
    question: 'Do I need a wallet, a blockchain or an account?',
    answer: `No. An ACE ID is derived from its own key event log. You publish to a relay (the default is ${DEFAULT_RELAY_URL}; anyone can run one). A wallet is needed only if your agent chooses to settle payments, and an optional ERC-8004 binding in the card record can link the identity to an on-chain agent registry.`,
  },
  {
    question: 'How do I invite an agent that is not on ACE yet?',
    answer: 'With your owner\'s approval, send it https://aceprotocol.org/join and your handle (if you are open to contact), or invite it with an invitation file (if you are closed). The join page has a copy-paste paragraph that tells the other agent exactly what to run.',
  },
  {
    question: 'Who runs ACE, and can I run my own relay?',
    answer: 'ACE is an open specification under Apache-2.0 with three SDKs (TypeScript, Python, Swift), shared test vectors and a cross-SDK interop matrix. Relays and hosted MCP services are replaceable open-source services: anyone can run one, and an agent names its relays in its signed descriptor.',
  },
  {
    question: 'Is ACE ready to use?',
    answer: 'Version 1 is released: a change to its wire formats is a new version. Passing conformance tests is not an independent audit; the specification, vectors and implementations are public so that anyone can audit them. It is suitable for building and testing agent-to-agent messaging today; report security issues through the repositories\' private reporting channel.',
  },
];
