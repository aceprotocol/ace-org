interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 32, showWordmark = false, className = "" }: LogoProps) {
  const viewBox = "0 0 56 54";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <title>ACE Protocol</title>
        {/* Outer triangle */}
        <polygon
          points="28,6 52,48 4,48"
          stroke="var(--color-ace-cyan)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        {/* Inner inverted triangle */}
        <polygon
          points="28,38 16,18 40,18"
          stroke="var(--color-ace-cyan)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Center node */}
        <circle cx="28" cy="26" r="3" fill="var(--color-ace-cyan)" />
        {/* Vertex dots */}
        <circle cx="28" cy="10" r="2" fill="var(--color-ace-cyan)" opacity="0.5" />
        <circle cx="48" cy="46" r="2" fill="var(--color-ace-cyan)" opacity="0.5" />
        <circle cx="8" cy="46" r="2" fill="var(--color-ace-cyan)" opacity="0.5" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <span className="font-mono font-bold tracking-[0.5em] text-dark-text-primary leading-none">
            ACE
          </span>
          <span className="font-mono text-[10px] text-ace-cyan tracking-[0.2em] leading-tight mt-0.5">
            PROTOCOL
          </span>
        </div>
      )}
    </div>
  );
}
