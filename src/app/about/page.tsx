import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  achievements, education, experience, profile, routes, visibleSkills,
} from "@/content/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  if (!routes.about) notFound();

  const skills = visibleSkills();

  return (
    <div className="pb-24">
      <PageHeader eyebrow="About" title="About me" />

      <Reveal>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-fg-muted">
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>

      {skills.length > 0 ? (
        <section className="mt-16">
          <Reveal>
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Skills
            </h2>
          </Reveal>
          <div className="space-y-6">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.05}>
                <div>
                  <h3 className="mb-3 text-sm font-medium text-fg">{group.group}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-sm text-fg-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-16">
          <Reveal>
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Experience
            </h2>
          </Reveal>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.role}`} delay={i * 0.05}>
                <div className="border-l-2 border-border pl-5">
                  <p className="font-medium text-fg">
                    {job.role} · {job.company}
                  </p>
                  <p className="mt-1 font-mono text-xs text-fg-subtle">
                    {job.start} — {job.end}
                  </p>
                  {job.summary ? (
                    <p className="mt-2 text-sm text-fg-muted">{job.summary}</p>
                  ) : null}
                  {job.highlights.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-fg-muted">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {education.length > 0 ? (
        <section className="mt-16">
          <Reveal>
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Education
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-bg-subtle text-xs uppercase tracking-wide text-fg-subtle">
                  <tr>
                    <th className="px-4 py-3 font-medium">Qualification</th>
                    <th className="px-4 py-3 font-medium">Institution / Board</th>
                    <th className="px-4 py-3 font-medium">Year</th>
                    <th className="px-4 py-3 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu) => (
                    <tr key={`${edu.school}-${edu.degree}`} className="border-t border-border">
                      <td className="px-4 py-3 text-fg">{edu.degree}</td>
                      <td className="px-4 py-3 text-fg-muted">{edu.school}</td>
                      <td className="px-4 py-3 text-fg-muted">
                        {edu.start ? `${edu.start}–${edu.end}` : edu.end}
                      </td>
                      <td className="px-4 py-3 text-fg-muted">{edu.score ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>
      ) : null}

      {achievements.length > 0 ? (
        <section className="mt-16">
          <Reveal>
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
              Achievements
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="text-sm leading-relaxed text-fg-muted">
                  <strong className="font-semibold text-fg">{a}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}
    </div>
  );
}
