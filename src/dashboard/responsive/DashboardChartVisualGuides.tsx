/**
 * DashboardChartVisualGuides.tsx
 *
 * V1B-10: Decorative chart visual layer using display-safe SVG assets.
 * Renders faintly behind the interactive chart intelligence overlay.
 * Non-interactive (pointer-events: none). Respects toggle visibility.
 *
 * Assets:
 *   - elceo-svg-03-guides-and-anchors-display-safe.svg (zone guides)
 *   - elceo-svg-03-market-structure-markers-display-safe.svg (structure accents)
 *   - elceo-svg-03-projection-paths-up-down-display-safe.svg (scenario paths)
 */

import GuidesAndAnchors from "../../assets/source/dashboard/chart/elceo-svg-03-guides-and-anchors-display-safe.svg?react";
import MarketStructureMarkers from "../../assets/source/dashboard/chart/elceo-svg-03-market-structure-markers-display-safe.svg?react";
import ProjectionPaths from "../../assets/source/dashboard/chart/elceo-svg-03-projection-paths-up-down-display-safe.svg?react";

interface ChartVisualGuidesProps {
  showZones?: boolean;
  showScenario?: boolean;
}

export default function DashboardChartVisualGuides({ showZones = true, showScenario = true }: ChartVisualGuidesProps) {
  return (
    <div className="dashboard-chart-visual-guides" aria-hidden="true">
      {showZones && (
        <>
          <div className="dashboard-chart-visual-guides__layer dashboard-chart-visual-guides__layer--guides">
            <GuidesAndAnchors preserveAspectRatio="none" />
          </div>
          <div className="dashboard-chart-visual-guides__layer dashboard-chart-visual-guides__layer--markers">
            <MarketStructureMarkers preserveAspectRatio="none" />
          </div>
        </>
      )}
      {showScenario && (
        <div className="dashboard-chart-visual-guides__layer dashboard-chart-visual-guides__layer--paths">
          <ProjectionPaths preserveAspectRatio="none" />
        </div>
      )}
    </div>
  );
}
