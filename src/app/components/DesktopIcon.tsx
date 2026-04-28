import { motion } from "motion/react";

type Tone = "blue" | "blue-deep" | "gray" | "sage";
type IconKind = "folder" | "text" | "markdown" | "mail";

interface DesktopIconProps {
  kind?: IconKind;
  tone: Tone;
  label: string;
  onClick: () => void;
}

const tones: Record<Tone, { dark: string; light: string }> = {
  blue: { dark: "#b5c7d6", light: "#dde7ef" },
  "blue-deep": { dark: "#7ea0b8", light: "#b5c7d6" },
  gray: { dark: "#c6ced8", light: "#dde3ea" },
  sage: { dark: "#c9d3c5", light: "#e4ebe2" },
};

const ICON_BOX = { width: 62, height: 52 };

export function DesktopIcon({
  kind = "folder",
  tone,
  label,
  onClick,
}: DesktopIconProps) {
  const colors = tones[tone];

  return (
    <motion.button
      className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-white/50 transition-colors w-24"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        className="relative"
        style={ICON_BOX}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
      >
        {kind === "folder" && <FolderShape colors={colors} />}
        {kind === "text" && <DocShape colors={colors} variant="text" />}
        {kind === "markdown" && <DocShape colors={colors} variant="markdown" />}
        {kind === "mail" && <MailShape colors={colors} />}
      </motion.div>
      <span
        className="text-[10px] font-mono text-[var(--ink)] px-1.5 py-0.5 rounded"
        style={{ background: "rgba(255,255,255,0.7)" }}
      >
        {label}
      </span>
    </motion.button>
  );
}

type ShapeColors = { dark: string; light: string };

function FolderShape({ colors }: { colors: ShapeColors }) {
  return (
    <>
      <div
        className="absolute border-[1.5px] border-[var(--ink)]"
        style={{
          top: 4,
          left: 4,
          width: 26,
          height: 9,
          borderBottom: "none",
          borderRadius: "4px 4px 0 0",
          background: colors.dark,
        }}
      />
      <div
        className="absolute border-[1.5px] border-[var(--ink)]"
        style={{
          top: 12,
          left: 0,
          width: 62,
          height: 40,
          borderRadius: "0 4px 4px 4px",
          background: colors.light,
          boxShadow: "2px 2px 0 rgba(30,38,51,0.15)",
        }}
      />
    </>
  );
}

function DocShape({
  colors,
  variant,
}: {
  colors: ShapeColors;
  variant: "text" | "markdown";
}) {
  const docW = 44;
  const docH = 52;
  const fold = 11;
  const left = (ICON_BOX.width - docW) / 2;

  return (
    <>
      <div
        className="absolute border-[1.5px] border-[var(--ink)]"
        style={{
          top: 0,
          left,
          width: docW,
          height: docH,
          background: colors.light,
          boxShadow: "2px 2px 0 rgba(30,38,51,0.15)",
          clipPath: `polygon(0 0, ${docW - fold}px 0, ${docW}px ${fold}px, ${docW}px ${docH}px, 0 ${docH}px)`,
        }}
      />
      {/* Folded corner */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: left + docW - fold,
          width: fold,
          height: fold,
          background: colors.dark,
          borderLeft: "1.5px solid var(--ink)",
          borderBottom: "1.5px solid var(--ink)",
          clipPath: `polygon(0 0, ${fold}px ${fold}px, 0 ${fold}px)`,
        }}
      />

      {variant === "text" ? (
        <div
          className="absolute flex flex-col gap-[3px]"
          style={{ top: 18, left: left + 6, width: docW - 12 }}
        >
          {[100, 100, 100, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height: 2,
                width: `${w}%`,
                background: "var(--ink-soft)",
                opacity: 0.55,
              }}
            />
          ))}
        </div>
      ) : (
        <span
          className="absolute font-mono select-none"
          style={{
            top: docH - 18,
            left: left + 6,
            fontSize: 10,
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "0.5px",
          }}
        >
          MD
        </span>
      )}
    </>
  );
}

function MailShape({ colors }: { colors: ShapeColors }) {
  const w = 56;
  const h = 38;
  const left = (ICON_BOX.width - w) / 2;
  const top = (ICON_BOX.height - h) / 2;

  return (
    <>
      <div
        className="absolute border-[1.5px] border-[var(--ink)]"
        style={{
          top,
          left,
          width: w,
          height: h,
          background: colors.light,
          borderRadius: 2,
          boxShadow: "2px 2px 0 rgba(30,38,51,0.15)",
        }}
      />
      {/* Envelope flap (V shape) drawn with two diagonal lines via SVG */}
      <svg
        className="absolute"
        style={{ top, left, width: w, height: h, pointerEvents: "none" }}
        viewBox={`0 0 ${w} ${h}`}
      >
        <path
          d={`M 1 1 L ${w / 2} ${h * 0.55} L ${w - 1} 1`}
          fill={colors.dark}
          stroke="var(--ink)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
