import { primarySocials, profile } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-fg-subtle sm:flex-row sm:justify-between">
        <p>© {year} {profile.name}</p>
        <ul className="flex items-center gap-5">
          {primarySocials().map((social) => (
            <li key={social.name}>
              <a
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                className="transition-colors hover:text-accent"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
