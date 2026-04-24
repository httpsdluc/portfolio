import { motion } from "motion/react";

type FolderColor = "blue" | "blue-deep" | "gray" | "sage";

interface DesktopIconProps {
  folderColor: FolderColor;
  label: string;
  onClick: () => void;
}

const folderColors: Record<FolderColor, { tab: string; body: string }> = {
  blue: { tab: "#b5c7d6", body: "#dde7ef" },
  "blue-deep": { tab: "#7ea0b8", body: "#b5c7d6" },
  gray: { tab: "#c6ced8", body: "#dde3ea" },
  sage: { tab: "#c9d3c5", body: "#e4ebe2" },
};

export function DesktopIcon({
  folderColor,
  label,
  onClick,
}: DesktopIconProps) {
  const colors = folderColors[folderColor];

  return (
    <motion.button
      className="flex flex-col items-center gap-1.5 p-2 rounded hover:bg-white/50 transition-colors w-20"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.div
        className="relative"
        style={{ width: 52, height: 42 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
      >
        {/* Folder tab */}
        <div
          className="absolute border-[1.5px] border-[var(--ink)]"
          style={{
            top: 0,
            left: 3,
            width: 22,
            height: 8,
            borderBottom: "none",
            borderRadius: "4px 4px 0 0",
            background: colors.tab,
          }}
        />
        {/* Folder body */}
        <div
          className="absolute border-[1.5px] border-[var(--ink)]"
          style={{
            top: 7,
            left: 0,
            width: 52,
            height: 35,
            borderRadius: "0 4px 4px 4px",
            background: colors.body,
            boxShadow: "2px 2px 0 rgba(30,38,51,0.15)",
          }}
        />
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