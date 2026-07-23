## Goal
Replace the beige background plate behind the logo in the nav with a purpose-built dark-mode version of the TRG logo that reads cleanly on the dark header.

## Approach
1. Generate a dark-mode logo asset:
   - "TRG" rendered in white (with subtle outline) instead of black-outlined black
   - Keep the gold-to-yellow swoosh behind "TRG" intact (it already pops on dark)
   - "The Rockhill Group, Inc." wordmark in white/off-white
   - F-15 silhouette in a light grey/white tint so it stays visible
   - Transparent background, same proportions as the current logo
   - Upload via `lovable-assets` to `src/assets/trg-logo-dark.webp.asset.json`

2. Update `src/components/site/TrgLogo.tsx`:
   - Import both the original (light-bg) and new dark-bg asset pointers
   - `variant="dark"` (used on dark surfaces like the nav) → render the new dark-mode asset with NO background plate
   - `variant="light"` (used on light surfaces / footer if applicable) → keep the original logo as-is
   - Remove the beige/cream background wrapper entirely

3. Verify usage sites:
   - `src/components/site/Nav.tsx` — uses `variant="dark"`, now renders clean on the dark header
   - `src/components/site/Footer.tsx` — confirm which variant fits the footer's background and keep it consistent
   - Favicon stays as-is (already works standalone)

## Out of scope
- No changes to color tokens, typography, or other branding rules
- No changes to the 3D hero or any page content
- Original logo asset is kept (used wherever the background is light)

## Files touched
- `src/assets/trg-logo-dark.webp.asset.json` (new)
- `src/components/site/TrgLogo.tsx` (variant logic + remove background plate)
- `src/components/site/Nav.tsx` / `Footer.tsx` (only if variant prop needs adjusting)
