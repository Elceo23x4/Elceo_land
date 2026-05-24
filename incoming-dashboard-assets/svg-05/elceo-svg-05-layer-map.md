# ELCEO SVG-05 Layer Map — Top System Bar

Status: SVG-05 generated for review.

Scope:
- Top system/header bar only.
- Empty framed slots only: no readable text and no logo text.
- Built on the approved SVG-01 topbar direction.
- 1920×1080 desktop coordinate compatibility retained.

Files:
1. `elceo-svg-05-top-system-bar-full-desktop.svg`
   - Full desktop coordinate version, aligned at the top of a 1920×1080 artboard.
2. `elceo-svg-05-top-system-bar-isolated-empty.svg`
   - Isolated import-safe topbar on a 1920×120 viewBox.
3. `elceo-svg-05-status-session-time-modules-display-safe.svg`
   - Isolated reusable empty status/session/time module slot system.
4. `elceo-svg-05-notification-cluster-empty-display-safe.svg`
   - Empty notification/utility cluster slots and no-text state tokens.
5. `elceo-svg-05-dividers-segmentation-display-safe.svg`
   - Divider, slash, broken-rule and plate segmentation system.
6. `elceo-svg-05-composite-preview.svg/.png`
   - Preview in dashboard-wide context.
7. `elceo-svg-05-review-sheet.svg/.png`
   - Visual sheet of topbar components.

Primary IDs:
- `top_system_bar_complete_empty`
- `topbar_outer_frame`
- `left_identity_empty_slots`
- `logo_slot_empty_frame`
- `identity_slash_divider`
- `title_slot_empty_plate`
- `center_status_empty_slots`
- `center_master_plate`
- `system_status_slot_empty`
- `session_slot_empty`
- `time_slot_empty`
- `right_utility_empty_slots`
- `utility_cluster_outer_slot`
- `notification_slot_empty`
- `alert_slot_empty`
- `menu_slot_empty`
- `topbar_broken_accent_rules`

Implementation notes:
- Keep the full-desktop SVG as an overlay/background asset for 1920×1080 layout work.
- Use the isolated SVG for direct header component integration.
- The module sheets can be split into React components later.
- No text is embedded, so all labels should be rendered by React/HTML later.
- Styling is mostly inline or self-contained, to avoid blank imports in UI tools.
