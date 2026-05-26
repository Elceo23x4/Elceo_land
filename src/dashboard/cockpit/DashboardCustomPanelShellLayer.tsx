import { COCKPIT_PANEL_RECTS, type CockpitRect } from "./dashboardCockpitGeometry";

const SHOW_PANEL_NAME_MICRO_LABELS = true;

const PANEL_ENTRIES: Array<{ key: string; label: string; rect: CockpitRect }> = [
  { key: "bias", label: "Directional Bias Summary", rect: COCKPIT_PANEL_RECTS.directionalBiasSummary },
  { key: "conf", label: "Confidence & Context Matrix", rect: COCKPIT_PANEL_RECTS.confidenceContextMatrix },
  { key: "watch", label: "Watchlist", rect: COCKPIT_PANEL_RECTS.watchlist },
  { key: "evidence", label: "Evidence Stack / Reasoning Engine", rect: COCKPIT_PANEL_RECTS.evidenceReasoningEngine },
  { key: "news", label: "News & Macro Intelligence", rect: COCKPIT_PANEL_RECTS.newsMacroIntelligence },
  { key: "coaching", label: "Coaching Insights", rect: COCKPIT_PANEL_RECTS.coachingInsights },
  { key: "regime", label: "Market Regime / Cross-Asset Pulse", rect: COCKPIT_PANEL_RECTS.marketRegimeCrossAssetPulse },
];

function HudPanelFrame({ rect, label }: { rect: CockpitRect; label: string }) {
  const { x, y, w, h } = rect;
  const corner = Math.min(42, Math.max(22, Math.floor(Math.min(w, h) * 0.12)));
  const inset = 8;
  const titleY = h > 300 ? y + 48 : y + 40;

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="rgba(3,2,1,0.42)" stroke="none" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="rgba(255,106,0,0.72)" strokeWidth="1.25" />
      <rect x={x + inset} y={y + inset} width={w - inset * 2} height={h - inset * 2} fill="none" stroke="rgba(255,191,74,0.18)" strokeWidth="0.75" />
      <path d={`M${x},${y + corner} L${x},${y} L${x + corner},${y}`} fill="none" stroke="rgba(255,191,74,0.82)" strokeWidth="2" />
      <path d={`M${x + w - corner},${y} L${x + w},${y} L${x + w},${y + corner}`} fill="none" stroke="rgba(255,191,74,0.82)" strokeWidth="2" />
      <path d={`M${x + w},${y + h - corner} L${x + w},${y + h} L${x + w - corner},${y + h}`} fill="none" stroke="rgba(255,191,74,0.82)" strokeWidth="2" />
      <path d={`M${x + corner},${y + h} L${x},${y + h} L${x},${y + h - corner}`} fill="none" stroke="rgba(255,191,74,0.82)" strokeWidth="2" />
      <line x1={x + corner} y1={titleY} x2={x + w - corner} y2={titleY} stroke="rgba(255,106,0,0.28)" strokeWidth="1" />
      <line x1={x} y1={y + corner + 6} x2={x + 6} y2={y + corner + 6} stroke="rgba(255,191,74,0.45)" strokeWidth="1" />
      <line x1={x} y1={y + corner + 12} x2={x + 4} y2={y + corner + 12} stroke="rgba(255,191,74,0.3)" strokeWidth="0.75" />
      {SHOW_PANEL_NAME_MICRO_LABELS && (
        <text x={x + 14} y={y + 14} fontSize="8" fill="rgba(255,191,74,0.55)" letterSpacing="0.06em" dominantBaseline="hanging">{label.toUpperCase()}</text>
      )}
    </g>
  );
}

export default function DashboardCustomPanelShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--custom-panel-shell" aria-hidden="true">
      <svg viewBox="0 0 1920 1080" className="cockpit-custom-panel-svg">
        {PANEL_ENTRIES.map(({ key, label, rect }) => (
          <HudPanelFrame key={key} rect={rect} label={label} />
        ))}
      </svg>
    </div>
  );
}
