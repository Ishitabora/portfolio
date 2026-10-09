import Link from "next/link";
import { featuredProjects, profile } from "@/content/site";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const projects = featuredProjects();

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden
          className="glow pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        />
        <Reveal>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {profile.role}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-fg sm:text-7xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {profile.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Contact
            </Link>
          </div>
        </Reveal>
      </section>

      {projects.length > 0 ? (
        <section className="mt-12">
          <Reveal>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Featured work
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
