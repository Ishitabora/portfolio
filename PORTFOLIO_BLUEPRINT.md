# Portfolio Site Blueprint

A guide for building a personal portfolio with the same structure as
[abhinavpathak.vercel.app](https://abhinavpathak.vercel.app). The **structure** is
fixed: one content file, the same pages, the same components, the same deploy
flow. The **theme** is entirely yours: colours, fonts, layout details and motion.

You can follow it step by step yourself, or hand it to a coding agent (Claude Code,
Cursor, Copilot) one section at a time. Each step in "Build order" is sized for one
prompt.

---

## 1. Stack

| Part | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) with React 19 | Pages are pre-rendered, fast and free to host |
| Language | TypeScript | The content file is typed, so mistakes show up before deploy |
| Styling | Tailwind CSS v4 | Theme lives in one CSS file as tokens |
| Case studies | MDX (`@next/mdx`, `remark-gfm`) | Write long project pages in Markdown, with tables |
| Motion | `motion` (Framer Motion) | One small "fade up on scroll" effect |
| Hosting | Vercel, connected to GitHub | Every `git push` redeploys the site |

Next.js 16 changed some APIs. Before writing code, the agent should read the guides
bundled in `node_modules/next/dist/docs/`, not rely on older tutorials.

Start with:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --eslint
cd portfolio
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm motion
```

---

## 2. The core idea: content is separate from the UI

**Every piece of text on the site comes from one file, `src/content/site.ts`.**
Components never contain your name, projects or skills directly. To update the
site, you edit that one file and push.

Four rules that come with it:

1. **Typed content.** `src/content/types.ts` defines the shape of everything in
   `site.ts`. Edit `site.ts`, not the types, unless you're adding a new field.
2. **Sections switch off cleanly.** Each page has an on/off flag in `routes`. An
   empty list (no experience yet, say) hides its section automatically. No
   placeholder text ever reaches visitors.
3. **Long project write-ups are MDX files** in `src/content/work/`, named after the
   project's `slug`.
4. **Honest labels.** Anything you're still learning is marked as learning. Team
   projects say what *you* did. Recruiters check, and interviewers ask.

---

## 3. Folder structure

```
src/
  app/
    layout.tsx            # fonts, metadata, header + footer around every page
    globals.css           # YOUR THEME: colour, font and motion tokens
    page.tsx              # Home
    not-found.tsx         # 404 page
    about/page.tsx        # About: bio, skills, experience, education, achievements
    contact/page.tsx      # Contact: big email link + profile links
    work/page.tsx         # All projects
    work/[slug]/page.tsx  # One project + its case study
  components/
    site-header.tsx       # sticky nav, gains a background after scrolling
    site-footer.tsx       # copyright + main profile links
    page-header.tsx       # eyebrow + title + lead, used at the top of inner pages
    project-card.tsx      # one project in a grid
    reveal.tsx            # fade-up-on-scroll wrapper
  content/
    types.ts              # shapes of all content
    site.ts               # ALL site content
    work/<slug>.mdx       # one case study per project that has one
  mdx-components.tsx      # how headings, lists, tables look inside case studies
next.config.ts            # turns on MDX
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Strings, not imports, so the plugin works under Turbopack too.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
```

---

## 4. Content model

### `src/content/types.ts`

Copy this as it is. These shapes are what every page and component reads.

```ts
export type Social = {
  name: string;
  url: string;
  /** Show in the header/footer row, not just the contact page. */
  primary?: boolean;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Project = {
  /** URL segment: /work/<slug>. Must match the .mdx filename for case studies. */
  slug: string;
  title: string;
  /** One or two sentences, shown on the card. */
  summary: string;
  tech: string[];
  year?: number;
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Shows on the home page. */
  featured?: boolean;
  /** True when a matching .mdx case study exists in src/content/work. */
  hasCaseStudy?: boolean;
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary?: string;
  highlights: string[];
};

export type Education = {
  /** Institution or board, e.g. "XYZ University" or "CBSE". */
  school: string;
  /** Qualification, e.g. "B.Tech, Computer Science" or "Class XII". */
  degree: string;
  /** Leave empty for single-year entries like school boards. */
  start?: string;
  end: string;
  /** CGPA or percentage, shown in its own column. */
  score?: string;
  note?: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  avatar?: string;
  resumeUrl?: string;
  /** One string per paragraph on the About page. */
  about: string[];
};

export type Routes = {
  work: boolean;
  about: boolean;
  blog: boolean;
  contact: boolean;
};

export type SiteMeta = {
  /** Full origin, no trailing slash. Used for canonical URLs and link previews. */
  baseUrl: string;
  title: string;
  description: string;
  locale: string;
};
```

### `src/content/site.ts`

The only file you edit for content. Fill it with your own details.

```ts
/**
 * THE ONLY FILE YOU NEED TO EDIT FOR CONTENT.
 * Every component reads from here. Nothing is hardcoded in the UI.
 * Long-form case studies live as .mdx files in src/content/work/.
 */
import type {
  Education, Experience, Profile, Project, Routes, SiteMeta, SkillGroup, Social,
} from "./types";

export const meta: SiteMeta = {
  baseUrl: "https://example.com", // your real URL once deployed, no trailing slash
  title: "Your Name",
  description: "One sentence on what you build, used by search and link previews.",
  locale: "en",
};

/** Flip a section off until you have content for it. The nav hides it too. */
export const routes: Routes = { work: true, about: true, blog: false, contact: true };

export const profile: Profile = {
  name: "Your Name",
  role: "Your Role",
  tagline: "One line on what you do and what makes your work different.",
  location: "City, Country",
  email: "you@example.com",
  resumeUrl: "", // "/resume.pdf" once the file is in public/
  about: [
    "Paragraph 1: who you are and what you build.",
    "Paragraph 2: your main project and the interesting problem in it.",
    "Paragraph 3: how you work (what you care about).",
    "Paragraph 4: what roles you're looking for.",
  ],
};

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/<you>", primary: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/<you>", primary: true },
  { name: "Email", url: `mailto:${profile.email}`, primary: true },
];

