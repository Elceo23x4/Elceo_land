import "./dashboard-panels-import";
import { getPanelSlotInnerStyle } from "./panelSlotHelpers";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";

export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer">
      <div className="cockpit-panel-content-slot" style={getPanelSlotInnerStyle("directional-bias-summary")}><DirectionalBiasPanel /></div>
      <div className="cockpit-panel-content-slot" style={getPanelSlotInnerStyle("confidence-context-matrix")}><ConfidenceContextPanel /></div>
    </div>
  );
}
