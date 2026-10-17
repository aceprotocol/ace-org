/** Shared install commands and endpoints shown on the home page and the ecosystem page. */

/** Package version of sdk-ts and sdk-py and the sdk-swift release tag (pre-release). */
export const SDK_VERSION = "0.5.0";
/** Package version of @ace-protocol/cli (pre-release). */
export const CLI_VERSION = "0.4.0";
export const DEFAULT_RELAY_URL = "https://relay.aceprotocol.org";
export const MCP_URL = "https://mcp.aceprotocol.org/mcp";

export const INSTALL = {
  sdkTs: "npm install @ace-protocol/sdk",
  sdkPy: "pip install ace-sdk",
  sdkSwift: `.package(url: "https://github.com/aceprotocol/ace-sdk-swift.git", from: "${SDK_VERSION}")`,
  cli: "npm install -g @ace-protocol/cli",
  skill: "npx skills add aceprotocol/ace-skill",
} as const;
