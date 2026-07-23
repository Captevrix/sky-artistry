import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Rockhill Group" },
      { name: "description", content: "The Rockhill Group is a Service-Disabled Veteran-Owned Small Business delivering aviation and technical services to the U.S. Department of Defense." },
      { property: "og:title", content: "About The Rockhill Group" },
      { property: "og:description", content: "SDVOSB delivering aviation and technical services with exceptional DoD past performance." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="About" title="A Service-Disabled Veteran-Owned Small Business.">
        Headquartered in Molino, Florida, TRG is trusted by the U.S. Department of Defense, NOAA, and the FAA to deliver safe, reliable, and efficient aviation and technical services.
      </PageHeader>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Mission</div>
            <h2 className="mt-4 font-display text-3xl font-semibold">Your success is our #1 mission.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We exist to give our government customers a decisive operational advantage. Every contract, every flight hour, every observation is executed with the discipline that comes from a team built by veterans, for the mission.
            </p>
          </div>
          <div>
            <div className="eyebrow">Values</div>
            <ul className="mt-4 space-y-4 font-display text-2xl font-semibold">
              <li className="flex items-center gap-3"><span className="text-signal">◆</span> Safe</li>
              <li className="flex items-center gap-3"><span className="text-signal">◆</span> Reliable</li>
              <li className="flex items-center gap-3"><span className="text-signal">◆</span> Efficient</li>
              <li className="flex items-center gap-3"><span className="text-signal">◆</span> Exceptional</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
