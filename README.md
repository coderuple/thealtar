# The Altar 2026 — Official Site

A cinematic one-page site for **The Altar 2026** (Jesus House, OVO Arena Wembley, 26 June 2026).
Next.js App Router · Tailwind CSS v4 · three.js / React Three Fiber · GSAP + ScrollTrigger + SplitText · Lenis.

## Run it

```bash
npm run dev      # development — http://localhost:3000
npm run build    # production build
```

## Where to edit things

| What | Where |
| --- | --- |
| **Colors** (whole site, incl. the WebGL flame) | `src/app/globals.css` — the `THEME` block at the top |
| **All content** — copy, lineup, timings, FAQs, links | `src/config/site.ts` |
| **Ticket links** (AXS) | `TICKETS_URL` / `ACCESSIBLE_TICKETS_URL` in `src/config/site.ts` |
| **Images** | drop files into `public/images/**` (see below) |
| **Fonts** | `src/app/layout.tsx` (next/font definitions) |

### Changing colors

Open `src/app/globals.css` and edit the variables in the `:root` block —
`--bg`, `--ember`, `--flame`, `--crimson`, `--cream`, etc. Every component
**and the three.js particle scene** read these same variables, so one edit
recolors everything, including the flame.

### Swapping in real images

Labeled placeholder images live in `public/images/` as real `.jpg`/`.png`
files. **Overwrite any of them with a real photo at the same path** (same
filename) and it appears on the site — no config changes needed:

- `images/speakers/*.jpg` — 3:4 portraits (≈900×1200) of each minister
- `images/hero/keyart.jpg` — the official poster (16:9) — used as the hero on
  mobile and for visitors with reduced motion
- `images/bg/cathedral-texture.jpg` — faint full-bleed background in The Vision
- `images/venue/ovo-arena-*.jpg` — venue/crowd photography
- `images/og/og-image.jpg` — 1200×630 social share card (use the key art)
- `images/logos/jesus-house.png` — host logo in the footer (transparent PNG)

Regenerate missing placeholders anytime: `node scripts/gen-placeholders.mjs`
(existing files are skipped, so your real photos are safe; add `--force` to
overwrite everything, including real photos).

## How it's put together

- `src/components/Experience.tsx` — orchestrates everything (preloader →
  intro, WebGL vs. poster fallback, section order)
- `src/components/canvas/EmberScene.tsx` — the GPU particle flame, glows,
  light shaft, bloom and camera rig (42k particles, custom GLSL)
- `src/components/sections/*` — Hero, Vision, Lineup, TheNight, Venue,
  Tickets, Faq, Footer
- Scroll is driven by Lenis; all reveals/scrubs are GSAP ScrollTrigger
- Reduced motion and small screens automatically get a static poster hero;
  semantic HTML sits behind the canvas throughout
# thealtar
