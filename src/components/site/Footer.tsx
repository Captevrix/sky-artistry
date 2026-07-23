import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-signal text-signal-foreground font-display font-bold">R</span>
            <span className="font-display text-sm font-semibold tracking-wide">THE ROCKHILL GROUP</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Providing safe, reliable, and efficient aircrew training, air transportation, and technical services for the U.S. Department of Defense and federal agencies.
          </p>
          <div className="pt-2 font-mono text-xs text-muted-foreground">
            1 Rockhill Drive · Molino, Florida 32577
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4">Capabilities</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/aircrew-training" className="text-muted-foreground hover:text-foreground">Aircrew Training</Link></li>
            <li><Link to="/air-transportation" className="text-muted-foreground hover:text-foreground">Air Transportation</Link></li>
            <li><Link to="/professional-services" className="text-muted-foreground hover:text-foreground">Professional Services</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            <li><a href="https://www.linkedin.com/company/therockhillgroup" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <span>© {new Date().getFullYear()} The Rockhill Group, Inc.</span>
          <span className="tracking-widest">SDVOSB · AS9100 · HIRE VETS GOLD 2025</span>
        </div>
      </div>
    </footer>
  );
}
