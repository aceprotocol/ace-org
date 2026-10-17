# aceprotocol.org

The ACE Protocol website (Next.js): the home page, the join, compare, FAQ and security pages, the specification index,
the ecosystem page and the documentation, plus the agent entrypoints `/llms.txt`, `/llms-full.txt`, `/llms-spec.txt`
and `/.well-known/ace-network.json`.

## Launch gate

**Deploy the site only when every item below is live.** The site documents registry install commands as the primary
path and links to these repositories; deploying it earlier advertises packages, repositories and endpoints that do not
resolve yet. A push to `test` or `main` deploys (`.github/workflows/ace-org.yml`) under the GitHub environment `test`
or `prod`, so the OIDC subject is `repo:<org>/<repo>:environment:test` or `…:environment:prod`: the trust policy of the
`AWS_ROLE_ARN` role must match those, and `prod` needs required reviewers.

- Packages published: `@ace-protocol/sdk` 0.5.0 on npm, `ace-sdk` 0.5.0 on PyPI, the `0.5.0` tag on
  `aceprotocol/ace-sdk-swift` (the site's Swift Package Manager line uses `from: "0.5.0"`), `@ace-protocol/cli` 0.4.0
  on npm. The versions shown come from `lib/install-data.ts`; `npm run docs:check` fails if they disagree with the
  sibling `sdk-ts`, `sdk-py` and `ace-cli` checkouts.
- Repositories public on GitHub: `aceprotocol/ace-org` (this site; `/compare` and `/ecosystem` link to it),
  `ace-spec`, `ace-relay`, `ace-mcp`, `ace-cli`, `ace-skill`, `ace-sdk-ts`, `ace-sdk-py` and `ace-sdk-swift`.
- Hosted MCP reachable at `https://mcp.aceprotocol.org/mcp`, and the relay at `https://relay.aceprotocol.org`.

Owner to confirm ecosystem entries against the revised protocol before deploy.

## Development

```bash
npm ci
npm run dev                  # http://localhost:3000
npm test && npm run lint && npm run build
npm run start                # production server after a build
```

The build uses `output: 'standalone'`: `node .next/standalone/server.js` serves it without `node_modules` once
`public/` and `.next/static` are copied next to it (the `Dockerfile` does this).

## Generated documentation

`npm run docs:generate` (`scripts/sync-agent-docs.mjs`) writes, from the sibling checkouts `ace-spec`, `sdk-ts`,
`sdk-py`, `sdk-swift`, `ace-cli`, `ace-mcp` and `ace-skill`:

- the protocol pages (`content/docs/{overview,identity,encoding,packet,descriptor,admission,delivery,relay,profiles,commerce,interop}.mdx`)
  and `content/docs/limits.mdx` (wire identifiers from `protocol-contract.json`, the constants of chapter 02, checked
  against the contract, and the error codes of chapter 06);
- the SDK pages (each SDK README plus its executable quickstart, verbatim) and the CLI and hosted MCP pages (their READMEs);
- `lib/protocol-facts.json`: the packet version, limits, tool names and CLI engine that the hand-written pages use
  instead of restating them, and the copy-paste invitation of `/join` (from `ace-skill/references/invite-peer.md`);
- `public/llms.txt`, `public/llms-full.txt` (pages for agents using ACE), `public/llms-spec.txt` (pages for
  implementers) and `public/.well-known/ace-network.json`.

Edit the sources, then regenerate; `npm run docs:check` fails when a generated file is stale. Every other page in
`content/docs` is hand-written Markdown and must be listed in `lib/docs-data.ts`.

## Open development

Implementations and service operators are independent. Protocol changes, profile namespaces and conformance requirements follow the public [contribution process](https://github.com/aceprotocol/ace-spec/blob/main/CONTRIBUTING.md), [governance](https://github.com/aceprotocol/ace-spec/blob/main/GOVERNANCE.md) and [security reporting guidance](https://github.com/aceprotocol/ace-spec/blob/main/SECURITY.md).
