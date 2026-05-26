/**
 * Watchlist Panel — Batch 7A
 * Premium compact table with inline sparklines.
 * Fixture-only deterministic data.
 */

interface WatchlistRow {
  asset: string;
  last: string;
  change: string;
  changeDir: "pos" | "neg";
  bias: string;
  biasColor: "bullish" | "bearish" | "neutral";
  conf: string;
  spark: number[];
}

const WATCHLIST_DATA: WatchlistRow[] = [
  { asset: "XAU/USD", last: "2,418.60", change: "+0.82%", changeDir: "pos", bias: "Long", biasColor: "bullish", conf: "74%", spark: [4, 6, 5, 7, 8, 7, 9, 10, 9, 11] },
  { asset: "EUR/USD", last: "1.0862", change: "+0.14%", changeDir: "pos", bias: "Long", biasColor: "bullish", conf: "61%", spark: [5, 5, 6, 6, 7, 6, 7, 7, 8, 7] },
  { asset: "USD/JPY", last: "157.42", change: "-0.31%", changeDir: "neg", bias: "Short", biasColor: "bearish", conf: "58%", spark: [9, 8, 9, 7, 8, 6, 7, 5, 6, 5] },
  { asset: "BTC/USD", last: "67,284", change: "+1.24%", changeDir: "pos", bias: "Long", biasColor: "bullish", conf: "69%", spark: [3, 5, 4, 6, 7, 6, 8, 9, 8, 10] },
  { asset: "NAS100", last: "18,892", change: "-0.18%", changeDir: "neg", bias: "Neutral", biasColor: "neutral", conf: "44%", spark: [7, 7, 8, 7, 6, 7, 6, 7, 6, 6] },
];

function InlineSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 48;
  const h = 14;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 2) - 1}`)
    .join(" ");

  return (
    <span className="elceo-watchlist__sparkline">
      <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points={points} stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  );
}

interface WatchlistPanelProps {
  section: "header" | "body";
}

export default function WatchlistPanel({ section }: WatchlistPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr">
        <p className="elceo-typo-eyebrow">Active Instruments</p>
        <h3 className="elceo-typo-title">Watchlist</h3>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-watchlist">
        <table className="elceo-watchlist__table">
          <thead className="elceo-watchlist__thead">
            <tr>
              <th className="elceo-watchlist__th" style={{ width: "22%" }}>Asset</th>
              <th className="elceo-watchlist__th elceo-watchlist__th--right" style={{ width: "20%" }}>Last</th>
              <th className="elceo-watchlist__th elceo-watchlist__th--right" style={{ width: "16%" }}>Chg</th>
              <th className="elceo-watchlist__th" style={{ width: "14%" }}>Bias</th>
              <th className="elceo-watchlist__th elceo-watchlist__th--right" style={{ width: "12%" }}>Conf</th>
              <th className="elceo-watchlist__th elceo-watchlist__th--right" style={{ width: "16%" }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {WATCHLIST_DATA.map((row) => (
              <tr className="elceo-watchlist__tr" key={row.asset}>
                <td className="elceo-watchlist__td elceo-watchlist__td--asset">{row.asset}</td>
                <td className="elceo-watchlist__td elceo-watchlist__td--right">{row.last}</td>
                <td className={`elceo-watchlist__td elceo-watchlist__td--right elceo-watchlist__td--change-${row.changeDir}`}>
                  {row.change}
                </td>
                <td className="elceo-watchlist__td">
                  <span className={`elceo-chip elceo-chip--${row.biasColor === "bullish" ? "positive" : row.biasColor === "bearish" ? "negative" : "neutral"}`}>
                    {row.bias}
                  </span>
                </td>
                <td className="elceo-watchlist__td elceo-watchlist__td--right elceo-typo-mono--sm">{row.conf}</td>
                <td className="elceo-watchlist__td elceo-watchlist__td--right">
                  <InlineSparkline
                    data={row.spark}
                    color={row.changeDir === "pos" ? "#4ee87b" : "#f25c54"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
