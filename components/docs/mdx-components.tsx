import type { MDXComponents } from 'mdx/types';
import type { AnchorHTMLAttributes, HTMLAttributes, TableHTMLAttributes } from 'react';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return '';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function HeadingAnchor({ level, children, ...props }: HTMLAttributes<HTMLHeadingElement> & { level: 1 | 2 | 3 }) {
  const text = extractText(children);
  const id = slugify(text);
  const Tag = `h${level}` as const;

  const sizeClass = {
    1: 'text-2xl font-bold mt-0 mb-6',
    2: 'text-xl font-semibold mt-10 mb-4',
    3: 'text-base font-semibold mt-8 mb-3',
  }[level];

  return (
    <Tag id={id} className={`text-dark-text-primary ${sizeClass} group`} {...props}>
      {children}
      <a href={`#${id}`} className="ml-2 text-dark-text-faint opacity-0 group-hover:opacity-100 transition-opacity">
        #
      </a>
    </Tag>
  );
}

export const docsMdxComponents: MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => <HeadingAnchor level={1} {...props} />,
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => <HeadingAnchor level={2} {...props} />,
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => <HeadingAnchor level={3} {...props} />,

  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-dark-text-secondary text-[14px] leading-relaxed mb-4" {...props} />
  ),

  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-ace-cyan hover:underline" {...props} />
  ),

  code: (props: HTMLAttributes<HTMLElement>) => {
    // Inline code only (pre > code is handled by pre)
    return (
      <code
        className="font-mono text-[12px] text-ace-cyan bg-dark-bg-elevated rounded px-1.5 py-0.5"
        {...props}
      />
    );
  },

  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre className="code-block mb-4 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-dark-text-secondary" {...props} />
  ),

  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-dark-text-secondary text-[14px] mb-4 space-y-1" {...props} />
  ),

  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-dark-text-secondary text-[14px] mb-4 space-y-1" {...props} />
  ),

  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),

  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-[13px] border-collapse" {...props} />
    </div>
  ),

  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="text-left font-mono text-[11px] text-ace-cyan uppercase tracking-wider border-b border-dark-border px-3 py-2" {...props} />
  ),

  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="text-dark-text-secondary border-b border-dark-border-faint px-3 py-2" {...props} />
  ),
};
