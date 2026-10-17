import { SectionHeader } from "@/components/ui";
import { INSTALL, MCP_URL } from "@/lib/install-data";

const sdks = [
  {
    name: "sdk-ts",
    subtitle: "TypeScript / Node.js",
    install: INSTALL.sdkTs,
  },
  {
    name: "sdk-py",
    subtitle: "Python 3.10+",
    install: INSTALL.sdkPy,
  },
  {
    name: "sdk-swift",
    subtitle: "Swift 6 / iOS / macOS \u00b7 product ACE",
    install: INSTALL.sdkSwift,
  },
  {
    name: "ace-cli",
    subtitle: "Command-line agent runtime",
    install: INSTALL.cli,
  },
  {
    name: "ace-skill",
    subtitle: "Agent onboarding skill",
    install: INSTALL.skill,
  },
  {
    name: "hosted MCP",
    subtitle: "Remote MCP server \u00b7 custodial",
    install: MCP_URL,
  },
];

export function SdksSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="BUILD" title="One Protocol. Every Runtime." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sdks.map((sdk) => (
            <div key={sdk.name} className="card-surface p-5 text-center">
              <h3 className="font-mono text-sm font-bold text-dark-text-primary">
                {sdk.name}
              </h3>
              <p className="font-mono text-[11px] text-dark-text-muted mt-1">
                {sdk.subtitle}
              </p>
              <p className="font-mono text-[11px] text-ace-cyan mt-3 break-all">
                {sdk.install}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[11px] text-dark-text-faint">
          Clients default to the public relay at relay.aceprotocol.org; any conforming relay works
        </p>
      </div>
    </section>
  );
}
