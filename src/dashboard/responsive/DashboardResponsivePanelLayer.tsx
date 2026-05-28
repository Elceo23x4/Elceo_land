/**
 * DashboardResponsivePanelLayer.tsx
 *
 * Renders all 7 dashboard panels at their exact board-reference coordinates.
 * Each panel has:
 *   - A frame wrapper placed by PANEL_FRAME_RECTS (holds the SVG frame)
 *   - A header content slot placed by PANEL_CONTENT_RECTS[panel].header
 *   - A body content slot placed by PANEL_CONTENT_RECTS[panel].body
 *
 * Content coordinates are board-absolute (relative to the fluid board container),
 * NOT panel-local. This ensures pixel-perfect alignment with the design reference.
 */

import {
  DirectionalBiasFrame,
  ConfidenceMatrixFrame,
  WatchlistFrame,
  EvidenceStackFrame,
  NewsMacroFrame,
  CoachingFrame,
  MarketRegimeFrame,
} from "./dashboardResponsiveAssets";
import {
  boardRectStyle,
  PANEL_FRAME_RECTS,
  PANEL_CONTENT_RECTS,
} from "./dashboardResponsiveGeometry";
import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import {
  watchlistFixture,
  evidenceStackFixture,
  newsMacroFixture,
  coachingFixture,
  marketRegimeFixture,
} from "./responsivePanelFixtures";

/* ─── Shared micro-components ─── */

function ToneValue({ value, tone }: { value: string; tone?: string }) {
  const color =
    tone === "positive" ? "#5cba6e" :
    tone === "negative" ? "#e05555" :
    tone === "warning" ? "#d4a853" :
    "#8a8178";
  return <span style={{ color }}>{value}</span>;
}

function DataRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="dashboard-precision-data-row">
      <span className="dashboard-precision-data-label">{label}</span>
      <ToneValue value={value} tone={tone} />
    </div>
  );
}

/* ─── Panel Layer ─── */

export default function DashboardResponsivePanelLayer() {
  const bias = dashboardReasoningFixture.directionalBias;
  const ctx = dashboardReasoningFixture.confidenceContext;

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          DIRECTIONAL BIAS
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.directionalBiasSummary)}
      >
        <DirectionalBiasFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.directionalBiasSummary.header)}
      >
        <p className="dashboard-precision-eyebrow">Reasoning Snapshot</p>
        <h3 className="dashboard-precision-title">Directional Bias</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.directionalBiasSummary.body)}
      >
        <p className="dashboard-precision-metric">{bias.direction.replace("_", " ")}</p>
        <p className="dashboard-precision-body-text">{bias.headline}</p>
        <DataRow label="Strength" value={bias.strength} tone="positive" />
        <DataRow label="Condition" value="Conditional" tone="warning" />
        <p className="dashboard-precision-note">{bias.watchCondition}</p>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONFIDENCE & CONTEXT
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.confidenceContextMatrix)}
      >
        <ConfidenceMatrixFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.confidenceContextMatrix.header)}
      >
        <p className="dashboard-precision-eyebrow">Reasoning Matrix</p>
        <h3 className="dashboard-precision-title">Confidence &amp; Context</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.confidenceContextMatrix.body)}
      >
        {ctx.contextRows.map((row) => (
          <DataRow key={row.label} label={row.label} value={row.value} tone={row.tone} />
        ))}
        <p className="dashboard-precision-note">{ctx.summary}</p>
      </div>

      {/* ═══════════════════════════════════════════════════
          WATCHLIST
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.watchlist)}
      >
        <WatchlistFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.watchlist.header)}
      >
        <p className="dashboard-precision-eyebrow">Active Instruments</p>
        <h3 className="dashboard-precision-title">Watchlist</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.watchlist.body)}
      >
        {watchlistFixture.map((item) => (
          <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          EVIDENCE STACK
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.evidenceStackReasoningEngine)}
      >
        <EvidenceStackFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.header)}
      >
        <p className="dashboard-precision-eyebrow">Signal Alignment</p>
        <h3 className="dashboard-precision-title">Evidence Stack</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.body)}
      >
        {evidenceStackFixture.map((item) => (
          <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          NEWS & MACRO
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.newsMacroIntelligence)}
      >
        <NewsMacroFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.newsMacroIntelligence.header)}
      >
        <p className="dashboard-precision-eyebrow">Context Drivers</p>
        <h3 className="dashboard-precision-title">News &amp; Macro</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.newsMacroIntelligence.body)}
      >
        {newsMacroFixture.map((item) => (
          <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          COACHING INSIGHTS
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.coachingInsights)}
      >
        <CoachingFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.coachingInsights.header)}
      >
        <p className="dashboard-precision-eyebrow">Decision Support</p>
        <h3 className="dashboard-precision-title">Coaching Insights</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.coachingInsights.body)}
      >
        <p className="dashboard-precision-metric">{coachingFixture.headline}</p>
        <p className="dashboard-precision-body-text">{coachingFixture.body}</p>
      </div>

      {/* ═══════════════════════════════════════════════════
          MARKET REGIME
         ═══════════════════════════════════════════════════ */}
      <div
        className="dashboard-precision-panel-frame"
        style={boardRectStyle(PANEL_FRAME_RECTS.marketRegimeCrossAssetPulse)}
      >
        <MarketRegimeFrame preserveAspectRatio="none" />
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--header"
        style={boardRectStyle(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.header)}
      >
        <p className="dashboard-precision-eyebrow">Environment State</p>
        <h3 className="dashboard-precision-title">Market Regime</h3>
      </div>
      <div
        className="dashboard-precision-content-slot dashboard-precision-content-slot--body"
        style={boardRectStyle(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.body)}
      >
        <div className="dashboard-precision-regime-grid">
          {marketRegimeFixture.map((item) => (
            <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
          ))}
        </div>
      </div>
    </>
  );
}
