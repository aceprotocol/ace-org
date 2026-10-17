import Link from "next/link";
import { Logo } from "./logo";

/** Primary navigation (IA): Why ACE · Quickstart · Compare · Spec · Ecosystem · Join · GitHub. */
export const NAV_LINKS = [
  { label: "Why ACE", href: "/", mobile: false },
  { label: "Quickstart", href: "/docs/quickstart", mobile: true },
  { label: "Compare", href: "/compare", mobile: false },
  { label: "Spec", href: "/spec", mobile: true },
  { label: "Ecosystem", href: "/ecosystem", mobile: false },
];

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="ACE Protocol home">
          <Logo size={24} />
          <span className="font-mono text-[13px] font-bold tracking-[0.3em] text-dark-text-primary">
            ACE
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${link.mobile ? "" : "hidden md:inline "}font-mono text-[12px] text-dark-text-muted hover:text-dark-text-primary transition-colors`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/aceprotocol"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline font-mono text-[12px] text-dark-text-muted hover:text-dark-text-primary transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/join"
            className="font-mono text-[12px] text-ace-cyan border border-ace-cyan/30 rounded-md px-3 py-1.5 hover:bg-ace-cyan/10 transition-colors"
          >
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
}
