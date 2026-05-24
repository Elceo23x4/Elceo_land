// Dashboard Asset Manifest — Batch 1
// Typed catalog of all dashboard SVG assets migrated from incoming-dashboard-assets/

export type DashboardAssetCategory =
  | "shell"
  | "chart"
  | "panels"
  | "gauges"
  | "evidence"
  | "watchlist"
  | "background"
  | "connectors"
  | "arrows"
  | "maps"
  | "sky"
  | "master"
  | "preview"
  | "layer-map";

export type DashboardAssetStatus =
  | "approved"
  | "partial"
  | "pending_manual_asset_drop";

export type DashboardAssetImportMode =
  | "svgr"
  | "img"
  | "reference-only";

export interface DashboardAssetEntry {
  id: string;
  batch: string;
  revision?: string;
  name: string;
  category: DashboardAssetCategory;
  status: DashboardAssetStatus;
  sourcePath: string;
  notes: string;
  importMode: DashboardAssetImportMode;
}


export const dashboardAssetManifest: DashboardAssetEntry[] = [
  // ─── SHELL (svg-01) ───
  {
    id: "svg01-central-wheel",
    batch: "svg-01",
    revision: "v1",
    name: "Central Wheel Isolated",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-01-central-wheel-v1-isolated.svg",
    notes: "Central ring/wheel structural element",
    importMode: "svgr",
  },
  {
    id: "svg01-content-panels",
    batch: "svg-01",
    revision: "revb",
    name: "Content Panels Rev-B",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg",
    notes: "Main content panel frame structure",
    importMode: "svgr",
  },
  {
    id: "svg01-sidebar",
    batch: "svg-01",
    revision: "revb",
    name: "Sidebar Rev-B",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-01-sidebar-revb.svg",
    notes: "Left sidebar structural frame",
    importMode: "svgr",
  },
  {
    id: "svg01-topbar",
    batch: "svg-01",
    revision: "v1",
    name: "Topbar Empty",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-01-topbar-v1-empty.svg",
    notes: "Top bar frame — empty slot version",
    importMode: "svgr",
  },

  // ─── SHELL (svg-02 footer) ───
  {
    id: "svg02-footer-slots",
    batch: "svg-02",
    name: "Footer Slots",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-02-footer-slots.svg",
    notes: "Bottom footer slot structure",
    importMode: "svgr",
  },
  // ─── SHELL (svg-04) ───
  {
    id: "svg04-active-nav-state",
    batch: "svg-04",
    name: "Active Nav State",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-04-active-nav-state-display-safe.svg",
    notes: "Navigation active/selected state visual",
    importMode: "svgr",
  },
  {
    id: "svg04-nav-icons",
    batch: "svg-04",
    name: "Nav Icons",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-04-nav-icons-display-safe.svg",
    notes: "Sidebar navigation icon set",
    importMode: "svgr",
  },
  {
    id: "svg04-sidebar-rail-complete",
    batch: "svg-04",
    name: "Sidebar Rail Complete Approved",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-04-sidebar-rail-complete-approved.svg",
    notes: "Full sidebar rail — approved final",
    importMode: "svgr",
  },
  {
    id: "svg04-sidebar-rail-frame",
    batch: "svg-04",
    name: "Sidebar Rail Frame Only",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-04-sidebar-rail-frame-only.svg",
    notes: "Sidebar rail frame without icons",
    importMode: "svgr",
  },

  // ─── SHELL (svg-05) ───
  {
    id: "svg05-dividers-segmentation",
    batch: "svg-05",
    name: "Dividers Segmentation",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-05-dividers-segmentation-display-safe.svg",
    notes: "Top bar divider/segmentation lines",
    importMode: "svgr",
  },
  {
    id: "svg05-notification-cluster",
    batch: "svg-05",
    name: "Notification Cluster Empty",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-05-notification-cluster-empty-display-safe.svg",
    notes: "Notification area — empty state",
    importMode: "svgr",
  },
  {
    id: "svg05-status-session-time",
    batch: "svg-05",
    name: "Status Session Time Modules",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-05-status-session-time-modules-display-safe.svg",
    notes: "Status, session, and time display modules",
    importMode: "svgr",
  },
  {
    id: "svg05-top-system-bar-full",
    batch: "svg-05",
    name: "Top System Bar Full Desktop",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-05-top-system-bar-full-desktop.svg",
    notes: "Complete top system bar for desktop",
    importMode: "svgr",
  },
  {
    id: "svg05-top-system-bar-isolated",
    batch: "svg-05",
    name: "Top System Bar Isolated Empty",
    category: "shell",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-05-top-system-bar-isolated-empty.svg",
    notes: "Top system bar — isolated empty frame",
    importMode: "svgr",
  },

  // ─── SHELL (svg-11 partial) ───
  {
    id: "svg11-ai-hub-button",
    batch: "svg-11",
    name: "AI Hub Button",
    category: "shell",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-11-ai-hub-button.svg",
    notes: "Portrait variant — AI hub button. Partial/revisit.",
    importMode: "svgr",
  },
  {
    id: "svg11-bottom-nav",
    batch: "svg-11",
    name: "Bottom Nav",
    category: "shell",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-11-bottom-nav.svg",
    notes: "Portrait variant — bottom navigation bar. Partial/revisit.",
    importMode: "svgr",
  },
  {
    id: "svg11-portrait-main-frame",
    batch: "svg-11",
    name: "Portrait Main Frame",
    category: "shell",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/shell/elceo-svg-11-portrait-main-frame.svg",
    notes: "Portrait variant — main structural frame. Partial/revisit.",
    importMode: "svgr",
  },
  // ─── CHART (svg-02) ───
  {
    id: "svg02-central-chart-console-complete",
    batch: "svg-02",
    name: "Central Chart Console Complete",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-02-central-chart-console-complete.svg",
    notes: "Full chart console with all elements",
    importMode: "svgr",
  },
  {
    id: "svg02-chart-console-frame",
    batch: "svg-02",
    name: "Chart Console Frame",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-02-chart-console-frame.svg",
    notes: "Chart console frame/housing only",
    importMode: "svgr",
  },

  // ─── CHART (svg-03) ───
  {
    id: "svg03-composed-overlay",
    batch: "svg-03",
    name: "Composed Overlay Only",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-composed-overlay-only.svg",
    notes: "All chart overlays composed together",
    importMode: "svgr",
  },
  {
    id: "svg03-guides-anchors",
    batch: "svg-03",
    name: "Guides and Anchors",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-guides-and-anchors-display-safe.svg",
    notes: "Chart guide lines and anchor points",
    importMode: "svgr",
  },
  {
    id: "svg03-market-structure-markers",
    batch: "svg-03",
    name: "Market Structure Markers",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-market-structure-markers-display-safe.svg",
    notes: "Market structure visual markers",
    importMode: "svgr",
  },
  {
    id: "svg03-projection-paths",
    batch: "svg-03",
    name: "Projection Paths Up/Down",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-projection-paths-up-down-display-safe.svg",
    notes: "Directional projection path overlays",
    importMode: "svgr",
  },
  {
    id: "svg03-trade-markers",
    batch: "svg-03",
    name: "Trade Markers",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-trade-markers-display-safe.svg",
    notes: "Trade entry/exit marker visuals",
    importMode: "svgr",
  },
  {
    id: "svg03-zones",
    batch: "svg-03",
    name: "Zones",
    category: "chart",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-03-zones-display-safe.svg",
    notes: "Chart zone overlays (support/resistance areas)",
    importMode: "svgr",
  },

  // ─── CHART (svg-11 partial) ───
  {
    id: "svg11-portrait-chart-hub",
    batch: "svg-11",
    name: "Portrait Chart Hub",
    category: "chart",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/chart/elceo-svg-11-portrait-chart-hub.svg",
    notes: "Portrait variant — chart hub. Partial/revisit.",
    importMode: "svgr",
  },
  // ─── PANELS (svg-06) ───
  {
    id: "svg06-panel-border-medium",
    batch: "svg-06",
    name: "Panel Border Medium",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-border-medium.svg",
    notes: "Medium panel border frame",
    importMode: "svgr",
  },
  {
    id: "svg06-panel-border-small",
    batch: "svg-06",
    name: "Panel Border Small",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg",
    notes: "Small panel border frame",
    importMode: "svgr",
  },
  {
    id: "svg06-panel-border-tall",
    batch: "svg-06",
    name: "Panel Border Tall",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-border-tall.svg",
    notes: "Tall panel border frame",
    importMode: "svgr",
  },
  {
    id: "svg06-panel-border-wide",
    batch: "svg-06",
    name: "Panel Border Wide",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-border-wide.svg",
    notes: "Wide panel border frame",
    importMode: "svgr",
  },

  {
    id: "svg06-panel-cell-divider",
    batch: "svg-06",
    name: "Panel Cell Divider System",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-cell-divider-system.svg",
    notes: "Internal panel cell divider lines",
    importMode: "svgr",
  },
  {
    id: "svg06-panel-states",
    batch: "svg-06",
    name: "Panel States",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-states-display-safe.svg",
    notes: "Panel visual states (active, inactive, alert)",
    importMode: "svgr",
  },
  {
    id: "svg06-panel-title-number",
    batch: "svg-06",
    name: "Panel Title Number System",
    category: "panels",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-06-panel-title-number-system.svg",
    notes: "Panel title and numbering system",
    importMode: "svgr",
  },
  // ─── PANELS (svg-11 partial) ───
  {
    id: "svg11-portrait-panel-system",
    batch: "svg-11",
    name: "Portrait Panel System",
    category: "panels",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/panels/elceo-svg-11-portrait-panel-system.svg",
    notes: "Portrait variant — panel system. Partial/revisit.",
    importMode: "svgr",
  },

  // ─── GAUGES (svg-07) ───
  {
    id: "svg07-confidence-gauge",
    batch: "svg-07",
    name: "Confidence Gauge",
    category: "gauges",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/gauges/elceo-svg-07-confidence-gauge-display-safe.svg",
    notes: "Confidence level gauge",
    importMode: "svgr",
  },
  {
    id: "svg07-contradiction-gauge",
    batch: "svg-07",
    name: "Contradiction Gauge",
    category: "gauges",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/gauges/elceo-svg-07-contradiction-gauge-display-safe.svg",
    notes: "Signal contradiction gauge",
    importMode: "svgr",
  },
  {
    id: "svg07-freshness-gauge",
    batch: "svg-07",
    name: "Freshness Gauge",
    category: "gauges",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/gauges/elceo-svg-07-freshness-gauge-display-safe.svg",
    notes: "Data freshness gauge",
    importMode: "svgr",
  },
  {
    id: "svg07-semicircle-gauges-ref",
    batch: "svg-07",
    name: "Semicircle Gauges Reference Corrected",
    category: "gauges",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/gauges/elceo-svg-07-semicircle-gauges-reference-corrected.svg",
    notes: "Reference sheet for semicircle gauge system",
    importMode: "svgr",
  },
  {
    id: "svg07-zone-strength-gauge",
    batch: "svg-07",
    name: "Zone Strength Gauge",
    category: "gauges",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/gauges/elceo-svg-07-zone-strength-gauge-display-safe.svg",
    notes: "Zone strength meter gauge",
    importMode: "svgr",
  },

  // ─── EVIDENCE (svg-08) ───
  {
    id: "svg08-coaching-icons",
    batch: "svg-08",
    name: "Coaching Icons",
    category: "evidence",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/evidence/elceo-svg-08-coaching-icons.svg",
    notes: "Coaching/guidance icon set",
    importMode: "svgr",
  },
  {
    id: "svg08-evidence-icons",
    batch: "svg-08",
    name: "Evidence Icons",
    category: "evidence",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/evidence/elceo-svg-08-evidence-icons.svg",
    notes: "Evidence/proof icon set",
    importMode: "svgr",
  },
  {
    id: "svg08-news-impact-badges",
    batch: "svg-08",
    name: "News Impact Badges",
    category: "evidence",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/evidence/elceo-svg-08-news-impact-badges.svg",
    notes: "News impact level badge icons",
    importMode: "svgr",
  },
  // ─── WATCHLIST (svg-09) ───
  {
    id: "svg09-arrows-alerts-rings",
    batch: "svg-09",
    name: "Arrows Alerts Rings",
    category: "watchlist",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/watchlist/elceo-svg-09-arrows-alerts-rings.svg",
    notes: "Watchlist alert arrows and ring indicators",
    importMode: "svgr",
  },
  {
    id: "svg09-market-pulse-cards",
    batch: "svg-09",
    name: "Market Pulse Cards",
    category: "watchlist",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/watchlist/elceo-svg-09-market-pulse-cards.svg",
    notes: "Market pulse card visual elements",
    importMode: "svgr",
  },

  {
    id: "svg09-risk-sentiment-bars",
    batch: "svg-09",
    name: "Risk Sentiment Bars",
    category: "watchlist",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/watchlist/elceo-svg-09-risk-sentiment-bars.svg",
    notes: "Risk/sentiment horizontal bar visuals",
    importMode: "svgr",
  },
  {
    id: "svg09-sparklines",
    batch: "svg-09",
    name: "Sparklines",
    category: "watchlist",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/watchlist/elceo-svg-09-sparklines.svg",
    notes: "Mini sparkline chart elements",
    importMode: "svgr",
  },
  {
    id: "svg09-watchlist-elements",
    batch: "svg-09",
    name: "Watchlist Elements",
    category: "watchlist",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/watchlist/elceo-svg-09-watchlist-elements.svg",
    notes: "Watchlist row/card structural elements",
    importMode: "svgr",
  },
  // ─── BACKGROUND (svg-10 partial) ───
  {
    id: "svg10-background-base-texture",
    batch: "svg-10",
    name: "Background Base Texture",
    category: "background",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/background/elceo-svg-10-background-base-texture.svg",
    notes: "Base background texture layer. Partial — may receive updates.",
    importMode: "svgr",
  },
  {
    id: "svg10-horizontal-light-streaks",
    batch: "svg-10",
    name: "Horizontal Light Streaks",
    category: "background",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/background/elceo-svg-10-horizontal-light-streaks.svg",
    notes: "Horizontal light streak atmosphere layer. Partial.",
    importMode: "svgr",
  },

  {
    id: "svg10-particle-glow-field",
    batch: "svg-10",
    name: "Particle Glow Field",
    category: "background",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/background/elceo-svg-10-particle-glow-field.svg",
    notes: "Particle/glow atmosphere layer. Partial.",
    importMode: "svgr",
  },
  {
    id: "svg10-scan-arcs",
    batch: "svg-10",
    name: "Scan Arcs",
    category: "background",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/background/elceo-svg-10-scan-arcs.svg",
    notes: "Radar scan arc background layer. Partial.",
    importMode: "svgr",
  },
  {
    id: "svg10-world-map-dot-field",
    batch: "svg-10",
    name: "World Map Dot Field",
    category: "background",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/background/elceo-svg-10-world-map-dot-field.svg",
    notes: "World map dot field background layer. Partial.",
    importMode: "svgr",
  },
  // ─── CONNECTORS (svg-01) ───
  {
    id: "svg01-connector-lines",
    batch: "svg-01",
    revision: "v1",
    name: "Connector Lines Empty",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-01-connector-lines-v1-empty.svg",
    notes: "Primary connector line structure — empty state",
    importMode: "svgr",
  },
  // ─── CONNECTORS (svg-11 partial) ───
  {
    id: "svg11-compact-connectors",
    batch: "svg-11",
    name: "Compact Connectors",
    category: "connectors",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-11-compact-connectors.svg",
    notes: "Portrait variant — compact connector lines. Partial/revisit.",
    importMode: "svgr",
  },

  // ─── CONNECTORS (svg-13) ───
  {
    id: "svg13-bottom-ring-connector",
    batch: "svg-13",
    name: "Bottom Ring Connector Lines",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-13-bottom-ring-connector-lines.svg",
    notes: "Bottom ring connector line completion",
    importMode: "svgr",
  },
  {
    id: "svg13-full-connector-composite",
    batch: "svg-13",
    name: "Full Connector Composite",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-13-full-connector-composite.svg",
    notes: "All connector lines composed together",
    importMode: "svgr",
  },
  {
    id: "svg13-left-connector",
    batch: "svg-13",
    name: "Left Connector Lines",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-13-left-connector-lines.svg",
    notes: "Left side connector lines",
    importMode: "svgr",
  },
  {
    id: "svg13-right-connector",
    batch: "svg-13",
    name: "Right Connector Lines",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-13-right-connector-lines.svg",
    notes: "Right side connector lines",
    importMode: "svgr",
  },
  {
    id: "svg13-top-ring-connector",
    batch: "svg-13",
    name: "Top Ring Connector Lines",
    category: "connectors",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/connectors/elceo-svg-13-top-ring-connector-lines.svg",
    notes: "Top ring connector line completion",
    importMode: "svgr",
  },

  // ─── ARROWS (svg-14) ───
  {
    id: "svg14-arrow-down",
    batch: "svg-14",
    name: "Arrow Down",
    category: "arrows",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/arrows/elceo-svg-14-arrow-down.svg",
    notes: "Directional arrow — down",
    importMode: "svgr",
  },
  {
    id: "svg14-arrow-up",
    batch: "svg-14",
    name: "Arrow Up",
    category: "arrows",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg",
    notes: "Directional arrow — up",
    importMode: "svgr",
  },
  {
    id: "svg14-radar-ring",
    batch: "svg-14",
    name: "Radar Ring",
    category: "arrows",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/arrows/elceo-svg-14-radar-ring.svg",
    notes: "Radar ring indicator element",
    importMode: "svgr",
  },
  // ─── MAPS (svg-15) ───
  {
    id: "svg15-dotted-world-map",
    batch: "svg-15",
    revision: "revb",
    name: "Dotted World Map Rev-B",
    category: "maps",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg",
    notes: "Dotted world map — revision B",
    importMode: "svgr",
  },
  // ─── SKY (svg-16) ───
  {
    id: "svg16-clear-night-sky",
    batch: "svg-16",
    revision: "revb",
    name: "Clear Night Sky Rev-B",
    category: "sky",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg",
    notes: "Clear black night sky background — revision B",
    importMode: "svgr",
  },

  // ─── MASTER (svg-12 MISSING) ───
  {
    id: "svg-12-master-pack",
    batch: "svg-12",
    name: "Master Pack",
    category: "master",
    status: "pending_manual_asset_drop",
    sourcePath: "incoming-dashboard-assets/svg-12",
    notes: "SVG-12 master pack was not provided in this repo asset upload.",
    importMode: "reference-only",
  },
  // ─── PREVIEWS ───
  {
    id: "svg13-review-preview-svg",
    batch: "svg-13",
    name: "SVG-13 Review Preview (SVG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-13-review-preview.svg",
    notes: "Connector composite review preview — SVG format",
    importMode: "reference-only",
  },
  {
    id: "svg13-review-preview-png",
    batch: "svg-13",
    name: "SVG-13 Review Preview (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-13-review-preview.png",
    notes: "Connector composite review preview — PNG",
    importMode: "img",
  },
  {
    id: "svg14-radar-ring-png",
    batch: "svg-14",
    name: "SVG-14 Radar Ring Preview (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-14-radar-ring.png",
    notes: "Radar ring raster preview",
    importMode: "img",
  },
  {
    id: "svg14-review-sheet",
    batch: "svg-14",
    name: "SVG-14 Review Sheet",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-14-review-sheet.svg",
    notes: "Arrow + radar review sheet",
    importMode: "reference-only",
  },

  {
    id: "svg15-world-map-preview-dark",
    batch: "svg-15",
    revision: "revb",
    name: "World Map Preview Dark (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-15-revb-dotted-world-map-preview-dark.png",
    notes: "Dotted world map dark background preview",
    importMode: "img",
  },
  {
    id: "svg15-world-map-transparent",
    batch: "svg-15",
    revision: "revb",
    name: "World Map Transparent (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-15-revb-dotted-world-map-transparent.png",
    notes: "Dotted world map transparent background preview",
    importMode: "img",
  },
  {
    id: "svg16-night-sky-png",
    batch: "svg-16",
    revision: "revb",
    name: "Night Sky (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-16-revb-clear-night-sky.png",
    notes: "Night sky raster preview",
    importMode: "img",
  },
  {
    id: "svg16-night-sky-preview-png",
    batch: "svg-16",
    revision: "revb",
    name: "Night Sky Preview (PNG)",
    category: "preview",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/previews/elceo-svg-16-revb-clear-night-sky-preview.png",
    notes: "Night sky composition preview",
    importMode: "img",
  },

  // ─── LAYER MAPS (reference-only) ───
  {
    id: "layer-map-svg01",
    batch: "svg-01",
    name: "SVG-01 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-01-layer-map.md",
    notes: "Layer composition documentation for svg-01",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg02",
    batch: "svg-02",
    name: "SVG-02 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-02-layer-map.md",
    notes: "Layer composition documentation for svg-02",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg03",
    batch: "svg-03",
    name: "SVG-03 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-03-layer-map.md",
    notes: "Layer composition documentation for svg-03",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg04",
    batch: "svg-04",
    name: "SVG-04 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-04-layer-map.md",
    notes: "Layer composition documentation for svg-04",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg05",
    batch: "svg-05",
    name: "SVG-05 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-05-layer-map.md",
    notes: "Layer composition documentation for svg-05",
    importMode: "reference-only",
  },

  {
    id: "layer-map-svg06",
    batch: "svg-06",
    name: "SVG-06 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-06-layer-map.md",
    notes: "Layer composition documentation for svg-06",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg07",
    batch: "svg-07",
    name: "SVG-07 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-07-layer-map.md",
    notes: "Layer composition documentation for svg-07",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg08",
    batch: "svg-08",
    name: "SVG-08 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-08-layer-map.md",
    notes: "Layer composition documentation for svg-08",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg09",
    batch: "svg-09",
    name: "SVG-09 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-09-layer-map.md",
    notes: "Layer composition documentation for svg-09",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg10",
    batch: "svg-10",
    name: "SVG-10 Layer Map",
    category: "layer-map",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-10-layer-map.md",
    notes: "Layer composition documentation for svg-10 (partial batch)",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg11",
    batch: "svg-11",
    name: "SVG-11 Layer Map",
    category: "layer-map",
    status: "partial",
    sourcePath: "src/assets/source/dashboard/layer-maps/elceo-svg-11-layer-map.md",
    notes: "Layer composition documentation for svg-11 (partial batch)",
    importMode: "reference-only",
  },

  {
    id: "layer-map-svg13",
    batch: "svg-13",
    name: "SVG-13 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/ELCEO-SVG-13-LAYER-MAP.md",
    notes: "Layer composition documentation for svg-13",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg14",
    batch: "svg-14",
    name: "SVG-14 Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/ELCEO-SVG-14-LAYER-MAP.md",
    notes: "Layer composition documentation for svg-14",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg15",
    batch: "svg-15",
    revision: "revb",
    name: "SVG-15 Rev-B Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/ELCEO-SVG-15-REVB-LAYER-MAP.md",
    notes: "Layer composition documentation for svg-15 Rev-B",
    importMode: "reference-only",
  },
  {
    id: "layer-map-svg16",
    batch: "svg-16",
    revision: "revb",
    name: "SVG-16 Rev-B Layer Map",
    category: "layer-map",
    status: "approved",
    sourcePath: "src/assets/source/dashboard/layer-maps/ELCEO-SVG-16-REVB-LAYER-MAP.md",
    notes: "Layer composition documentation for svg-16 Rev-B",
    importMode: "reference-only",
  },
];


// ─── Helper Selectors ───

export function getDashboardAssetsByCategory(
  category: DashboardAssetCategory
): DashboardAssetEntry[] {
  return dashboardAssetManifest.filter((a) => a.category === category);
}

export function getDashboardAssetById(
  id: string
): DashboardAssetEntry | undefined {
  return dashboardAssetManifest.find((a) => a.id === id);
}

export function getPendingDashboardAssets(): DashboardAssetEntry[] {
  return dashboardAssetManifest.filter(
    (a) => a.status === "pending_manual_asset_drop"
  );
}

export function getApprovedDashboardAssets(): DashboardAssetEntry[] {
  return dashboardAssetManifest.filter((a) => a.status === "approved");
}

export function getPartialDashboardAssets(): DashboardAssetEntry[] {
  return dashboardAssetManifest.filter((a) => a.status === "partial");
}

export function getDashboardAssetsByBatch(
  batch: string
): DashboardAssetEntry[] {
  return dashboardAssetManifest.filter((a) => a.batch === batch);
}
