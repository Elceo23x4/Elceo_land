import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import ConfidenceGauge from "../../assets/source/dashboard/gauges/elceo-svg-07-confidence-gauge-display-safe.svg?react";
import ContradictionGauge from "../../assets/source/dashboard/gauges/elceo-svg-07-contradiction-gauge-display-safe.svg?react";
import FreshnessGauge from "../../assets/source/dashboard/gauges/elceo-svg-07-freshness-gauge-display-safe.svg?react";
import ZoneStrengthGauge from "../../assets/source/dashboard/gauges/elceo-svg-07-zone-strength-gauge-display-safe.svg?react";

const ctx = dashboardReasoningFixture.confidenceContext;

interface ConfidenceContextPanelProps {
  section: "header" | "body";
}

const gauges = [
  { Svg: ConfidenceGauge, label: "Confidence", value: ctx.confidenceLabel, color: "elceo-color-bullish" },
  { Svg: ContradictionGauge, label: "Contradiction", value: ctx.contradiction, color: "elceo-color-bearish" },
  { Svg: FreshnessGauge, label: "Freshness", value: ctx.freshness, color: "elceo-color-amber" },
  { Svg: ZoneStrengthGauge, label: "Zone Strength", value: ctx.zoneStrength, color: "elceo-color-bullish" },
];

export default function ConfidenceContextPanel({ section }: ConfidenceContextPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr">
        <p className="elceo-typo-eyebrow">Reasoning Matrix</p>
        <h3 className="elceo-typo-title">Confidence &amp; Context</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-gauge-grid">
        {gauges.map((g, i) => (
          <div className="elceo-gauge-cell" key={i}>
            <div className="elceo-gauge-cell__svg">
              <g.Svg />
            </div>
            <span className="elceo-gauge-cell__label">{g.label}</span>
            <span className={`elceo-gauge-cell__value ${g.color}`}>
              {String(g.value).charAt(0).toUpperCase() + String(g.value).slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
