
# Fix hero: real aircraft images + correct flight direction

Two focused changes to the existing 3D hero.

## 1. Use the legacy aircraft PNGs as the actual 3D aircraft

Download the three transparent PNGs from the legacy site to `src/assets/` and upload them as CDN assets (`.asset.json` pointers) so they're served fast and stable:

- `RQ-4.png` → RQ-4 Global Hawk
- `AC-130J-Transparent.png` → AC-130J Ghostrider
- `MQ-9-Left.png` → MQ-9 Reaper

Replace the procedural low-poly meshes in `src/components/hero/AircraftScene.tsx` with textured, billboarded plane meshes that display the real aircraft silhouettes:

- One `THREE.PlaneGeometry` per aircraft, sized to the image's aspect ratio.
- `MeshBasicMaterial` with the PNG as `map`, `transparent: true`, `alphaTest: 0.05`, `depthWrite: false` so transparent edges composite cleanly against the sky/clouds.
- Textures loaded via `useLoader(TextureLoader, ...)` with `colorSpace = SRGBColorSpace` and `anisotropy` bumped for crisp edges.
- Scale each plane so the AC-130 reads largest, RQ-4 mid, MQ-9 smallest (matching their real-world silhouette hierarchy on screen).
- Also swap the trust-bar and platforms-section `<img>` sources on the home page to the new CDN pointers so nothing points at the legacy CDN at runtime.

## 2. Fix the flight direction (planes currently fly tail-first)

Root cause: the current code moves aircraft from `x = -14 → +14` (left → right), but also applies `rotation.y = Math.PI` which flips the model to face -X. Net result: moving right while facing left = flying backwards.

Fix in `FlightPath`:

- The two PNGs facing right by default (`RQ-4.png`, `AC-130J-Transparent.png`, based on the `-Left`/no-suffix naming on the source) fly **left → right** with no Y rotation.
- `MQ-9-Left.png` faces left by default, so it flies **right → left** (path reversed, no flip needed) — or we mirror it via `scale.x = -1` and keep left→right. I'll reverse its path so all three read as a coordinated flight but in the correct nose-forward direction.
- Small tilt/roll (`rotation.z`) preserved for life; pitch (`rotation.x`) subtle sinusoid stays.
- Remove the erroneous `rotation.y = Math.PI`.

Camera stays put. Cloud/starfield layers unchanged.

## Files touched

- `src/assets/rq4.png.asset.json` (new)
- `src/assets/ac130j.png.asset.json` (new)
- `src/assets/mq9.png.asset.json` (new)
- `src/components/hero/AircraftScene.tsx` (rewrite Aircraft + FlightPath to use textured planes; fix direction)
- `src/routes/index.tsx` (point `AIRCRAFT_IMAGES` at the new CDN pointers)

## Verification

After the change, run Playwright to screenshot the hero at 1280×1800 and confirm:
1. Each aircraft's nose points in its direction of travel.
2. The three real aircraft silhouettes are visible against the night sky.
