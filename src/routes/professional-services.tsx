import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/professional-services")({
  head: () => ({
    meta: [
      { title: "Professional, Scientific & Technical Services — TRG" },
      { name: "description", content: "Aviation weather, upper-air observations, and Advisory & Assistance Services (A&AS) supporting DoD, NOAA, and the FAA across 20+ locations." },
      { property: "og:title", content: "Professional, Scientific & Technical Services — TRG" },
      { property: "og:description", content: "Weather, observations and A&AS for DoD, NOAA and FAA across 20+ locations worldwide." },
    ],
  }),
  component: Page,
});

const items = [
  { t: "Aviation Weather", d: "Forecasting and observation services for military and civil aviation operations." },
  { t: "Upper-Air Observations", d: "Rawinsonde and specialized upper-air data collection for NOAA and DoD customers." },
  { t: "Advisory & Assistance Services", d: "A&AS for program offices — subject-matter expertise, analysis, and technical management." },
  { t: "Global Footprint", d: "Delivered across 20+ locations in the U.S. and overseas." },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Capability · 03" title="Professional, Scientific & Technical Services for DoD, NOAA and FAA.">
        TRG provides professional, scientific and technical services including aviation weather, upper-air observations, and Advisory & Assistance Services (A&AS), supporting over twenty locations across the U.S. and overseas.
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
            Engage our technical team →
          </Link>
        </div>
      </section>
    </>
  );
}
