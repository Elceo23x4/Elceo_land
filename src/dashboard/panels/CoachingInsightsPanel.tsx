/**
 * Coaching Insights Panel — Batch 7B
 * Premium coaching/discipline panel.
 * No direct investment instruction language.
 * Fixture-only deterministic data.
 */
import { HoverInsightPopover } from "../components/workspace";

interface CoachTile {
  label: string;
  note: string;
  tone: "amber" | "green" | "neutral";
}

const TILES: CoachTile[] = [
  { label: "Patience Zone", note: "Avoid early reaction", tone: "amber" },
  { label: "Risk Discipline", note: "Keep exposure conditional", tone: "amber" },
  { label: "Best Setup Window", note: "London / NY overlap review", tone: "green" },
];

interface CoachingInsightsPanelProps {
  section: "header" | "body";
}

export default function CoachingInsightsPanel({ section }: CoachingInsightsPanelProps) {
  if (section === "header") {
    return (
      <div className="elceo-panel-hdr" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <p className="elceo-typo-eyebrow">Discipline Engine</p>
          <h3 className="elceo-typo-title">Coaching Insights</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="elceo-panel-bdy">
      <div className="elceo-coaching-layout">
        {/* Left: coach emblem */}
        <div className="elceo-coach-orb">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="rgba(255,160,60,0.35)" strokeWidth="1.5" fill="rgba(255,140,40,0.03)" />
            <circle cx="24" cy="24" r="16" stroke="rgba(255,160,60,0.2)" strokeWidth="0.75" fill="none" />
            <text x="24" y="21" textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,180,100,0.85)" fontFamily="var(--elceo-font-mono, monospace)">AI</text>
            <text x="24" y="32" textAnchor="middle" fontSize="7" fontWeight="400" fill="rgba(255,160,60,0.6)" fontFamily="var(--elceo-font-mono, monospace)">COACH</text>
          </svg>
        </div>

        {/* Center: primary focus */}
        <div className="elceo-coach-focus">
          <p className="elceo-coach-focus__statement">Wait for structure confirmation</p>
          <p className="elceo-coach-focus__note">
            Fixture reasoning shows pressure is present, but the cleaner scenario depends on confirmation near the active structure zone.
          </p>
          <HoverInsightPopover
            trigger="Why patience?"
            title="Patience Reasoning"
            summary="Structure confirmation reduces false-start exposure."
            detail={<p style={{ margin: 0, fontSize: "10px", color: "rgba(160,145,130,0.75)", lineHeight: 1.5 }}>The current pressure state is not yet validated by structure. Waiting for confirmation improves scenario quality within the review window.</p>}
            side="top"
          />
        </div>

        {/* Right: discipline tiles */}
        <div className="elceo-coach-tiles">
          {TILES.map((tile, i) => (
            <div className={`elceo-coach-tile elceo-coach-tile--${tile.tone}`} key={i}>
              <span className="elceo-coach-tile__label">{tile.label}</span>
              <span className="elceo-coach-tile__note">{tile.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
