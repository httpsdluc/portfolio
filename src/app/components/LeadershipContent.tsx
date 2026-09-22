interface Role {
  title: string;
  org: string;
  dates: string;
  blurb?: string;
}

const leadership: Role[] = [
  {
    title: "Vice President",
    org: "Women in Computer Science (WiCS) · CCNY",
    dates: "Dec 2025 – Present",
    blurb:
      "Lead technical and professional events (LinkedIn workshops, industry panels with faculty and professionals). Drive strategic planning, member growth, and community-building for women in tech at CCNY.",
  },
  {
    title: "Treasurer & Historian",
    org: "Women in Science (WinS) · CCNY",
    dates: "Sep 2025 – Present",
    blurb:
      "Manage club finances and budgeting for events supporting women in STEM. Document programming and maintain organizational records.",
  },
  {
    title: "Marketing & Outreach Chair",
    org: "BYTEHacks · CCNY",
    dates: "Jun – Oct 2025",
    blurb:
      "Led marketing for CCNY's first major hackathon in 5+ years — drove engagement through social and outreach campaigns; coordinated sponsorships and participant communications.",
  },
  {
    title: "Social Media Chair",
    org: "Association for Computing Machinery (ACM) · CCNY",
    dates: "Sep 2024 – May 2026",
    blurb:
      "Manage social presence and content to promote technical events, workshops, and opportunities.",
  },
];

const fellowships: Role[] = [
  {
    title: "Web Development Fellow",
    org: "CUNY Tech Prep",
    dates: "Sep 2026 – Present",
    blurb:
      "Developing web development skills alongside other CUNY students pursuing careers in tech.",
  },
  {
    title: "Graduate",
    org: "Break Through Tech — Machine Learning Foundations",
    dates: "Aug 2026",
    blurb:
      "Completed the summer course, strengthening my understanding of building, evaluating, and improving machine learning models.",
  },
  {
    title: "Selected Participant",
    org: "Bloomberg Women in Data Program & Forum · NYC / Princeton, NJ",
    dates: "Mar – May 2026",
    blurb:
      "Analyzed real-world financial datasets in Python (pandas, NumPy) and presented data-driven insights to Bloomberg engineers; attended the Women in Data Forum at Bloomberg's Princeton Data HQ for mentorship sessions and technical workshops on large-scale financial data systems.",
  },
  {
    title: "Fellow",
    org: "Generative AI Fundamentals Nanodegree · Udacity × Accenture × Girls Who Code",
    dates: "Feb 2026 – Present",
    blurb:
      "Coursework on prompt engineering, LLM applications, and ethical / industry use cases of generative AI.",
  },
  {
    title: "Ambassador",
    org: "Break Through Tech Fellowship",
    dates: "Sep 2025 – Jun 2026",
    blurb:
      "Mentor peers and promote access to AI / SWE opportunities. Organize career-development events and connect students with industry resources.",
  },
  {
    title: "Fellow",
    org: "AI4ALL Ignite Fellowship",
    dates: "Sep 2025 – Jun 2026",
    blurb:
      "ML fundamentals coursework + hands-on AI/ML projects in Python. Discussions on responsible AI, bias mitigation, and real-world industry applications.",
  },
  {
    title: "Fellow",
    org: "Bronx Climate Tech Fellowship",
    dates: "Sep – Dec 2025",
    blurb:
      "Explored energy infrastructure, thermal storage, and sustainability-focused engineering with industry professionals.",
  },
];

const recognition: Role[] = [
  {
    title: "NAR Level 1 High Power Rocketry Certification",
    org: "National Association of Rocketry",
    dates: "Aug 2026",
    blurb: "Certified to build and fly high-power rockets.",
  },
  {
    title: "Selected Participant",
    org: "MLT Career Prep Summer Seminar · Deloitte University",
    dates: "Aug 2026",
    blurb:
      "Connected with an incredible professional community and reflected intentionally on the professional I want to become.",
  },
  {
    title: "Attendee",
    org: "MLH DevCon 2026",
    dates: "2026",
    blurb:
      "Learned from developers building, sharing knowledge, and contributing to the broader tech community.",
  },
  {
    title: "Top 50 Global Finalist",
    org: "IBM TechXchange Hackathon",
    dates: "Aug 2025",
    blurb:
      "Out of thousands of teams worldwide — multi-agent resume optimizer (ResumeBeaver).",
  },
  {
    title: "Live Finals — Polymarket Track",
    org: "YHack 2026 · Yale",
    dates: "Apr 2026",
    blurb:
      "1 of 10 teams selected from 40–50 to present in the live finals (Signal / Axiom·AI).",
  },
];

export function LeadershipContent() {
  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-[22px] mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          leadership.md
        </h2>
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          where i show up beyond the code &mdash; community, fellowships, recognition
        </p>
      </div>

      <Section title="leadership" entries={leadership} />
      <Section title="fellowships & programs" entries={fellowships} />
      <Section title="recognition" entries={recognition} />

      <div
        className="mt-4 p-3 text-center"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px dashed var(--blue-soft)",
        }}
      >
        <p
          className="text-[12px] italic"
          style={{ fontFamily: "'Fraunces', serif", color: "var(--ink-soft)" }}
        >
          further, together.
        </p>
      </div>
    </div>
  );
}

function Section({ title, entries }: { title: string; entries: Role[] }) {
  return (
    <section>
      <h3
        className="font-mono text-[11px] tracking-wider uppercase mb-2 pb-1"
        style={{
          color: "var(--ink-soft)",
          borderBottom: "1px solid var(--blue-soft)",
        }}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {entries.map((e) => (
          <Entry key={`${e.org}-${e.dates}`} role={e} />
        ))}
      </div>
    </section>
  );
}

function Entry({ role }: { role: Role }) {
  return (
    <div className="pl-3" style={{ borderLeft: "2px solid var(--blue-soft)" }}>
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <h4
          className="text-[14px] leading-tight"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          {role.title}
        </h4>
        <span className="font-mono text-[10px] text-[var(--ink-soft)] shrink-0">
          {role.dates}
        </span>
      </div>
      <p className="font-mono text-[10px] text-[var(--ink-soft)] mt-0.5">
        {role.org}
      </p>
      {role.blurb && (
        <p className="text-[11px] text-[var(--ink)] mt-1.5 leading-relaxed">
          {role.blurb}
        </p>
      )}
    </div>
  );
}
