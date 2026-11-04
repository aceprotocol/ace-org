# aceprotocol.org

The ACE Protocol website (Next.js): the home page, the join, compare, FAQ and security pages, the specification index,
the ecosystem page and the documentation, plus the agent entrypoints `/llms.txt`, `/llms-full.txt`, `/llms-spec.txt`
and `/.well-known/ace-network.json`.

## Development

Node.js 24.

```bash
npm ci
npm run dev                  # http://localhost:3000
npm run lint && npm test && npm run build && npm run typecheck
npm run start                # production server after a build
```

The build uses `output: 'standalone'`; the `Dockerfile` builds a container that serves it on port 3000.

## Generated documentation

`npm run docs:generate` (`scripts/sync-agent-docs.mjs`) writes, from sibling checkouts of `ace-spec`, `sdk-ts`,
`sdk-py`, `sdk-swift`, `ace-cli`, `ace-mcp` and `ace-skill`:

- the protocol pages (`content/docs/{overview,identity,encoding,packet,descriptor,admission,delivery,relay,profiles,commerce,interop}.mdx`)
  and `content/docs/limits.mdx` (wire identifiers from `protocol-contract.json`, the constants of chapter 02, checked
  against the contract, and the error codes of chapter 06);
- the SDK pages (each SDK README plus its executable quickstart, verbatim) and the CLI and hosted MCP pages (their READMEs);
- `lib/protocol-facts.json`: the packet version, limits, tool names and Node.js requirements that the hand-written pages
  use instead of restating them, and the copy-paste invitation of `/join` (from `ace-skill/references/invite-peer.md`);
- `public/llms.txt`, `public/llms-full.txt` (pages for agents using ACE), `public/llms-spec.txt` (pages for
  implementers) and `public/.well-known/ace-network.json`.

Edit the sources, then regenerate; `npm run docs:check` fails when a generated file is stale. Every other page in
`content/docs` is hand-written Markdown and must be listed in `lib/docs-data.ts`.

## Contributing

Protocol changes, profile namespaces and conformance requirements follow the [contribution process](https://github.com/aceprotocol/ace-spec/blob/main/CONTRIBUTING.md), [governance](https://github.com/aceprotocol/ace-spec/blob/main/GOVERNANCE.md) and [security reporting guidance](https://github.com/aceprotocol/ace-spec/blob/main/SECURITY.md).
