import DashboardResponsiveShell from "./DashboardResponsiveShell";
import DashboardChromePanel from "./DashboardChromePanel";
import DashboardResponsiveChartZone from "./DashboardResponsiveChartZone";
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
  watchlistFixture,
  evidenceStackFixture,
  newsMacroFixture,
  coachingFixture,
  marketRegimeFixture,
} from "./responsivePanelFixtures";
import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";

import "./dashboardResponsiveLayout.css";
import "./dashboardResponsivePanels.css";
import "./dashboardResponsiveTypography.css";

/**
 * DashboardResponsiveCockpit
 *
 * Top-level responsive dashboard component.
 * Replaces the old absolute 1920×1080 cockpit as the active /dashboard view.
 *
 * Architecture:
 * - CSS Grid responsive layout (NOT full-board SVG)
 * - Isolated SVG frames as panel chrome
 * - Real DOM content inside panels
 * - Internal scroll where needed
 * - Adaptive typography via clamp()
 */

const bias = dashboardReasoningFixture.directionalBias;
const ctx = dashboardReasoningFixture.confidenceContext;

function ToneChip({ tone, value }: { tone?: string; value: string }) {
  const color =
    tone === "positive" ? "#5cba6e" :
    tone === "negative" ? "#e05555" :
    tone === "warning" ? "#d4a853" :
    "#8a8178";
  return (
    <span className="dashboard-chip-text" style={{ color }}>
      {value}
    </span>
  );
}

function DataRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: "1px solid rgba(138,129,120,0.1)" }}>
      <span className="dashboard-data-label">{label}</span>
      <ToneChip tone={tone} value={value} />
    </div>
  );
}

export default function DashboardResponsiveCockpit() {
  return (
    <div className="dashboard-responsive-viewport">
      <DashboardResponsiveShell>
        {/* ─── Directional Bias Panel ─── */}
        <div className="dashboard-panel--directional-bias">
          <DashboardChromePanel
            frame={DirectionalBiasFrame}
            title="Directional Bias"
            eyebrow="Reasoning Snapshot"
          >
            <p className="dashboard-metric-value" style={{ marginTop: 4 }}>
              {bias.direction.replace("_", " ")}
            </p>
            <p style={{ margin: "6px 0 4px", color: "#c4bab0" }}>{bias.headline}</p>
            <DataRow label="Strength" value={bias.strength} tone="positive" />
            <DataRow label="Condition" value="Conditional" tone="warning" />
            <p style={{ margin: "6px 0 0", color: "#8a8178", fontStyle: "italic" }}>
              {bias.watchCondition}
            </p>
          </DashboardChromePanel>
        </div>

        {/* ─── Confidence & Context Panel ─── */}
        <div className="dashboard-panel--confidence-context">
          <DashboardChromePanel
            frame={ConfidenceMatrixFrame}
            title="Confidence & Context"
            eyebrow="Reasoning Matrix"
          >
            {ctx.contextRows.map((row) => (
              <DataRow key={row.label} label={row.label} value={row.value} tone={row.tone} />
            ))}
            <p style={{ margin: "6px 0 0", color: "#8a8178" }}>{ctx.summary}</p>
          </DashboardChromePanel>
        </div>

        {/* ─── Watchlist Panel ─── */}
        <div className="dashboard-panel--watchlist">
          <DashboardChromePanel
            frame={WatchlistFrame}
            title="Watchlist"
            eyebrow="Active Instruments"
          >
            {watchlistFixture.map((item) => (
              <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
            ))}
          </DashboardChromePanel>
        </div>

        {/* ─── Chart Zone ─── */}
        <DashboardResponsiveChartZone />

        {/* ─── Evidence Stack Panel ─── */}
        <div className="dashboard-panel--evidence-stack">
          <DashboardChromePanel
            frame={EvidenceStackFrame}
            title="Evidence Stack"
            eyebrow="Signal Alignment"
          >
            {evidenceStackFixture.map((item) => (
              <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
            ))}
          </DashboardChromePanel>
        </div>

        {/* ─── News & Macro Panel ─── */}
        <div className="dashboard-panel--news-macro">
          <DashboardChromePanel
            frame={NewsMacroFrame}
            title="News & Macro"
            eyebrow="Context Drivers"
          >
            {newsMacroFixture.map((item) => (
              <DataRow key={item.label} label={item.label} value={item.value} tone={item.tone} />
            ))}
          </DashboardChromePanel>
        </div>

        {/* ─── Coaching Panel ─── */}
        <div className="dashboard-panel--coaching">
          <DashboardChromePanel
            frame={CoachingFrame}
            title="Coaching Insights"
            eyebrow="Decision Support"
          >
            <p className="dashboard-metric-value" style={{ marginTop: 2 }}>
              {coachingFixture.headline}
            </p>
            <p style={{ margin: "6px 0 0", color: "#c4bab0" }}>
              {coachingFixture.body}
            </p>
          </DashboardChromePanel>
        </div>

        {/* ─── Market Regime Panel ─── */}
        <div className="dashboard-panel--market-regime">
          <DashboardChromePanel
            frame={MarketRegimeFrame}
            title="Market Regime"
            eyebrow="Environment State"
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
              {marketRegimeFixture.map((item) => (
                <div key={item.label} style={{ minWidth: "100px" }}>
                  <DataRow label={item.label} value={item.value} tone={item.tone} />
                </div>
              ))}
            </div>
          </DashboardChromePanel>
        </div>
      </DashboardResponsiveShell>
    </div>
  );
}
