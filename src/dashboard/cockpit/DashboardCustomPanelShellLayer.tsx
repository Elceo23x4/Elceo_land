import { COCKPIT_PANEL_RECTS, type CockpitRect } from "./dashboardCockpitGeometry";

const panels = Object.values(COCKPIT_PANEL_RECTS);

function HudPanelFrame({ rect }: { rect: CockpitRect }) {
  const { x, y, w, h } = rect;
  const c = 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="rgba(0,0,0,0.25)" stroke="rgba(255,106,0,0.4)" strokeWidth="1" />
      <path d={`M${x},${y+c} L${x},${y} L${x+c},${y}`} fill="none" stroke="rgba(255,106,0,0.7)" strokeWidth="1.5" />
      <path d={`M${x+w-c},${y} L${x+w},${y} L${x+w},${y+c}`} fill="none" stroke="rgba(255,106,0,0.7)" strokeWidth="1.5" />
      <path d={`M${x+w},${y+h-c} L${x+w},${y+h} L${x+w-c},${y+h}`} fill="none" stroke="rgba(255,106,0,0.7)" strokeWidth="1.5" />
      <path d={`M${x+c},${y+h} L${x},${y+h} L${x},${y+h-c}`} fill="none" stroke="rgba(255,106,0,0.7)" strokeWidth="1.5" />
      <line x1={x+c} y1={y+32} x2={x+w-c} y2={y+32} stroke="rgba(255,106,0,0.2)" strokeWidth="0.5" />
    </g>
  );
}

/**
 * Coordinate-driven custom panel shell — Batch 6L
 * Draws HUD panel frames at exact user-provided board-space coordinates.
 */
export default function DashboardCustomPanelShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--custom-panel-shell" aria-hidden="true">
      <svg viewBox="0 0 1920 1080" className="cockpit-custom-panel-svg">
        {panels.map((rect, i) => (
          <HudPanelFrame key={i} rect={rect} />
        ))}
      </svg>
    </div>
  );
}
