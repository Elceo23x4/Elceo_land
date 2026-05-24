# ELCEO SVG-06 Layer Map — Panel Border System

Status: Review batch for SVG-06.
Base design language: approved SVG-01 Rev-B content panel direction, formalized into reusable panel assets.
Desktop contract: 1920 × 1080.

## Batch purpose
SVG-06 defines the reusable dashboard card/panel border system. It does not contain readable text. All title, section, number, and content areas remain empty structural zones for later React-rendered text/data.

## Files

- `elceo-svg-06-panel-border-small.svg`  
  Standalone small card border asset.

- `elceo-svg-06-panel-border-medium.svg`  
  Standalone medium card border asset.

- `elceo-svg-06-panel-border-wide.svg`  
  Standalone wide card border asset.

- `elceo-svg-06-panel-border-tall.svg`  
  Standalone tall card border asset.

- `elceo-svg-06-panel-title-number-system.svg`  
  Empty number badges, title separator lines, content divider language, and micro accents.

- `elceo-svg-06-panel-cell-divider-system.svg`  
  Simple cell divider system using top borders and vertical dividers only. Dividers do not connect into a full boxed table.

- `elceo-svg-06-panel-states-display-safe.svg`  
  Idle, hover, active, and alert panel-state variants.

- `elceo-svg-06-composite-preview.svg` / `.png`  
  1920 × 1080 full-layout preview showing panel system in dashboard-like proportions.

- `elceo-svg-06-review-sheet.svg` / `.png`  
  Review sheet showing all core panel variants on a dark preview background.

## Core reusable group IDs

### General panel anatomy
Each panel group follows this pattern:

- `*_fill` — dark glass panel fill.
- `*_soft_inner_aura` — subtle inner orange atmosphere.
- `*_primary_top_heavy` — heavier top-left border emphasis.
- `*_secondary_top_medium` — secondary top border segment.
- `*_right_edge_fine` — finer right-side border.
- `*_bottom_left_accent` — broken lower-left border accent.
- `*_bottom_main_medium` — central bottom border segment.
- `*_bottom_right_accent` — broken lower-right border accent.
- `*_left_edge_upper_fine` — upper left vertical edge.
- `*_left_edge_lower_hair` — lower left vertical edge, intentionally thinner.
- `*_corner_diagonal_emphasis` — chamfered corner strokes.
- `*_inner_top_hairline` — faint internal top line.
- `*_inner_bottom_hairline` — faint internal bottom line.
- `*_title_separator_faint` — empty title/header separator.
- `*_number_badge_empty` — empty number badge holder.
- `*_left_inner_vertical_accent` — subtle content-side accent.
- `*_lower_micro_accents` — small bottom accents.

## Panel-state IDs

- `panel_state_idle`
- `panel_state_hover`
- `panel_state_active`
- `panel_state_alert`

State overlays:

- `*_hover_state_outer_breath`
- `*_active_state_upper_lift`
- `*_active_state_corner_charge`
- `*_alert_state_dashed_inset`

## Integration notes

1. Do not flatten these paths when importing into Figma or React.
2. Text and live data should be rendered by React, not baked into these SVGs.
3. Border segments are intentionally separate. The non-uniform stroke thickness is part of the approved ELCEO visual language.
4. Footer/cell dividers are intentionally not connected into full table boxes.
5. Every standalone SVG includes a near-invisible import bounds rectangle so UI tools preserve the artboard and do not open as blank.

## Suggested frontend use

- Convert panel variants into React components or use them as background SVGs.
- Use CSS variables later to control stroke opacity for hover/active states.
- Keep panel content independent from the SVG so real dashboard data can update freely.
