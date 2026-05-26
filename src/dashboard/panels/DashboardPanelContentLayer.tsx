import "./dashboard-panels-import";
import { COCKPIT_PANEL_CONTENT_RECTS } from "../cockpit/dashboardCockpitGeometry";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";

const bias = COCKPIT_PANEL_CONTENT_RECTS.directionalBiasSummary;
const conf = COCKPIT_PANEL_CONTENT_RECTS.confidenceContextMatrix;

/**
 * Panel content layer — Batch 6M
 * Uses final COCKPIT_PANEL_CONTENT_RECTS for panel placement.
 */
export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer elceo-cockpit-no-glow">
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: bias.header.x, top: bias.header.y, width: bias.header.w, height: bias.header.h }}>
        <DirectionalBiasPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: bias.body.x, top: bias.body.y, width: bias.body.w, height: bias.body.h }}>
        <DirectionalBiasPanel section="body" />
      </div>

      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: conf.header.x, top: conf.header.y, width: conf.header.w, height: conf.header.h }}>
        <ConfidenceContextPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: conf.body.x, top: conf.body.y, width: conf.body.w, height: conf.body.h }}>
        <ConfidenceContextPanel section="body" />
      </div>
    </div>
  );
}
