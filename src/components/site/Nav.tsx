import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TrgLogo } from "./TrgLogo";

const links = [
  { to: "/aircrew-training", label: "Aircrew Training" },
  { to: "/air-transportation", label: "Air Transportation" },
  { to: "/professional-services", label: "Professional Services" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-lg bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center group" aria-label="The Rockhill Group — Home">
          <TrgLogo height={34} variant="dark" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-signal after:transition-all hover:after:w-full"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center gap-2 rounded-sm border border-signal/40 bg-signal/10 px-4 py-2 text-xs font-mono uppercase tracking-widest text-signal hover:bg-signal hover:text-signal-foreground transition-colors"
        >
          Request Brief
        </Link>
        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1">
            <span className="block h-px w-4 bg-foreground" />
            <span className="block h-px w-4 bg-foreground" />
            <span className="block h-px w-4 bg-foreground" />
          </span>
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
