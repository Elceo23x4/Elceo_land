/**
 * News & Macro Intelligence Panel — Batch 7B
 * Two-column: headline feed (left) + upcoming events (right).
 * Fixture-only deterministic data.
 */
import { HoverInsightPopover } from "../components/workspace";

interface NewsRow {
  time: string;
  headline: string;
  category: string;
  impact: "High" | "Medium" | "Low";
  implication: string;
}

interface EventRow {
  time: string;
  event: string;
  source: string;
  impact: "High" | "Medium" | "Low";
}

const NEWS_FEED: NewsRow[] = [
  { time: "14:32", headline: "USD softness keeps patience theme active", category: "FX", impact: "Medium", implication: "Supports upside pressure" },
  { time: "13:18", headline: "Core inflation cools below forecast", category: "CPI", impact: "High", implication: "Reduces hawkish pressure" },
  { time: "11:45", headline: "Safe-haven demand rises on geopolitical tension", category: "GEO", impact: "Medium", implication: "Structural caution" },
  { time: "09:02", headline: "Fed commentary enters caution window", category: "FED", impact: "High", implication: "Review window ahead" },
  { time: "08:14", headline: "Central bank accumulation remains supportive", category: "CB", impact: "Low", implication: "Background driver" },
];

const UPCOMING_EVENTS: EventRow[] = [
  { time: "15:30", event: "Retail Sales", source: "USD", impact: "High" },
  { time: "16:15", event: "Industrial Production", source: "EUR", impact: "Medium" },
  { time: "18:00", event: "Fed Chair Speaks", source: "USD", impact: "High" },
  { time: "21:00", event: "Inflation Expectations", source: "NZD", impact: "Medium" },
];

function ImpactBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const cls = level === "High" ? "elceo-impact--high" : level === "Medium" ? "elceo-impact--medium" : "elceo-impact--low";
  return <span className={`elceo-impact-badge ${cls}`}>{level}</span>;
}

interface NewsMacroPanelProps {
  section: "header" | "body";
}

export default function NewsMacroPanel({ section }: NewsMacroPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p className="elceo-typo-eyebrow">Macro Watch</p>
          <h3 className="elceo-typo-title">News &amp; Macro Intelligence</h3>
        </div>
        <span className="elceo-chip elceo-chip--neutral">Provider Pending</span>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-news-layout">
        {/* Left: headline feed */}
        <div className="elceo-news-feed">
          {NEWS_FEED.map((row, i) => (
            <div className="elceo-news-row" key={i}>
              <span className="elceo-news-row__time">{row.time}</span>
              <div className="elceo-news-row__content">
                <span className="elceo-news-row__headline">{row.headline}</span>
                <span className="elceo-news-row__meta">
                  <span className="elceo-chip elceo-chip--neutral" style={{ padding: "1px 4px", fontSize: "8px" }}>{row.category}</span>
                  <ImpactBadge level={row.impact} />
                  <span className="elceo-news-row__implication">{row.implication}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: events timeline */}
        <div className="elceo-event-timeline">
          <p className="elceo-typo-mono--sm" style={{ color: "rgba(180,165,150,0.6)", marginBottom: 4 }}>UPCOMING</p>
          {UPCOMING_EVENTS.map((evt, i) => (
            <div className="elceo-event-row" key={i}>
              <span className="elceo-event-row__dot" />
              <span className="elceo-event-row__time">{evt.time}</span>
              <span className="elceo-event-row__name">{evt.event}</span>
              <span className="elceo-chip elceo-chip--neutral" style={{ padding: "1px 4px", fontSize: "7px" }}>{evt.source}</span>
              <ImpactBadge level={evt.impact} />
            </div>
          ))}
          <div style={{ marginTop: 6 }}>
            <HoverInsightPopover
              trigger="Impact scoring"
              title="Macro Impact Levels"
              summary="Impact reflects potential for market structure disruption within the current review window."
              detail={<p style={{ margin: 0, fontSize: "10px", color: "rgba(160,145,130,0.75)", lineHeight: 1.5 }}>High impact events may shift directional bias or invalidate current conditions. Medium events add context. Low events are background drivers.</p>}
              side="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
