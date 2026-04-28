import { FileText, ExternalLink, Download } from "lucide-react";

interface ResumeFile {
  filename: string;
  label: string;
  description?: string;
  updated?: string;
}

// Add or remove entries here as you add PDFs to /public/resumes/.
// Each `filename` resolves to /resumes/<filename>.
const resumes: ResumeFile[] = [
  {
    filename: "diana_lucero_resume.pdf",
    label: "general",
    description: "the all-purpose one",
  },
  {
    filename: "diana_lucero_swe.pdf",
    label: "software engineering",
    description: "frontend / fullstack focus",
  },
  {
    filename: "diana_lucero_ai.pdf",
    label: "ai / ml",
    description: "research + applied ml",
  },
];

export function ResumeContent() {
  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-[22px] mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          resumes/
        </h2>
        <p className="text-[11px] font-mono text-[var(--ink-soft)]">
          a few flavors depending on the role &mdash; pick whichever fits
        </p>
      </div>

      {/* Directory listing header */}
      <div
        className="px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase flex items-center justify-between"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
          borderBottom: "none",
          color: "var(--ink-soft)",
        }}
      >
        <span>~diana/resumes</span>
        <span>{resumes.length} files</span>
      </div>

      <div
        className="!mt-0 divide-y"
        style={{
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        {resumes.map((r) => (
          <ResumeRow key={r.filename} file={r} />
        ))}
      </div>

      <div
        className="p-3 text-center"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px dashed var(--blue-soft)",
        }}
      >
        <p
          className="text-[12px] italic"
          style={{ fontFamily: "'Fraunces', serif", color: "var(--ink-soft)" }}
        >
          need something more tailored? happy to send a custom version &mdash;{" "}
          <a
            href="mailto:dlucero0715@gmail.com"
            className="not-italic font-mono text-[11px] underline decoration-dotted"
            style={{ color: "var(--ink)" }}
          >
            email me
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function ResumeRow({ file }: { file: ResumeFile }) {
  const href = `/resumes/${file.filename}`;
  return (
    <div className="flex items-center gap-3 p-3 bg-white">
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          width: 32,
          height: 38,
          background: "var(--blue-wash)",
          border: "1.5px solid var(--ink)",
        }}
      >
        <FileText size={16} strokeWidth={1.6} className="text-[var(--ink)]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[12px] text-[var(--ink)] truncate">
            {file.filename}
          </span>
          <span className="font-mono text-[9px] text-[var(--ink-soft)] uppercase tracking-wider shrink-0">
            {file.label}
          </span>
        </div>
        {file.description && (
          <p className="font-mono text-[10px] text-[var(--ink-soft)] mt-0.5 truncate">
            {file.description}
          </p>
        )}
      </div>
      <div className="flex gap-1.5 shrink-0">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title="open in new tab"
          className="h-7 w-7 inline-flex items-center justify-center bg-white hover:bg-[var(--blue-pale)] transition-colors"
          style={{ border: "1.5px solid var(--ink)" }}
        >
          <ExternalLink size={12} strokeWidth={1.8} />
        </a>
        <a
          href={href}
          download
          title="download"
          className="h-7 w-7 inline-flex items-center justify-center transition-colors"
          style={{ background: "var(--accent)", color: "white" }}
        >
          <Download size={12} strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );
}
