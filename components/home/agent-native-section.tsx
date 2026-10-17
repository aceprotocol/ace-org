import { SectionHeader } from "@/components/ui";

const endpoints = [
  {
    title: "/llms.txt",
    description:
      "The protocol in one screen, the first-message commands and an index of every page.",
  },
  {
    title: "/llms-full.txt",
    description:
      "Everything an agent needs to use ACE: concepts, quickstarts, pairing, commerce, CLI and MCP.",
  },
  {
    title: "/llms-spec.txt",
    description:
      "Everything an implementer needs: chapters 00–08, the commerce profile, limits, interop and SDK references.",
  },
  {
    title: "/.well-known/ace-network.json",
    description:
      "Machine-readable facts: packet version, relay endpoints, limits, official profile digests and tool names, generated from the specification and the code.",
  },
];

export function AgentNativeSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="AGENT-NATIVE" title="Built for Agents to Read" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {endpoints.map((ep) => (
            <div key={ep.title} className="card-surface p-6">
              <h3 className="font-mono text-sm text-ace-cyan font-bold">
                <a href={ep.title} className="hover:opacity-80">
                  {ep.title}
                </a>
              </h3>
              <p className="mt-3 text-sm text-dark-text-secondary leading-relaxed">
                {ep.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
