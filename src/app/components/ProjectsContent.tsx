import { Github, ExternalLink, Star } from "lucide-react";

interface Project {
  title: string;
  blurb: string;        // one-line top summary in her voice
  description: string;  // the real paragraph
  stack: string[];
  github?: string;
  demo?: string;
  badge?: string;       // "IBM Top 50 Global" / "YHack Finalist" etc.
  year: string;
  role: string;
  voiceTone: "confident" | "technical" | "warm" | "casual";
}

const projects: Project[] = [
  {
    title: "ResumeBeaver",
    blurb: "an agentic AI resume optimizer that cuts tailoring from 2 hours to 60 seconds.",
    description:
      "Architected a multi-agent AI system for the IBM TechXchange hackathon using watsonx.ai, Orchestrate, FastAPI, and Streamlit. Built the NLP pipeline with spaCy, Sentence-Transformers, and scikit-learn to match resumes against job descriptions — hit 74.5% semantic match accuracy with 100% contact extraction across PDF/DOCX. Designed four specialized AI agents on an event-driven architecture for concurrent async processing. Recognized as a Top 50 Global Finalist out of thousands of teams.",
    stack: ["Python", "FastAPI", "IBM watsonx.ai", "Streamlit", "spaCy", "scikit-learn"],
    github: "https://github.com/httpsdluc",
    badge: "IBM TechXchange · Top 50 Global",
    year: "Aug 2025",
    role: "Resume Processing Lead · AI/Frontend Engineer",
    voiceTone: "technical",
  },
  {
    title: "Axiom·AI (Signal)",
    blurb: "AI investment decision agent. type a ticker, get a verdict.",
    description:
      "Built at YHack 2026 at Yale over 24 hours. You give Signal a ticker — it pulls live financials, scans headlines for sentiment and media bias, checks what Polymarket prediction market traders are actually betting on, then synthesizes it all into one verdict: Invest, Risky, or Avoid. Ask the AI analyst Hermes why, in plain English. Out of 40–50 teams, we were one of 10 selected to present in the live finals on the Polymarket-sponsored track. Inspired by my finance internship last summer — I watched analysts spend days on research that shouldn't take that long.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "Finnhub", "Polymarket API", "GPT-4o-mini"],
    github: "https://github.com/httpsdluc",
    badge: "YHack 2026 · Live Finals",
    year: "Apr 2026",
    role: "Product Lead · Frontend Engineer",
    voiceTone: "confident",
  },
  {
    title: "GenAI Career Chatbot @ Google",
    blurb: "a Gemini-powered chatbot + prompt library that supported 150+ students.",
    description:
      "Built during the Google Cloud Sprinternship through Break Through Tech. Shipped a real-time AI interface with Python and JavaScript, then refined 20+ prompts using Gemini and Vertex AI Studio to help students prep for their careers. Added a lightweight localStorage tracking layer to monitor usage patterns and presented the outcomes to 20+ Google and Break Through Tech stakeholders.",
    stack: ["Python", "JavaScript", "Gemini API", "Vertex AI", "Google Cloud"],
    year: "Jun – Jul 2025",
    role: "AI Engineering Sprintern · Google NYC",
    voiceTone: "technical",
  },
  {
    title: "HIPE INTEL-COM",
    blurb: "a community platform for aspiring intelligence professionals.",
    description:
      "Hired as Full Stack Developer to build and deploy a full-stack community platform connecting 100+ students and professionals exploring U.S. intelligence careers. Shipped secure sign-up flows with Clerk, nested comments, dynamic profiles, and an accessible Tailwind UI. Part of a CCNY federal work-study research project.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Clerk", "Tailwind CSS"],
    github: "https://github.com/httpsdluc",
    year: "Feb – May 2025",
    role: "Full Stack Developer",
    voiceTone: "technical",
  },
  {
    title: "Solace",
    blurb: "a pastel social reading app for people who annotate in the margins.",
    description:
      "A mobile reading platform I'm building for the people who actually live in the margins of their books. EPUB support, chapter-based chat rooms so you can discuss without getting spoiled, an AI reading companion, and a fanfiction tracking system using source URLs as canonical IDs. Pastel aesthetic, quiet UI, designed to feel like a second home. In development — React Native, Expo, Supabase, Anthropic API.",
    stack: ["React Native", "Expo", "Supabase", "TypeScript", "Anthropic API"],
    github: "https://github.com/httpsdluc",
    year: "2025 – ongoing",
    role: "Solo founder · design + engineering",
    voiceTone: "warm",
  },
  {
    title: "Avionics 2026",
    blurb: "flight computer firmware for high-power rocketry.",
    description:
      "Ongoing project with Harlem Launch Alliance — I own the Radio and Altimeter components on a Teensy 4.1 flight computer running PlatformIO. Working toward real-time telemetry for launch operations. Collaborating across a cross-disciplinary team on propulsion, electrical, and recovery systems. This one is as hard as it sounds and I love it.",
    stack: ["C++", "PlatformIO", "Teensy 4.1", "embedded systems"],
    github: "https://github.com/httpsdluc",
    year: "Mar 2024 – ongoing",
    role: "Avionics Team · Radio + Altimeter",
    voiceTone: "confident",
  },
  {
    title: "WiCS CCNY website",
    blurb: "the official site for Women in Computer Science at CCNY.",
    description:
      "Designed and built the official website for Women in Computer Science at CCNY, the club I serve as Vice President. Next.js, TypeScript, Tailwind, Framer Motion. Pastel design system with the WiCS pixel beaver mascot integrated throughout. Paired Fraunces and Nunito for a voice that felt scholarly but warm.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/httpsdluc",
    year: "2025",
    role: "Designer + Developer",
    voiceTone: "casual",
  },
];