export const skills: SkillGroup[] = [
  { group: "Languages", items: [] },
  { group: "Frameworks & Libraries", items: [] },
  { group: "Tools & Platforms", items: [] },
  // A group you're still learning: make the first item say so.
  // { group: "Frontend", items: ["Currently learning", "React", "Next.js"] },
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary: "What it is in one sentence. What you did in one sentence.",
    tech: ["Python", "FastAPI"],
    year: 2026,
    liveUrl: "",
    repoUrl: "",
    featured: true,
    hasCaseStudy: true,
  },
];

// Add entries and the section appears automatically.
export const experience: Experience[] = [];

export const education: Education[] = [
  { school: "Your University", degree: "B.Tech, Your Branch", start: "2024", end: "2028", score: "CGPA x.xx (current)" },
  { school: "CBSE", degree: "Class XII", end: "2023", score: "xx%" },
  { school: "CBSE", degree: "Class X", end: "2021", score: "xx%" },
];

export const achievements: string[] = [];

/** Convenience selectors so components stay simple. */
export const featuredProjects = () => projects.filter((p) => p.featured);
export const primarySocials = () => socials.filter((s) => s.primary && s.url);
export const visibleSkills = () => skills.filter((g) => g.items.length > 0);
```

---

## 5. Pages

Every page reads from `site.ts`. If its `routes` flag is off, it calls `notFound()`.

| Page | Shows |
| --- | --- |
| **Home** `/` | Role (small, accent colour), name (very large), tagline, two buttons ("View work", "Contact"), then the featured projects as cards |
| **Work** `/work` | Every project as a card grid |
| **Project** `/work/[slug]` | Back link, title, summary, a Year / Stack row, "Live demo" and "Source code" buttons (only when the URLs exist), then the MDX case study |
| **About** `/about` | Bio paragraphs, skill groups as rounded tags, experience (if any), an education **table** (Qualification, Institution / Board, Year, Score), achievements in **bold** |
| **Contact** `/contact` | Your email as a large link, the other profile links below it |
| **404** | A short message and a link home |

Details that matter:

- **`/work/[slug]` is pre-rendered.** Use `generateStaticParams` to return every
  project slug, and set `export const dynamicParams = false` so any other slug is
  a real 404. Load the case study only when `hasCaseStudy` is true:
  `(await import(`@/content/work/${slug}.mdx`)).default`.
- **Metadata per page.** `layout.tsx` sets `metadataBase: new URL(meta.baseUrl)`
  and a title template of `"%s — Your Name"`. Project pages use
  `generateMetadata` to set their own title and description from `site.ts`.
- **The education table must not break the page on a phone.** Wrap it in
  `overflow-x-auto` so only the table scrolls sideways.

---

## 6. Components

| Component | Behaviour |
| --- | --- |
| `SiteHeader` | Client component. Nav items filtered by `routes`. Transparent at the top, gains a blurred background and border after scrolling 24 px. Highlights the current page. |
| `SiteFooter` | Copyright with the current year, plus the `primary` socials. |
| `PageHeader` | `eyebrow`, `title`, `lead`. Used at the top of About, Work and Contact. |
| `ProjectCard` | Year, a "Case study" label when one exists, title, summary and the tech list. The whole card links to `/work/<slug>`. |
| `Reveal` | Client component wrapping `motion.div`: fades up 16 px once when it scrolls into view, about 0.4 s, no bounce. Accepts a `delay` to stagger items. |

`Reveal`, for reference:

```tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Enters once on scroll. Short, decelerating, small travel. */
export function Reveal({ children, delay = 0, className }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 7. Your theme

All of these are your choice. Keep the **token names** the same so the
components work unchanged, and change the **values**.

**Colours, in `src/app/globals.css`:**

```css
@import "tailwindcss";

:root {
  --bg: ...;          /* page background */
  --bg-elevated: ...; /* cards */
  --bg-subtle: ...;   /* code, inputs */
  --fg: ...;          /* main text */
  --fg-muted: ...;    /* body text */
  --fg-subtle: ...;   /* labels, dates */
  --border: ...;
  --accent: ...;      /* your one brand colour: links, buttons, focus */
  --accent-strong: ...;
  --accent-muted: ...;
  --accent-fg: ...;   /* text on an accent button */
}

@theme inline {
  --color-bg: var(--bg);
  --color-bg-elevated: var(--bg-elevated);
  --color-bg-subtle: var(--bg-subtle);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-subtle: var(--fg-subtle);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-accent-muted: var(--accent-muted);
  --color-accent-fg: var(--accent-fg);
  --font-display: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono-code), ui-monospace, monospace;
}
```

Components then use classes like `bg-bg`, `text-fg-muted`, `text-accent`,
`border-border`, `font-display`.

**Fonts, in `src/app/layout.tsx`:** load three fonts from `next/font/google`
(display for headings, body for text, mono for labels) and expose them as
`--font-display`, `--font-body` and `--font-mono-code`.

**Case study styling, in `src/mdx-components.tsx`:** give `h2`, `h3`, `p`, `ul`,
`ol`, `li`, `strong`, `a`, `code` and `table` your classes, so case studies match
the theme.

**Design decisions to make yourself:** light or dark (or both), the accent colour,
the font pairing, how cards look, and how much motion there is.

**Not optional, whatever the theme:**

- Works at 375 px wide with no sideways page scrolling.
- Works with the keyboard alone, with a visible focus outline.
- Text contrast is readable.
- One accent colour, used sparingly.

---

## 8. Case study template

`src/content/work/<slug>.mdx`. No front matter; the title and summary come from
`site.ts`.

```mdx
## The problem

Two or three sentences on what was broken or missing, with a number if you have one.

## What I built

What the system does, as a short list of its parts.

## The hard part

The one problem that took the most thinking, and how you solved it.
A table of before and after numbers works well here.

## Outcome

- Results with numbers
- What you'd do next
```

For team projects, say clearly what you built: "It is a five-person project. I built
the translation and photo-sharing features."

---

## 9. Build order (one prompt each)

1. Create the app and install the packages (section 1). Add `next.config.ts` for MDX.
2. Add `types.ts` and a `site.ts` filled with your real content.
3. Set up `globals.css` tokens and the three fonts in `layout.tsx` with your theme.
4. Build `Reveal`, `PageHeader`, `SiteHeader` and `SiteFooter`, and wire them into `layout.tsx`.
5. Build the Home page and `ProjectCard`.
6. Build `/work` and `/work/[slug]`, with `mdx-components.tsx` and one case study.
7. Build `/about`, including the education table and bold achievements.
8. Build `/contact` and `not-found.tsx`.
9. Run `npm run build`. Every `/work/...` page should be listed as pre-rendered.
10. Check every page at 375 px wide and with the keyboard. Fix what breaks.

After each step: read what the agent changed, run `npm run dev`, and look at the
page before moving on.

---

## 10. Deploy

1. Commit and push to a new GitHub repo.
2. On [vercel.com](https://vercel.com), choose **Add New → Project**, import the
   repo and keep the default settings.
3. In **Settings → Domains**, add a clean free address such as
   `yourname.vercel.app`.
4. Set `meta.baseUrl` in `site.ts` to that address and push. Vercel redeploys
   on its own.

Share only the domain you added. The long `project-xxxx.vercel.app` deployment
URLs may ask visitors to log in because of Vercel's Deployment Protection.

---

## 11. Before you share the link

- [ ] No placeholder text anywhere ("Your Name", "example.com", empty sections).
- [ ] Every repo link opens; private repos are left unlinked.
- [ ] Each project says what *you* did, in one or two sentences.
- [ ] Anything you're still learning is labelled as learning.
- [ ] `meta.baseUrl` is your real domain.
- [ ] Checked on a real phone.
- [ ] The CV PDF links to the site, and the site's content matches the CV.
