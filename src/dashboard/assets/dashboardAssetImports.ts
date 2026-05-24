/**
 * Dashboard Asset Import Smoke Set — Batch 1
 *
 * This file imports a small representative subset of dashboard SVGs
 * using ?react (SVGR) to validate the import pipeline works.
 *
 * Do NOT import every SVG here. This is a smoke test only.
 * Full imports happen during dashboard composition in later batches.
 */

import PanelBorderSmall from "../../assets/source/dashboard/panels/elceo-svg-06-panel-border-small.svg?react";
import ConfidenceGauge from "../../assets/source/dashboard/gauges/elceo-svg-07-confidence-gauge-display-safe.svg?react";
import EvidenceIcons from "../../assets/source/dashboard/evidence/elceo-svg-08-evidence-icons.svg?react";
import LeftConnector from "../../assets/source/dashboard/connectors/elceo-svg-13-left-connector-lines.svg?react";
import ArrowUp from "../../assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";
import ClearNightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";

export const dashboardAssetImportSmokeSet = [
  {
    id: "svg06-panel-border-small",
    label: "Panel Border Small (panels/)",
    Component: PanelBorderSmall,
  },
  {
    id: "svg07-confidence-gauge",
    label: "Confidence Gauge (gauges/)",
    Component: ConfidenceGauge,
  },
  {
    id: "svg08-evidence-icons",
    label: "Evidence Icons (evidence/)",
    Component: EvidenceIcons,
  },
  {
    id: "svg13-left-connector",
    label: "Left Connector Lines (connectors/)",
    Component: LeftConnector,
  },
  {
    id: "svg14-arrow-up",
    label: "Arrow Up (arrows/)",
    Component: ArrowUp,
  },
  {
    id: "svg15-dotted-world-map",
    label: "Dotted World Map Rev-B (maps/)",
    Component: DottedWorldMap,
  },
  {
    id: "svg16-clear-night-sky",
    label: "Clear Night Sky Rev-B (sky/)",
    Component: ClearNightSky,
  },
];
