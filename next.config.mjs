import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
      ],
    }]
  },
  async redirects() {
    return [
      { source: '/docs/coding-agents', destination: '/docs/quickstart-agents', permanent: true },
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
