/**
 * dashboardResponsiveAssets.ts
 *
 * Centralized imports for all isolated SVG frame assets
 * used by the responsive dashboard cockpit shell.
 *
 * These are clean isolated assets — NOT the old full-board 1920×1080 RevB SVG.
 * Each asset has a verified clean viewBox matching its intended panel geometry.
 */

// --- Panel frame assets ---
import DirectionalBiasFrame from "../../assets/source/dashboard/panels/panel_directional_bias_shell.svg?react";
import ConfidenceMatrixFrame from "../../assets/source/dashboard/panels/panel_confidence_matrix_shell.svg?react";
import WatchlistFrame from "../../assets/source/dashboard/panels/panel_watchlist_shell.svg?react";
import EvidenceStackFrame from "../../assets/source/dashboard/panels/panel_evidence_stack_shell.svg?react";
import NewsMacroFrame from "../../assets/source/dashboard/panels/panel_news_macro_shell.svg?react";
import CoachingFrame from "../../assets/source/dashboard/panels/panel_coaching_shell.svg?react";
import MarketRegimeFrame from "../../assets/source/dashboard/panels/panel_market_regime_shell.svg?react";

// --- Shell/chrome assets ---
import TopSystemBarFrame from "../../assets/source/dashboard/shell/top-system-bar-frame.svg?react";
import SidebarRailFrame from "../../assets/source/dashboard/shell/sidebar-rail-frame.svg?react";
import CentralWheel from "../../assets/source/dashboard/shell/central-wheel.svg?react";

// --- Chart asset ---
import ChartConsoleFrame from "../../assets/source/dashboard/chart/chart-console-frame.svg?react";

export {
  // Panel frames
  DirectionalBiasFrame,
  ConfidenceMatrixFrame,
  WatchlistFrame,
  EvidenceStackFrame,
  NewsMacroFrame,
  CoachingFrame,
  MarketRegimeFrame,
  // Shell frames
  TopSystemBarFrame,
  SidebarRailFrame,
  CentralWheel,
  // Chart frame
  ChartConsoleFrame,
};
