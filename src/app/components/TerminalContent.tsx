import { useEffect, useState } from "react";

const USERNAMES = {
  github: "httpsdluc",
  leetcode: "dianalucero",
};

interface GithubStats {
  name: string;
  followers: number;
  publicRepos: number;
}

interface ContribStats {
  totalLastYear: number;
  currentStreak: number;
  last12Weeks: number[];
}

interface LeetStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

export function TerminalContent() {
  const [github, setGithub] = useState<GithubStats | null>(null);
  const [contribs, setContribs] = useState<ContribStats | null>(null);
  const [leet, setLeet] = useState<LeetStats | null>(null);
  const [githubError, setGithubError] = useState(false);
  const [leetFallback, setLeetFallback] = useState(false); // true when API isn't available
  const [leetLoading, setLeetLoading] = useState(true);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAMES.github}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) =>
        setGithub({
          name: data.name ?? data.login,
          followers: data.followers ?? 0,
          publicRepos: data.public_repos ?? 0,
        })
      )
      .catch(() => setGithubError(true));
  }, []);

  useEffect(() => {
    fetch(`https://github-contributions-api.deno.dev/${USERNAMES.github}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const allDays: { date: string; contributionCount: number }[] = [];
        (data.contributions ?? []).forEach((week: unknown[]) => {
          week.forEach((d) => {
            const day = d as { date: string; contributionCount: number };
            if (day && day.date) allDays.push(day);
          });
        });
        allDays.sort((a, b) => a.date.localeCompare(b.date));
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const totalLastYear = allDays
          .filter((d) => new Date(d.date) >= oneYearAgo)
          .reduce((sum, d) => sum + (d.contributionCount || 0), 0);

        let currentStreak = 0;
        let foundRecent = false;
        for (let i = allDays.length - 1; i >= 0; i--) {
          const count = allDays[i].contributionCount || 0;
          if (count > 0) {
            foundRecent = true;
            currentStreak++;
          } else if (foundRecent) {
            break;
          }
        }

        const last12Weeks = allDays.slice(-84).map((d) => d.contributionCount || 0);
        setContribs({ totalLastYear, currentStreak, last12Weeks });
      })
      .catch(() => {
        /* skip silently */
      });
  }, []);

  // LeetCode: call our own /api/leetcode endpoint (Vercel serverless function)
  // If it 404s (running locally on Vite), fall back to static link mode
  useEffect(() => {
    fetch(`/api/leetcode?username=${USERNAMES.leetcode}`)
      .then((r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setLeet({
          totalSolved: data.totalSolved ?? 0,
          easySolved: data.easySolved ?? 0,
          mediumSolved: data.mediumSolved ?? 0,
          hardSolved: data.hardSolved ?? 0,
          ranking: data.ranking ?? 0,
        });
        setLeetLoading(false);
      })
      .catch(() => {
        // API isn't available (e.g. running Vite locally before deploying).
        // Show the static LeetCode link instead.
        setLeetFallback(true);
        setLeetLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTyped((t) => t + 1);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const lines: string[] = [];
  lines.push("$ whoami");
  lines.push(github ? github.name : githubError ? "error" : "...");
  lines.push("cs @ ccny · wics vp · building things");
  lines.push("");

  lines.push("$ cat github.stats");
  if (githubError) {
    lines.push("error: user not found");
  } else if (!github) {
    lines.push("loading...");
  } else {
    lines.push(`user        ${github.name}`);
    lines.push(`repos       ${github.publicRepos}`);
    lines.push(`followers   ${github.followers}`);
    if (contribs) {
      lines.push(`contribs    ${contribs.totalLastYear} (last 365 days)`);
      lines.push(
        `streak      ${contribs.currentStreak} day${contribs.currentStreak === 1 ? "" : "s"}`
      );
      lines.push("");
      lines.push("last 12 weeks:");
      lines.push(renderHeatmap(contribs.last12Weeks));
    }
  }
  lines.push("");

  lines.push("$ cat leetcode.stats");
  if (leetLoading) {
    lines.push("loading...");
  } else if (leet) {
    // Live data (Vercel backend worked)
    lines.push(`solved      ${leet.totalSolved}`);
    lines.push(`  easy      ${leet.easySolved}`);
    lines.push(`  medium    ${leet.mediumSolved}`);
    lines.push(`  hard      ${leet.hardSolved}`);
    if (leet.ranking) lines.push(`ranking     #${leet.ranking.toLocaleString()}`);
  } else if (leetFallback) {
    // Localhost or API down — static link fallback
    lines.push(`grinding @ leetcode.com/u/${USERNAMES.leetcode}`);
    lines.push("▸ click to see live stats ↗");
  }

  const fullText = lines.join("\n");
  const revealed = fullText.slice(0, typed);
  const isDone = typed >= fullText.length;

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 12,
        lineHeight: 1.7,
        background: "#1e2633",
        color: "#dde7ef",
        padding: "16px 20px",
        margin: "-22px -24px",
        minHeight: 360,
        whiteSpace: "pre-wrap",
        letterSpacing: "0.02em",
      }}
    >
      {revealed.split("\n").map((line, i) => (
        <div key={i}>
          <TermLine text={line} leetUrl={`https://leetcode.com/u/${USERNAMES.leetcode}`} />
        </div>
      ))}

      {!isDone && (
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 14,
            background: "#7ea0b8",
            verticalAlign: "-2px",
            animation: "termcursor 1s steps(1) infinite",
          }}
        />
      )}

      {isDone && (
        <div style={{ marginTop: 8 }}>
          <span style={{ color: "#7ea0b8" }}>$ </span>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 14,
              background: "#7ea0b8",
              verticalAlign: "-2px",
              animation: "termcursor 1s steps(1) infinite",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes termcursor {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TermLine({ text, leetUrl }: { text: string; leetUrl: string }) {
  if (text.startsWith("$")) {
    const prompt = text.slice(0, 2);
    const rest = text.slice(2);
    return (
      <>
        <span style={{ color: "#7ea0b8" }}>{prompt}</span>
        <span style={{ color: "#fafbfc" }}>{rest}</span>
      </>
    );
  }
  if (text.startsWith("error")) {
    return <span style={{ color: "#d48aa8" }}>{text}</span>;
  }
  // Clickable LeetCode fallback lines
  if (text.startsWith("grinding @") || text.startsWith("▸ click")) {
    return (
      <a
        href={leetUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#f4d26a",
          textDecoration: "none",
          borderBottom: "1px dotted #f4d26a",
          cursor: "pointer",
        }}
      >
        {text}
      </a>
    );
  }
  return <>{text}</>;
}

function renderHeatmap(last84Days: number[]): string {
  while (last84Days.length < 84) last84Days.unshift(0);
  const weeks: number[][] = [];
  for (let i = 0; i < 12; i++) {
    weeks.push(last84Days.slice(i * 7, i * 7 + 7));
  }
  const max = Math.max(1, ...last84Days);
  const levels = ["·", "░", "▒", "▓", "█"];
  const getLvl = (count: number) => {
    if (count === 0) return levels[0];
    const ratio = count / max;
    if (ratio > 0.75) return levels[4];
    if (ratio > 0.5) return levels[3];
    if (ratio > 0.25) return levels[2];
    return levels[1];
  };
  const rows: string[] = [];
  for (let day = 0; day < 7; day++) {
    let row = "";
    for (let week = 0; week < 12; week++) {
      row += getLvl(weeks[week][day] || 0) + " ";
    }
    rows.push(row);
  }
  return rows.join("\n");
}