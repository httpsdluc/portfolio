import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Luna — a pixel cat desktop pet.
 * Lives near the bottom of the desktop, walks along the taskbar,
 * sleeps on it occasionally. Click her to pet.
 *
 * Sprite sheet (Elthen's 2D Cat Sprites): 256x320, 8 cols x 10 rows of 32x32 frames.
 * Row mapping:
 *   Row 0: idle (4 frames)
 *   Row 3: lick / groom (4 frames)
 *   Row 4: walk (8 frames)
 *   Row 6: sleep lying down (4 frames)
 *   Row 7: surprised / pet reaction (6 frames)
 */

type Anim = "idle" | "sleep" | "walk" | "lick" | "pet";

const ANIMATIONS: Record<Anim, { row: number; frames: number; fps: number }> = {
  idle:  { row: 0, frames: 4, fps: 4 },
  lick:  { row: 3, frames: 4, fps: 5 },
  walk:  { row: 4, frames: 8, fps: 10 },
  sleep: { row: 6, frames: 4, fps: 3 },
  pet:   { row: 7, frames: 6, fps: 8 },
};

const SPRITE = 32;
const DISPLAY_SIZE = 80;         // smaller again
const SCALE = DISPLAY_SIZE / SPRITE;
const SHEET_W = 256 * SCALE;
const SHEET_H = 320 * SCALE;

// Taskbar is 40px tall — Luna sits with feet on top of it
const TASKBAR_TOP = 40;
// Small jitter above taskbar when hopping up briefly
const SMALL_HOP = 6;

export function Luna() {
  const [anim, setAnim] = useState<Anim>("sleep");
  const [x, setX] = useState(320);
  const [y, setY] = useState(TASKBAR_TOP); // always bottom-region
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [hearts, setHearts] = useState<number[]>([]);
  const heartId = useRef(0);
  const isPetted = useRef(false);

  useEffect(() => {
    if (isPetted.current) return;
    let timer: ReturnType<typeof setTimeout>;

    const pickNextAction = () => {
      const roll = Math.random();
      const viewportW = typeof window !== "undefined" ? window.innerWidth : 1200;

      if (roll < 0.5) {
        // walk somewhere along the taskbar area
        const targetX = 100 + Math.random() * (viewportW - 240);
        // mostly stay on taskbar, occasionally a tiny hop up
        const targetY = Math.random() < 0.8 ? TASKBAR_TOP : TASKBAR_TOP + SMALL_HOP;
        setFacing(targetX > x ? "right" : "left");
        setX(targetX);
        setY(targetY);
        setAnim("walk");
      } else if (roll < 0.75) {
        setAnim("lick");
      } else {
        setAnim("idle");
      }
    };

    if (anim === "sleep") {
      timer = setTimeout(pickNextAction, 15000 + Math.random() * 15000);
    } else if (anim === "walk") {
      timer = setTimeout(() => setAnim("idle"), 4000);
    } else if (anim === "idle") {
      timer = setTimeout(() => {
        if (Math.random() < 0.5) setAnim("sleep");
        else pickNextAction();
      }, 3000 + Math.random() * 2000);
    } else if (anim === "lick") {
      timer = setTimeout(() => setAnim("idle"), 3000);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anim]);

  const handlePet = () => {
    isPetted.current = true;
    setAnim("pet");
    const ids = [heartId.current++, heartId.current++, heartId.current++];
    setHearts((h) => [...h, ...ids]);
    setTimeout(() => setHearts((h) => h.filter((id) => !ids.includes(id))), 1500);
    setTimeout(() => {
      setAnim("idle");
      isPetted.current = false;
    }, 2000);
  };

  const { row, frames, fps } = ANIMATIONS[anim];

  return (
    <motion.div
      className="absolute z-[50]"
      style={{
        left: x,
        bottom: y,
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        pointerEvents: "auto",
      }}
      animate={{ left: x, bottom: y }}
      transition={{
        left: { duration: anim === "walk" ? 4 : 0, ease: "linear" },
        bottom: { duration: anim === "walk" ? 0.5 : 0, ease: "easeInOut" },
      }}
    >
      {/* Hearts on pet */}
      <AnimatePresence>
        {hearts.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 0, x: (i - 1) * 8, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -36, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
            className="absolute select-none"
            style={{
              left: 16,
              top: -8,
              fontSize: 14,
              color: "#d48aa8",
              pointerEvents: "none",
            }}
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Zzz while sleeping */}
      <AnimatePresence>
        {anim === "sleep" && (
          <motion.div
            key="zzz"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -18, x: 2 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            className="absolute select-none"
            style={{
              left: 34,
              top: 2,
              fontSize: 10,
              color: "var(--ink-soft)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              letterSpacing: 1,
              pointerEvents: "none",
            }}
          >
            zzz
          </motion.div>
        )}
      </AnimatePresence>

      {/* The cat sprite */}
      <motion.button
        onClick={handlePet}
        className="p-0 bg-transparent border-none block"
        style={{
          width: DISPLAY_SIZE,
          height: DISPLAY_SIZE,
          transform: `scaleX(${facing === "left" ? -1 : 1})`,
          cursor: "pointer",
        }}
        whileTap={{ scale: 0.92 }}
        title="pet me ♡"
      >
        <div
          key={anim}
          style={{
            width: DISPLAY_SIZE,
            height: DISPLAY_SIZE,
            backgroundImage: "url('/cat-spritesheet.png')",
            backgroundSize: `${SHEET_W}px ${SHEET_H}px`,
            backgroundPosition: `0px ${-row * SPRITE * SCALE}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            animation: `luna-play-${anim} ${frames / fps}s steps(${frames}) infinite`,
          }}
        />
      </motion.button>

      <style>{`
        @keyframes luna-play-idle {
          0%   { background-position: 0 ${-ANIMATIONS.idle.row * SPRITE * SCALE}px; }
          100% { background-position: -${ANIMATIONS.idle.frames * SPRITE * SCALE}px ${-ANIMATIONS.idle.row * SPRITE * SCALE}px; }
        }
        @keyframes luna-play-sleep {
          0%   { background-position: 0 ${-ANIMATIONS.sleep.row * SPRITE * SCALE}px; }
          100% { background-position: -${ANIMATIONS.sleep.frames * SPRITE * SCALE}px ${-ANIMATIONS.sleep.row * SPRITE * SCALE}px; }
        }
        @keyframes luna-play-walk {
          0%   { background-position: 0 ${-ANIMATIONS.walk.row * SPRITE * SCALE}px; }
          100% { background-position: -${ANIMATIONS.walk.frames * SPRITE * SCALE}px ${-ANIMATIONS.walk.row * SPRITE * SCALE}px; }
        }
        @keyframes luna-play-lick {
          0%   { background-position: 0 ${-ANIMATIONS.lick.row * SPRITE * SCALE}px; }
          100% { background-position: -${ANIMATIONS.lick.frames * SPRITE * SCALE}px ${-ANIMATIONS.lick.row * SPRITE * SCALE}px; }
        }
        @keyframes luna-play-pet {
          0%   { background-position: 0 ${-ANIMATIONS.pet.row * SPRITE * SCALE}px; }
          100% { background-position: -${ANIMATIONS.pet.frames * SPRITE * SCALE}px ${-ANIMATIONS.pet.row * SPRITE * SCALE}px; }
        }
      `}</style>
    </motion.div>
  );
}