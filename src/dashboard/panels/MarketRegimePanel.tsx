/**
 * Market Regime / Cross-Asset Pulse Panel — Batch 7B
 * Horizontal regime card grid + bottom summary strip.
 * Fixture-only deterministic data.
 */
import { HoverInsightPopover } from "../components/workspace";

interface RegimeCard {
  asset: string;
  state: string;
  stateTone: "bullish" | "bearish" | "neutral";
  value: string;
  change: string;
  changeDir: "pos" | "neg";
  conf: number;
  spark: number[];
}

const REGIME_DATA: RegimeCard[] = [
  { asset: "Gold", state: "Bullish", stateTone: "bullish", value: "2,385.74", change: "+1.28%", changeDir: "pos", conf: 78, spark: [5, 6, 7, 7, 8, 9, 8, 10, 9, 11] },
  { asset: "USD Index", state: "Bearish", stateTone: "bearish", value: "104.21", change: "-0.38%", changeDir: "neg", conf: 32, spark: [9, 8, 8, 7, 7, 6, 7, 6, 5, 5] },
  { asset: "Equities", state: "Neutral", stateTone: "neutral", value: "5,278.40", change: "+0.12%", changeDir: "pos", conf: 55, spark: [6, 7, 6, 7, 7, 6, 7, 7, 7, 7] },
  { asset: "Yields", state: "Bearish", stateTone: "bearish", value: "4.32%", change: "-2.1bps", changeDir: "neg", conf: 28, spark: [8, 8, 7, 7, 6, 6, 7, 5, 5, 4] },
  { asset: "Crypto", state: "Bullish", stateTone: "bullish", value: "66,854", change: "+2.31%", changeDir: "pos", conf: 71, spark: [4, 5, 5, 6, 7, 6, 8, 9, 8, 10] },
  { asset: "Risk Sent.", state: "Risk-On", stateTone: "bullish", value: "—", change: "—", changeDir: "pos", conf: 66, spark: [5, 6, 6, 7, 7, 8, 7, 8, 8, 9] },
];

const STRIP_ITEMS = [
  { label: "Market Regime", value: "Risk-On", tone: "bullish" as const },
  { label: "Liquidity", value: "Abundant", tone: "bullish" as const },
  { label: "Volatility", value: "Elevated", tone: "amber" as const },
  { label: "Correlation", value: "Moderate", tone: "neutral" as const },
];

function MiniSpark({ data, color }: { data: number[]; color: string }) {
  const w = 36;
  const h = 12;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 2) - 1}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ display: "block" }}>
      <polyline points={pts} stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ConfRing({ pct }: { pct: number }) {
  const r = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{ display: "block" }}>
      <circle cx="10" cy="10" r={r} fill="none" stroke="rgba(255,140,40,0.12)" strokeWidth="2" />
      <circle cx="10" cy="10" r={r} fill="none" stroke="rgba(78,232,123,0.7)" strokeWidth="2" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 10 10)" />
      <text x="10" y="13" textAnchor="middle" fontSize="6" fill="rgba(210,200,190,0.8)" fontFamily="var(--elceo-font-mono, monospace)">{pct}</text>
    </svg>
  );
}

interface MarketRegimePanelProps {
  section: "header" | "body";
}

export default function MarketRegimePanel({ section }: MarketRegimePanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p className="elceo-typo-eyebrow">Cross-Asset Pulse</p>
          <h3 className="elceo-typo-title">Market Regime</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="elceo-chip elceo-chip--positive">Risk-On</span>
          <HoverInsightPopover
            trigger="?"
            title="Regime Classification"
            summary="Regime reflects aggregate cross-asset directional bias and risk appetite."
            detail={<p style={{ margin: 0, fontSize: "10px", color: "rgba(160,145,130,0.75)", lineHeight: 1.5 }}>Fixture classification based on combined asset momentum, volatility regime, and correlation structure.</p>}
            side="left"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-regime-layout">
        {/* Card grid */}
        <div className="elceo-regime-cards">
          {REGIME_DATA.map((card, i) => (
            <div className="elceo-regime-card" key={i}>
              <div className="elceo-regime-card__top">
                <span className="elceo-regime-card__asset">{card.asset}</span>
                <ConfRing pct={card.conf} />
              </div>
              <span className={`elceo-regime-card__state elceo-regime-card__state--${card.stateTone}`}>{card.state}</span>
              <div className="elceo-regime-card__bottom">
                <span className="elceo-regime-card__value">{card.value}</span>
                <span className={`elceo-regime-card__change elceo-regime-card__change--${card.changeDir}`}>{card.change}</span>
              </div>
              <MiniSpark data={card.spark} color={card.changeDir === "pos" ? "#4ee87b" : "#f25c54"} />
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="elceo-regime-strip">
          {STRIP_ITEMS.map((item, i) => (
            <div className="elceo-regime-strip__item" key={i}>
              <span className="elceo-regime-strip__label">{item.label}</span>
              <span className={`elceo-regime-strip__value elceo-color-${item.tone === "amber" ? "amber" : item.tone}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
