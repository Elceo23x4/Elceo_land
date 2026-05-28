/**
 * DashboardResponsivePanelLayer.tsx
 *
 * Renders all 7 dashboard panels at exact board-reference coordinates.
 * Premium content with section nav, chips, meters, action bars.
 * All content inside existing header/body content blocks.
 * No coordinate changes. No live data.
 */

import { useState, useCallback } from "react";
import {
  DirectionalBiasFrame,
  ConfidenceMatrixFrame,
  WatchlistFrame,
  EvidenceStackFrame,
  NewsMacroFrame,
  CoachingFrame,
  MarketRegimeFrame,
} from "./dashboardResponsiveAssets";
import {
  boardRectStyle,
  PANEL_FRAME_RECTS,
  PANEL_CONTENT_RECTS,
} from "./dashboardResponsiveGeometry";
import {
  biasFixture,
  confidenceFixture,
  watchlistFixture,
  evidenceFixture,
  evidenceConviction,
  newsFixture,
  macroEvents,
  coachingFixture,
  regimeFixture,
  regimeStrip,
} from "./responsivePanelFixtures";
import type { Tone } from "./responsivePanelFixtures";
import DashboardResponsiveDetailDrawer from "./DashboardResponsiveDetailDrawer";

/* ─── Shared Micro Components ─── */

function Chip({ value, tone }: { value: string; tone: Tone }) {
  return <span className={`dashboard-precision-chip dashboard-precision-chip--${tone}`}>{value}</span>;
}

