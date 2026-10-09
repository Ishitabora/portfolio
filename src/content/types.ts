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
