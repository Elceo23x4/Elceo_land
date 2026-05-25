export interface FixtureOhlcBar {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type ChartDataMode = "fixture_only";

export interface ChartEngineProps {
  data: FixtureOhlcBar[];
  mode: ChartDataMode;
  height?: number;
  className?: string;
}
