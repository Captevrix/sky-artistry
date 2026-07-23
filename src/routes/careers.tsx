import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — The Rockhill Group" },
      { name: "description", content: "Join TRG — a 2025 HIRE Vets Gold Medallion employer and DoD SkillBridge partner supporting aviation, training and technical mission sets." },
      { property: "og:title", content: "Careers at The Rockhill Group" },
      { property: "og:description", content: "HIRE Vets Gold employer and SkillBridge partner. Careers in aviation, training and technical services." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Serve the mission. Build the career.">
        TRG is a 2025 HIRE Vets Gold Medallion employer and a DoD SkillBridge partner. We're hiring across aircrew training, air transportation, and technical services.
      </PageHeader>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 space-y-8">
          <div className="rounded-sm border border-border bg-surface/40 p-8">
            <div className="eyebrow">SkillBridge</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Transitioning service members</h3>
            <p className="mt-4 text-muted-foreground">Through DoD SkillBridge, TRG connects returning service members with career-focused job training in aviation and defense support roles.</p>
          </div>
          <div className="rounded-sm border border-border bg-surface/40 p-8">
            <div className="eyebrow">Open Positions</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Talk to our recruiting team</h3>
            <p className="mt-4 text-muted-foreground">Send your resume and areas of interest — a member of our team will follow up.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3 text-xs font-mono uppercase tracking-widest text-signal-foreground signal-glow">
              Contact recruiting →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
