import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/aircrew-training")({
  head: () => ({
    meta: [
      { title: "Aircrew Training — The Rockhill Group" },
      { name: "description", content: "TRG delivers Live, Virtual and Constructive (LVC) training, courseware, simulators and flight training with exceptional DoD past performance." },
      { property: "og:title", content: "Aircrew Training — TRG" },
      { property: "og:description", content: "End-to-end aircrew training lifecycle: LVC, courseware, academics, simulators and flight training." },
    ],
  }),
  component: Page,
});

const items = [
  { t: "Live, Virtual & Constructive", d: "Integrated LVC environments that combine live flights, high-fidelity simulators, and constructive entities for realistic mission rehearsal." },
  { t: "Courseware Development", d: "Instructional systems design, syllabi, and multimedia courseware built to DoD training standards." },
  { t: "Classroom Academics", d: "Certified instructors delivering ground school and advanced tactics academics on-site and remotely." },
  { t: "Training Devices & Simulators", d: "Operation, maintenance, and instruction across full mission trainers and part-task devices." },
  { t: "Flight Training", d: "Actual airborne instruction, contractor-owned/contractor-operated where required." },
  { t: "Performance", d: '"Exceptional" government past performance across every rated evaluation area.' },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Capability · 01" title="Aircrew Training across the full lifecycle.">
        TRG provides services throughout the entire aircrew training life cycle — from LVC training and courseware development to classroom academics, training devices, simulators, and actual flight training.
      </PageHeader>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <div key={i.t} className="rounded-sm border border-border bg-surface/40 p-8 hover:border-signal/60 transition-colors">
              <div className="font-mono text-[10px] tracking-widest text-signal">0{idx + 1}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-16">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3.5 text-sm font-mono uppercase tracking-widest text-signal-foreground signal-glow">
            Discuss training requirements →
          </Link>
        </div>
      </section>
    </>
  );
}
