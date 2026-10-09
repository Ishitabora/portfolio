# DermaSense: RAG Engineering Skills

**Project:** DermaSense, a smartphone-first skin lesion triage system (Computer Vision + RAG)
**Role:** RAG pipeline engineer. She designed and built the retrieval-augmented generation layer that explains the CV results to users.

---

## What the RAG layer does

- Takes the CV pipeline's structured output (lesion class signals, uncertainty, change over time, triage action) and explains it to the user in plain, safe language.
- Grounds every explanation in a curated medical corpus, so the LLM never makes up medical facts.
- Core design rule: **"CV computes, RAG retrieves, the LLM explains,"** without inventing or overriding any model output.

---

## Skills applied

### 1. End-to-end RAG pipeline design
- Built the full pipeline: **ingestion → cleaning → chunking → embedding → vector store → retrieval → prompt building → LLM → safety check**.
- Split it into independent, testable modules (`ingestion`, `chunking`, `embeddings`, `vectorstore`, `retrieval`, `prompts`, `llm`, `safety`).
- Gave each component one clear job, with separate layers for CV context, retrieved evidence and future patient context.

### 2. Medical corpus curation and data ingestion
- Collected trusted medical sources with a scripted acquisition pipeline (HTML extraction, URL checks, text cleaning).
- Ran a **per-class coverage audit**: checked that the corpus had dedicated evidence for all 6 lesion classes the CV model can output (ACK, BCC, MEL, NEV, SCC, SEK).
- Found that 4 of the 6 classes had no coverage, expanded the corpus before moving on, and fixed a bug in the coverage tool that had counted 8 documents as one.

### 3. Chunking and embeddings
- Used paragraph-based chunking with configurable overlap, so chunks keep their surrounding context.
- Embedded chunks with **Sentence-Transformers (all-MiniLM-L6-v2)**.
- Attached metadata to each chunk so every answer can be traced back to its source.

### 4. Vector search and retrieval
- Built a **FAISS** vector store with persisted indexes.
- Wrote a semantic retriever and an evidence formatter that bundles retrieved chunks with their source citations.
- Evaluated retrieval against fixed test cases, including a dedicated set of **low-similarity queries**.

### 5. LLM integration
- Wrote a **Groq API adapter** for a hosted open-weight LLM.
- Set temperature to 0.1 so outputs are near-deterministic and safety checks give the same result on identical inputs.
- Added retries for transient network failures. An unreachable LLM is reported as *inconclusive*, not as a failed evaluation.

### 6. Prompt engineering
- Built a prompt builder that combines the CV context and retrieved evidence into constrained, grounded prompts.
- Treated generation as **constrained paraphrase**: the LLM explains what the CV computed and what the sources say, and adds nothing beyond that.
- Made weak retrieval trigger an explicit statement of uncertainty instead of a confident answer.

### 7. Safety and grounding for medical AI
- Built a **grounding check**: every answer has to cite a real retrieved source.
- Built a **banned-phrase filter** that catches direct-diagnosis claims (e.g. "you have melanoma"), and tuned it for precision when it over-flagged legitimate corpus text.
- Added a fallback rule: when the retrieved evidence doesn't match, the system says so instead of presenting it as relevant.
- Supported the product's **narrow safety mode**: the RAG never names a diagnosis and never reassures the user.

### 8. Evaluation and testing
- Set up a **pre-defined pass/fail evaluation gate**: cited sources, no banned claims, explicit uncertainty on weak evidence.
- Passed the Phase 1 answer-evaluation gate **16/16**.
- Stress-tested the uncertainty criterion with 18 low-similarity queries, to confirm the criterion actually triggers instead of passing by default.
- Wrote extensive unit tests across every module.

### 9. CV ↔ RAG integration
- Designed the **CV context schema and parser** that turns CV pipeline output into structured input for the RAG.
- Wrote an end-to-end CV-integration evaluation that checks explanations stay grounded in both the CV signals and the medical evidence.
- Built a **Streamlit demo app** and a CLI for interactive testing.

---

## Tech stack

`Python` · `FAISS` · `Sentence-Transformers` · `Groq LLM API` · `Streamlit` · `FastAPI` · `pytest`

---

## Key takeaway

She built a RAG system for a **high-stakes medical setting**, where a confident wrong answer does more harm than no answer. That's why safety, grounding and measurable evaluation were part of the design from the start, not added at the end.
