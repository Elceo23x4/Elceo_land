/**
 * Evidence Stack / Reasoning Engine Panel — Batch 7A
 * Stacked reasoning rows with conviction bar.
 * Fixture-only deterministic data.
 */

interface EvidenceRow {
  category: string;
  strength: string;
  strengthTone: "positive" | "warning" | "negative" | "neutral";
  detail: string;
  score: number;
  icon: string;
}

const EVIDENCE_DATA: EvidenceRow[] = [
  { category: "Macro Evidence", strength: "Strong", strengthTone: "positive", detail: "Yield curve steepening supports risk-on rotation", score: 82, icon: "M" },
  { category: "Technical Evidence", strength: "Elevated", strengthTone: "positive", detail: "Breakout above 20-day structure confirmed", score: 76, icon: "T" },
  { category: "Event Evidence", strength: "Moderate", strengthTone: "warning", detail: "FOMC minutes neutral; next catalyst unclear", score: 54, icon: "E" },
  { category: "Sentiment / Positioning", strength: "Watch", strengthTone: "warning", detail: "Net long positioning approaching crowded threshold", score: 48, icon: "S" },
  { category: "Volatility / Risk", strength: "Low", strengthTone: "neutral", detail: "VIX compressed, regime favors directional exposure", score: 71, icon: "V" },
];

const AGGREGATE_SCORE = 68;

function EvidenceIcon({ letter }: { letter: string }) {
  return (
    <div className="elceo-evidence__icon">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="6" y="9" textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,160,60,0.85)" fontFamily="var(--elceo-font-mono, monospace)">
          {letter}
        </text>
      </svg>
    </div>
  );
}

interface EvidenceStackPanelProps {
  section: "header" | "body";
}

export default function EvidenceStackPanel({ section }: EvidenceStackPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr">
        <p className="elceo-typo-eyebrow">Reasoning Engine</p>
        <h3 className="elceo-typo-title">Evidence Stack</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-evidence">
        {/* Reasoning rows */}
        <div className="elceo-evidence__rows">
          {EVIDENCE_DATA.map((row, i) => (
            <div className="elceo-evidence__row" key={i}>
              <EvidenceIcon letter={row.icon} />
              <div className="elceo-evidence__info">
                <span className="elceo-evidence__category">
                  {row.category}
                  <span className={`elceo-chip elceo-chip--${row.strengthTone === "positive" ? "positive" : row.strengthTone === "warning" ? "warning" : row.strengthTone === "negative" ? "negative" : "neutral"}`} style={{ marginLeft: 6 }}>
                    {row.strength}
                  </span>
                </span>
                <span className="elceo-evidence__detail">{row.detail}</span>
              </div>
              <div className="elceo-evidence__score">
                <span className="elceo-score-chip">{row.score}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated conviction */}
        <div className="elceo-conviction">
          <div className="elceo-conviction__header">
            <span className="elceo-typo-mono--sm" style={{ color: "rgba(180,165,150,0.7)" }}>AGGREGATED CONVICTION</span>
            <span className="elceo-typo-body--strong elceo-color-accent">{AGGREGATE_SCORE}%</span>
          </div>
          <div className="elceo-conviction__bar-track">
            <div className="elceo-conviction__bar-fill" style={{ width: `${AGGREGATE_SCORE}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
