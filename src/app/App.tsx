import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Window } from "./components/Window";
import { DesktopIcon } from "./components/DesktopIcon";
import { Taskbar } from "./components/Taskbar";
import { StickyNote } from "./components/StickyNote";
import { Luna } from "./components/Luna";
import { AboutContent } from "./components/AboutContent";
import { ProjectsContent } from "./components/ProjectsContent";
import { SkillsContent } from "./components/SkillsContent";
import { ContactContent } from "./components/ContactContent";
import { TerminalContent } from "./components/TerminalContent";
import { ResumeContent } from "./components/ResumeContent";
import { ExperienceContent } from "./components/ExperienceContent";
import { LeadershipContent } from "./components/LeadershipContent";

type WindowType =
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "resumes"
  | "experience"
  | "leadership"
  | "terminal";

interface OpenWindow {
  id: WindowType;
  title: string;
  component: React.ReactNode;
  zIndex: number;
}

export default function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const windowConfigs = {
    about: { title: "about.txt", component: <AboutContent /> },
    projects: { title: "projects/", component: <ProjectsContent /> },
    skills: { title: "skills.md", component: <SkillsContent /> },
    contact: { title: "contact", component: <ContactContent /> },
    resumes: { title: "resumes/", component: <ResumeContent /> },
    experience: { title: "experience/", component: <ExperienceContent /> },
    leadership: { title: "leadership.md", component: <LeadershipContent /> },
    terminal: { title: "~diana — terminal", component: <TerminalContent /> },
  };

  const openWindow = (type: WindowType) => {
    if (openWindows.find((w) => w.id === type)) {
      setOpenWindows((windows) =>
        windows.map((w) =>
          w.id === type ? { ...w, zIndex: maxZIndex + 1 } : w
        )
      );
      setMaxZIndex((z) => z + 1);
      return;
    }
    const config = windowConfigs[type];
    const newWindow: OpenWindow = {
      id: type,
      title: config.title,
      component: config.component,
      zIndex: maxZIndex + 1,
    };
    setOpenWindows((windows) => [...windows, newWindow]);
    setMaxZIndex((z) => z + 1);
  };

  const closeWindow = (type: WindowType) => {
    setOpenWindows((windows) => windows.filter((w) => w.id !== type));
  };

  const bringToFront = (type: WindowType) => {
    setOpenWindows((windows) =>
      windows.map((w) =>
        w.id === type ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    );
    setMaxZIndex((z) => z + 1);
  };

  const closeAllWindows = () => {
    setOpenWindows([]);
  };

  const getWindowPosition = (index: number) => {
    const offset = index * 30;
    return { x: 200 + offset, y: 110 + offset };
  };

  return (
    <div className="size-full relative overflow-hidden desktop-bg">
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.12 0 0 0 0 0.18 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-7 left-1/2 -translate-x-1/2 text-center pointer-events-none z-[5]">
        <h1
          className="text-[34px] mb-0.5 text-[var(--ink)]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="italic text-[var(--accent)]">~</span>diana
        </h1>
        <p className="text-[11px] font-mono text-[var(--ink-soft)] tracking-wide">
          click a folder to explore
        </p>
        <p
          className="text-[13px] italic mt-1 text-[var(--ink-soft)]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          open to summer &apos;26 internships &amp; conference sponsorships
        </p>
      </div>

      <div className="absolute top-32 left-8 flex gap-4">
        <div className="flex flex-col gap-4">
          <DesktopIcon kind="text" tone="blue" label="about.txt" onClick={() => openWindow("about")} />
          <DesktopIcon kind="folder" tone="blue-deep" label="projects" onClick={() => openWindow("projects")} />
          <DesktopIcon kind="markdown" tone="gray" label="skills.md" onClick={() => openWindow("skills")} />
          <DesktopIcon kind="folder" tone="sage" label="resumes" onClick={() => openWindow("resumes")} />
          <DesktopIcon kind="mail" tone="blue" label="contact" onClick={() => openWindow("contact")} />
        </div>
        <div className="flex flex-col gap-4">
          <DesktopIcon kind="folder" tone="gray" label="experience" onClick={() => openWindow("experience")} />
          <DesktopIcon kind="markdown" tone="sage" label="leadership.md" onClick={() => openWindow("leadership")} />
        </div>
      </div>

      <StickyNote />
      <Luna />

      <AnimatePresence>
        {openWindows.map((window, index) => (
          <Window
            key={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            initialPosition={getWindowPosition(index)}
            zIndex={window.zIndex}
            onFocus={() => bringToFront(window.id)}
          >
            {window.component}
          </Window>
        ))}
      </AnimatePresence>

      <Taskbar
        onOpenFolder={(type) => openWindow(type)}
        onOpenTerminal={() => openWindow("terminal")}
        onCloseAllWindows={closeAllWindows}
        anyWindowOpen={openWindows.length > 0}
      />
    </div>
  );
}