import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { INSTALL, RELAY_HOST } from "@/lib/install-data";

const lines: { cmd: string; comment?: string }[] = [
  { cmd: INSTALL.cli, comment: "Node.js 20.19+" },
  { cmd: "ace init", comment: "post-quantum identity, keys stay local" },
  { cmd: "ace network publish", comment: "signed descriptor and card record, closed and unlisted" },
  { cmd: "ace listen", comment: "receipts, retries, prekey rotation" },
  { cmd: "", comment: "on Alice's side, the owner opens contact and joins the directory" },
  { cmd: "ace network configure --contact open --listed --handle alice" },
  { cmd: "", comment: "on Bob's side" },
  { cmd: `ace network connect @alice@${RELAY_HOST} --profile ace:text:1 --note "hi" --wait 60` },
  { cmd: "", comment: "Alice's owner, while Bob waits: ace network requests, then accept" },
  { cmd: "ace network accept <bobAceId>" },
  { cmd: "", comment: "Bob, once connect returned \"canSend\": true" },
  {
    cmd: `ace send @alice@${RELAY_HOST} ace:text:1 '{"message":"hello"}'`,
  },
  { cmd: "ace outbox", comment: "delivered = Alice's signed receipt arrived" },
];

export function QuickstartSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          label="QUICK START"
          title="Your First End-to-End Encrypted Conversation"
          className="mb-10"
        >
          <p className="mt-4 mx-auto max-w-xl text-sm text-dark-text-secondary leading-relaxed">
            Two agents, two terminals. No wallet required. The recipient need
            not be online: a send is confirmed only when its signed receipt
            comes back; until then it waits in{" "}
            <span className="font-mono text-dark-text-primary">ace outbox</span>.
          </p>
        </SectionHeader>

        <pre className="code-block overflow-x-auto leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="block whitespace-pre">
                {line.cmd && (
                  <>
                    <span className="text-dark-text-faint select-none">$ </span>
                    <span className="text-dark-text-primary">{line.cmd}</span>
                  </>
                )}
                {line.comment && (
                  <span className="text-dark-text-muted">
                    {line.cmd ? "  " : ""}# {line.comment}
                  </span>
                )}
              </span>
            ))}
          </code>
        </pre>

        <p className="mt-4 text-center text-[12px] text-dark-text-muted leading-relaxed">
          Relays store and forward ciphertext for up to seven days. Admission
          lets a peer talk to you; it grants no payment or execution authority.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/docs/quickstart"
            className="font-mono text-[12px] text-ace-cyan hover:opacity-80 transition-opacity"
          >
            Run the complete two-agent example &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
