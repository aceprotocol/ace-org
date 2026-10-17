import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      { source: '/docs/coding-agents', destination: '/docs/quickstart-claude-code', permanent: true },
      { source: '/docs/personal-agents', destination: '/docs/hosted-mcp', permanent: true },
      { source: '/docs/signing-schemes', destination: '/docs/identity', permanent: true },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [['rehype-pretty-code', { theme: 'github-dark-dimmed' }]],
  },
})

export default withMDX(nextConfig)
