# ELCEO SVG-15 Rev-B — Full Width Dotted Open World Map

Canvas: 1920 × 760
Background: transparent in SVG; dark PNG preview included.

## Main file
- `elceo-svg-15-revb-dotted-world-map.svg`

## Preview files
- `elceo-svg-15-revb-dotted-world-map-transparent.png`
- `elceo-svg-15-revb-dotted-world-map-preview-dark.png`

## Basis
- Real world map silhouette from packaged Natural Earth polygons.
- Antarctica removed.
- Robinson projection used.

## Changes from previous version
- Removed the sunlight / reflection layer completely.
- Increased dot density.
- Increased dot thickness.
- Added denser clustered orange glow-star sections at random selected regions of the landmasses.
- Kept grouped symbol-based dots to avoid a very heavy SVG.

## Structure
- `svg15_revb_dotted_world_map`
- continent groups:
  - `continent-north-america`
  - `continent-south-america`
  - `continent-europe`
  - `continent-africa`
  - `continent-asia`
  - `continent-oceania`

Each continent contains grouped reusable dot uses:
- `*-shade-0`
- `*-shade-1`
- `*-shade-2`
- `*-shade-3`
- `*-glow-stars-soft`
- `*-glow-stars-hot`

## Optimization
Uses reusable symbols instead of isolating every single dot as an individual path.
