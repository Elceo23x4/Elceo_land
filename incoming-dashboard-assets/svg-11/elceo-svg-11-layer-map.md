# ELCEO SVG-11 Layer Map — Portrait / Compact Dashboard Asset Variant

Status: Review batch. Built as the portrait/compact responsive composition, not a squeezed desktop version.

## Locked rules followed
- No readable text anywhere.
- Empty framed slots only where future text/logo/status content will be rendered in React.
- Central chart housing remains blank; chart engine will own candles, axes, price scale, and crosshair.
- Bottom AI hub button uses geometric center mark only, no lettering.
- Orange/amber HUD language stays consistent with approved SVG-01 to SVG-10 direction.

## Files

### elceo-svg-11-portrait-main-frame.svg
- `portrait_outer_screen_frame`
- `portrait_top_system_bar_empty_slots`
- `top_empty_slot_1` to `top_empty_slot_4`
- `portrait_chart_section_outer_guide`
- `portrait_panel_01` to `portrait_panel_04`
- `portrait_market_regime_strip`
- `portrait_bottom_nav_dock_placeholder`

### elceo-svg-11-portrait-chart-hub.svg
- `portrait_compact_chart_hub_ring`
- `portrait_chart_console_blank`
- `portrait_chart_console_blank_blank_chart_viewport`
- `portrait_chart_console_blank_footer_five_cells`
- compact connector arms around the chart hub

### elceo-svg-11-portrait-panel-system.svg
- `compact_panel_left_top`
- `compact_panel_right_top`
- `compact_panel_left_bottom`
- `compact_panel_right_bottom`
- `compact_panel_wide_market_strip`
- `wide_strip_subdivider_1` to `wide_strip_subdivider_5`

### elceo-svg-11-bottom-nav.svg
- `bottom_nav_outer_dock`
- `bottom_nav_active_tab_shell`
- `bottom_nav_icon_1` to `bottom_nav_icon_4`
- `bottom_nav_center_cutout_hint`

### elceo-svg-11-ai-hub-button.svg
- `ai_hub_outer_glow`
- `ai_hub_ring_1` to `ai_hub_ring_4`
- `ai_hub_arc_1` to `ai_hub_arc_5`
- `ai_hub_empty_center_diamond`
- `ai_hub_inner_core`

### elceo-svg-11-compact-connectors.svg
- `compact_top_long_connector_left`
- `compact_top_long_connector_right`
- `compact_bottom_long_connector_left`
- `compact_bottom_long_connector_right`
- `compact_connector_micro_diamond_1` to `compact_connector_micro_diamond_4`

## Integration notes
- Use the composite preview as the visual arrangement reference.
- Use individual display-safe SVGs as source assets for React integration.
- In code, text and data should be rendered separately over these frames.
- Do not use this as a final mobile-only design; this is the portrait compact cockpit structural asset system.
