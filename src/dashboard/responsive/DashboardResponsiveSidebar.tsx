/**
 * DashboardResponsiveSidebar.tsx
 *
 * Sidebar using elceo-sidebar-uni.svg as visual source of truth.
 * 10 icon groups baked into the SVG. Hitboxes absolutely positioned
 * using the SVG icon y-coordinates. Moving active selector overlay.
 */

import { useState } from "react";
import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

const SIDEBAR_VIEWBOX_HEIGHT = 731;

const SIDEBAR_ITEMS = [
  { id: "cockpit", title: "Market Cockpit", y: 60.9167 },
  { id: "macro", title: "News & Macro", y: 127.3712 },
  { id: "assets", title: "Watchlist Assets", y: 193.8258 },
  { id: "evidence", title: "Evidence Stack", y: 260.2803 },
  { id: "alerts", title: "Market Alerts", y: 326.7348 },
  { id: "regime", title: "Market Regime", y: 393.1894 },
  { id: "journal", title: "Journal & Notes", y: 459.6439 },
  { id: "calendar", title: "Market Calendar", y: 526.0985 },
  { id: "academy", title: "Coaching Review", y: 592.553 },
  { id: "settings", title: "Dashboard Settings", y: 659.0076 },
];

export default function DashboardResponsiveSidebar() {
  const [activeItem, setActiveItem] = useState("cockpit");

  const active = SIDEBAR_ITEMS.find((item) => item.id === activeItem) ?? SIDEBAR_ITEMS[0];

  return (
    <div
      className={`dashboard-precision-sidebar dashboard-precision-sidebar--active-${activeItem}`}
      style={{ ...boardRectStyle(SHELL_RECTS.sidebarRail), zIndex: 30 }}
    >
      <div className="dashboard-precision-sidebar-frame" aria-hidden="true">
        <SidebarRailFrame preserveAspectRatio="none" />
      </div>

      {/* Moving active selector */}
      <div
        className="dashboard-sidebar-active-selector"
        style={{ top: `${(active.y / SIDEBAR_VIEWBOX_HEIGHT) * 100}%` }}
        aria-hidden="true"
      />

      {/* Hitbox layer — absolutely positioned over SVG icon centers */}
      <div className="dashboard-sidebar-hitbox-layer">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dashboard-sidebar-hitbox${activeItem === item.id ? " dashboard-sidebar-hitbox--active" : ""}`}
            style={{ top: `${(item.y / SIDEBAR_VIEWBOX_HEIGHT) * 100}%` }}
            aria-label={item.title}
            title={item.title}
            aria-pressed={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
