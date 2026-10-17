/**
 * The /compare table. Cells about other projects state only well-known, stable properties of their core
 * specifications; where a property depends on deployment, extensions or versions, the cell says so ("Varies").
 */
export const COMPARE_AS_OF = 'October 2026';

export const COMPARE_COLUMNS = ['ACE', 'A2A', 'MCP', 'Email (SMTP)', 'XMTP', 'Nostr', 'Matrix'] as const;

export interface CompareRow {
  area: string;
  cells: Record<(typeof COMPARE_COLUMNS)[number], string>;
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    area: 'What it connects',
    cells: {
      ACE: 'Agent to agent, as asynchronous end-to-end encrypted messages',
      A2A: 'A client agent to a remote agent served over HTTP',
      MCP: 'A model host to tools and data (client to server)',
      'Email (SMTP)': 'Mailbox to mailbox',
      XMTP: 'Wallet-linked inboxes (people, apps, agents)',
      Nostr: 'Keys publishing signed events to relays',
      Matrix: 'Users and rooms on federated homeservers',
    },
  },
  {
    area: 'Identity',
    cells: {
      ACE: 'ace:sha256 hash of an ML-DSA key event log; survives key rotation; no domain, wallet or account',
      A2A: 'The agent’s HTTP endpoint and its Agent Card',
      MCP: 'The server’s URL; clients authorize with OAuth for remote servers',
      'Email (SMTP)': 'An address at a domain',
      XMTP: 'An inbox ID linked to Ethereum wallets (EOA or smart contract) or passkeys',
      Nostr: 'A secp256k1 public key',
      Matrix: '@user:homeserver, issued by the homeserver',
    },
  },
  {
    area: 'End-to-end encryption',
    cells: {
      ACE: 'Every packet, to the recipient’s signed prekey; relays see only ciphertext',
      A2A: 'Transport security (TLS) to the endpoint',
      MCP: 'Transport security (TLS) for remote servers',
      'Email (SMTP)': 'Not by default; add-ons such as OpenPGP or S/MIME',
      XMTP: 'Yes (MLS)',
      Nostr: 'For direct messages, through optional NIPs',
      Matrix: 'Yes (Olm/Megolm), per room',
    },
  },
  {
    area: 'Post-quantum',
    cells: {
      ACE: 'Yes: ML-DSA-65 (FIPS 204) signatures, X-Wing hybrid KEM on every packet',
      A2A: 'Depends on the TLS deployment',
      MCP: 'Depends on the TLS deployment',
      'Email (SMTP)': 'Varies',
      XMTP: 'Partial: Welcome messages carry an X-Wing (ML-KEM-768 hybrid) wrapper against harvest-now-decrypt-later; its MLS ciphersuite (X25519, Ed25519 signatures) is classical',
      Nostr: 'No: secp256k1 Schnorr signatures',
      Matrix: 'Not in Olm/Megolm; transport depends on deployment',
    },
  },
  {
    area: 'Recipient offline',
    cells: {
      ACE: 'Relays store packets up to 7 days; the sender retries until a signed receipt arrives',
      A2A: 'The remote agent runs as an online server',
      MCP: 'The server answers live requests',
      'Email (SMTP)': 'Yes, store-and-forward',
      XMTP: 'Yes, network nodes store messages',
      Nostr: 'Relays store events (relay policy varies)',
      Matrix: 'Yes, the homeserver stores events',
    },
  },
  {
    area: 'Who may contact you',
    cells: {
      ACE: 'Private by default; delivery permits, contact requests to public agents, invitations, blocks enforced at the relay',
      A2A: 'Server-side authentication of clients',
      MCP: 'Server-side authorization of clients',
      'Email (SMTP)': 'Anyone; spam filtering by the receiver',
      XMTP: 'Client-side consent preferences',
      Nostr: 'Anyone; relays and clients filter',
      Matrix: 'Invites, room membership and server ACLs',
    },
  },
  {
    area: 'Commerce vocabulary',
    cells: {
      ACE: 'Optional ace:commerce:1: rfq, offer, accept, invoice, payment proof, deliver, confirm; never authorizes payment',
      A2A: 'Not in the core protocol',
      MCP: 'Not in the core protocol',
      'Email (SMTP)': 'None',
      XMTP: 'Varies',
      Nostr: 'Varies',
      Matrix: 'None',
    },
  },
  {
    area: 'Who runs the infrastructure',
    cells: {
      ACE: 'Replaceable relays anyone can run; an agent names its relays in its signed descriptor',
      A2A: 'Each agent’s operator',
      MCP: 'Each server’s operator',
      'Email (SMTP)': 'Mail providers or self-hosted servers',
      XMTP: 'XMTP network nodes',
      Nostr: 'Anyone can run a relay',
      Matrix: 'Anyone can run a homeserver',
    },
  },
];
