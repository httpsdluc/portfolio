import {
  Github,
  Mail,
  Linkedin,
  Instagram,
  Folder,
  User,
  Briefcase,
  Code2,
  MailOpen,
  FileText,
  TerminalSquare,
  XSquare,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

function TikTokIcon({ size = 14 }: { size?: number }) {
  // Outline style to match lucide stroke icons (stroke-width 2, round caps).
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

type MenuFolder = "about" | "projects" | "skills" | "contact" | "resumes" | "experience" | "leadership";

interface TaskbarProps {
  onOpenFolder?: (type: MenuFolder) => void;
  onOpenTerminal?: () => void;
  onCloseAllWindows?: () => void;
  anyWindowOpen?: boolean;
}

export function Taskbar({ onOpenFolder, onOpenTerminal, onCloseAllWindows, anyWindowOpen }: TaskbarProps) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
  const [startOpen, setStartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!startOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [startOpen]);

  const menuItems: Array<{
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    label: string;
    onClick: () => void;
  }> = [
    {
      icon: User,
      label: "about",
      onClick: () => {
        onOpenFolder?.("about");
        setStartOpen(false);
      },
    },
    {
      icon: Briefcase,
      label: "experience",
      onClick: () => {
        onOpenFolder?.("experience");
        setStartOpen(false);
      },
    },
    {
      icon: Award,
      label: "leadership",
      onClick: () => {
        onOpenFolder?.("leadership");
        setStartOpen(false);
      },
    },
    {
      icon: Folder,
      label: "projects",
      onClick: () => {
        onOpenFolder?.("projects");
        setStartOpen(false);
      },
    },
    {
      icon: Code2,
      label: "skills",
      onClick: () => {
        onOpenFolder?.("skills");
        setStartOpen(false);
      },
    },
    {
      icon: FileText,
      label: "resumes",
      onClick: () => {
        onOpenFolder?.("resumes");
        setStartOpen(false);
      },
    },
    {
      icon: MailOpen,
      label: "contact",
      onClick: () => {
        onOpenFolder?.("contact");
        setStartOpen(false);
      },
    },
  ];

  const socials = [
    { href: "https://github.com/httpsdluc", label: "GitHub", Icon: Github },
    { href: "https://www.linkedin.com/in/dlucero0715", label: "LinkedIn", Icon: Linkedin },
    { type: "divider" as const },
    { href: "mailto:dlucero0715@gmail.com", label: "Email", Icon: Mail },
    { type: "divider" as const },
    { href: "https://www.instagram.com/sweetlyintech/", label: "Instagram", Icon: Instagram },
    { href: "https://www.tiktok.com/@sweetlyintech", label: "TikTok", Icon: TikTokIcon },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 h-10 flex items-center px-3 gap-2"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(8px)",
        borderTop: "2px solid var(--ink)",
        zIndex: 100,
      }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Start button + menu */}
      <div className="relative" ref={menuRef}>
        <motion.button
          className="h-7 inline-flex items-center gap-1.5 px-2.5 leading-none transition-colors"
          style={{
            border: "1.5px solid var(--ink)",
            background: startOpen ? "var(--blue-pale)" : "white",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStartOpen((o) => !o)}
        >
          <Folder size={13} className="text-[var(--ink)]" strokeWidth={1.8} />
          <span className="text-[var(--ink)] font-mono text-[11px] font-medium">Menu</span>
        </motion.button>

        <AnimatePresence>
          {startOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="absolute bottom-full mb-2 left-0 bg-white"
              style={{
                border: "2px solid var(--ink)",
                boxShadow: "4px 4px 0 rgba(30,38,51,0.12)",
                minWidth: 200,
              }}
            >
              <div
                className="px-3 py-2 font-mono text-[10px] tracking-wider uppercase"
                style={{
                  background: "var(--blue-wash)",
                  borderBottom: "1.5px solid var(--ink)",
                  color: "var(--ink-soft)",
                }}
              >
                ~diana
              </div>

              <div className="py-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-[var(--blue-pale)] transition-colors text-left"
                  >
                    <item.icon size={13} strokeWidth={1.8} />
                    <span className="font-mono text-[11px]">{item.label}</span>
                  </button>
                ))}
              </div>

              <div
                className="mx-3 my-1 border-t"
                style={{ borderColor: "var(--blue-soft)" }}
              />

              <div className="py-1">
                <button
                  onClick={() => {
                    onCloseAllWindows?.();
                    setStartOpen(false);
                  }}
                  disabled={!anyWindowOpen}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-[var(--blue-pale)] transition-colors text-left disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                >
                  <XSquare size={13} strokeWidth={1.8} />
                  <span className="font-mono text-[11px]">close all windows</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal button */}
      <motion.button
        className="h-7 inline-flex items-center gap-1.5 px-2.5 leading-none bg-white hover:bg-[var(--blue-pale)] transition-colors"
        style={{ border: "1.5px solid var(--ink)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onOpenTerminal?.()}
        title="Open terminal"
      >
        <TerminalSquare size={13} className="text-[var(--ink)]" strokeWidth={1.8} />
        <span className="text-[var(--ink)] font-mono text-[11px] font-medium">Terminal</span>
      </motion.button>

      {/* Social Icons - right aligned */}
      <div className="ml-auto flex gap-1.5 items-center">
        {socials.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            return (
              <div
                key={`div-${i}`}
                className="w-px h-4 mx-1 opacity-25"
                style={{ background: "var(--ink)" }}
              />
            );
          }
          const { href, label, Icon } = item as {
            href: string;
            label: string;
            Icon: React.ComponentType<{ size?: number }>;
          };
          return (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="h-7 w-7 inline-flex items-center justify-center bg-white text-[var(--ink)] transition-all"
              style={{ border: "1.5px solid var(--ink)" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "2px 2px 0 rgba(30,38,51,0.2)",
                backgroundColor: "var(--blue-pale)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={14} />
            </motion.a>
          );
        })}
      </div>

      {/* Clock */}
      <div
        className="h-7 inline-flex items-center px-2.5 leading-none bg-white ml-2"
        style={{ border: "1.5px solid var(--ink)" }}
      >
        <span className="text-[var(--ink)] font-mono text-[11px]">{time}</span>
      </div>
    </motion.div>
  );
}