import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Rockhill Group" },
      { name: "description", content: "Contact TRG for capability briefings, teaming opportunities, and contract inquiries. Headquartered in Molino, Florida." },
      { property: "og:title", content: "Contact The Rockhill Group" },
      { property: "og:description", content: "Reach TRG for briefings, teaming, and contract inquiries." },
    ],
  }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Request a briefing.">
        Reach our capture, program, and recruiting teams for capability briefings, teaming opportunities, and contract inquiries.
      </PageHeader>
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="eyebrow">Headquarters</div>
              <p className="mt-3 font-display text-xl">1 Rockhill Drive<br />Molino, Florida 32577</p>
            </div>
            <div>
              <div className="eyebrow">Follow</div>
              <div className="mt-3 flex gap-3">
                <a href="https://www.linkedin.com/company/therockhillgroup" target="_blank" rel="noreferrer" className="rounded-sm border border-border px-3 py-1.5 text-xs font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors">LinkedIn</a>
                <a href="https://www.facebook.com/p/The-Rockhill-Group-Inc-100086164371101/" target="_blank" rel="noreferrer" className="rounded-sm border border-border px-3 py-1.5 text-xs font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors">Facebook</a>
              </div>
            </div>
            <div>
              <div className="eyebrow">Classification</div>
              <p className="mt-3 text-sm text-muted-foreground">SDVOSB · AS9100 certified · CAGE code available on request.</p>
            </div>
          </div>
          <form
            className="lg:col-span-3 rounded-sm border border-border bg-surface/40 p-8 space-y-5"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" />
              <Field label="Organization" name="org" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" />
            </div>
            <Field label="Interest area" name="interest" />
            <div>
              <label className="eyebrow" htmlFor="msg">Message</label>
              <textarea id="msg" name="msg" rows={5} required className="mt-2 w-full rounded-sm border border-border bg-background/40 px-3 py-2.5 text-sm outline-none focus:border-signal" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3 text-xs font-mono uppercase tracking-widest text-signal-foreground signal-glow">
              {sent ? "Received — we'll be in touch" : "Send message →"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="eyebrow" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} required className="mt-2 w-full rounded-sm border border-border bg-background/40 px-3 py-2.5 text-sm outline-none focus:border-signal" />
    </div>
  );
}
