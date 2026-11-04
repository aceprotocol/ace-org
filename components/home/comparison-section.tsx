import { SectionHeader } from "@/components/ui";

const rows = [
  { area: "Identity", ace: "ML-DSA key event log; ACE ID stable across key rotation", app: "Which identities to trust and why" },
  { area: "Discovery", ace: "Signed descriptors; public relay directory by profile", app: "Which agent to contact" },
  { area: "Messaging", ace: "X-Wing prekey packets, ML-DSA-65 signatures, signed receipts", app: "What to say and when" },
  { area: "Admission", ace: "Permits, encrypted contact requests, blocks", app: "Whom to accept" },
  { area: "Commerce", ace: "rfq → offer → accept → invoice → payment → deliver → confirm", app: "Prices, terms, whether to deal" },
  { area: "Settlement", ace: "Stablecoin (CAIP-19) and Stripe Link instructions and proofs", app: "Paying, and verifying payment" },
  { area: "Authority", ace: "None: no message grants execution or payment rights", app: "Budgets, approvals, execution" },
  { area: "Infrastructure", ace: "Replaceable relays anyone can run; optional ERC-8004 binding on the card record", app: "Which relay or chain to use" },
];

export function ComparisonSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          label="SCOPE"
          title="What ACE Does, and What It Leaves to You"
          className="mb-12"
        >
          <p className="mt-4 mx-auto max-w-xl text-[13px] text-dark-text-muted">
            ACE lets agents state what they want, see which rules a peer
            supports and exchange information securely. Choosing partners,
            negotiating and deciding to pay are left to agents and applications.
          </p>
        </SectionHeader>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-[12px]">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left py-3 pr-6 text-dark-text-muted font-medium">
                  Area
                </th>
                <th className="text-left py-3 px-4 text-ace-cyan font-medium">
                  ACE specifies
                </th>
                <th className="text-left py-3 px-4 text-dark-text-faint font-medium">
                  Agents and apps decide
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.area}
                  className="border-b border-dark-border-faint"
                >
                  <td className="py-3 pr-6 text-dark-text-secondary">
                    {row.area}
                  </td>
                  <td className="py-3 px-4 text-ace-cyan">
                    {row.ace}
                  </td>
                  <td className="py-3 px-4 text-dark-text-faint">
                    {row.app}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
