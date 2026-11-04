import { SectionLabel } from "./section-label";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  /** Rendered as the standard intro paragraph under the heading. */
  intro?: React.ReactNode;
  /** Custom content under the heading, for sections that need a non-standard intro. */
  children?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ label, title, intro, children, className = "mb-16" }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-4 text-3xl font-bold text-dark-text-primary">{title}</h2>
      {intro && (
        <p className="mt-4 mx-auto max-w-2xl text-sm text-dark-text-secondary leading-relaxed">{intro}</p>
      )}
      {children}
    </div>
  );
}
