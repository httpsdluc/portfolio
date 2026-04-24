// src/app/components/AboutContent.tsx
import { Heart, Star, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";

export function AboutContent() {
  return (
    <div className="space-y-5 font-mono text-sm">
      {/* Centered avatar + name */}
      <div className="text-center">
      <div
        className="w-28 h-28 mx-auto mb-4 border-2 overflow-hidden"
        style={{
          borderColor: "var(--ink)",
          background: "var(--blue-pale)",
          imageRendering: "pixelated",
        }}
      >
        <img
          src="/pixel-me.png"
          alt="Diana (pixel portrait)"
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
        <h2
          className="text-2xl mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          Diana Lucero
        </h2>
        <p className="text-[var(--ink-soft)] text-xs tracking-wide">
          Computer Science · CCNY &apos;27
        </p>
      </div>

      {/* About Me card */}
      <div
        className="p-4 space-y-2"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="text-[var(--accent)]" size={14} strokeWidth={1.8} />
          <h3 className="font-mono text-[11px] tracking-wide">About Me</h3>
        </div>
        <p className="text-[var(--ink-soft)] leading-relaxed text-xs">
          I&apos;m a CS student at The City College of New York and VP of Women
          in Computer Science. I didn&apos;t start coding seriously until my
          sophomore year of college — but once I did, it clicked. I love that
          you&apos;re never done learning, and that if you see something missing
          in the world, you can just <em>build it</em>.
        </p>
        <p className="text-[var(--ink-soft)] leading-relaxed text-xs">
          In the two years since, I spent a summer at Google building GenAI
          tools through the Break Through Tech Cloud Sprinternship, placed Top
          50 globally at IBM TechXchange with a multi-agent resume optimizer,
          and made the live finals at YHack with an AI investment agent.
          I&apos;m drawn to problems at the intersection of AI, product
          thinking, and design that makes software feel like it belongs to
          the person using it.
        </p>
        <p className="text-[var(--ink-soft)] leading-relaxed text-xs">
          Right now I&apos;m writing firmware for a rocket, building a social
          reading app called Solace, and looking for summer &apos;26
          internships where I can keep learning in public.
        </p>
      </div>

      {/* Interests card */}
      <div
        className="p-4 space-y-2"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-[var(--accent)]" size={14} strokeWidth={1.8} />
          <h3 className="font-mono text-[11px] tracking-wide">Interests</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {["AI / ML", "Frontend", "Product Design", "Fintech", "Data Science", "Embedded", "Community", "Pixel Art"].map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="font-mono text-[10px]"
              style={{ borderColor: "var(--ink)", background: "var(--blue-pale)" }}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Fun Facts card */}
      <div
        className="p-4 space-y-2"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Star className="text-[var(--accent)]" size={14} strokeWidth={1.8} />
          <h3 className="font-mono text-[11px] tracking-wide">Fun Facts</h3>
        </div>
        <ul className="space-y-1.5 text-[var(--ink-soft)] text-xs">
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">▸</span>
            <span>VP of Women in Computer Science at CCNY 💜</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">▸</span>
            <span>first gen &amp; proud latina in tech — porque juntas llegamos más lejos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">▸</span>
            <span>started coding sophomore year of college</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">▸</span>
            <span>currently debugging a radio for a rocket</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--accent)]">▸</span>
            <span>pixel art obsessive — this whole site was an excuse to draw Luna</span>
          </li>
        </ul>
      </div>
    </div>
  );
}