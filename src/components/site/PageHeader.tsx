import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative pt-32 pb-16 border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-signal/[0.04] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">{children}</div>}
      </div>
    </section>
  );
}
