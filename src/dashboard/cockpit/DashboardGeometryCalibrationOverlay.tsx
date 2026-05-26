import { COCKPIT_GEOMETRY, COCKPIT_PANEL_RECTS, COCKPIT_PANEL_CONTENT_RECTS } from "./dashboardCockpitGeometry";

interface Props { showLabels?: boolean; }

const geo = COCKPIT_GEOMETRY;

interface RectDef {
  rect: { x: number; y: number; w: number; h: number };
  color: string;
  dash?: boolean;
  label?: string;
}

const RECTS: RectDef[] = [
  { rect: geo.topSystemBar, color: "#00bcd4", label: "TopBar" },
  { rect: geo.centralWheel, color: "#ff6a00", dash: true, label: "Wheel" },
  { rect: geo.chartConsoleBounds, color: "#9c27b0", dash: true, label: "ChartBounds" },
  { rect: geo.chartFrame, color: "#ff445c", label: "ChartFrame" },
  { rect: COCKPIT_PANEL_RECTS.directionalBiasSummary, color: "#ffbf4a", label: "Bias" },
  { rect: COCKPIT_PANEL_RECTS.confidenceContextMatrix, color: "#ffbf4a", label: "Conf" },
  { rect: COCKPIT_PANEL_RECTS.watchlist, color: "#ffbf4a", label: "Watch" },
  { rect: COCKPIT_PANEL_RECTS.evidenceReasoningEngine, color: "#ffbf4a", label: "Evidence" },
  { rect: COCKPIT_PANEL_RECTS.newsMacroIntelligence, color: "#ffbf4a", label: "News" },
  { rect: COCKPIT_PANEL_RECTS.coachingInsights, color: "#ffbf4a", label: "Coach" },
  { rect: COCKPIT_PANEL_RECTS.marketRegimeCrossAssetPulse, color: "#ffbf4a", label: "Regime" },
  { rect: COCKPIT_PANEL_CONTENT_RECTS.directionalBiasSummary.header, color: "#32e66a", label: "BiasHdr" },
  { rect: COCKPIT_PANEL_CONTENT_RECTS.directionalBiasSummary.body, color: "#d8dee7", label: "BiasBody" },
  { rect: COCKPIT_PANEL_CONTENT_RECTS.confidenceContextMatrix.header, color: "#32e66a", label: "ConfHdr" },
  { rect: COCKPIT_PANEL_CONTENT_RECTS.confidenceContextMatrix.body, color: "#d8dee7", label: "ConfBody" },
];

export default function DashboardGeometryCalibrationOverlay({ showLabels }: Props) {
  return (
    <div className="cockpit-layer cockpit-layer--geometry-calibration" aria-hidden="true">
      {RECTS.map((r, i) => (
        <div
          key={i}
          className="cockpit-geometry-rect"
          style={{
            position: "absolute",
            left: r.rect.x,
            top: r.rect.y,
            width: r.rect.w,
            height: r.rect.h,
            border: `1px ${r.dash ? "dashed" : "solid"} ${r.color}`,
            boxSizing: "border-box",
          }}
        >
          {showLabels && r.label && (
            <span style={{ position: "absolute", top: -1, left: 2, fontSize: "7px", color: r.color, fontFamily: "monospace", opacity: 0.8, whiteSpace: "nowrap" }}>
              {r.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
