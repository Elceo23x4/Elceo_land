# ELCEO SVG-10 Layer Map — Background Atmosphere System

## Approved scope for SVG-10
This batch is the non-content background atmosphere system for the 1920×1080 desktop dashboard. It does not include readable text, chart content, foreground panels, sidebar icons, central chart UI, or large glow-node/beacon elements.

## Files

### `elceo-svg-10-background-base-texture.svg`
- `#bg_base_black` — dark base canvas
- `#bg_radial_core_vignette` — central warm dark vignette
- `#grid_vertical_*` / `#grid_horizontal_*` — subtle low-opacity grid system
- `#edge_vignette` — dark edge falloff

### `elceo-svg-10-world-map-dot-field.svg`
- `#world_map_dot_field` — editable dotted world-map atmosphere
- `#map_dot_*` — individual editable dot elements
- `#ambient_map_latitude_dots_*` — faint supporting dot bands

### `elceo-svg-10-particle-glow-field.svg`
- `#particle_glow_field_micro_only` — micro dust/glint field only
- `#particle_micro_*` — small editable particles
- `#micro_glint_*` — tiny glints, not large glow nodes

### `elceo-svg-10-horizontal-light-streaks.svg`
- `#horizontal_light_streaks_subtle` — faint reference-like horizontal energy streaks
- `#light_streak_*` — editable streak bars
- `#light_streak_hotspot_*` — small centered glints

### `elceo-svg-10-scan-arcs.svg`
- `#background_scan_arcs_and_hazes` — faint background scan arcs and side hazes
- `#scan_arc_*` — background arc paths
- `#scan_arc_micro_tick_*` — fine low-opacity tick strokes
- `#left_background_orange_haze` / `#right_background_orange_haze` — subtle side warmth

### `elceo-svg-10-composite-preview.svg`
Full 1920×1080 background preview with all SVG-10 layers combined.

### `elceo-svg-10-review-sheet.svg`
Review sheet showing the full background system and individual atmosphere families.

## Integration notes
- Keep this entire batch behind the approved SVG-01/SVG-02 foreground shell.
- In React, these layers can be split into separate absolutely positioned SVG layers.
- The world map and particle layers should be opacity-controlled by CSS variables.
- Large active glow nodes are intentionally excluded and should remain reserved for the final glow/pass stage.
