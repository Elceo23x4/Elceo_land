# ELCEO SVG-07 Rev-D Layer Map — Reference-Corrected Gauge System

## Scope
This revision corrects SVG-07 after the previous gauge pass was rejected for being too far from the reference.

## Corrections Applied
- Removed the unnecessary outer envelope around the semi-circle gauges.
- Rebuilt gauges as open semi-circular HUD instruments only.
- Added reference-style multi-section arc logic: active arc, inactive/dormant arc, outer micro-ticks, inner measurement arcs, and small accent chunks where needed.
- Kept the batch no-text, consistent with the approved SVG asset direction.
- Display-safe SVGs include a near-invisible import bounds rectangle so tools do not collapse the artboard.

## Key Files
- `elceo-svg-07-revd-semicircle-gauges-reference-corrected.svg`
- `elceo-svg-07-revd-confidence-gauge-display-safe.svg`
- `elceo-svg-07-revd-contradiction-gauge-display-safe.svg`
- `elceo-svg-07-revd-freshness-gauge-display-safe.svg`
- `elceo-svg-07-revd-zone-strength-gauge-display-safe.svg`
- `elceo-svg-07-revd-horizontal-meters.svg`
- `elceo-svg-07-revd-mini-score-rings.svg`
- `elceo-svg-07-revd-review-sheet.svg`
- `elceo-svg-07-revd-composite-preview.svg`

## Important Group IDs
- `*_outer_inactive_track`
- `*_active_green_broad_arc`
- `*_active_red_broad_arc`
- `*_segmented_zone_arc_seg_##`
- `*_micro_tick_##`
- `*_right_floating_green_chunk`
- `*_center_glow_core`
- `*_inner_center_ring`

## Code Integration Notes
- Arc values should later be controlled by React/SVG path generation rather than scaling the SVG itself.
- Use these SVGs as visual references and base assets for the final Gauge component.
- Keep numbers and labels as real HTML/React text during code integration, not as static SVG text.
