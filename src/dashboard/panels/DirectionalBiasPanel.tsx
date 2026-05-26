import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import { HoverInsightPopover } from "../components/workspace";
import ArrowUp from "../../assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg?react";

const bias = dashboardReasoningFixture.directionalBias;

interface DirectionalBiasPanelProps {
  section: "header" | "body";
}

export default function DirectionalBiasPanel({ section }: DirectionalBiasPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr">
        <p className="elceo-typo-eyebrow">Reasoning Snapshot</p>
        <h3 className="elceo-typo-title">Directional Bias Summary</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-bias-body">
        <div className="elceo-bias-body__content">
          {/* Hero headline */}
          <p className="elceo-typo-hero--sm elceo-color-bullish" style={{ margin: 0 }}>
            {bias.headline}
          </p>

          {/* Stats row */}
          <div className="elceo-bias-stats">
            <div className="elceo-bias-stat">
              <span className="elceo-bias-stat__label">Direction</span>
              <span className="elceo-bias-stat__value elceo-color-bullish">Upside</span>
            </div>
            <div className="elceo-bias-stat">
              <span className="elceo-bias-stat__label">Strength</span>
              <span className="elceo-bias-stat__value">{bias.strength}</span>
            </div>
            <div className="elceo-bias-stat">
              <span className="elceo-bias-stat__label">Condition</span>
              <span className="elceo-bias-stat__value elceo-color-amber">Conditional</span>
            </div>
          </div>

          <div className="elceo-divider--subtle" />

          {/* Drivers */}
          <div className="elceo-bias-drivers">
            {bias.drivers.map((d, i) => (
              <div className="elceo-bias-driver" key={i}>
                <span className={`elceo-bias-driver__dot elceo-bias-driver__dot--${d.tone}`} />
                <span className="elceo-bias-driver__text">
                  <strong>{d.label}</strong> &mdash; {d.summary}
                </span>
              </div>
            ))}
          </div>

          {/* Caveat + popover */}
          <p className="elceo-bias-caveat">{bias.watchCondition}</p>
          <HoverInsightPopover
            trigger="Why conditional?"
            title="Conditional Reasoning"
            summary="Pressure state requires structure confirmation."
            detail={
              <p style={{ margin: 0, fontSize: "10px", color: "rgba(160,145,130,0.75)", lineHeight: 1.5 }}>
                {bias.invalidationNote}
              </p>
            }
            side="bottom"
          />
        </div>

        {/* Directional arrow graphic */}
        <div className="elceo-bias-body__graphic">
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}
