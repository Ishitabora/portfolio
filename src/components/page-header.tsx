import { Reveal } from "./reveal";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
            {lead}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
