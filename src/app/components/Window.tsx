import { X, Minus, Square } from "lucide-react";
import { motion, useMotionValue, animate } from "motion/react";
import { useRef, useEffect } from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
  isMobile?: boolean;
}

export function Window({
  title,
  children,
  onClose,
  initialPosition = { x: 100, y: 100 },
  zIndex = 10,
  onFocus,
  isMobile = false,
}: WindowProps) {
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);
  const windowRef = useRef<HTMLDivElement>(null);

  const clampPosition = (rawX: number, rawY: number) => {
    const el = windowRef.current;
    const w = el?.offsetWidth ?? 400;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const TASKBAR = 40;
    const SIDE_VISIBLE = 100;
    const HEADER_VISIBLE = 40;

    const minX = -w + SIDE_VISIBLE;
    const maxX = vw - SIDE_VISIBLE;
    const minY = 0;
    const maxY = vh - TASKBAR - HEADER_VISIBLE;

    return {
      x: Math.min(maxX, Math.max(minX, rawX)),
      y: Math.min(maxY, Math.max(minY, rawY)),
    };
  };

  // On resize, clamp windows back in
  useEffect(() => {
    if (isMobile) return;
    const handler = () => {
      const clamped = clampPosition(x.get(), y.get());
      animate(x, clamped.x, { duration: 0.2 });
      animate(y, clamped.y, { duration: 0.2 });
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  if (isMobile) {
    return (
      <motion.div
        ref={windowRef}
        className="fixed bg-white overflow-hidden flex flex-col"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 40,
          zIndex,
          borderTop: "2px solid var(--ink)",
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={onFocus}
      >
        <div
          className="px-4 py-3 flex items-center justify-between select-none shrink-0"
          style={{
            background: "#e8ecf0",
            borderBottom: "2px solid var(--ink)",
          }}
        >
          <span className="font-mono text-[12px] tracking-wide text-[var(--ink)] font-medium">
            {title}
          </span>
          <button
            className="w-9 h-9 -mr-1.5 border-[1.5px] border-[var(--ink)] bg-white active:bg-[#f0c8c8] flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            <X size={16} className="text-[var(--ink)]" strokeWidth={2.2} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto bg-white grow">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-white overflow-hidden"
      style={{
        x,
        y,
        top: 0,
        left: 0,
        zIndex,
        width: "min(520px, 92vw)",
        maxHeight: "80vh",
        border: "2px solid var(--ink)",
        boxShadow: "6px 6px 0 rgba(30,38,51,0.12)",
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => onFocus?.()}
      onDragEnd={() => {
        const clamped = clampPosition(x.get(), y.get());
        animate(x, clamped.x, { type: "spring", stiffness: 300, damping: 30 });
        animate(y, clamped.y, { type: "spring", stiffness: 300, damping: 30 });
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onFocus}
    >
      <div
        className="px-3 py-2 flex items-center justify-between cursor-move select-none"
        style={{
          background: "#e8ecf0",
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <span className="font-mono text-[11px] tracking-wide text-[var(--ink)] font-medium">
          {title}
        </span>
        <div className="flex gap-1.5">
          <button
            className="w-4 h-4 border-[1.5px] border-[var(--ink)] bg-white hover:bg-[var(--blue-pale)] flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Minus size={8} className="text-[var(--ink)]" strokeWidth={2} />
          </button>
          <button
            className="w-4 h-4 border-[1.5px] border-[var(--ink)] bg-white hover:bg-[var(--blue-pale)] flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Square size={7} className="text-[var(--ink)]" strokeWidth={1.8} />
          </button>
          <button
            className="w-4 h-4 border-[1.5px] border-[var(--ink)] bg-white hover:bg-[#f0c8c8] flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={9} className="text-[var(--ink)]" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto bg-white" style={{ maxHeight: "calc(80vh - 38px)" }}>
        {children}
      </div>
    </motion.div>
  );
}