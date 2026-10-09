import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { routes, projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!routes.work) notFound();

  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const CaseStudy = project.hasCaseStudy
    ? (await import(`@/content/work/${slug}.mdx`)).default
    : null;

  return (
    <div className="pb-24">
      <Link
        href="/work"
        className="mb-8 inline-block text-sm text-fg-muted transition-colors hover:text-accent"
      >
        ← All work
      </Link>

      <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
        {project.summary}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-fg-subtle">
        {project.year ? <span>{project.year}</span> : null}
        <span className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-xs text-fg-muted">
              {t}
            </span>
          ))}
        </span>
      </div>

      {project.liveUrl || project.repoUrl ? (
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-transform hover:scale-[1.03]"
            >
              Live demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Source code
            </a>
          ) : null}
        </div>
      ) : null}

      {CaseStudy ? (
        <article className="mt-16 max-w-2xl border-t border-border pt-10">
          <CaseStudy />
        </article>
      ) : null}
    </div>
  );
}
