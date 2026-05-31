/**
 * MarketRegimeTable.tsx
 *
 * V1B-7: Cross-asset intelligence table for Market Regime panel.
 * Displays structured comparison with headings:
 * Driver | Risk Tone | USD Link | Liquidity | Volatility | Relationship
 *
 * Collapses responsively via CSS container queries.
 */

import { Chip } from "./PanelPrimitives";
import type { Tone } from "../responsivePanelFixtures";

export interface MarketRegimeTableRow {
  driver: string;
  riskTone: string;
  usdLink: string;
  liquidity: string;
  volatility: string;
  relationship: string;
  tone?: Tone;
}

export interface MarketRegimeTableProps {
  rows: MarketRegimeTableRow[];
  compact?: boolean;
}

const HEADINGS = ["Driver", "Risk Tone", "USD Link", "Liquidity", "Volatility", "Relationship"];

export default function MarketRegimeTable({ rows, compact = false }: MarketRegimeTableProps) {
  return (
    <div className={`dashboard-regime-table${compact ? " dashboard-regime-table--compact" : ""}`} role="table" aria-label="Cross-asset market regime">
      {/* Header row */}
      <div className="dashboard-regime-table__header" role="row">
        {HEADINGS.map((h) => (
          <span key={h} className="dashboard-regime-table__th" role="columnheader">{h}</span>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((row, i) => (
        <div key={i} className="dashboard-regime-table__row" role="row">
          <span className="dashboard-regime-table__cell dashboard-regime-table__cell--driver" role="cell">{row.driver}</span>
          <span className="dashboard-regime-table__cell dashboard-regime-table__cell--tone" role="cell">
            <Chip value={row.riskTone} tone={row.tone ?? "neutral"} />
          </span>
          <span className="dashboard-regime-table__cell" role="cell">{row.usdLink}</span>
          <span className="dashboard-regime-table__cell" role="cell">{row.liquidity}</span>
          <span className="dashboard-regime-table__cell" role="cell">{row.volatility}</span>
          <span className="dashboard-regime-table__cell dashboard-regime-table__cell--rel" role="cell">{row.relationship}</span>
        </div>
      ))}
    </div>
  );
}
