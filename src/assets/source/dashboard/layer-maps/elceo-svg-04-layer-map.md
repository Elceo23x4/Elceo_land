# ELCEO SVG-04 Layer Map — Sidebar Rail + Navigation Icons

Status: SVG-04 generated from the approved SVG-01 Rev-B sidebar direction. This batch does not redesign the sidebar; it formalizes the approved rail and icon family into clean reusable assets.

## Locked Inputs Preserved
- Approved Rev-B side menu direction.
- Equal vertical spacing retained.
- Current icon family retained.
- No text added.
- 1920 × 1080 desktop coordinate system retained for dashboard-positioned files.

## Files

### elceo-svg-04-sidebar-rail-complete-approved.svg
Full dashboard-positioned sidebar with rail, active slot, and all 10 nav icons.

Important IDs:
- `svg04_sidebar_complete_approved_equal_spacing`
- `svg04_sidebar_outer_chamfer_rail`
- `svg04_sidebar_inner_fine_rail`
- `svg04_active_slot_01`
- `svg04_sidebar_icon_01` through `svg04_sidebar_icon_10`
- `svg04_sidebar_top_cap_accent`
- `svg04_sidebar_bottom_cap_accent`

### elceo-svg-04-sidebar-rail-frame-only.svg
Rail frame only, without icons. Useful when icons are rendered as React/SVG components.

Important IDs:
- `svg04_railonly_sidebar_complete_approved_equal_spacing`
- `svg04_railonly_sidebar_outer_chamfer_rail`
- `svg04_railonly_sidebar_inner_fine_rail`
- `svg04_railonly_active_slot_template`

### elceo-svg-04-nav-icons-display-safe.svg
Standalone icon sheet for import/review. Each icon opens visibly and can be isolated.

Important IDs:
- `svg04_nav_icon_sheet_display_safe`
- `svg04_nav_icon_01` through `svg04_nav_icon_10`
- `svg04_icon_01_cell_bounds` through `svg04_icon_10_cell_bounds`

### elceo-svg-04-active-nav-state-display-safe.svg
Active/hover/idle slot states for future interaction styling.

Important IDs:
- `svg04_slot_state_idle`
- `svg04_slot_state_hover`
- `svg04_slot_state_active`

### elceo-svg-04-composite-preview.svg / .png
1920 × 1080 preview showing the approved sidebar in dashboard position.

### elceo-svg-04-review-sheet.svg / .png
Display-safe review sheet showing the rail, icon family, and active state variations together.

## Equal Spacing
The icon center Y positions in the dashboard-positioned rail are:
- 184
- 256
- 328
- 400
- 472
- 544
- 616
- 688
- 760
- 832

Spacing interval: 72 px.

## Implementation Notes
- Use the complete rail SVG when you want one asset.
- Use the frame-only SVG + icon components when you want dynamic active states.
- The SVGs are display-safe: key stroke/fill values are inline, and a near-invisible import bounds rectangle is included where needed.
- No text elements are present in the batch.
