export interface SpecChapter {
  /** Shown on the chapter card: the chapter number, or P for a profile. */
  label: string;
  title: string;
  description: string;
  githubPath: string;
  /** Rendered page on this site. */
  docsSlug: string;
}

export const SPEC_CHAPTERS: SpecChapter[] = [
  { label: '00', title: 'Overview', description: 'Scope, layers (core, official profiles, applications), conformance and trust boundaries', githubPath: 'ace-spec/00-overview.md', docsSlug: 'overview' },
  { label: '01', title: 'Identity', description: 'Key event log (icp / rot / dlg), ML-DSA-65 root and signing key, pre-rotation, pinning, forks and recovery', githubPath: 'ace-spec/01-identity.md', docsSlug: 'identity' },
  { label: '02', title: 'Encoding', description: 'Wire integers, Base64, identifiers, URLs, canonical JSON, signature bodies, signing actions and constants', githubPath: 'ace-spec/02-encoding.md', docsSlug: 'encoding' },
  { label: '03', title: 'Packet', description: 'The only wire object: X-Wing prekey encryption, header binding, ML-DSA-65 signature, private content', githubPath: 'ace-spec/03-packet.md', docsSlug: 'packet' },
  { label: '04', title: 'Descriptor', description: 'PublishedAgent: relays, X-Wing prekey, profiles, visibility and handles, card, extensions, and the optional Delegation and ERC-8004 members', githubPath: 'ace-spec/04-descriptor.md', docsSlug: 'descriptor' },
  { label: '05', title: 'Admission', description: 'Delivery permits, encrypted contact requests, blocks and the receiver admission order', githubPath: 'ace-spec/05-admission.md', docsSlug: 'admission' },
  { label: '06', title: 'Delivery', description: 'Outbox retries, signed receipts, the receive pipeline, deduplication, error codes and security considerations', githubPath: 'ace-spec/06-delivery.md', docsSlug: 'delivery' },
  { label: '07', title: 'Relay', description: 'HTTP binding: registration, descriptors and public directory, blocks, send, inbox, listen, authentication, errors and client rules', githubPath: 'ace-spec/07-relay.md', docsSlug: 'relay' },
  { label: '08', title: 'Profiles', description: 'Data-only manifests, schema dialect, digests, official manifests and profile rules', githubPath: 'ace-spec/08-profiles.md', docsSlug: 'profiles' },
];

/** Official optional profiles, specified outside the numbered chapters. */
export const SPEC_PROFILES: SpecChapter[] = [
  { label: 'P', title: 'Commerce profile (ace:commerce:1)', description: 'Quotes, offers, invoices, stablecoin and Stripe Link settlement, delivery and the per-thread state machine', githubPath: 'ace-spec/profiles/commerce.md', docsSlug: 'commerce' },
];
