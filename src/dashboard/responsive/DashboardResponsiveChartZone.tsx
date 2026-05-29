/**
 * DashboardResponsiveChartZone.tsx
 *
 * R7F: Chart zone with interactive overlay, inspector, asset selector, timeframe selector.
 * Receives activeAsset + activeTimeframe from cockpit and updates context strip.
 */

import { useState, useCallback } from "react";
import { CentralWheel, ChartConsoleFrame } from "./dashboardResponsiveAssets";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import { assetContextBySymbol } from "./responsivePanelFixtures";
import DashboardChartIntelligenceOverlay from "./DashboardChartIntelligenceOverlay";
import DashboardChartOverlayInspector from "./DashboardChartOverlayInspector";
import DashboardAssetSelector from "./DashboardAssetSelector";
import DashboardTimeframeSelector from "./DashboardTimeframeSelector";
import type { Timeframe } from "./DashboardTimeframeSelector";
import { getOverlayItemById, chartZones, type LinkedPanel } from "./chartIntelligenceFixture";

interface ChartZoneProps {
  activeAsset: string;
  activeTimeframe: Timeframe;
  onAssetChange: (asset: string) => void;
  onTimeframeChange: (tf: Timeframe) => void;
  onLinkedPanel?: (panel: LinkedPanel | null) => void;
}

export default function DashboardResponsiveChartZone({
  activeAsset,
  activeTimeframe,
  onAssetChange,
  onTimeframeChange,
  onLinkedPanel,
}: ChartZoneProps) {
  const [showZones, setShowZones] = useState(true);
  const [showLiquidity, setShowLiquidity] = useState(true);
  const [showScenario, setShowScenario] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id && onLinkedPanel) {
      const item = getOverlayItemById(id);
      if (item) {
        const panel = item.type === "annotation" ? item.panelLink : (item as { linkedPanel?: LinkedPanel }).linkedPanel ?? null;
        onLinkedPanel(panel ?? null);
      }
    } else if (onLinkedPanel) {
      onLinkedPanel(null);
    }
  }, [onLinkedPanel]);

  const handleToggle = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>, layerItems: string[]) => {
    setter((v) => {
      if (v && selectedId && layerItems.includes(selectedId)) {
        setSelectedId(null);
        onLinkedPanel?.(null);
      }
      return !v;
    });
  }, [selectedId, onLinkedPanel]);

  const zoneIds = chartZones.filter((z) => z.kind !== "liquidity").map((z) => z.id);
  const liquidityIds = chartZones.filter((z) => z.kind === "liquidity").map((z) => z.id);

  return (
    <>
      <div className="dashboard-precision-wheel" style={{ ...boardRectStyle(SHELL_RECTS.centralWheel), zIndex: 5 }} aria-hidden="true">
        <CentralWheel preserveAspectRatio="xMidYMid meet" />
      </div>

      <div className="dashboard-precision-chart-glass" style={{ ...boardRectStyle(SHELL_RECTS.chartGlass), zIndex: 7 }} aria-hidden="true" />

      <div className="dashboard-precision-chart-frame" style={{ ...boardRectStyle(SHELL_RECTS.chartConsoleFrame), zIndex: 8 }} aria-hidden="true">
        <ChartConsoleFrame preserveAspectRatio="none" />
      </div>

      <div className="dashboard-precision-chart-display" style={{ ...boardRectStyle(SHELL_RECTS.chartDisplay), zIndex: 10 }}>
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />

        <DashboardChartIntelligenceOverlay
          showZones={showZones}
          showLiquidity={showLiquidity}
          showScenario={showScenario}
          showNotes={showNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
          activeAsset={activeAsset}
          activeTimeframe={activeTimeframe}
        />

        <DashboardChartOverlayInspector
          selectedId={selectedId}
          onClose={() => handleSelect(null)}
          activeAsset={activeAsset}
          activeTimeframe={activeTimeframe}
        />

        {/* Timeframe selector — top-right, before asset selector */}
        <DashboardTimeframeSelector
          activeTimeframe={activeTimeframe}
          onTimeframeChange={onTimeframeChange}
        />

        {/* Asset selector — top-right */}
        <DashboardAssetSelector activeAsset={activeAsset} onAssetChange={onAssetChange} />
      </div>

      {/* Toggle controls — board-positioned below chart candle area */}
      <div className="dashboard-chart-overlay-controls" style={{ ...boardRectStyle(SHELL_RECTS.chartOverlayToggleBar), zIndex: 9 }}>
        <button type="button" className="dashboard-chart-overlay-toggle" aria-pressed={showZones} onClick={() => handleToggle(setShowZones, zoneIds)}>Zones</button>
        <button type="button" className="dashboard-chart-overlay-toggle" aria-pressed={showLiquidity} onClick={() => handleToggle(setShowLiquidity, liquidityIds)}>Liquidity</button>
        <button type="button" className="dashboard-chart-overlay-toggle" aria-pressed={showScenario} onClick={() => setShowScenario((v) => !v)}>Scenario</button>
        <button type="button" className="dashboard-chart-overlay-toggle" aria-pressed={showNotes} onClick={() => setShowNotes((v) => !v)}>Notes</button>
      </div>
    </>
  );
}
