import { Mail, Github, Linkedin, Send, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";

export function ContactContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const socialLinks = [
    { Icon: Mail, label: "Email", url: "mailto:dlucero0715@gmail.com" },
    { Icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/dlucero0715" },
    { Icon: Github, label: "GitHub", url: "https://github.com/httpsdluc" },
    { Icon: FileText, label: "Resume", url: "/resume.pdf" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:dlucero0715@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="text-center mb-4">
        <h2
          className="text-xl mb-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          Let&apos;s Connect
        </h2>
        <p className="text-[var(--ink-soft)] text-xs">
          reach out for opportunities, sponsorships, or just to say hi
        </p>
      </div>

      <div
        className="p-3"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        <h3 className="font-mono text-[11px] tracking-wide mb-3">Find me on</h3>
        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-white hover:bg-[var(--blue-pale)] transition-colors"
              style={{ border: "1.5px solid var(--ink)" }}
            >
              <link.Icon size={14} />
              <span className="text-[10px]">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div
        className="p-3"
        style={{
          background: "var(--blue-wash)",
          border: "1.5px solid var(--blue-soft)",
        }}
      >
        <h3 className="font-mono text-[11px] tracking-wide mb-3">Send a message</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-[10px] font-mono">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="bg-white font-mono text-xs h-8 mt-1"
              style={{ borderColor: "var(--ink)" }}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-[10px] font-mono">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="bg-white font-mono text-xs h-8 mt-1"
              style={{ borderColor: "var(--ink)" }}
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-[10px] font-mono">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              rows={3}
              className="bg-white font-mono text-xs mt-1"
              style={{ borderColor: "var(--ink)" }}
            />
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full gap-2 font-mono text-xs h-8"
            style={{ background: "var(--accent)", color: "white" }}
          >
            <Send size={12} strokeWidth={1.8} />
            Send
          </Button>
          <p className="text-[9px] text-[var(--ink-soft)] text-center">
            opens your email client &mdash; no spam, i promise
          </p>
        </div>
      </div>
    </div>
  );
}