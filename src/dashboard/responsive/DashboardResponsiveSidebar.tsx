/**
 * DashboardResponsiveSidebar.tsx
 *
 * Sidebar using elceo-sidebar-uni.svg as visual source of truth.
 * Icons are baked into the SVG asset. Button overlay layer provides
 * click targets aligned over the asset's icon positions.
 */

import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

const SIDEBAR_BUTTONS: { id: string; title: string; active: boolean }[] = [
  { id: "cockpit", title: "Market Cockpit", active: true },
  { id: "chart", title: "Chart Context", active: false },
  { id: "assets", title: "Watchlist Assets", active: false },
  { id: "evidence", title: "Evidence Stack", active: false },
  { id: "macro", title: "News & Macro", active: false },
  { id: "regime", title: "Market Regime", active: false },
  { id: "journal", title: "Journal & Coaching", active: false },
];

export default function DashboardResponsiveSidebar() {
  return (
    <div
      className="dashboard-precision-sidebar"
      style={{ ...boardRectStyle(SHELL_RECTS.sidebarRail), zIndex: 30 }}
    >
      <div className="dashboard-precision-sidebar-frame" aria-hidden="true">
        <SidebarRailFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-sidebar-button-layer">
        {SIDEBAR_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className={`dashboard-sidebar-btn${btn.active ? " dashboard-sidebar-btn--active" : ""}`}
            aria-label={btn.title}
            title={btn.title}
          />
        ))}
      </div>
    </div>
  );
}
