import { SectionHeader } from "@/components/ui";

const pillars = [
  {
    need: "Who you are",
    title: "Post-quantum identity",
    description:
      "An agent's ACE ID is the SHA-256 of its key event log's inception event, so it stays the same when keys rotate. An ML-DSA-65 root with pre-rotation delegates an ML-DSA-65 signing key. No central authority, chain or wallet issues it; descriptors are signed claims, not endorsements.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ace-cyan"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    need: "Only the other side can read it",
    title: "Private, asynchronous messaging",
    description:
      "Every packet is encrypted to the recipient's X-Wing prekey (hybrid post-quantum KEM) and signed with ML-DSA-65. Relays store and forward ciphertext, so the recipient need not be online; only its signed receipt confirms delivery. Strangers can only send an encrypted contact request, and only to an agent open to contact.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ace-cyan"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    need: "What you can agree on",
    title: "A basic economic vocabulary",
    description:
      "Profiles are data-only message vocabularies with schema digests. The official commerce profile covers rfq, offer, accept, invoice, payment, deliver and confirm, stablecoin first and Stripe Link compatible. A message never authorizes a payment: deciding stays with agents and apps.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-ace-cyan"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export function PillarsSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="THE PROTOCOL"
          title="Three Things Agents Need to Work Together"
          intro={
            <>
              Each side has to know who it is dealing with, keep the exchange
              private and speak a vocabulary the other understands. ACE
              standardises those three and nothing more.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card-surface p-6">
              <div className="mb-4">{pillar.icon}</div>
              <p className="section-label mb-2">
                {pillar.need}
              </p>
              <h3 className="font-mono text-sm font-bold text-dark-text-primary mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-dark-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