function DataRow({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  const color = tone === "positive" ? "#5cba6e" : tone === "negative" ? "#e05555" : tone === "warning" ? "#d4a853" : "#8a8178";
  return (
    <div className="dashboard-precision-data-row">
      <span className="dashboard-precision-data-label">{label}</span>
      <span style={{ color }}>{value}</span>
    </div>
  );
}

function MiniMeter({ score, tone }: { score: number; tone: Tone }) {
  return (
    <div className="dashboard-mini-meter">
      <div className={`dashboard-mini-meter__fill dashboard-mini-meter__fill--${tone}`} style={{ width: `${score}%` }} />
    </div>
  );
}

function SectionNav({ items, active, onSelect }: { items: string[]; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="dashboard-section-nav">
      {items.map((item, i) => (
        <span key={item} className={`dashboard-section-nav__item${i === active ? " dashboard-section-nav__item--active" : ""}`} onClick={() => onSelect(i)}>{item}</span>
      ))}
    </div>
  );
}

function ActionBar({ onExpand }: { onExpand?: () => void }) {
  return (
    <div className="dashboard-panel-action-bar">
      <button type="button" className="dashboard-panel-action-btn" onClick={onExpand}>Expand</button>
      <button type="button" className="dashboard-panel-action-btn">Evidence</button>
      <button type="button" className="dashboard-panel-action-btn">Journal</button>
    </div>
  );
}

/* ─── Panel Layer ─── */

export default function DashboardResponsivePanelLayer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerEyebrow, setDrawerEyebrow] = useState("");
  const [drawerContent, setDrawerContent] = useState<string>("");

  const openDrawer = useCallback((eyebrow: string, title: string, content: string) => {
    setDrawerEyebrow(eyebrow);
    setDrawerTitle(title);
    setDrawerContent(content);
    setDrawerOpen(true);
  }, []);

  // Section nav state (visual fixture)
  const [biasSection, setBiasSection] = useState(0);
  const [confSection, setConfSection] = useState(0);
  const [watchSection, setWatchSection] = useState(0);
  const [evidSection, setEvidSection] = useState(0);
  const [newsSection, setNewsSection] = useState(0);

  return (
    <>
      {/* ═══ DIRECTIONAL BIAS ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.directionalBiasSummary)}>
        <DirectionalBiasFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.directionalBiasSummary.header)}>
        <p className="dashboard-precision-eyebrow">Reasoning Snapshot</p>
        <h3 className="dashboard-precision-title">Directional Bias</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.directionalBiasSummary.body)}>
        <SectionNav items={["Snapshot", "Drivers", "Conditions"]} active={biasSection} onSelect={setBiasSection} />
        {biasSection === 0 && (
          <>
            <p className="dashboard-precision-metric">{biasFixture.direction}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "4px 0" }}>
              <Chip value={biasFixture.strength} tone={biasFixture.strengthTone} />
              <Chip value={biasFixture.condition} tone={biasFixture.conditionTone} />
              <Chip value={biasFixture.status} tone="pending" />
            </div>
            <p className="dashboard-precision-body-text">{biasFixture.headline}</p>
          </>
        )}
        {biasSection === 1 && biasFixture.drivers.map((d) => (
          <DataRow key={d.label} label={d.label} value={d.summary} tone={d.tone} />
        ))}
        {biasSection === 2 && (
          <>
            <p className="dashboard-precision-note">{biasFixture.watchCondition}</p>
            <p className="dashboard-precision-note">{biasFixture.invalidation}</p>
          </>
        )}
        <ActionBar onExpand={() => openDrawer("Reasoning", "Directional Bias Detail", biasFixture.watchCondition + " " + biasFixture.invalidation)} />
      </div>

      {/* ═══ CONFIDENCE & CONTEXT ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.confidenceContextMatrix)}>
        <ConfidenceMatrixFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.confidenceContextMatrix.header)}>
        <p className="dashboard-precision-eyebrow">Reasoning Matrix</p>
        <h3 className="dashboard-precision-title">Confidence &amp; Context</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.confidenceContextMatrix.body)}>
        <SectionNav items={["Matrix", "Conflicts", "Quality"]} active={confSection} onSelect={setConfSection} />
        {confSection === 0 && confidenceFixture.metrics.map((m) => (
          <div key={m.label}>
            <DataRow label={m.label} value={m.value} tone={m.tone} />
            <MiniMeter score={m.score} tone={m.tone} />
          </div>
        ))}
        {confSection === 1 && confidenceFixture.conflicts.map((c) => (
          <div key={c.label} style={{ marginBottom: "4px" }}>
            <span className="dashboard-precision-data-label">{c.label}</span>
            <p className="dashboard-precision-note" style={{ margin: "1px 0" }}>{c.detail}</p>
          </div>
        ))}
        {confSection === 2 && (
          <>
            <DataRow label="Data quality" value={`${confidenceFixture.dataQuality}%`} tone="neutral" />
            <MiniMeter score={confidenceFixture.dataQuality} tone="neutral" />
            <p className="dashboard-precision-note">{confidenceFixture.summary}</p>
          </>
        )}
        <ActionBar onExpand={() => openDrawer("Matrix", "Confidence Decomposition", confidenceFixture.summary)} />
      </div>

      {/* ═══ WATCHLIST ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.watchlist)}>
        <WatchlistFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.watchlist.header)}>
        <p className="dashboard-precision-eyebrow">Active Instruments</p>
        <h3 className="dashboard-precision-title">Watchlist</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.watchlist.body)}>
        <SectionNav items={["Assets", "Alerts", "Bias"]} active={watchSection} onSelect={setWatchSection} />
        {watchlistFixture.map((a) => (
          <div key={a.ticker} className="dashboard-precision-data-row">
            <span className="dashboard-precision-data-label" style={{ minWidth: "24px" }}>{a.ticker}</span>
            <span style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178", fontSize: "inherit" }}>{a.change}</span>
            <Chip value={a.bias} tone={a.biasTone} />
          </div>
        ))}
      </div>

      {/* ═══ EVIDENCE STACK ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.evidenceStackReasoningEngine)}>
        <EvidenceStackFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.header)}>
        <p className="dashboard-precision-eyebrow">Signal Alignment</p>
        <h3 className="dashboard-precision-title">Evidence Stack</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.evidenceStackReasoningEngine.body)}>
        <SectionNav items={["Stack", "Weights", "Contradictions"]} active={evidSection} onSelect={setEvidSection} />
        {evidSection === 0 && (
          <>
            {evidenceFixture.map((e) => (
              <div key={e.label}>
                <DataRow label={e.label} value={e.value} tone={e.tone} />
                <MiniMeter score={e.score} tone={e.tone} />
              </div>
            ))}
            <div style={{ marginTop: "6px" }}>
              <DataRow label="Conviction" value={`${evidenceConviction}%`} tone="positive" />
              <MiniMeter score={evidenceConviction} tone="positive" />
            </div>
          </>
        )}
        {evidSection === 1 && evidenceFixture.map((e) => (
          <DataRow key={e.label} label={`${e.category}: ${e.label}`} value={`${e.score}%`} tone={e.tone} />
        ))}
        {evidSection === 2 && (
          <p className="dashboard-precision-note">Macro context contradicts momentum. Sentiment cautious despite structure confirmation.</p>
        )}
        <ActionBar onExpand={() => openDrawer("Evidence", "Full Evidence Chain", "Macro context contradicts momentum. Sentiment cautious despite structure confirmation. Review before commitment.")} />
      </div>

      {/* ═══ NEWS & MACRO ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.newsMacroIntelligence)}>
        <NewsMacroFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.newsMacroIntelligence.header)}>
        <p className="dashboard-precision-eyebrow">Context Drivers</p>
        <h3 className="dashboard-precision-title">News &amp; Macro</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.newsMacroIntelligence.body)}>
        <SectionNav items={["Headlines", "Events", "Compare"]} active={newsSection} onSelect={setNewsSection} />
        {newsSection === 0 && newsFixture.map((h) => (
          <div key={h.title} className="dashboard-precision-data-row">
            <span className="dashboard-precision-body-text" style={{ margin: 0, flex: 1 }}>{h.title}</span>
            <Chip value={h.impact} tone={h.tone} />
          </div>
        ))}
        {newsSection === 1 && macroEvents.map((ev) => (
          <div key={ev.label} className="dashboard-precision-data-row">
            <span className="dashboard-precision-data-label">{ev.label}</span>
            <span style={{ color: ev.impact === "high" ? "#d4a853" : "#8a8178" }}>{ev.time}</span>
          </div>
        ))}
        {newsSection === 2 && (
          <div className="dashboard-compare-split">
            <div><DataRow label="USD" value="Soft" tone="warning" /></div>
            <div><DataRow label="Gold" value="Bid" tone="positive" /></div>
          </div>
        )}
        <Chip value="Provider Pending" tone="pending" />
      </div>

      {/* ═══ COACHING INSIGHTS ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.coachingInsights)}>
        <CoachingFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.coachingInsights.header)}>
        <p className="dashboard-precision-eyebrow">Decision Support</p>
        <h3 className="dashboard-precision-title">Coaching Insights</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.coachingInsights.body)}>
        <p className="dashboard-precision-metric" style={{ fontSize: "clamp(12px, 0.75vw, 16px)" }}>{coachingFixture.headline}</p>
        <div className="dashboard-panel-scroll-x dashboard-slide-strip" style={{ margin: "4px 0" }}>
          {coachingFixture.tiles.map((t) => (
            <Chip key={t.label} value={`${t.label}: ${t.message}`} tone={t.tone} />
          ))}
        </div>
        <ActionBar onExpand={() => openDrawer("Coaching", "Coaching Rationale", coachingFixture.body)} />
      </div>

      {/* ═══ MARKET REGIME ═══ */}
      <div className="dashboard-precision-panel-frame" style={boardRectStyle(PANEL_FRAME_RECTS.marketRegimeCrossAssetPulse)}>
        <MarketRegimeFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--header" style={boardRectStyle(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.header)}>
        <p className="dashboard-precision-eyebrow">Environment State</p>
        <h3 className="dashboard-precision-title">Market Regime</h3>
      </div>
      <div className="dashboard-precision-content-slot dashboard-precision-content-slot--body dashboard-panel-scroll-y" style={boardRectStyle(PANEL_CONTENT_RECTS.marketRegimeCrossAssetPulse.body)}>
        <div className="dashboard-panel-scroll-x dashboard-slide-strip">
          {regimeFixture.map((r) => (
            <div key={r.asset} style={{ minWidth: "80px" }}>
              <DataRow label={r.asset} value={r.direction} tone={r.tone} />
              <MiniMeter score={r.strength} tone={r.tone} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
          {regimeStrip.map((s) => <Chip key={s.label} value={`${s.label}: ${s.value}`} tone={s.tone} />)}
        </div>
      </div>

      {/* ═══ DETAIL DRAWER ═══ */}
      <DashboardResponsiveDetailDrawer open={drawerOpen} title={drawerTitle} eyebrow={drawerEyebrow} onClose={() => setDrawerOpen(false)}>
        <p className="dashboard-precision-body-text">{drawerContent}</p>
        <div style={{ marginTop: "12px" }}>
          <Chip value="Fixture Mode" tone="pending" />
          <p className="dashboard-precision-note" style={{ marginTop: "8px" }}>This is fixture reasoning content. No provider connection is active.</p>
        </div>
      </DashboardResponsiveDetailDrawer>
    </>
  );
}
