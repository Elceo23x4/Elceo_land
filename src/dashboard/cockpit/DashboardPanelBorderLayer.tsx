/**
 * SVG-06 Panel Border Layer — DISABLED.
 * The main panel shell is DashboardCustomPanelShellLayer (coordinate-driven).
 * SVG-06 borders are NOT the main dashboard shell.
 * Keep disabled unless explicitly reintroduced for popup/special effect usage.
 */
const SHOW_SVG06_PANEL_BORDERS = false;

export default function DashboardPanelBorderLayer() {
  if (!SHOW_SVG06_PANEL_BORDERS) return null;

  return (
    <div className="cockpit-layer cockpit-layer--panel-borders elceo-cockpit-no-glow" aria-hidden="true">
      {/* SVG-06 is dormant. Do not render until explicitly reintroduced. */}
    </div>
  );
}
