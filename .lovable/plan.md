## Goal

Adopt the uploaded TRG logo as the source of truth for branding across the site, replacing the current electric-cyan accent with TRG's black + gold identity.

## Brand extraction (from the logo)

- **Wordmark**: "TRG" in a classic black serif with a gold swoosh; "The Rockhill Group, Inc." set in a matching serif to the right. A small F-15 silhouette sits at the tail of the swoosh.
- **Primary palette**:
  - TRG Black — near-black used for the wordmark
  - TRG Gold — warm metallic gold used in the swoosh (with a light-to-deep gradient)
  - Paper / off-white background
- **Type feel**: Serif for the brand mark and marquee headings; keep a clean sans for UI/body so the site still reads modern.

## Changes

### 1. Logo asset
- Upload the provided `trg-logo-768x283.webp` via `lovable-assets` into `src/assets/trg-logo.webp.asset.json`.
- Add a small `TrgLogo` component that renders the logo image with proper alt text and sizing variants (nav height ~36px, footer ~48px, hero-ready larger size).

### 2. Design tokens (`src/styles.css`)
Replace the electric-cyan "signal" with TRG gold and warm the neutral base so the logo sits naturally on dark backgrounds:
- `--signal` → TRG gold `oklch(0.82 0.14 85)` (approx `#c9a84c`) with a `--signal-glow` lighter variant `oklch(0.90 0.11 88)`.
- Add `--brand-gold`, `--brand-gold-soft`, `--brand-ink` (near-black) tokens plus a `--gradient-gold` (light→deep gold) matching the swoosh.
- Keep the dark "mission-brief" base but shift hue slightly warmer so gold accents don't clash.
- Add a Playfair Display (or similar) `--font-serif` for the wordmark / hero display; keep Space Grotesk + Inter for UI/body.

### 3. Navigation (`src/components/site/Nav.tsx`)
- Replace the current text mark with the `TrgLogo` (uses white/paper background of nav bar; if nav is dark, use the same logo — it already reads on light; we'll add a subtle light plate behind it OR use a slightly translucent paper chip so the black wordmark stays legible on the dark nav).
- Active/hover link underline uses gold instead of cyan.

### 4. Footer (`src/components/site/Footer.tsx`)
- Show the logo at the top of the footer with the tagline "Delivering excellence since 2004" and update accent lines/dividers to gold.

### 5. Hero + accents (`src/routes/index.tsx`, `PageHeader.tsx`, buttons)
- Any element currently using `signal` / cyan (HUD lines, telemetry chips, primary CTAs, hover states, marquee separators, section eyebrow text) switches to gold via the same token — visual updates only, no layout changes.
- Primary CTA becomes gold gradient with black text; secondary CTA becomes outlined gold.
- Keep the animated aircraft scene as-is; only tint any overlay/vignette accents to gold.

### 6. Favicon / meta
- Generate a square logomark (just the "TRG + swoosh" portion) and wire it up as favicon + `og:image` fallback.

## Out of scope
- No copy/content changes, no new routes, no layout restructuring, no changes to the 3D scene geometry or aircraft assets.

## Technical notes
- Store the logo through `lovable-assets` (not `src/assets` as a binary).
- All color updates go through CSS tokens — no hardcoded hex/`text-white` in components.
- Add the serif font via a `<link>` in `__root.tsx` head (Tailwind v4 rule — no remote `@import` in `styles.css`).
