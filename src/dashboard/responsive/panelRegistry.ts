import type { ComponentType, SVGProps } from "react";
import {
  DirectionalBiasFrame,
  ConfidenceMatrixFrame,
  WatchlistFrame,
  EvidenceStackFrame,
  NewsMacroFrame,
  CoachingFrame,
  MarketRegimeFrame,
} from "./dashboardResponsiveAssets";

/**
 * panelRegistry.ts
 *
 * Maps panel identifiers to their SVG frame assets and metadata.
 * Used by the responsive shell to render panels in the grid.
 */

export interface PanelRegistryEntry {
  id: string;
  frame: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  eyebrow: string;
  gridClass: string;
}

export const panelRegistry: PanelRegistryEntry[] = [
  {
    id: "directional-bias",
    frame: DirectionalBiasFrame,
    title: "Directional Bias",
    eyebrow: "Reasoning Snapshot",
    gridClass: "dashboard-panel--directional-bias",
  },
  {
    id: "confidence-context",
    frame: ConfidenceMatrixFrame,
    title: "Confidence & Context",
    eyebrow: "Reasoning Matrix",
    gridClass: "dashboard-panel--confidence-context",
  },
  {
    id: "watchlist",
    frame: WatchlistFrame,
    title: "Watchlist",
    eyebrow: "Active Instruments",
    gridClass: "dashboard-panel--watchlist",
  },
  {
    id: "evidence-stack",
    frame: EvidenceStackFrame,
    title: "Evidence Stack",
    eyebrow: "Signal Alignment",
    gridClass: "dashboard-panel--evidence-stack",
  },
  {
    id: "news-macro",
    frame: NewsMacroFrame,
    title: "News & Macro",
    eyebrow: "Context Drivers",
    gridClass: "dashboard-panel--news-macro",
  },
  {
    id: "coaching",
    frame: CoachingFrame,
    title: "Coaching Insights",
    eyebrow: "Decision Support",
    gridClass: "dashboard-panel--coaching",
  },
  {
    id: "market-regime",
    frame: MarketRegimeFrame,
    title: "Market Regime",
    eyebrow: "Environment State",
    gridClass: "dashboard-panel--market-regime",
  },
];
