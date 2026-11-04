'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOCS_NAV } from '@/lib/docs-data';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] shrink-0 py-10 pr-6 hidden md:block">
      <nav className="sticky top-20 space-y-6" aria-label="Documentation">
        <Link
          href="/docs"
          className={`block font-mono text-[11px] transition-colors ${pathname === '/docs' ? 'text-dark-text-primary' : 'text-dark-text-muted hover:text-dark-text-secondary'}`}
        >
          All documentation
        </Link>
        {DOCS_NAV.map((section) => (
          <div key={section.title}>
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-ace-cyan mb-2">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const href = `/docs/${item.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      className={`block py-1 pl-3 text-[13px] transition-colors ${
                        isActive
                          ? 'border-l-2 border-ace-cyan text-dark-text-primary'
                          : 'border-l border-transparent text-dark-text-muted hover:text-dark-text-secondary'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
