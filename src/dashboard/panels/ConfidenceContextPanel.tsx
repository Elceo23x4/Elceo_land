import { useState } from "react";
import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import { DetailDrawer } from "../components/workspace";
import { SafeStatusList } from "../components/system";

const ctx = dashboardReasoningFixture.confidenceContext;

interface ConfidenceContextPanelProps {
  section: "header" | "body";
}

export default function ConfidenceContextPanel({ section }: ConfidenceContextPanelProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (section === "header") {
    return (
      <div className="elceo-panel-header-content">
        <p className="elceo-panel-frame__eyebrow">Reasoning Matrix</p>
        <h3 className="elceo-panel-frame__title">Confidence & Context</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-body-content elceo-confidence-panel-body">
      <SafeStatusList items={ctx.contextRows} />
      <p className="elceo-panel-summary">{ctx.summary}</p>
      <button className="elceo-panel-detail-button" onClick={() => setDrawerOpen(true)} type="button">
        Open context detail
      </button>
      <DetailDrawer open={drawerOpen} title="Context Detail" subtitle="Fixture-only reasoning preview" onClose={() => setDrawerOpen(false)}>
        <SafeStatusList items={[
          { label: "Source mode", value: "Fixture only", tone: "neutral" },
          { label: "Confidence", value: ctx.confidenceLabel, tone: "neutral" },
          { label: "Contradiction", value: ctx.contradiction, tone: "warning" },
          { label: "Freshness", value: ctx.freshness, tone: "warning" },
          { label: "Zone strength", value: ctx.zoneStrength, tone: "positive" },
        ]} />
        <p style={{ marginTop: "0.8rem", fontSize: "0.6rem", color: "#8a8178" }}>No raw provider data. Fixture reasoning only.</p>
      </DetailDrawer>
    </div>
  );
}
