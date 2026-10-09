import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { primarySocials, profile, routes } from "@/content/site";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  if (!routes.contact) notFound();

  const socials = primarySocials().filter((s) => s.name !== "Email");

  return (
    <div className="pb-24">
      <PageHeader eyebrow="Contact" title="Get in touch" lead="Open to internships and roles in applied AI / ML engineering." />

      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="inline-block font-display text-2xl font-semibold text-fg transition-colors hover:text-accent sm:text-3xl"
        >
          {profile.email}
        </a>
      </Reveal>

      {socials.length > 0 ? (
        <Reveal delay={0.08}>
          <ul className="mt-10 flex flex-wrap gap-4">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </div>
  );
}
