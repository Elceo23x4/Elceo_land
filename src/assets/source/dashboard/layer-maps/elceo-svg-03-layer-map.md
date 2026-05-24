# ELCEO SVG-03 Rev-B Display-Safe Layer Map

Purpose: repair SVG-03 so every SVG file displays reliably in browsers, Figma-like importers, and UI tools.

Locked rules respected:
- No readable text inside SVG artwork.
- No fake candles.
- No price axis or time axis.
- No chart UI chrome beyond the preview frame.
- No label containers.
- Zones are translucent with subtle border emphasis.
- Projection paths include both upside and downside versions.
- Projection paths use a hybrid stepped movement with a curved finish.
- Trade markers use shape language only.

Files:
- `elceo-svg-03-revb-zones-display-safe.svg`
  - `svg03_revb_supply_zone_block`
  - `svg03_revb_demand_zone_block`
- `elceo-svg-03-revb-projection-paths-up-down-display-safe.svg`
  - `svg03_revb_upside_projection_path_system`
  - `svg03_revb_downside_projection_path_system`
- `elceo-svg-03-revb-trade-markers-display-safe.svg`
  - `svg03_revb_entry_marker_family`
  - `svg03_revb_take_profit_marker_family`
  - `svg03_revb_stop_loss_marker_family`
  - `svg03_revb_micro_tp_markers`
- `elceo-svg-03-revb-market-structure-markers-display-safe.svg`
  - `svg03_revb_break_marker_style`
  - `svg03_revb_imbalance_marker_style`
  - `svg03_revb_liquidity_sweep_marker_style`
- `elceo-svg-03-revb-guides-and-anchors-display-safe.svg`
  - `svg03_revb_horizontal_guides`
  - `svg03_revb_endpoint_anchors`
  - `svg03_revb_micro_anchor_diamonds`
- `elceo-svg-03-revb-composed-overlay-only.svg`
  - reusable overlay composition, still no candles/axes/text.
- `elceo-svg-03-revb-composite-preview.svg`
  - preview frame for review only.

Repair notes:
- All key visual styling was moved to inline SVG presentation attributes instead of relying on class-based CSS.
- Each SVG includes a near-invisible import bounding rectangle so blank-canvas importers preserve the artboard.
- Standalone assets are centered in their own artboards so opening any individual SVG shows visible artwork immediately.
