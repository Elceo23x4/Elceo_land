import "./dashboard-panels-import";
import { PANEL_CONTENT_RECTS, boardRectStyle } from "../cockpit/dashboardCockpitGeometry";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";
import WatchlistPanel from "./WatchlistPanel";
import EvidenceStackPanel from "./EvidenceStackPanel";
import NewsMacroPanel from "./NewsMacroPanel";
import CoachingInsightsPanel from "./CoachingInsightsPanel";
import MarketRegimePanel from "./MarketRegimePanel";

const P = PANEL_CONTENT_RECTS;

/**
 * Panel content layer — Batch 7D
 * Uses PANEL_CONTENT_RECTS with boardRectStyle for responsive percentage positioning.
 * Renders all 7 dashboard panels.
 */
export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer">
      {/* Directional Bias Summary */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.directionalBiasSummary.header)}>
        <DirectionalBiasPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.directionalBiasSummary.body)}>
        <DirectionalBiasPanel section="body" />
      </div>

      {/* Confidence & Context Matrix */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.confidenceContextMatrix.header)}>
        <ConfidenceContextPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.confidenceContextMatrix.body)}>
        <ConfidenceContextPanel section="body" />
      </div>

      {/* Watchlist */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.watchlist.header)}>
        <WatchlistPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.watchlist.body)}>
        <WatchlistPanel section="body" />
      </div>

      {/* Evidence Stack / Reasoning Engine */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.evidenceStackReasoningEngine.header)}>
        <EvidenceStackPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.evidenceStackReasoningEngine.body)}>
        <EvidenceStackPanel section="body" />
      </div>

      {/* News & Macro Intelligence */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.newsMacroIntelligence.header)}>
        <NewsMacroPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.newsMacroIntelligence.body)}>
        <NewsMacroPanel section="body" />
      </div>

      {/* Coaching Insights */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.coachingInsights.header)}>
        <CoachingInsightsPanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.coachingInsights.body)}>
        <CoachingInsightsPanel section="body" />
      </div>

      {/* Market Regime / Cross-Asset Pulse */}
      <div className="cockpit-panel-slot cockpit-panel-slot--header" style={boardRectStyle(P.marketRegimeCrossAssetPulse.header)}>
        <MarketRegimePanel section="header" />
      </div>
      <div className="cockpit-panel-slot" style={boardRectStyle(P.marketRegimeCrossAssetPulse.body)}>
        <MarketRegimePanel section="body" />
      </div>
    </div>
  );
}
