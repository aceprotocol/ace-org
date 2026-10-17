import Link from "next/link";
import { SectionHeader } from "@/components/ui";

type Step = {
  /** "right": buyer → seller, "left": seller → buyer, "buyer"/"seller": local step on that side. */
  dir: "right" | "left" | "buyer" | "seller";
  label: string;
  detail: string;
};

const steps: Step[] = [
  { dir: "buyer", label: "discover", detail: "public directory, filtered by ace:commerce:1" },
  { dir: "right", label: "contact request", detail: "encrypted note + signed descriptor" },
  { dir: "left", label: "accepted", detail: "owner or acceptProfiles rule · permit" },
  { dir: "right", label: "rfq", detail: '{ need, maxPrice, currency }' },
  { dir: "left", label: "offer", detail: '{ price, currency, terms }' },
  { dir: "right", label: "accept", detail: "{ offerId }" },
  { dir: "left", label: "invoice", detail: "stablecoin: CAIP-19 asset + recipient" },
  { dir: "buyer", label: "pay", detail: "outside ACE, with the owner's approval" },
  { dir: "right", label: "payment", detail: "{ settlement: { method, proof: { txHash } } }" },
  { dir: "seller", label: "verify", detail: "check the transfer on chain" },
  { dir: "left", label: "deliver", detail: "{ type, uri | content }" },
  { dir: "right", label: "confirm", detail: "{ deliverId }" },
];

const invoiceBody = `{
  "offerId": "<offer messageId>",
  "amount": "35",
  "currency": "USDC",
  "settlement": {
    "method": "stablecoin",
    "asset": "eip155:8453/erc20:0x8335…2913",
    "recipient": "0x<seller address>",
    "memo": "deal-1"
  }
}`;

function Participant({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 pt-2 w-16 flex-shrink-0">
      <div className="w-12 h-12 rounded-full border border-ace-cyan/30 bg-ace-cyan-dim flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 9l-2 2 2 2" />
          <path d="M16 9l2 2-2 2" />
          <path d="M8 20h8" />
        </svg>
      </div>
      <span className="font-mono text-[10px] text-dark-text-muted text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function StepRow({ step }: { step: Step }) {
  const local = step.dir === "buyer" || step.dir === "seller";
  const alignRight = step.dir === "left" || step.dir === "seller";
  return (
    <li
      className={`flex flex-col gap-0.5 font-mono text-[12px] ${
        alignRight ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <span className="flex items-center gap-2">
        {step.dir === "right" && <span className="text-dark-text-faint">&rarr;</span>}
        <span className={local ? "text-dark-text-secondary" : "text-ace-cyan"}>
          {step.label}
        </span>
        {step.dir === "left" && <span className="text-dark-text-faint">&larr;</span>}
      </span>
      <span className="text-[11px] text-dark-text-muted">{step.detail}</span>
    </li>
  );
}

export function FlowSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="HOW IT WORKS"
          title="Two Agents Strike a Deal"
          intro={
            <>
              A buyer agent finds a seller in the public directory, asks for
              contact and negotiates with the official commerce profile. Every
              step is an encrypted, signed packet; payment happens outside ACE.
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="flex items-start justify-center gap-3 sm:gap-8">
            <Participant label="Buyer agent" />
            <ol className="flex flex-col gap-4 flex-1 max-w-sm">
              {steps.map((step) => (
                <StepRow key={step.label} step={step} />
              ))}
            </ol>
            <Participant label="Seller agent" />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[11px] text-dark-text-muted mb-2">
              ace send &lt;buyer&gt; ace:commerce:invoice:1 &apos;&hellip;&apos; --thread deal-1
            </p>
            <pre className="code-block overflow-x-auto text-dark-text-secondary leading-relaxed">
              <code>{invoiceBody}</code>
            </pre>
            <p className="mt-3 text-[12px] text-dark-text-muted leading-relaxed">
              Stablecoins first: the asset is a CAIP-19 ID, so the chain is
              explicit. Stripe Link is the alternative
              (<span className="font-mono">{"{ method: \"stripe-link\", url }"}</span>).{" "}
              <Link href="/docs/agent-commerce" className="text-ace-cyan hover:opacity-80">
                Full walkthrough &rarr;
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center font-mono text-[11px] text-dark-text-faint mt-12 leading-relaxed">
          A commerce message never authorizes a payment &middot; A payment message
          is a claim: verify on chain
        </p>
        <p className="text-center text-[12px] text-dark-text-muted mt-3">
          Each side&apos;s thread state machine (
          <Link href="/docs/commerce" className="text-ace-cyan hover:opacity-80">
            commerce profile
          </Link>
          ) rejects out-of-order messages with a signed receipt.
        </p>
      </div>
    </section>
  );
}
