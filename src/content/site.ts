/**
 * THE ONLY FILE YOU NEED TO EDIT FOR CONTENT.
 * Every component reads from here. Nothing is hardcoded in the UI.
 * Long-form case studies live as .mdx files in src/content/work/.
 */
import type {
  Education, Experience, Profile, Project, Routes, SiteMeta, SkillGroup, Social,
} from "./types";

export const meta: SiteMeta = {
  baseUrl: "https://ishitabora.vercel.app",
  title: "Ishita Bora",
  description: "Full-stack AI engineer building retrieval-grounded RAG pipelines and the products around them.",
  locale: "en",
};

export const routes: Routes = { work: true, about: true, blog: false, contact: true };

export const profile: Profile = {
  name: "Ishita Bora",
  role: "Full-Stack AI Engineer",
  tagline: "I build AI systems that retrieve the right evidence before they explain anything.",
  location: "Bennett University, Greater Noida (Dehradun)",
  email: "ishitabora2906@gmail.com",
  resumeUrl: "/resume.pdf",
  about: [
    "I'm a full-stack AI engineer who builds systems where the model is only as trustworthy as what it's allowed to say. My main focus is retrieval-augmented generation: pipelines that ground every answer in real, cited evidence instead of letting a language model improvise.",
    "My core project, DermaSense, is a skin-lesion triage tool that pairs a computer vision model with a RAG layer I designed end to end — ingestion, chunking, embeddings, FAISS retrieval, prompt construction, and a safety layer that refuses to let the LLM invent a diagnosis. In a medical setting, a confident wrong answer is worse than no answer, so grounding and evaluation were part of the design from day one, not an afterthought.",
    "I care about pipelines that are modular and testable over ones that are merely demoable — every stage of a RAG system should be independently checkable, from corpus coverage to retrieval quality to the final grounding check.",
    "I'm currently looking for internships and entry-level roles in applied AI / ML engineering, especially teams working on RAG, LLM applications, or AI systems where correctness and safety actually matter.",
  ],
};

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/Ishitabora", primary: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ishita-b-b71bb7284/", primary: true },
  { name: "Email", url: `mailto:${profile.email}`, primary: true },
];

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "C++"] },
  { group: "Core CS", items: ["Data Structures & Algorithms"] },
  {
    group: "AI / ML & RAG",
    items: [
      "OpenCV",
      "Hugging Face Transformers",
      "Sentence-Transformers",
      "LangChain",
      "LangGraph",
      "RAG",
      "RAGAS",
      "Ollama",
      "Groq",
      "PyTorch",
    ],
  },
  {
    group: "Backend & Tools",
    items: [
      "FastAPI",
      "Pydantic",
      "ChromaDB",
      "FAISS",
      "NumPy",
      "pandas",
      "scikit-learn",
      "Git",
      "Linux",
      "pytest",
      "Streamlit",
      "Vercel",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "dermasense",
    title: "DermaSense",
    summary:
      "A smartphone-first skin lesion triage system pairing computer vision with a RAG layer I designed end to end, so every explanation is grounded in a curated medical corpus instead of invented by the LLM.",
    tech: ["Python", "FAISS", "Sentence-Transformers", "Groq LLM API", "Streamlit", "FastAPI", "pytest"],
    year: 2026,
    liveUrl: "",
    repoUrl: "",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "pdf-rag-chatbot",
    title: "PDF RAG Chatbot",
    summary:
      "A conversational assistant that answers questions and summarizes content directly from PDF documents, built on a retrieval pipeline over the document's own text.",
    tech: ["Python", "RAG", "PDF parsing", "Summarization"],
    year: 2026,
    liveUrl: "",
    repoUrl: "https://github.com/Ishitabora/CHATBOT",
    featured: true,
    hasCaseStudy: false,
  },
  {
    slug: "itantra",
    title: "iTantra",
    summary:
      "An offline Android app for ISRO's Smart India Hackathon problem statement that relays speech between phones with no internet. I built the on-device translation layer and optimized the AI models to run efficiently on-device.",
    tech: ["Kotlin", "ONNX Runtime", "IndicTrans2"],
    year: 2026,
    liveUrl: "",
    repoUrl: "",
    featured: false,
    hasCaseStudy: false,
  },
];

export const experience: Experience[] = [];

export const education: Education[] = [
  { school: "Bennett University", degree: "B.Tech, Computer Science (AI focus)", start: "2024", end: "2028", score: "CGPA 7.85 (current)" },
  { school: "CBSE", degree: "Class XII", end: "2023", score: "85.2%" },
  { school: "CBSE", degree: "Class X", end: "2021", score: "88.2%" },
];

export const achievements: string[] = [
  "Smart India Hackathon 2026: team ranked 7th in the Bennett University internal round with iTantra (ISRO problem statement SIH26173).",
];

/** Convenience selectors so components stay simple. */
export const featuredProjects = () => projects.filter((p) => p.featured);
export const primarySocials = () => socials.filter((s) => s.primary && s.url);
export const visibleSkills = () => skills.filter((g) => g.items.length > 0);
