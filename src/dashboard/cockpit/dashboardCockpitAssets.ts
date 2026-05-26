/**
 * Dashboard Cockpit Shell Assets — Batch 6F
 */

// ─── Background ───
import NightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";
import BackgroundBaseTexture from "../../assets/source/dashboard/background/elceo-svg-10-background-base-texture.svg?react";
import HorizontalLightStreaks from "../../assets/source/dashboard/background/elceo-svg-10-horizontal-light-streaks.svg?react";
import ScanArcs from "../../assets/source/dashboard/background/elceo-svg-10-scan-arcs.svg?react";
import ParticleGlowField from "../../assets/source/dashboard/background/elceo-svg-10-particle-glow-field.svg?react";

// ─── Shell ───
// ContentPanels RevB: full-stage (viewBox 0 0 1920 1080), primary panel housing
import ContentPanels from "../../assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg?react";
// TopBar full-stage (viewBox 0 0 1920 1080) — renders topbar via internal positioning
import TopSystemBar from "../../assets/source/dashboard/shell/elceo-svg-05-top-system-bar-full-desktop.svg?react";
// TopBar isolated (viewBox 0 0 1920 120) — for coordinate-faithful placement
import TopSystemBarIsolated from "../../assets/source/dashboard/shell/elceo-svg-05-top-system-bar-isolated-empty.svg?react";
// Sidebar: full-stage (viewBox 0 0 1920 1080), far-left by SVG design
import SidebarRail from "../../assets/source/dashboard/shell/elceo-svg-04-sidebar-rail-complete-approved.svg?react";
// Central wheel: isolated (viewBox 0 0 1000 720)
import CentralWheel from "../../assets/source/dashboard/shell/elceo-svg-01-central-wheel-v1-isolated.svg?react";

// ─── Chart ───
import ChartConsoleFrame from "../../assets/source/dashboard/chart/elceo-svg-02-chart-console-frame.svg?react";

// ─── Connectors ───
import FullConnectorComposite from "../../assets/source/dashboard/connectors/elceo-svg-13-full-connector-composite.svg?react";

export {
  NightSky, DottedWorldMap, BackgroundBaseTexture, HorizontalLightStreaks, ScanArcs, ParticleGlowField,
  ContentPanels, TopSystemBar, TopSystemBarIsolated, SidebarRail, CentralWheel,
  ChartConsoleFrame, FullConnectorComposite,
};
