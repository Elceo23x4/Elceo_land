/**
 * DashboardResponsiveCockpit.tsx
 *
 * Top-level responsive dashboard component using precision coordinate board.
 * Replaces the old absolute 1920×1080 cockpit as the active /dashboard view.
 *
 * Architecture:
 * - Fluid board preserves 16:9 aspect ratio, fills viewport without crop
 * - All elements positioned by board-reference percentages (1920×1080 design ref)
 * - Isolated SVG frames as panel/shell chrome
 * - Real DOM content inside precision content slots
 * - Internal scroll where needed
 * - Adaptive typography via clamp() + container queries
 *
 * This is NOT the old full-board SVG runtime.
 * This is NOT generic CSS grid fractions.
 * This is a coordinate-driven responsive board.
 */

import { TopSystemBarFrame, SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import DashboardResponsiveBackground from "./DashboardResponsiveBackground";
import DashboardResponsiveChartZone from "./DashboardResponsiveChartZone";
import DashboardResponsivePanelLayer from "./DashboardResponsivePanelLayer";

import "./dashboardResponsiveLayout.css";
import "./dashboardResponsivePanels.css";
import "./dashboardResponsiveTypography.css";

/* ─── Sidebar nav items ─── */
const SIDEBAR_ITEMS = [
  { id: "overview", label: "OV", active: true },
  { id: "chart", label: "CH", active: false },
  { id: "watchlist", label: "WL", active: false },
  { id: "macro", label: "MA", active: false },
  { id: "coaching", label: "CO", active: false },
  { id: "settings", label: "ST", active: false },
];

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
            <span className="dashboard-precision-topbar-badge dashboard-precision-topbar-badge--fixture">
              Fixture Mode
            </span>
            <span className="dashboard-precision-topbar-badge">Provider Pending</span>
            <span className="dashboard-precision-topbar-clock">UTC —:—</span>
          </div>
        </div>

        {/* ─── Sidebar (z-index 30) ─── */}
        <div
          className="dashboard-precision-sidebar"
          style={{ ...boardRectStyle(SHELL_RECTS.sidebarRail), zIndex: 30 }}
        >
          <div className="dashboard-precision-sidebar-frame" aria-hidden="true">
            <SidebarRailFrame preserveAspectRatio="none" />
          </div>
          <nav className="dashboard-precision-sidebar-content" aria-label="Dashboard navigation">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`dashboard-precision-sidebar-icon${item.active ? " dashboard-precision-sidebar-icon--active" : ""}`}
                title={item.id}
                role="button"
                tabIndex={0}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
