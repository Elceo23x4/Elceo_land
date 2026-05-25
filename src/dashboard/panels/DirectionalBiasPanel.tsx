import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import { HoverInsightPopover } from "../components/workspace";

const bias = dashboardReasoningFixture.directionalBias;

interface DirectionalBiasPanelProps {
  section: "header" | "body";
}

export default function DirectionalBiasPanel({ section }: DirectionalBiasPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-header-content">
        <p className="elceo-panel-frame__eyebrow">Reasoning Snapshot</p>
        <h3 className="elceo-panel-frame__title">Directional Bias</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-body-content">
      <p className="elceo-directional-panel__headline">{bias.headline}</p>
      <div className="elceo-panel-mini-grid">
        <div className="elceo-panel-mini-grid__item">
          <span className="elceo-panel-mini-grid__label">Direction</span>
          <span className="elceo-panel-mini-grid__value elceo-panel-mini-grid__value--positive">{bias.direction.replace("_", " ")}</span>
        </div>
        <div className="elceo-panel-mini-grid__item">
          <span className="elceo-panel-mini-grid__label">Strength</span>
          <span className="elceo-panel-mini-grid__value">{bias.strength}</span>
        </div>
        <div className="elceo-panel-mini-grid__item">
          <span className="elceo-panel-mini-grid__label">Condition</span>
          <span className="elceo-panel-mini-grid__value">Conditional</span>
        </div>
      </div>
      <div className="elceo-panel-driver-list">
        {bias.drivers.map((d, i) => (
          <div key={i} className={`elceo-panel-driver-row elceo-panel-driver-row--${d.tone}`}>
            <span className="elceo-panel-driver-row__label">{d.label}</span>
          </div>
        ))}
      </div>
      <p className="elceo-panel-watch">{bias.watchCondition}</p>
      <HoverInsightPopover trigger="Why conditional?" title="Conditional Reasoning" summary="The pressure state is not enough without structure confirmation." detail={<p style={{ margin: 0, fontSize: "0.6rem", color: "#8a8178", lineHeight: 1.5 }}>{bias.invalidationNote}</p>} side="bottom" />
      <p className="elceo-panel-caveat">Fixture-only · provider pending</p>
    </div>
  );
}