export function ProjectsContent() {
  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h2
          className="text-[22px] mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          projects/
        </h2>
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          scroll down — ranked strongest to background depth
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <div
        className="mt-4 p-3 text-center"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px dashed var(--blue-soft)",
        }}
      >
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          more on{" "}
          <a
            href="https://github.com/httpsdluc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "var(--accent)" }}
          >
            github.com/httpsdluc
          </a>
          {" "}→
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="p-4 bg-white transition-shadow hover:shadow-[3px_3px_0_rgba(30,38,51,0.1)]"
      style={{ border: "1.5px solid var(--ink)" }}
    >
      {/* Header row: rank + title + badge */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="text-[10px] font-mono opacity-50"
            style={{ color: "var(--ink-soft)" }}
          >
            0{index + 1}
          </span>
          <h3
            className="text-[16px]"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            {project.title}
          </h3>
        </div>
        {project.badge && (
          <span
            className="text-[9px] font-mono px-2 py-0.5 whitespace-nowrap flex items-center gap-1"
            style={{
              background: "#faf3d9",
              border: "1px solid #d4b54e",
              color: "#8a6d1f",
            }}
          >
            <Star size={9} strokeWidth={2} fill="currentColor" />
            {project.badge}
          </span>
        )}
      </div>

      {/* Role + year */}
      <p className="text-[10px] font-mono text-[var(--ink-soft)] mb-2">
        {project.role} · {project.year}
      </p>

      {/* Blurb */}
      <p className="text-[12px] italic mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
        {project.blurb}
      </p>

      {/* Description */}
      <p className="text-[11px] leading-relaxed mb-3 text-[var(--ink)]">
        {project.description}
      </p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[9px] font-mono px-1.5 py-0.5"
            style={{
              background: "var(--blue-pale)",
              color: "var(--ink)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 items-center">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            <Github size={11} strokeWidth={2} />
            code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-mono hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            <ExternalLink size={11} strokeWidth={2} />
            demo
          </a>
        )}
      </div>
    </div>
  );
}