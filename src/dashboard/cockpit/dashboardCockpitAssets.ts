/**
 * Dashboard Cockpit Shell Assets — Batch 3
 * Only imports SVGs required for the structural shell composition.
 * Does not import chart overlays, gauges, watchlist, evidence, or arrows yet.
 */

// ─── Background ───
import NightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";

// svg-10 partial atmosphere (use subtly, marked partial/revisit)
import BackgroundBaseTexture from "../../assets/source/dashboard/background/elceo-svg-10-background-base-texture.svg?react";
import HorizontalLightStreaks from "../../assets/source/dashboard/background/elceo-svg-10-horizontal-light-streaks.svg?react";
import ScanArcs from "../../assets/source/dashboard/background/elceo-svg-10-scan-arcs.svg?react";
import ParticleGlowField from "../../assets/source/dashboard/background/elceo-svg-10-particle-glow-field.svg?react";

// ─── Shell ───
import TopSystemBar from "../../assets/source/dashboard/shell/elceo-svg-05-top-system-bar-full-desktop.svg?react";
import SidebarRail from "../../assets/source/dashboard/shell/elceo-svg-04-sidebar-rail-complete-approved.svg?react";
import ContentPanels from "../../assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg?react";
import CentralWheel from "../../assets/source/dashboard/shell/elceo-svg-01-central-wheel-v1-isolated.svg?react";
import FooterSlots from "../../assets/source/dashboard/shell/elceo-svg-02-footer-slots.svg?react";

// ─── Chart ───
import ChartConsoleFrame from "../../assets/source/dashboard/chart/elceo-svg-02-chart-console-frame.svg?react";

// ─── Connectors ───
import FullConnectorComposite from "../../assets/source/dashboard/connectors/elceo-svg-13-full-connector-composite.svg?react";

export {
  // Background
  NightSky,
  DottedWorldMap,
  BackgroundBaseTexture,
  HorizontalLightStreaks,
  ScanArcs,
  ParticleGlowField,
  // Shell
  TopSystemBar,
  SidebarRail,
  ContentPanels,
  CentralWheel,
  FooterSlots,
  // Chart
  ChartConsoleFrame,
  // Connectors
  FullConnectorComposite,
};
