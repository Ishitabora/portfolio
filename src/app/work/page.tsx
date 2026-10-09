import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes, projects } from "@/content/site";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  if (!routes.work) notFound();

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        lead="RAG pipelines, LLM applications, and the systems around them."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
