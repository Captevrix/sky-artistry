
# The Rockhill Group — Modern Rebuild

A ground-up redesign of therockhillgroup.com as an ultra-modern, professional defense/aerospace services site, with a signature animated aircraft hero featuring the three aircraft from the current site (RQ-4 Global Hawk, AC-130J, MQ-9 Reaper).

## Design direction

- **Tone**: Defense-grade, precise, confident. Not "wellness soft," not generic SaaS purple. Think Anduril / Lockheed Skunk Works / Shield AI — dark cinematic surfaces, technical typography, restrained accent color, HUD-style micro-details.
- **Palette**: Deep charcoal/near-black background, slate/steel neutrals, a single high-signal accent (electric cyan or signal amber — I'll propose in visual-choice). Preserves a subtle patriotic undertone without kitsch.
- **Typography**: Technical sans for display (e.g. Space Grotesk / Sora) paired with a clean neutral body (Inter/DM Sans). Uppercase tracked labels for section eyebrows, mono for stats/callsigns.
- **Motion**: Purposeful, weighty. Aircraft glide with parallax; scroll reveals; metric counters; subtle grain/scanline.

## Hero — animated 3D aircraft scene

The centerpiece. Built with **react-three-fiber + drei** (Three.js) — SSR-safe via `<ClientOnly>` + `React.lazy` dynamic import per TanStack guidance.

- Dark stratosphere backdrop (subtle gradient sky + drifting cloud layer + starfield fade).
- Three silhouetted aircraft models flying on staggered flight paths across the viewport:
  - **RQ-4 Global Hawk** (high-altitude ISR)
  - **AC-130J Ghostrider** (gunship)
  - **MQ-9 Reaper** (UAV)
- Since faithful DoD-aircraft GLB models aren't in the project, we use stylized low-poly silhouettes generated procedurally in Three.js (fuselage + wings + tail primitives), color-graded to read as authentic silhouettes against the sky. Each aircraft has a callsign label (HUD ticker) that fades in on approach.
- Slow camera drift + subtle mouse parallax. Aircraft loop across the scene on Bezier flight paths at different depths.
- Foreground: headline "Your Success Is Our #1 Mission", subhead, two CTAs ("Explore Capabilities", "Contact TRG").
- Graceful fallback: if WebGL/`navigator.gpu`-style capability check fails, render a static cinematic composition of the three aircraft PNGs with CSS parallax.
- Performance: `<Suspense>`, capped DPR, `frameloop="demand"` where feasible, respects `prefers-reduced-motion` (freezes animation, shows static frame).

## Site structure (TanStack routes)

Each is a separate route file with its own `head()` (unique title/description/OG).

```text
/                  Home — hero + capability triad + stats + trust + CTA
/aircrew-training  Aircrew Training capability page
/air-transportation Air Transportation Support Services
/professional-services Professional, Scientific & Technical Services
/about             Company overview, mission, leadership placeholder
/careers           Careers + SkillBridge/Hire Vets messaging
/contact           Contact form + HQ address + map placeholder
```

## Home page sections

1. **Hero** — 3D aircraft scene (above).
2. **Mission strip** — animated marquee of core values: Safe · Reliable · Efficient.
3. **Capabilities triad** — three large cards (Aircrew Training, Air Transportation, Professional/Scientific/Technical). Hover reveals accent underline + subtle 3D tilt. Each links to its route.
4. **Metrics band** — animated count-up: Employees, Locations, Flight Hours, Events Supported (numbers left as `—` placeholders since the source shows `1+` / `0+`; user can fill in).
5. **Proudly Supports** — clean logo strip: SDVOSB, AS9100, Hire Vets Gold, SkillBridge, NDIA, NCMS. Monochrome by default, color on hover.
6. **Closing CTA** — "Partner with TRG" with contact links.
7. **Footer** — nav, address (1 Rockhill Drive, Molino, FL 32577), LinkedIn/Facebook, copyright.

## Technical details

- **Stack**: TanStack Start (existing), Tailwind v4 tokens in `src/styles.css`, shadcn primitives where useful.
- **3D**: `three`, `@react-three/fiber`, `@react-three/drei`. Loaded via `React.lazy` inside `<ClientOnly>` so SSR/prerender doesn't touch WebGL.
- **Assets**: Reuse the three existing aircraft PNGs (via `<img>` from source URLs) as static fallback and as reference for silhouette shape. Trust-badge logos loaded from source URLs.
- **SEO**: Per-route `head()` with unique title/description/OG; JSON-LD `Organization` on `/`; semantic H1 per page; alt text on all imagery.
- **Accessibility**: Reduced-motion respected, focus-visible rings on accent color, aria-labels on canvas fallback content.
- **Performance**: Route-level code split (default in TanStack), Three.js only shipped on `/`.

## Build order

1. Install `three @react-three/fiber @react-three/drei`.
2. Design tokens in `src/styles.css` (dark theme baseline + accent).
3. `src/routes/__root.tsx` — nav + footer chrome, updated head defaults, font `<link>` for Space Grotesk + Inter.
4. `src/components/hero/AircraftScene.tsx` (client-only, R3F) + `HeroFallback.tsx`.
5. Rebuild `src/routes/index.tsx` with hero + all home sections.
6. Create capability, about, careers, contact routes with placeholder-but-polished copy sourced from the legacy site.
7. Verify build, Playwright screenshot the hero, confirm reduced-motion path.

## Open questions I'd like your input on before building

- **Accent color**: electric cyan (tech/ISR feel) vs signal amber (warm, mission-brief feel) vs desaturated red (patriotic without kitsch)?
- **Copy**: Keep legacy copy verbatim for the three capability pages, or write refreshed, tightened versions?
- **Metrics**: The legacy site shows `1+ / 1+ / 0+ / 150+` which look like unfilled placeholders — leave blank with a "coming soon" style, or invent reasonable numbers you'll edit later?

I'll ask these as a follow-up once you approve the plan direction.
