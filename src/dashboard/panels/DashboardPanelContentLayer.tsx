import "./dashboard-panels-import";
import { COCKPIT_GEOMETRY } from "../cockpit/dashboardCockpitGeometry";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";

const { directionalBiasSummary, confidenceContextMatrix } = COCKPIT_GEOMETRY.panels;

export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer elceo-cockpit-no-glow">
      {/* Directional Bias — header */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: directionalBiasSummary.header.x, top: directionalBiasSummary.header.y, width: directionalBiasSummary.header.w, height: directionalBiasSummary.header.h }}>
        <DirectionalBiasPanel section="header" />
      </div>
      {/* Directional Bias — body */}
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: directionalBiasSummary.body.x, top: directionalBiasSummary.body.y, width: directionalBiasSummary.body.w, height: directionalBiasSummary.body.h }}>
        <DirectionalBiasPanel section="body" />
      </div>

      {/* Confidence — header */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: confidenceContextMatrix.header.x, top: confidenceContextMatrix.header.y, width: confidenceContextMatrix.header.w, height: confidenceContextMatrix.header.h }}>
        <ConfidenceContextPanel section="header" />
      </div>
      {/* Confidence — body */}
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: confidenceContextMatrix.body.x, top: confidenceContextMatrix.body.y, width: confidenceContextMatrix.body.w, height: confidenceContextMatrix.body.h }}>
        <ConfidenceContextPanel section="body" />
      </div>
    </div>
  );
}
