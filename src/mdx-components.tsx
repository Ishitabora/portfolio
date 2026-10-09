import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 font-display text-2xl font-semibold tracking-tight text-fg">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-display text-lg font-semibold text-fg">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-fg-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-fg-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-fg-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  a: ({ children, href }) => (
    <a
      href={href}
      target={typeof href === "string" && href.startsWith("http") ? "_blank" : undefined}
      rel={typeof href === "string" && href.startsWith("http") ? "noreferrer" : undefined}
      className="text-accent underline underline-offset-2 hover:text-accent-strong"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-accent-strong">
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-subtle text-xs uppercase tracking-wide text-fg-subtle">
      {children}
    </thead>
  ),
  th: ({ children }) => <th className="px-4 py-3 font-medium">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-border px-4 py-3 text-fg-muted">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
