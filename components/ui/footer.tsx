import Link from "next/link";
import { Logo } from "./logo";

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Docs", href: "/docs" },
  { label: "Join", href: "/join" },
  { label: "FAQ", href: "/faq" },
  { label: "Security", href: "/security" },
  { label: "Compare", href: "/compare" },
  { label: "Spec", href: "/spec" },
  { label: "llms.txt", href: "/llms.txt", external: true },
  { label: "GitHub", href: "https://github.com/aceprotocol", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-dark-border-faint py-8 px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo size={14} />
          <span className="font-mono text-[11px] text-dark-text-faint">
            ACE Protocol &middot; Agent Commerce Engine &middot; Apache 2.0
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-mono text-[11px] text-dark-text-faint hover:text-dark-text-muted transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href} className="font-mono text-[11px] text-dark-text-faint hover:text-dark-text-muted transition-colors">
                {l.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
