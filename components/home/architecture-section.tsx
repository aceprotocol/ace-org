import { SectionHeader } from "@/components/ui";

type Layer = {
  num: number;
  name: string;
  detail: string;
  kind: "core" | "optional" | "app";
};

// Top to bottom; layer 1 is the foundation.
const layers: Layer[] = [
  {
    num: 4,
    name: "Applications",
    detail:
      "execution authority · budgets · wallet approval · payment execution · not part of ACE",
    kind: "app",
  },
  {
    num: 3,
    name: "Official profiles",
    detail:
      "ace:text:1 · ace:commerce:1 (stablecoin first, Stripe Link compatible) · third-party profiles use the same mechanism",
    kind: "optional",
  },
  {
    num: 2,
    name: "Private delivery",
    detail:
      "X-Wing prekey packets · ML-DSA-65 signatures · async store-and-forward · signed receipts · permits, contact requests, blocks · relays and hosted MCP gateways are replaceable services",
    kind: "core",
  },
  {
    num: 1,
    name: "Identity & descriptors",
    detail:
      "key event log · ACE ID = SHA-256(inception) · ML-DSA-65 · signed descriptor with prekey and profiles · signed card record with handle, payment accounts and ERC-8004 bindings · public relay directory",
    kind: "core",
  },
];

export function ArchitectureSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 grid-bg" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          label="ARCHITECTURE"
          title="A Small Core. Optional Profiles."
          intro={
            <>
              Identity and private delivery carry any kind of interaction.
              Vocabularies such as commerce are installed on top. Authority,
              budgets and payments belong to applications.
            </>
          }
        />

        <ol className="mx-auto flex max-w-3xl flex-col gap-3">
          {layers.map((layer) => (
            <li
              key={layer.num}
              className={`rounded border px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 ${
                layer.kind === "core"
                  ? "border-ace-cyan/30 bg-dark-bg-primary/60"
                  : "border-dashed border-dark-border"
              }`}
            >
              <div className="flex items-center gap-3 sm:w-64 sm:flex-shrink-0">
                <span className="font-mono text-[11px] text-ace-cyan whitespace-nowrap">
                  Layer {layer.num}
                </span>
                <span className="font-mono text-sm text-dark-text-primary font-medium">
                  {layer.name}
                </span>
              </div>
              <span className="font-mono text-[11px] text-dark-text-muted leading-relaxed sm:flex-1">
                {layer.detail}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                  layer.kind === "core" ? "text-ace-cyan" : "text-dark-text-faint"
                }`}
              >
                {layer.kind}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
