import "./dashboard-panels-import";
import { COCKPIT_GEOMETRY } from "../cockpit/dashboardCockpitGeometry";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";

const { directionalBiasSummary, confidenceContextMatrix } = COCKPIT_GEOMETRY.panels;

/**
 * Panel content layer — Batch 6F
 *
 * Uses board-space header/body coordinates directly.
 * Header and body rects are absolute to the 1920×1080 stage.
 */
export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer elceo-cockpit-no-glow">
      {/* Directional Bias — header */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: directionalBiasSummary.headerBoard.x, top: directionalBiasSummary.headerBoard.y, width: directionalBiasSummary.headerBoard.w, height: directionalBiasSummary.headerBoard.h }}>
        <DirectionalBiasPanel section="header" />
      </div>
      {/* Directional Bias — body */}
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: directionalBiasSummary.bodyBoard.x, top: directionalBiasSummary.bodyBoard.y, width: directionalBiasSummary.bodyBoard.w, height: directionalBiasSummary.bodyBoard.h }}>
        <DirectionalBiasPanel section="body" />
      </div>

      {/* Confidence — header */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: confidenceContextMatrix.headerBoard.x, top: confidenceContextMatrix.headerBoard.y, width: confidenceContextMatrix.headerBoard.w, height: confidenceContextMatrix.headerBoard.h }}>
        <ConfidenceContextPanel section="header" />
      </div>
      {/* Confidence — body */}
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: confidenceContextMatrix.bodyBoard.x, top: confidenceContextMatrix.bodyBoard.y, width: confidenceContextMatrix.bodyBoard.w, height: confidenceContextMatrix.bodyBoard.h }}>
        <ConfidenceContextPanel section="body" />
      </div>
    </div>
  );
}
