import "./dashboard-panels-import";
import { COCKPIT_PANEL_CONTENT_RECTS } from "../cockpit/dashboardCockpitGeometry";
import DirectionalBiasPanel from "./DirectionalBiasPanel";
import ConfidenceContextPanel from "./ConfidenceContextPanel";
import WatchlistPanel from "./WatchlistPanel";
import EvidenceStackPanel from "./EvidenceStackPanel";

const bias = COCKPIT_PANEL_CONTENT_RECTS.directionalBiasSummary;
const conf = COCKPIT_PANEL_CONTENT_RECTS.confidenceContextMatrix;
const watch = COCKPIT_PANEL_CONTENT_RECTS.watchlist;
const evidence = COCKPIT_PANEL_CONTENT_RECTS.evidenceReasoningEngine;

/**
 * Panel content layer — Batch 7A
 * Uses COCKPIT_PANEL_CONTENT_RECTS for panel placement.
 * Renders: Directional Bias, Confidence & Context, Watchlist, Evidence Stack.
 */
export default function DashboardPanelContentLayer() {
  return (
    <div className="cockpit-layer cockpit-panel-content-layer elceo-cockpit-no-glow">
      {/* Directional Bias Summary */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: bias.header.x, top: bias.header.y, width: bias.header.w, height: bias.header.h }}>
        <DirectionalBiasPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: bias.body.x, top: bias.body.y, width: bias.body.w, height: bias.body.h }}>
        <DirectionalBiasPanel section="body" />
      </div>

      {/* Confidence & Context Matrix */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: conf.header.x, top: conf.header.y, width: conf.header.w, height: conf.header.h }}>
        <ConfidenceContextPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: conf.body.x, top: conf.body.y, width: conf.body.w, height: conf.body.h }}>
        <ConfidenceContextPanel section="body" />
      </div>

      {/* Watchlist */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: watch.header.x, top: watch.header.y, width: watch.header.w, height: watch.header.h }}>
        <WatchlistPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: watch.body.x, top: watch.body.y, width: watch.body.w, height: watch.body.h }}>
        <WatchlistPanel section="body" />
      </div>

      {/* Evidence Stack / Reasoning Engine */}
      <div className="cockpit-panel-content-slot cockpit-panel-content-slot--header" style={{ position: "absolute", left: evidence.header.x, top: evidence.header.y, width: evidence.header.w, height: evidence.header.h }}>
        <EvidenceStackPanel section="header" />
      </div>
      <div className="cockpit-panel-content-slot" style={{ position: "absolute", left: evidence.body.x, top: evidence.body.y, width: evidence.body.w, height: evidence.body.h }}>
        <EvidenceStackPanel section="body" />
      </div>
    </div>
  );
}
