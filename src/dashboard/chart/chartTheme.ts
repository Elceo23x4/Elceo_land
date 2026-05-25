/**
 * ELCEO Chart Theme — Batch 5
 * Matches the dashboard's dark HUD aesthetic.
 * No bright white backgrounds. No default TradingView styling.
 *
 * Uses Lightweight Charts v5 enums (ColorType, LineStyle).
 */

import { ColorType, LineStyle } from "lightweight-charts";

export const elceoChartLayoutOptions = {
  background: { type: ColorType.Solid, color: "transparent" },
  textColor: "rgba(216, 222, 231, 0.68)",
};

export const elceoChartGridOptions = {
  vertLines: { color: "rgba(255, 106, 0, 0.06)" },
  horzLines: { color: "rgba(255, 106, 0, 0.06)" },
};

export const elceoChartCrosshairOptions = {
  vertLine: {
    color: "rgba(255, 106, 0, 0.3)",
    width: 1 as const,
    style: LineStyle.Dashed,
  },
  horzLine: {
    color: "rgba(255, 106, 0, 0.3)",
    width: 1 as const,
    style: LineStyle.Dashed,
  },
};

export const elceoCandlestickOptions = {
  upColor: "#32e66a",
  downColor: "#ff445c",
  wickUpColor: "#32e66a",
  wickDownColor: "#ff445c",
  borderVisible: false,
};

export const elceoTimeScaleOptions = {
  borderColor: "rgba(255, 106, 0, 0.12)",
  timeVisible: false,
  secondsVisible: false,
};

export const elceoPriceScaleOptions = {
  borderColor: "rgba(255, 106, 0, 0.12)",
};
