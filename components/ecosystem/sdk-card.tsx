interface SdkCardProps {
  name: string;
  description: string;
  installCmd?: string;
  version?: string;
  githubUrl?: string;
}

export function SdkCard({ name, description, installCmd, version, githubUrl }: SdkCardProps) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="font-mono font-bold text-[14px] text-dark-text-primary">
          {name}
        </span>
        {version && (
          <span className="inline-flex items-center rounded bg-ace-cyan/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ace-cyan">
            {version}
          </span>
        )}
      </div>

      <p className="text-dark-text-muted text-[13px] leading-relaxed mb-3">
        {description}
      </p>

      {installCmd && (
        <div className="font-mono text-[11px] text-ace-cyan bg-dark-bg-primary rounded px-3 py-2 mb-3">
          {installCmd}
        </div>
      )}

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-dark-text-muted hover:text-dark-text-primary transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
      )}
    </div>
  );
}
