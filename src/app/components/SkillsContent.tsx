/**
 * Skills window.
 *
 * Two styles:
 * - Languages: progress bars (only this category — scope matters here)
 * - Everything else: pill tags grouped by category, with a legend showing
 *   the comfort levels (strong / comfortable / learning).
 */

type Level = "strong" | "comfortable" | "learning";

interface Language {
  name: string;
  // 0-100 fill for the bar
  fill: number;
  note?: string;
}

interface SkillGroup {
  title: string;
  items: { name: string; level: Level }[];
}

const languages: Language[] = [
  { name: "Python", fill: 90, note: "primary language" },
  { name: "TypeScript", fill: 85 },
  { name: "JavaScript", fill: 85 },
  { name: "HTML / CSS", fill: 85 },
  { name: "SQL", fill: 65 },
  { name: "C++", fill: 55, note: "coursework + embedded" },
  { name: "Scheme / Racket", fill: 35, note: "EOPL, currently learning" },
];

const skillGroups: SkillGroup[] = [
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

      {/* Languages with progress bars */}
      <section>
        <h3
          className="font-mono text-[11px] tracking-wider uppercase mb-3 pb-1"
          style={{
            color: "var(--ink-soft)",
            borderBottom: "1px solid var(--blue-soft)",
          }}
        >
          languages
        </h3>
        <div className="space-y-2.5">
          {languages.map((lang) => (
            <LanguageBar key={lang.name} lang={lang} />
          ))}
        </div>
      </section>

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

function LanguageBar({ lang }: { lang: Language }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-0.5">
        <span className="font-mono text-[11px] text-[var(--ink)]">{lang.name}</span>
        {lang.note && (
          <span className="font-mono text-[9px] text-[var(--ink-soft)] italic">
            {lang.note}
          </span>
        )}
      </div>
      <div
        className="h-2 relative overflow-hidden"
        style={{
          background: "white",
          border: "1px solid var(--ink)",
        }}
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${lang.fill}%`,
            background: "var(--accent)",
          }}
        />
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