# Dashboard SVG Source Assets

These are the approved dashboard SVG assets for the ELCEO Market Reasoning OS cockpit.

---

## Rules

- **Do not modify SVG contents casually.** These are design-approved visual assets.
- **Do not optimize, flatten, or simplify SVG paths.** Visual fidelity is the priority.
- **Do not replace approved assets with generic icons or Lucide equivalents.**
- **Do not redraw missing assets.** Mark them as `pending_manual_asset_drop` in the manifest.

---

## Status Legend

| Status | Meaning |
|--------|---------|
| `approved` | Fully approved for integration. Ready for composition in later batches. |
| `partial` | Assets are present but incomplete or subject to revisit. Do not treat as final. |
| `pending_manual_asset_drop` | Expected asset was not included. Must be provided manually before use. |

---

## Partial / Revisit Assets

- **svg-10** (background/) — Background atmosphere system. Status: partial. May receive additional layers.
- **svg-11** (shell/, connectors/, chart/, panels/) — Portrait/compact dashboard variant. Status: partial. Subject to revisit.

---

## Missing Assets

- **svg-12** — Master pack. Was not included in this asset upload. Marked pending in manifest.

---

## Composition

These assets should be composed in later batches (Batch 2+), not redesigned.
The dashboard visual system must use these assets as the source of truth.
Missing assets must be marked pending, not recreated or approximated.

---

## Directory Structure

```
shell/         — Frame, topbar, sidebar, nav, structural
chart/         — Chart console, overlays, projections, markers
panels/        — Panel borders, dividers, title systems
gauges/        — Confidence, contradiction, freshness, zone strength
evidence/      — Evidence, coaching, news icons
watchlist/     — Watchlist elements, sparklines, sentiment
background/    — Atmosphere, textures, scan arcs (partial)
connectors/    — Connector lines, ring connectors
arrows/        — Directional arrows, radar ring
maps/          — World map SVG
sky/           — Night sky SVG
master/        — Master pack assets (pending)
previews/      — PNG review sheets, composite previews
layer-maps/    — Layer composition documentation (.md)
```
