import { Briefcase, MapPin } from "lucide-react";

interface Role {
  company: string;
  title: string;
  dates: string;
  location?: string;
  blurb: string;
  highlights?: string[];
}

const roles: Role[] = [
  {
    company: "Google",
    title: "Software & AI Engineering Intern",
    dates: "Jun – Jul 2025",
    location: "New York City, NY",
    blurb:
      "Built a GenAI chatbot and prompt library through the Break Through Tech Cloud Sprinternship.",
    highlights: [
      "Shipped a real-time AI interface in Python + JavaScript supporting 150+ users",
      "Refined 20+ prompts on Gemini and Vertex AI Studio; built a localStorage usage-tracking system",
      "Presented outcomes to 20+ Google and Break Through Tech stakeholders",
    ],
  },
  {
    company: "Jasco Philanthropies",
    title: "Finance Intern",
    dates: "Jul – Aug 2025",
    location: "Hybrid",
    blurb:
      "Helped shape a nonprofit-led program teaching the fundamentals of launching and managing an investment firm.",
    highlights: [
      "Collaborated with interns and leadership on curriculum, business planning, and investment-analysis frameworks",
    ],
  },
  {
    company: "PwC",
    title: "Consulting Extern",
    dates: "Jul – Aug 2025",
    location: "Virtual",
    blurb:
      "PwC-led externship helping nonprofit Good Sports strengthen digital engagement through user research and data-driven insights.",
    highlights: [
      "Audited website + social platforms; benchmarked industry storytelling practices",
      "Delivered a strategic deck and recorded pitch with tech-informed UX recommendations",
    ],
  },
  {
    company: "HIPE INTEL-COM",
    title: "Full Stack Developer",
    dates: "Feb – May 2025",
    location: "New York City, NY",
    blurb:
      "Built and deployed a full-stack community platform for 100+ users exploring U.S. intelligence careers.",
    highlights: [
      "Next.js + TypeScript + MongoDB; +30% returning users across three campus groups",
      "Auth, nested comments, and dynamic profiles via Clerk; accessibility via Tailwind",
    ],
  },
  {
    company: "Accenture",
    title: "Career Catalyst Participant",
    dates: "Feb – May 2025",
    location: "New York City, NY",
    blurb:
      "Capstone consulting project on blockchain in healthcare — built a strategic adoption roadmap with regulatory analysis.",
    highlights: [
      "Weekly case studies in cloud, cybersecurity, and AI digital transformation",
    ],
  },
  {
    company: "Girls Who Code Mentoring Corps",
    title: "Mentor",
    dates: "Jan 2025 – Present",
    location: "New York City, NY",
    blurb:
      "Mentor high school girls in programming and college / career readiness, building confidence in STEM.",
  },
  {
    company: "Headstarter",
    title: "Software Engineering Fellow",
    dates: "Jul – Sep 2024",
    location: "New York, NY",
    blurb:
      "Built 5 AI-driven projects across 5 hackathons in an agile sprint format.",
    highlights: [
      "Scalable solutions in JavaScript, HTML, CSS, and Web APIs",
    ],
  },
  {
    company: "Lucero's Flower Shop",
    title: "Web Manager & Designer",
    dates: "Jun 2018 – Present",
    location: "Bronx, NY",
    blurb:
      "Family business — built and runs the e-commerce platform.",
    highlights: [
      "+40% online traffic via SEO, analytics, and UX improvements",
      "Online ordering + marketing automation: +30% revenue, +50% social engagement",
    ],
  },
  {
    company: "ConEdison",
    title: "Career Immersion Fellow",
    dates: "Oct 2018 – May 2019",
    location: "New York, NY",
    blurb:
      "Early-career exposure to engineering and technical operations in the energy sector.",
  },
];

export function ExperienceContent() {
  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h2
          className="text-[22px] mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          experience/
        </h2>
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          where i&apos;ve worked &mdash; most recent first
        </p>
      </div>

      <div className="space-y-3">
        {roles.map((r) => (
          <RoleCard key={`${r.company}-${r.dates}`} role={r} />
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
          full timeline lives in the{" "}
          <span style={{ color: "var(--accent)" }}>resumes/</span> folder &rarr;
        </p>
      </div>
    </div>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <div
      className="p-4 bg-white"
      style={{ border: "1.5px solid var(--ink)" }}
    >
      <div className="flex items-start gap-2 mb-1">
        <Briefcase
          size={14}
          strokeWidth={1.8}
          className="text-[var(--accent)] shrink-0 mt-1"
        />
        <div className="min-w-0 flex-1">
          <h3
            className="text-[15px] leading-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            {role.title}
          </h3>
          <p className="font-mono text-[10px] text-[var(--ink-soft)] mt-0.5">
            {role.company}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-2 ml-6">
        <span className="font-mono text-[10px] text-[var(--ink-soft)]">
          {role.dates}
        </span>
        {role.location && (
          <span className="font-mono text-[10px] text-[var(--ink-soft)] inline-flex items-center gap-1">
            <MapPin size={10} strokeWidth={1.8} />
            {role.location}
          </span>
        )}
      </div>

      <p className="text-[12px] italic mb-2 ml-6" style={{ fontFamily: "'Fraunces', serif" }}>
        {role.blurb}
      </p>

      {role.highlights && role.highlights.length > 0 && (
        <ul className="space-y-1 ml-6">
          {role.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-[var(--ink)]">
              <span className="text-[var(--accent)] mt-0.5">▸</span>
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
