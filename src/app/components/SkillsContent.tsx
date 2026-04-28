// Skills window. Pill tags grouped by category, with a legend
// for comfort levels (strong / comfortable / learning).

type Level = "strong" | "comfortable" | "learning";

interface SkillGroup {
  title: string;
  items: { name: string; level: Level }[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "languages",
    items: [
      { name: "Python", level: "strong" },
      { name: "TypeScript", level: "strong" },
      { name: "JavaScript", level: "strong" },
      { name: "HTML / CSS", level: "strong" },
      { name: "SQL", level: "comfortable" },
      { name: "C++", level: "comfortable" },
      { name: "Scheme / Racket", level: "learning" },
    ],
  },
  {
    title: "frontend & design",
    items: [
      { name: "React", level: "strong" },
      { name: "Next.js", level: "strong" },
      { name: "Tailwind CSS", level: "strong" },
      { name: "Framer Motion", level: "comfortable" },
      { name: "Material-UI", level: "comfortable" },
      { name: "Figma", level: "comfortable" },
      { name: "React Native / Expo", level: "learning" },
    ],
  },
  {
    title: "backend & infra",
    items: [
      { name: "FastAPI", level: "strong" },
      { name: "Node.js", level: "comfortable" },
      { name: "MongoDB", level: "comfortable" },
      { name: "Supabase", level: "comfortable" },
      { name: "Firebase", level: "comfortable" },
      { name: "Vercel", level: "comfortable" },
      { name: "Google Cloud", level: "comfortable" },
      { name: "Docker", level: "learning" },
    ],
  },
  {
    title: "ai / ml",
    items: [
      { name: "Gemini API", level: "strong" },
      { name: "OpenAI API", level: "strong" },
      { name: "Anthropic API", level: "comfortable" },
      { name: "IBM watsonx.ai", level: "comfortable" },
      { name: "Hugging Face / Transformers", level: "comfortable" },
      { name: "spaCy", level: "comfortable" },
      { name: "scikit-learn", level: "comfortable" },
      { name: "Sentence-Transformers", level: "comfortable" },
      { name: "LoRA / PEFT", level: "learning" },
      { name: "prompt engineering", level: "strong" },
    ],
  },
  {
    title: "data",
    items: [
      { name: "pandas", level: "strong" },
      { name: "NumPy", level: "comfortable" },
      { name: "Matplotlib", level: "comfortable" },
      { name: "Seaborn", level: "comfortable" },
      { name: "Jupyter", level: "strong" },
      { name: "Tableau", level: "comfortable" },
    ],
  },
  {
    title: "tools & other",
    items: [
      { name: "Git / GitHub", level: "strong" },
      { name: "VS Code", level: "strong" },
      { name: "Streamlit", level: "comfortable" },
      { name: "PlatformIO", level: "learning" },
      { name: "Teensy / embedded", level: "learning" },
    ],
  },
];

export function SkillsContent() {
  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-[22px] mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          skills.md
        </h2>
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          what i can build with, what i&apos;m currently getting better at
        </p>
      </div>

      {/* Legend for pill colors */}
      <section
        className="p-2.5"
        style={{
          background: "var(--blue-wash)",
          border: "1px solid var(--blue-soft)",
        }}
      >
        <p className="text-[10px] font-mono text-[var(--ink-soft)] mb-1.5">legend:</p>
        <div className="flex gap-3 flex-wrap text-[10px] font-mono">
          <LegendPill level="strong" label="strong" />
          <LegendPill level="comfortable" label="comfortable" />
          <LegendPill level="learning" label="learning" />
        </div>
      </section>

      {/* Pill groups */}
      {skillGroups.map((group) => (
        <section key={group.title}>
          <h3
            className="font-mono text-[11px] tracking-wider uppercase mb-2 pb-1"
            style={{
              color: "var(--ink-soft)",
              borderBottom: "1px solid var(--blue-soft)",
            }}
          >
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <SkillPill key={item.name} name={item.name} level={item.level} />
            ))}
          </div>
        </section>
      ))}

      {/* Friendly close note */}
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
          picking up something new every semester.
        </p>
      </div>
    </div>
  );
}

function SkillPill({ name, level }: { name: string; level: Level }) {
  const styles = getLevelStyles(level);
  const borderStyle = level === "learning" ? "dashed" : "solid";
  return (
    <span
      className="text-[10px] font-mono px-2 py-1"
      style={{
        background: styles.bg,
        color: styles.fg,
        border: `1px ${borderStyle} ${styles.border}`,
      }}
    >
      {name}
    </span>
  );
}

function LegendPill({ level, label }: { level: Level; label: string }) {
  const styles = getLevelStyles(level);
  const borderStyle = level === "learning" ? "dashed" : "solid";
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block w-2.5 h-2.5"
        style={{
          background: styles.bg,
          border: `1px ${borderStyle} ${styles.border}`,
        }}
      />
      <span style={{ color: "var(--ink-soft)" }}>{label}</span>
    </span>
  );
}

function getLevelStyles(level: Level) {
  switch (level) {
    case "strong":
      return {
        bg: "var(--accent)",
        fg: "white",
        border: "var(--accent)",
      };
    case "comfortable":
      return {
        bg: "var(--blue-pale)",
        fg: "var(--ink)",
        border: "var(--blue-soft)",
      };
    case "learning":
      return {
        bg: "transparent",
        fg: "var(--ink-soft)",
        border: "var(--ink-soft)",
      };
  }
}