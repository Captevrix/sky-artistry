import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "../components/hero/Hero";
import rq4Asset from "../assets/rq4.png.asset.json";
import ac130jAsset from "../assets/ac130j.png.asset.json";
import mq9Asset from "../assets/mq9.png.asset.json";

const AIRCRAFT_IMAGES = {
  rq4: rq4Asset.url,
  ac130: ac130jAsset.url,
  mq9: mq9Asset.url,
} as const;

const TRUST_LOGOS = [
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2023/03/SDVOSB-logo-color-300x300-1.png?lossy=1&strip=1&webp=1", alt: "SDVOSB — Service-Disabled Veteran-Owned Small Business" },
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2023/03/NQA-AS9100-Logo-ANAB.jpg?lossy=1&strip=1&webp=1", alt: "AS9100 Aerospace QMS Certification" },
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2025/12/HVMPD-gold.png?lossy=1&strip=1&webp=1", alt: "2025 Hire Vets Gold Medallion Award" },
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2023/03/1-skillbridge-logo.png?lossy=1&strip=1&webp=1", alt: "DoD SkillBridge Partner" },
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2023/03/NDIA-Logo-300x99-1.png?lossy=1&strip=1&webp=1", alt: "National Defense Industrial Association" },
  { src: "https://b687404.smushcdn.com/687404/wp-content/uploads/2023/03/ncms_logo.png?lossy=1&strip=1&webp=1", alt: "NCMS — Society of Industrial Security Professionals" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Rockhill Group — Aircrew Training, Air Transportation & Technical Services" },
      { name: "description", content: "TRG delivers aircrew training, air transportation, and professional, scientific & technical services to DoD, NOAA and the FAA with exceptional past performance." },
      { property: "og:title", content: "The Rockhill Group — Mission-Ready Defense Services" },
      { property: "og:description", content: "Safe. Reliable. Efficient. Aircrew training, air transportation and technical services trusted by the U.S. Department of Defense." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <MissionMarquee />
      <Capabilities />
      <Aircraft />
      <Metrics />
      <TrustBar />
      <ClosingCTA />
    </>
  );
}

function MissionMarquee() {
  const words = ["Safe", "Reliable", "Efficient", "Exceptional", "Trusted"];
  return (
    <section className="border-y border-border bg-surface/40 py-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-8 flex items-center gap-8 font-display text-2xl sm:text-3xl font-medium text-muted-foreground">
            {w}
            <span className="text-signal">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const CAPABILITIES = [
  {
    to: "/aircrew-training" as const,
    tag: "01 / Training",
    title: "Aircrew Training",
    body: "Services throughout the entire aircrew training life cycle — Live, Virtual, and Constructive (LVC) training, courseware, academics, simulators, and actual flight training.",
  },
  {
    to: "/air-transportation" as const,
    tag: "02 / Operations",
    title: "Air Transportation Support",
    body: "Airfield management, air transportation, aircraft maintenance, and fuel and supply services at the busiest military bases in the world.",
  },
  {
    to: "/professional-services" as const,
    tag: "03 / Technical",
    title: "Professional, Scientific & Technical",
    body: "Aviation weather, upper-air observations, and Advisory & Assistance Services (A&AS) supporting 20+ locations across the U.S. and overseas.",
  },
];

function Capabilities() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow">Capabilities</div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold max-w-2xl">
              Three lines of effort. One mission.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            From classroom to cockpit to flightline, TRG delivers exceptional past performance across every contract we execute.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative flex flex-col rounded-sm border border-border bg-surface/40 p-8 hover:border-signal/60 hover:bg-surface transition-all"
            >
              <div className="absolute top-0 left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
              <div className="font-mono text-[10px] tracking-widest text-signal">{c.tag}</div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{c.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{c.body}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground">
                Discover more
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Aircraft() {
  const fleet = [
    { img: AIRCRAFT_IMAGES.rq4, name: "RQ-4 Global Hawk", role: "High-altitude ISR" },
    { img: AIRCRAFT_IMAGES.ac130, name: "AC-130J Ghostrider", role: "Close air support" },
    { img: AIRCRAFT_IMAGES.mq9, name: "MQ-9 Reaper", role: "Remotely piloted aircraft" },
  ];
  return (
    <section className="border-y border-border bg-surface/30 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="eyebrow">Platforms Supported</div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold max-w-2xl">
          Advanced platforms. <span className="text-signal">Trained aircrews.</span>
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {fleet.map((a) => (
            <div key={a.name} className="group">
              <div className="relative aspect-video overflow-hidden rounded-sm border border-border bg-gradient-to-br from-[#0e1a2f] to-[#0b1424] p-6">
                <div className="absolute inset-0 grid-lines opacity-30" />
                <img
                  src={a.img}
                  alt={a.name}
                  className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-signal animate-hud-blink">● LIVE</div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="font-display text-lg font-semibold">{a.name}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">{a.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const m = [
    { k: "Locations", v: "20+", sub: "U.S. & overseas" },
    { k: "Programs", v: "Multiple", sub: "DoD contracts" },
    { k: "Events Supported", v: "150+", sub: "Annually" },
    { k: "Rating", v: "Exceptional", sub: "Past performance" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {m.map((x) => (
            <div key={x.k} className="border-l border-signal/40 pl-6">
              <div className="eyebrow">{x.k}</div>
              <div className="mt-3 font-display text-5xl font-semibold tabular-nums">{x.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{x.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-t border-border py-20 bg-surface/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="eyebrow">Proudly Supports</div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-muted-foreground">
            Certified. Verified. Accredited.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {TRUST_LOGOS.map((l) => (
            <div key={l.src} className="flex items-center justify-center h-20 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
              <img src={l.src} alt={l.alt} className="max-h-16 max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal/[0.06] to-transparent pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-25 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="eyebrow">Partner with TRG</div>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold leading-[1]">
          Ready to move the <span className="text-signal">mission</span> forward?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Reach our capture and program teams for capability briefings, teaming opportunities, and contract inquiries.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3.5 text-sm font-mono uppercase tracking-widest text-signal-foreground hover:brightness-110 signal-glow"
          >
            Request a Briefing →
          </Link>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm font-mono uppercase tracking-widest hover:border-signal hover:text-signal transition-colors"
          >
            Join the Team
          </Link>
        </div>
      </div>
    </section>
  );
}
