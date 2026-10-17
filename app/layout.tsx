import "@/styles/globals.css";
import { siteMetadata } from './metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE_GRAPH } from '@/lib/structured-data';

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-dark-bg-primary text-dark-text-primary font-display">
        <JsonLd data={SITE_GRAPH} />
        {children}
      </body>
    </html>
  );
}
