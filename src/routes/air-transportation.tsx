import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/air-transportation")({
  head: () => ({
    meta: [
      { title: "Air Transportation Support Services — The Rockhill Group" },
      { name: "description", content: "Airfield management, air transportation, aircraft maintenance, and fuel & supply services at the busiest military bases in the world." },
      { property: "og:title", content: "Air Transportation Support — TRG" },
      { property: "og:description", content: "Airfield ops, aircraft maintenance, fuel and supply — trusted at the busiest military bases in the world." },
    ],
  }),
  component: Page,
});

const items = [
  { t: "Airfield Management", d: "Operations, movement control, and dispatch across high-tempo military airfields." },
  { t: "Air Transportation", d: "Cargo and passenger movement in support of DoD lift requirements." },
  { t: "Aircraft Maintenance", d: "Organizational- and intermediate-level maintenance on rotary and fixed-wing platforms." },
  { t: "Fuel & Supply", d: "POL, distribution, and logistics support at CONUS and OCONUS locations." },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Capability · 02" title="Air Transportation Support at the world's busiest bases.">
        TRG provides air transportation services at numerous locations, including the busiest military bases in the world — airfield management, air transportation, aircraft maintenance, and fuel and supply services.
      </PageHeader>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2">
          {items.map((i, idx) => (
            <div key={i.t} className="rounded-sm border border-border bg-surface/40 p-8 hover:border-signal/60 transition-colors">
              <div className="font-mono text-[10px] tracking-widest text-signal">0{idx + 1}</div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{i.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-16">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3.5 text-sm font-mono uppercase tracking-widest text-signal-foreground signal-glow">
            Talk to operations →
          </Link>
        </div>
      </section>
    </>
  );
}
