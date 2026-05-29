/**
 * DashboardChartOverlayInspector.tsx
 *
 * Compact floating inspector shown when a chart overlay element is selected.
 * Shows structured context: title, kind, strength, freshness, linked panel, notes.
 * Dark glass HUD style. Positioned bottom-right inside chart frame.
 * Fixture-only. Market language only.
 */

import { getOverlayItemById, type LinkedPanel } from "./chartIntelligenceFixture";
import { assetContextBySymbol } from "./responsivePanelFixtures";
import { getDashboardCognitionSnapshot } from "./dashboardCognitionFixtureEngine";
import { getDashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";

const PANEL_LABELS: Record<LinkedPanel, string> = {
  bias: "Directional Bias",
  confidence: "Confidence & Context",
  evidence: "Evidence Stack",
  macro: "News & Macro",
  regime: "Market Regime",
};

interface InspectorProps {
  selectedId: string | null;
  onClose: () => void;
  activeAsset?: string;
  activeTimeframe?: string;
}

export default function DashboardChartOverlayInspector({ selectedId, onClose, activeAsset, activeTimeframe }: InspectorProps) {
  if (!selectedId) return null;

  const item = getOverlayItemById(selectedId);
  if (!item) return null;

  const assetSymbol = activeAsset || "XAU/USD";
  const tf = activeTimeframe || "1H";
  const assetCtx = assetContextBySymbol[assetSymbol];
  const cognition = getDashboardCognitionSnapshot(assetSymbol, tf);
  const scenario = getDashboardScenarioSnapshot(assetSymbol, tf, cognition);

  let title = "";
  let kind = "";
  let strength: number | null = null;
  let confidence: number | null = null;
  let freshness = "";
  let linkedPanel: LinkedPanel = "evidence";
  let note = "";
  let whyItMatters = "";
  let caution = "";
  let actionLabel = "Inspect Context";
  let assetContextLine = "";

  if (item.type === "zone") {
    title = `${assetSymbol} ${item.label}`;
    kind = item.kind;
    strength = cognition.zoneStrengthScore;
    freshness = cognition.freshnessScore >= 65 ? "Current" : "Watch";
    linkedPanel = item.linkedPanel;
    const structureEvidence = scenario.evidenceItems.find(e => e.chartLink === "structure-zone");
    note = structureEvidence?.summary ?? item.note;
    whyItMatters = cognition.zoneReason;
    caution = item.caution ?? "";
    actionLabel = "View Evidence Context";
    assetContextLine = `${assetSymbol} · ${tf} — Zone strength: ${cognition.zoneStrengthScore}%. ${scenario.conditionSummary}`;
  } else if (item.type === "marker") {
    title = `${assetSymbol} ${item.label}`;
    kind = item.kind.replace(/_/g, " ");
    freshness = cognition.freshnessScore >= 65 ? "Current" : "Watch";
    linkedPanel = item.linkedPanel;
    if (item.kind === "contradiction") {
      const contraItem = scenario.contradictionItems[0];
      note = contraItem?.summary ?? item.note;
      whyItMatters = `Contradiction: ${cognition.contradictionScore}%. ${cognition.contradictionReason}`;
    } else if (item.kind === "macro_event") {
      const macroEvidence = scenario.evidenceItems.find(e => e.chartLink === "macro-marker");
      note = macroEvidence?.summary ?? item.note;
      whyItMatters = item.whyItMatters;
    } else {
      note = item.note;
      whyItMatters = item.whyItMatters;
    }
    actionLabel = "Inspect Market Context";
    assetContextLine = `${assetSymbol} · ${tf} — ${cognition.macroSensitivity}`;
  } else if (item.type === "annotation") {
    title = `${item.title} — ${assetSymbol}`;
    kind = "annotation";
    freshness = cognition.freshnessScore >= 65 ? "Current" : "Watch";
    linkedPanel = item.panelLink;
    note = item.body;
    whyItMatters = `Evidence tags: ${item.evidenceTags.join(", ")}`;
    actionLabel = item.actionLabel;
    assetContextLine = `${assetSymbol} · ${tf} — Scenario confidence: ${scenario.scenarioConfidence}%.`;
  } else if (item.type === "path") {
    title = `${item.label} — ${assetSymbol}`;
    kind = "scenario path";
    confidence = scenario.scenarioConfidence;
    linkedPanel = item.linkedPanel;
    note = scenario.primaryScenario;
    whyItMatters = scenario.conditionSummary;
    actionLabel = "Review Scenario";
    assetContextLine = `${assetSymbol} · ${tf} — Review window: ${scenario.reviewWindow}`;
  }

  return (
    <div className="dashboard-chart-inspector" role="dialog" aria-label="Chart overlay inspector">
      <div className="dashboard-chart-inspector__header">
        <span className="dashboard-chart-inspector__title">{title}</span>
        <button
          type="button"
          className="dashboard-chart-inspector__close"
          onClick={onClose}
          aria-label="Close inspector"
        >
          ✕
        </button>
      </div>

      <div className="dashboard-chart-inspector__body">
        <div className="dashboard-chart-inspector__row">
          <span className="dashboard-chart-inspector__label">Kind</span>
          <span className="dashboard-chart-inspector__value">{kind}</span>
        </div>

        {strength !== null && (
          <div className="dashboard-chart-inspector__row">
            <span className="dashboard-chart-inspector__label">Strength</span>
            <span className="dashboard-chart-inspector__value">{strength}%</span>
          </div>
        )}

        {confidence !== null && (
          <div className="dashboard-chart-inspector__row">
            <span className="dashboard-chart-inspector__label">Confidence</span>
            <span className="dashboard-chart-inspector__value">{confidence}%</span>
          </div>
        )}

        {freshness && (
          <div className="dashboard-chart-inspector__row">
            <span className="dashboard-chart-inspector__label">Freshness</span>
            <span className="dashboard-chart-inspector__value">{freshness}</span>
          </div>
        )}

        <div className="dashboard-chart-inspector__row">
          <span className="dashboard-chart-inspector__label">Linked panel</span>
          <span className="dashboard-chart-inspector__value dashboard-chart-inspector__value--link">
            {PANEL_LABELS[linkedPanel]}
          </span>
        </div>

        <p className="dashboard-chart-inspector__note">{note}</p>

        {whyItMatters && (
          <p className="dashboard-chart-inspector__why">{whyItMatters}</p>
        )}

        {caution && (
          <p className="dashboard-chart-inspector__caution">{caution}</p>
        )}

        {assetContextLine && (
          <p className="dashboard-chart-inspector__note" style={{ opacity: 0.7, fontSize: "10px", marginTop: "4px" }}>{assetContextLine}</p>
        )}
      </div>

      <div className="dashboard-chart-inspector__actions">
        <button type="button" className="dashboard-chart-inspector__action">{actionLabel}</button>
        <button type="button" className="dashboard-chart-inspector__action">Inspect Freshness</button>
        <button type="button" className="dashboard-chart-inspector__action">Save Market Note</button>
      </div>
    </div>
  );
}
