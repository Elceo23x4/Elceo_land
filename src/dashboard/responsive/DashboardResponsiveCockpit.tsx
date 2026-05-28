/**
 * DashboardResponsiveCockpit.tsx
 *
 * Top-level responsive dashboard component using fluid coordinate canvas.
 * Replaces the old absolute 1920×1080 cockpit as the active /dashboard view.
 *
 * Architecture:
 * - Fluid canvas fills 100vw × 100dvh (NO poster / contain / aspect-ratio board)
 * - All elements positioned by board-reference percentages (1920×1080 design ref)
 * - X scales with browser width, Y scales with browser height
 * - Isolated SVG frames as panel/shell chrome
 * - Real DOM content inside precision content slots
 * - Internal scroll where needed
 * - Adaptive typography via clamp() + container queries
 *
 * This is NOT the old full-board SVG runtime.
 * This is NOT generic CSS grid fractions.
 * This is NOT a poster/centered 16:9 board.
 * This is a fluid coordinate canvas that fills the viewport.
 */

import { TopSystemBarFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import { dashboardAccessFixture, notificationFixture } from "./responsivePanelFixtures";
import DashboardResponsiveBackground from "./DashboardResponsiveBackground";
import DashboardResponsiveChartZone from "./DashboardResponsiveChartZone";
import DashboardResponsivePanelLayer from "./DashboardResponsivePanelLayer";
import DashboardResponsiveSidebar from "./DashboardResponsiveSidebar";

import "./dashboardResponsiveLayout.css";
import "./dashboardResponsivePanels.css";
import "./dashboardResponsiveTypography.css";
import "./dashboardResponsiveChart.css";

export default function DashboardResponsiveCockpit() {
  return (
    <div className="dashboard-precision-viewport">
      <div className="dashboard-precision-board">
        {/* ─── Background layers (z-index 0) ─── */}
        <DashboardResponsiveBackground />

        {/* ─── Central wheel + chart glass + chart frame + chart display ─── */}
        <DashboardResponsiveChartZone />

        {/* ─── Panel frames + content slots (z-index 12–20) ─── */}
        <DashboardResponsivePanelLayer />

        {/* ─── Topbar (z-index 30) ─── */}
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
            <span className="dashboard-precision-topbar-badge">{dashboardAccessFixture.plan}</span>
            <span className="dashboard-precision-topbar-badge dashboard-precision-topbar-badge--fixture">
              {dashboardAccessFixture.providerMode}
            </span>
            <span className="dashboard-precision-topbar-badge">{dashboardAccessFixture.providerReadiness}</span>
            <span className="dashboard-precision-topbar-badge" title="Notifications">{notificationFixture.inboxCount}</span>
            <span className="dashboard-precision-topbar-clock">UTC —:—</span>
          </div>
        </div>

        {/* ─── Sidebar (z-index 30) ─── */}
        <DashboardResponsiveSidebar />
      </div>
    </div>
  );
}
