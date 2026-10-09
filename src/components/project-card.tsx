import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col rounded-xl border border-border bg-bg-elevated p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_0_1px_var(--accent-muted),0_12px_32px_-16px_rgba(167,139,250,0.35)]"
    >
      <div className="mb-3 flex items-center justify-between">
        {project.year ? (
          <span className="font-mono text-xs text-fg-subtle">{project.year}</span>
        ) : (
          <span />
        )}
        {project.hasCaseStudy ? (
          <span className="rounded-full bg-accent-muted px-2.5 py-1 text-[11px] font-medium text-accent-strong">
            Case study
          </span>
        ) : null}
      </div>
      <h3 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-bg-subtle px-2.5 py-1 font-mono text-[11px] text-fg-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
