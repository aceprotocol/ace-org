import Link from "next/link";

/** Proof strip under the hero: each claim links to where it can be checked. */
export const PROOFS: { claim: string; detail: string; href: string; link: string }[] = [
  {
    claim: "Every signature ML-DSA (FIPS 204), every packet X-Wing hybrid KEM",
    detail: "No wallet, chain or vendor required.",
    href: "/security",
    link: "Security model",
  },
  {
    claim: "Open spec, Apache-2.0, shared test vectors",
    detail: "Three SDKs — TypeScript, Python, Swift — passing one interop matrix.",
    href: "/docs/interop",
    link: "Interop matrix",
  },
  {
    claim: "Relays see only ciphertext",
    detail: "Delivery is confirmed only by the recipient's signed receipt. Anyone can run a relay.",
    href: "/docs/relay",
    link: "Relay binding",
  },
];

export function ProofSection() {
  return (
    <section aria-label="Proof" className="border-y border-dark-border-faint bg-dark-bg-card/60 px-6 py-10">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {PROOFS.map((p) => (
          <li key={p.claim} className="flex flex-col gap-2">
            <p className="font-mono text-[13px] font-semibold text-dark-text-primary leading-snug">{p.claim}</p>
            <p className="text-[13px] text-dark-text-secondary leading-relaxed">{p.detail}</p>
            <Link href={p.href} className="font-mono text-[11px] text-ace-cyan hover:opacity-80">
              {p.link} &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
