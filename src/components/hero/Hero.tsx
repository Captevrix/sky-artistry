import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { ClientOnly } from "../ClientOnly";

const AircraftScene = lazy(() => import("./AircraftScene"));

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0b1424]">
      {/* 3D scene canvas */}
      <div className="absolute inset-0">
        <ClientOnly
          fallback={
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1424] via-[#0e1a2f] to-[#0b1424]" />
          }
        >
          <Suspense fallback={<div className="absolute inset-0" />}>
            <AircraftScene />
          </Suspense>
        </ClientOnly>
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      {/* HUD corner marks */}
      <div className="absolute inset-6 pointer-events-none">
        <HudCorner className="top-0 left-0" />
        <HudCorner className="top-0 right-0 rotate-90" />
        <HudCorner className="bottom-0 left-0 -rotate-90" />
        <HudCorner className="bottom-0 right-0 rotate-180" />
      </div>

      {/* Callsign ticker */}
      <div className="absolute top-24 right-6 hidden md:flex flex-col gap-2 font-mono text-[10px] tracking-widest text-signal/80">
        <TickerRow label="RQ-4" name="GLOBAL HAWK" />
        <TickerRow label="AC-130J" name="GHOSTRIDER" />
        <TickerRow label="MQ-9" name="REAPER" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal animate-hud-blink" />
            Mission Ready · Est. 2004
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95]">
            Your success is our
            <br />
            <span className="text-signal">#1 mission.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            The Rockhill Group delivers aircrew training, air transportation, and technical services with exceptional past performance across the U.S. Department of Defense, NOAA, and the FAA.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/aircrew-training"
              className="group inline-flex items-center gap-2 rounded-sm bg-signal px-6 py-3.5 text-sm font-mono uppercase tracking-widest text-signal-foreground hover:brightness-110 transition-all signal-glow"
            >
              Explore Capabilities
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/40 backdrop-blur px-6 py-3.5 text-sm font-mono uppercase tracking-widest text-foreground hover:border-signal hover:text-signal transition-colors"
            >
              Contact TRG
            </Link>
          </div>
        </div>

        {/* Bottom telemetry strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/60 pt-8 max-w-4xl">
          <Telemetry k="Locations" v="20+" sub="U.S. & OCONUS" />
          <Telemetry k="Past Performance" v="Exceptional" sub="DoD rated" />
          <Telemetry k="Certified" v="AS9100" sub="Aerospace QMS" />
          <Telemetry k="Status" v="SDVOSB" sub="VA verified" />
        </div>
      </div>
    </section>
  );
}

function HudCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute h-6 w-6 border-l border-t border-signal/60 ${className}`} />
  );
}

function TickerRow({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="text-foreground/60">{name}</span>
      <span className="rounded-sm border border-signal/40 bg-signal/10 px-1.5 py-0.5 text-signal">{label}</span>
    </div>
  );
}

function Telemetry({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div>
      <div className="eyebrow">{k}</div>
      <div className="mt-2 font-display text-2xl font-semibold">{v}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}
