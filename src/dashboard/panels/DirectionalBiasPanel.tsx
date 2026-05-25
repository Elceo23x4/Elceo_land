import PanelFrame from "./PanelFrame";
import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import { HoverInsightPopover } from "../components/workspace";

const bias = dashboardReasoningFixture.directionalBias;

export default function DirectionalBiasPanel() {
  return (
    <PanelFrame title="Directional Bias" eyebrow="Reasoning Snapshot" compact>
      <p className="elceo-directional-panel__headline">{bias.headline}</p>

      <div className="elceo-panel-mini-grid">
        <div className="elceo-panel-mini-grid__item">
          <span className="elceo-panel-mini-grid__label">Direction</span>
          <span className="elceo-panel-mini-grid__value elceo-panel-mini-grid__value--positive">
            {bias.direction.replace("_", " ")}
          </span>
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
            <span className="elceo-panel-driver-row__summary">{d.summary}</span>
          </div>
        ))}
      </div>

      <p className="elceo-panel-watch">{bias.watchCondition}</p>

      <div style={{ marginTop: 6 }}>
        <HoverInsightPopover
          trigger="Why conditional?"
          title="Conditional Reasoning"
          summary="The pressure state is not enough without structure confirmation."
          detail={
            <p style={{ margin: 0, fontSize: "0.6rem", color: "#8a8178", lineHeight: 1.6 }}>
              {bias.invalidationNote}
            </p>
          }
          side="right"
        />
      </div>

      <p className="elceo-panel-caveat">{bias.caveat}</p>
    </PanelFrame>
  );
}
