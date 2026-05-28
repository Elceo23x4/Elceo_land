/**
 * Responsive Dashboard — Barrel Export
 *
 * Precision coordinate board replacing the legacy absolute 1920×1080 layout
 * and the generic CSS grid layout (R1).
 */
export { default as DashboardResponsiveCockpit } from "./DashboardResponsiveCockpit";
export { default as DashboardResponsiveShell } from "./DashboardResponsiveShell";
export { default as DashboardChromePanel } from "./DashboardChromePanel";
export { default as DashboardResponsiveChartZone } from "./DashboardResponsiveChartZone";
export { default as DashboardResponsiveBackground } from "./DashboardResponsiveBackground";
export { default as DashboardResponsivePanelLayer } from "./DashboardResponsivePanelLayer";
export { panelRegistry } from "./panelRegistry";
export {
  BOARD_SIZE,
  SHELL_RECTS,
  PANEL_FRAME_RECTS,
  PANEL_CONTENT_RECTS,
  boardRectStyle,
} from "./dashboardResponsiveGeometry";
