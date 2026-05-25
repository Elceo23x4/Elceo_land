import "./dashboard-panels-import";
import { getPanelSlotStyle } from "./panelSlotHelpers";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";

/**
 * Panel content layer — Batch 6
 * Renders real panel content into cockpit slot positions.
 * Only populates directional-bias-summary and confidence-context-matrix.
 * All other slots remain empty until future batches.
 */
export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer">
      <div
        className="cockpit-panel-content-slot"
        style={getPanelSlotStyle("directional-bias-summary")}
      >
        <DirectionalBiasPanel />
      </div>
      <div
        className="cockpit-panel-content-slot"
        style={getPanelSlotStyle("confidence-context-matrix")}
      >
        <ConfidenceContextPanel />
      </div>
    </div>
  );
}
