# ELCEO SVG-13 — Connector / Annotation Line Completion Pass

Canvas: 1920 × 1080
Scope: lines / nodes only, no text, no label capsules.

## Files
- `elceo-svg-13-left-connector-lines.svg`
  - `svg13_left_connector_system`
  - three left panel-to-ring routed connectors
  - panel terminal nodes, elbow nodes, ring-anchor nodes
  - supporting diamond anchors

- `elceo-svg-13-right-connector-lines.svg`
  - `svg13_right_connector_system`
  - three right panel-to-ring routed connectors
  - panel terminal nodes, elbow nodes, ring-anchor nodes
  - supporting diamond anchors

- `elceo-svg-13-top-ring-connector-lines.svg`
  - `svg13_top_ring_connectors`
  - center top stem
  - inner/outer diagonal stems
  - top diamonds at ring approach

- `elceo-svg-13-bottom-ring-connector-lines.svg`
  - `svg13_bottom_ring_connectors`
  - center bottom stem
  - inner/outer diagonal stems
  - bottom diamonds at ring approach

- `elceo-svg-13-full-connector-composite.svg`
  - all connector systems combined on transparent canvas

- `elceo-svg-13-review-preview.svg`
- `elceo-svg-13-review-preview.png`
  - preview overlayed on the approved desktop master composite

## Visual rules
- Main routed lines use the orange gradient stroke (`grad_orange`)
- Secondary ghost lines use `.thin`
- Nodes use circular glowing terminals only
- Diamonds are used as small anchor markers
- No capsules, no labels, no readable text

## Integration note
Use `elceo-svg-13-full-connector-composite.svg` as the master overlay, or import the left/right/top/bottom connector files independently for layout-specific composition.
