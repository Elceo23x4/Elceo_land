/**
 * DashboardChartOverlayInspector.tsx
 *
 * Compact floating inspector shown when a chart overlay element is selected.
 * Shows structured context: title, kind, strength, freshness, linked panel, notes.
 * Dark glass HUD style. Positioned bottom-right inside chart frame.
 * Fixture-only. Market language only.
 */

import { getOverlayItemById, type LinkedPanel } from "./chartIntelligenceFixture";

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
}

export default function DashboardChartOverlayInspector({ selectedId, onClose }: InspectorProps) {
  if (!selectedId) return null;

  const item = getOverlayItemById(selectedId);
  if (!item) return null;

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

  if (item.type === "zone") {
    title = item.label;
    kind = item.kind;
    strength = item.strength;
    freshness = item.freshness;
    linkedPanel = item.linkedPanel;
    note = item.note;
    whyItMatters = item.whyItMatters;
    caution = item.caution ?? "";
    actionLabel = "View Evidence Context";
  } else if (item.type === "marker") {
    title = item.label;
    kind = item.kind.replace(/_/g, " ");
    freshness = item.freshness;
    linkedPanel = item.linkedPanel;
    note = item.note;
    whyItMatters = item.whyItMatters;
    actionLabel = "Inspect Market Context";
  } else if (item.type === "annotation") {
    title = item.title;
    kind = "annotation";
    freshness = item.freshness;
    linkedPanel = item.panelLink;
    note = item.body;
    whyItMatters = `Evidence tags: ${item.evidenceTags.join(", ")}`;
    actionLabel = item.actionLabel;
  } else if (item.type === "path") {
    title = item.label;
    kind = "scenario path";
    confidence = item.confidence;
    linkedPanel = item.linkedPanel;
    note = item.condition;
    whyItMatters = item.alternativeNote;
    actionLabel = "Review Scenario";
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
      </div>

      <div className="dashboard-chart-inspector__actions">
        <button type="button" className="dashboard-chart-inspector__action">{actionLabel}</button>
        <button type="button" className="dashboard-chart-inspector__action">Inspect Freshness</button>
        <button type="button" className="dashboard-chart-inspector__action">Save Market Note</button>
      </div>
    </div>
  );
}
