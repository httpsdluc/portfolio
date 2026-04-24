import { motion } from "motion/react";

/**
 * StickyNote — a small paper note tacked onto the desktop.
 * Edit the `items` array to update what you're currently up to.
 */
export function StickyNote() {
  const items = [
    "building Solace",
    "debugging rocket radio",
    "studying EOPL",
    "reading every K-pop era",
  ];

  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        bottom: 80,
        right: 40,
        width: 200,
        transform: "rotate(-3deg)",
        background: "#fef9e7",
        border: "1px solid #e8dfb8",
        padding: "14px 16px 16px",
        boxShadow:
          "0 1px 1px rgba(30,38,51,0.04), 2px 4px 8px rgba(30,38,51,0.12), 4px 8px 16px rgba(30,38,51,0.06)",
        fontFamily: "'Caveat', 'Kalam', 'Bradley Hand', cursive",
      }}
      initial={{ opacity: 0, y: 10, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      {/* Tape across the top */}
      <div
        className="absolute"
        style={{
          top: -8,
          left: "50%",
          transform: "translateX(-50%) rotate(2deg)",
          width: 60,
          height: 16,
          background: "rgba(180, 200, 220, 0.35)",
          borderLeft: "1px solid rgba(150, 170, 190, 0.2)",
          borderRight: "1px solid rgba(150, 170, 190, 0.2)",
        }}
      />

      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#3a3a2e",
          marginBottom: 6,
          lineHeight: 1,
        }}
      >
        currently ✦
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 15,
              color: "#4a4a3e",
              lineHeight: 1.35,
              marginBottom: 2,
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <span style={{ color: "#8a7a5a" }}>→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}