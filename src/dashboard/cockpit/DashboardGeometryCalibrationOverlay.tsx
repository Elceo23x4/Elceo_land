import { COCKPIT_GEOMETRY, REV_B_PANEL_SYSTEM_BOARD_RECT } from "./dashboardCockpitGeometry";

interface Props {
  showLabels?: boolean;
}

const geo = COCKPIT_GEOMETRY;
const panels = geo.panels;

interface RectDef {
  rect: { x: number; y: number; w: number; h: number };
  color: string;
  dash?: boolean;
  label?: string;
}

const RECTS: RectDef[] = [
  // RevB panel system
  { rect: REV_B_PANEL_SYSTEM_BOARD_RECT, color: "#00bcd4", dash: true, label: "RevB System" },
  // Topbar
  { rect: geo.topSystemBar, color: "#00bcd4", label: "TopBar" },
  // Central wheel
  { rect: geo.centralWheel, color: "#ff6a00", dash: true, label: "Wheel" },
  // Chart console bounds
  { rect: geo.chartConsoleBounds, color: "#9c27b0", dash: true, label: "ChartBounds" },
  // Chart frame fitted
  { rect: geo.chartFrame, color: "#ff445c", label: "ChartFrame" },
  // Panel outers
  { rect: panels.directionalBiasSummary.outerBoard, color: "#ffbf4a", label: "Bias Outer" },
  { rect: panels.confidenceContextMatrix.outerBoard, color: "#ffbf4a", label: "Conf Outer" },
  { rect: panels.watchlist.outerBoard, color: "#ffbf4a", label: "Watch Outer" },
  { rect: panels.evidenceReasoningEngine.outerBoard, color: "#ffbf4a", label: "Evidence Outer" },
  { rect: panels.newsMacroIntelligence.outerBoard, color: "#ffbf4a", label: "News Outer" },
  { rect: panels.coachingInsights.outerBoard, color: "#ffbf4a", label: "Coach Outer" },
  { rect: panels.marketRegimeCrossAssetPulse.outerBoard, color: "#ffbf4a", label: "Regime Outer" },
  // Headers
  { rect: panels.directionalBiasSummary.headerBoard, color: "#32e66a", label: "Bias Hdr" },
  { rect: panels.confidenceContextMatrix.headerBoard, color: "#32e66a", label: "Conf Hdr" },
  // Bodies
  { rect: panels.directionalBiasSummary.bodyBoard, color: "#d8dee7", label: "Bias Body" },
  { rect: panels.confidenceContextMatrix.bodyBoard, color: "#d8dee7", label: "Conf Body" },
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
            <span
              style={{
                position: "absolute",
                top: -1,
                left: 2,
                fontSize: "7px",
                color: r.color,
                fontFamily: "monospace",
                opacity: 0.8,
                whiteSpace: "nowrap",
              }}
            >
              {r.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
