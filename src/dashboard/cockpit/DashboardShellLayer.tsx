import {
  TopSystemBar,
  SidebarRail,
  ContentPanels,
  CentralWheel,
  FooterSlots,
} from "./dashboardCockpitAssets";
import { CENTRAL_WHEEL, FOOTER_SLOTS } from "./dashboardCockpitLayout";

/**
 * Structural shell layer: topbar, sidebar, content panels frame,
 * central radial wheel, footer slots.
 * Positioned absolutely within 1920×1080 stage.
 *
 * Batch 4 alignment:
 * - TopSystemBar, SidebarRail, ContentPanels have viewBox 0 0 1920 1080
 *   → rendered full-stage (inset 0).
 * - CentralWheel has viewBox 0 0 1000 720 → isolated, explicit position.
 * - FooterSlots has viewBox 0 330 680 120 → isolated, explicit position.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell" aria-hidden="true">
      {/* Content panels frame — full stage (viewBox 0 0 1920 1080) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — full stage (viewBox 0 0 1920 1080) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--topbar">
        <TopSystemBar />
      </div>

      {/* Sidebar rail — full stage (viewBox 0 0 1920 1080) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>

      {/* Central wheel / radial ring — isolated (viewBox 0 0 1000 720) */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel"
        style={{
          left: CENTRAL_WHEEL.x,
          top: CENTRAL_WHEEL.y,
          width: CENTRAL_WHEEL.w,
          height: CENTRAL_WHEEL.h,
        }}
      >
        <CentralWheel />
      </div>

      {/* Footer slots — isolated (viewBox 0 330 680 120) */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--footer"
        style={{
          left: FOOTER_SLOTS.x,
          top: FOOTER_SLOTS.y,
          width: FOOTER_SLOTS.w,
          height: FOOTER_SLOTS.h,
        }}
      >
        <FooterSlots />
      </div>
    </div>
  );
}
