/**
 * DashboardResponsiveCockpit.tsx
 *
 * R7F: Owns activeAsset + activeTimeframe + linkedPanel state.
 * Passes active asset/timeframe to chart zone, panel layer, and topbar.
 */

import { useState } from "react";
import { TopSystemBarFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import { assetContextBySymbol } from "./responsivePanelFixtures";
import type { LinkedPanel } from "./chartIntelligenceFixture";
import type { Timeframe } from "./DashboardTimeframeSelector";
import DashboardResponsiveBackground from "./DashboardResponsiveBackground";
import DashboardResponsiveChartZone from "./DashboardResponsiveChartZone";
import DashboardResponsivePanelLayer from "./DashboardResponsivePanelLayer";
import DashboardResponsiveSidebar from "./DashboardResponsiveSidebar";

import "./dashboardResponsiveLayout.css";
import "./dashboardResponsivePanels.css";
import "./dashboardResponsiveTypography.css";
import "./dashboardResponsiveChart.css";

export default function DashboardResponsiveCockpit() {
  const [activeAsset, setActiveAsset] = useState("XAU/USD");
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1H");
  const [linkedPanel, setLinkedPanel] = useState<LinkedPanel | null>(null);

  const ctx = assetContextBySymbol[activeAsset];

  return (
    <div className="dashboard-precision-viewport">
      <div className="dashboard-precision-board">
        <DashboardResponsiveBackground />

        <DashboardResponsiveChartZone
          activeAsset={activeAsset}
          activeTimeframe={activeTimeframe}
          onAssetChange={setActiveAsset}
          onTimeframeChange={setActiveTimeframe}
          onLinkedPanel={setLinkedPanel}
        />

        <DashboardResponsivePanelLayer
          activeAsset={activeAsset}
          activeTimeframe={activeTimeframe}
          linkedPanel={linkedPanel}
        />

        {/* ─── Topbar ─── */}
        <div
          className="dashboard-precision-topbar"
          style={{ ...boardRectStyle(SHELL_RECTS.topSystemBar), zIndex: 30 }}
        >
          <div className="dashboard-precision-topbar-frame" aria-hidden="true">
            <TopSystemBarFrame preserveAspectRatio="none" />
          </div>
          <div className="dashboard-precision-topbar-content">
            <span className="dashboard-precision-topbar-brand">ELCEO</span>
            <span className="dashboard-precision-topbar-title">Market Cognition Cockpit</span>
            <span className="dashboard-precision-topbar-spacer" />
            <span className="dashboard-precision-topbar-badge">{activeAsset}</span>
            <span className="dashboard-precision-topbar-badge">{activeTimeframe}</span>
            <span className="dashboard-precision-topbar-badge">{ctx?.assetClass ?? ""}</span>
            <span className="dashboard-precision-topbar-badge dashboard-precision-topbar-badge--fixture">
              Fixture Mode
            </span>
            <span className="dashboard-precision-topbar-badge">Market Data Pending</span>
            <span className="dashboard-precision-topbar-clock">UTC —:—</span>
          </div>
        </div>

        <DashboardResponsiveSidebar />
      </div>
    </div>
  );
}
