import { useState } from "react";
import PanelFrame from "./PanelFrame";
import { dashboardReasoningFixture } from "../fixtures/dashboardReasoningFixture";
import { PanelWorkspace, HoverInsightPopover, DetailDrawer } from "../components/workspace";
import { SafeStatusList, SystemNotice, StaleDataWarning } from "../components/system";

const ctx = dashboardReasoningFixture.confidenceContext;
const TABS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "drivers", label: "Drivers" },
  { id: "caution", label: "Caution" },
];

export default function ConfidenceContextPanel() {
  const [activeTab, setActiveTab] = useState("snapshot");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <PanelFrame title="Confidence & Context" eyebrow="Reasoning Matrix" density="ultra">
      <PanelWorkspace title="" tabs={TABS} activeTabId={activeTab} onTabChange={setActiveTab}>
        {activeTab === "snapshot" && (
          <div>
            <SafeStatusList items={ctx.contextRows} />
            <p className="elceo-panel-summary">{ctx.summary}</p>
          </div>
        )}
        {activeTab === "drivers" && (
          <div>
            <div className="elceo-panel-driver-list">
              {ctx.driverConflicts.map((c, i) => (
                <div key={i} className="elceo-panel-driver-row elceo-panel-driver-row--warning">
                  <span className="elceo-panel-driver-row__label">{c.label}</span>
                  <span className="elceo-panel-driver-row__summary">{c.detail}</span>
                </div>
              ))}
            </div>
            <HoverInsightPopover
              trigger="Why contradiction is medium"
              title="Contradiction Analysis"
              summary="Some drivers support the dominant bias while others remain unresolved."
              detail={
                <ul style={{ margin: 0, paddingLeft: "0.8rem", fontSize: "0.55rem", lineHeight: 1.6, color: "#8a8178" }}>
                  <li>Momentum: aligned</li>
                  <li>Macro: conflicting</li>
                  <li>Freshness: approaching threshold</li>
                </ul>
              }
              side="bottom"
            />
          </div>
        )}
        {activeTab === "caution" && (
          <div>
            {ctx.freshness !== "fresh" && (
              <StaleDataWarning severity={ctx.freshness === "stale" ? "high" : "medium"} lastUpdatedLabel="Fixture snapshot" />
            )}
            <SystemNotice tone="info" title="Fixture-only context">
              <p style={{ margin: 0, fontSize: "0.55rem" }}>Backend guards remain source of truth.</p>
            </SystemNotice>
            <button className="elceo-panel-detail-button" onClick={() => setDrawerOpen(true)} type="button">
              Open context detail
            </button>
          </div>
        )}
      </PanelWorkspace>
      <DetailDrawer open={drawerOpen} title="Context Detail" subtitle="Fixture-only reasoning preview" onClose={() => setDrawerOpen(false)}>
        <SafeStatusList items={[
          { label: "Source mode", value: "Fixture only", tone: "neutral" },
          { label: "Confidence", value: ctx.confidenceLabel, tone: "neutral" },
          { label: "Contradiction", value: ctx.contradiction, tone: "warning" },
          { label: "Freshness", value: ctx.freshness, tone: "warning" },
          { label: "Zone strength", value: ctx.zoneStrength, tone: "positive" },
        ]} />
        <p style={{ marginTop: "0.8rem", fontSize: "0.6rem", color: "#8a8178" }}>
          No raw provider data displayed. Fixture reasoning only.
        </p>
      </DetailDrawer>
    </PanelFrame>
  );
}
