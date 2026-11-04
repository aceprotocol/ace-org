import { Navigation, Footer } from '@/components/ui';
import { Sidebar } from '@/components/docs/sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div className="mx-auto max-w-6xl flex min-h-screen">
        <Sidebar />
        <main className="flex-1 border-l border-dark-border-faint px-6 sm:px-8 py-10 min-w-0">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
