/**
 * DashboardResponsivePanelLayer.tsx
 *
 * Renders all 7 dashboard panels at exact board-reference coordinates.
 * R5B: Full section switching, hover previews, enriched drawer content,
 * slide strips with edge fades, premium readability.
 *
 * All content inside existing header/body content blocks.
 * No coordinate changes. No live data. No unsafe wording.
 */

import { useState, useCallback, useEffect } from "react";
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
import { Chip, DataRow, MiniMeter, SectionNav, ActionBar, SlideStripWrapper, StatusLabel } from "./panelContent/PanelPrimitives";
import HoverPreviewCard from "./panelContent/HoverPreviewCard";
import PanelExpandButton from "./panelContent/PanelExpandButton";
import DashboardResponsiveDetailDrawer from "./DashboardResponsiveDetailDrawer";
import type { ReactNode } from "react";

/* ─── Drawer Content Templates ─── */

function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <p className="dashboard-precision-data-label" style={{ marginBottom: "4px" }}>{title}</p>
      {children}
    </div>
  );
}

function DrawerActions() {
  return (
    <div className="dashboard-panel-action-bar" style={{ marginTop: "14px" }}>
      <button type="button" className="dashboard-panel-action-btn">Add to Journal</button>
      <button type="button" className="dashboard-panel-action-btn">Open Evidence</button>
      <button type="button" className="dashboard-panel-action-btn">Save View</button>
    </div>
  );
}

/* ─── Panel Layer ─── */

export default function DashboardResponsivePanelLayer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerEyebrow, setDrawerEyebrow] = useState("");
  const [drawerPanel, setDrawerPanel] = useState("");
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const openDrawer = useCallback((eyebrow: string, title: string, panel: string) => {
    setDrawerEyebrow(eyebrow);
    setDrawerTitle(title);
    setDrawerPanel(panel);
    setDrawerOpen(true);
  }, []);

  const toggleExpand = useCallback((panelId: string) => {
    setExpandedPanel((prev) => (prev === panelId ? null : panelId));
  }, []);

  // Escape closes expanded panel
  useEffect(() => {
    if (!expandedPanel) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpandedPanel(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [expandedPanel]);

  // Section nav state
  const [biasSection, setBiasSection] = useState(0);
  const [confSection, setConfSection] = useState(0);
  const [watchSection, setWatchSection] = useState(0);
  const [evidSection, setEvidSection] = useState(0);
  const [newsSection, setNewsSection] = useState(0);
  const [coachSection, setCoachSection] = useState(0);
  const [regimeSection, setRegimeSection] = useState(0);

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
              <StatusLabel label={biasFixture.status} />
            </div>
            <p className="dashboard-precision-body-text">{biasFixture.headline}</p>
            <p className="dashboard-precision-note">{biasFixture.watchCondition}</p>
          </>
        )}
        {biasSection === 1 && biasFixture.drivers.map((d) => (
          <HoverPreviewCard
            key={d.label}
            trigger={<DataRow label={d.label} value={d.summary} tone={d.tone} />}
            preview={<><p className="dashboard-precision-body-text">{d.summary}</p><Chip value={`Freshness: ${d.freshness}`} tone={d.freshness === "Current" ? "positive" : "warning"} /></>}
          />
        ))}
        {biasSection === 2 && (
          <>
            <p className="dashboard-precision-body-text">{biasFixture.watchCondition}</p>
            <p className="dashboard-precision-body-text">{biasFixture.invalidation}</p>
            <DataRow label="Contradiction" value="Macro tension unresolved" tone="warning" />
            <p className="dashboard-precision-note">Review next session for structural confirmation.</p>
          </>
        )}
        <ActionBar onExpand={() => openDrawer("Reasoning", "Directional Bias Detail", "bias")} />
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
        {confSection === 0 && (
          <div className="dashboard-two-col">
            {confidenceFixture.metrics.map((m) => (
              <HoverPreviewCard
                key={m.label}
                trigger={<><DataRow label={m.label} value={m.value} tone={m.tone} /><MiniMeter score={m.score} tone={m.tone} /></>}
                preview={<p className="dashboard-precision-body-text">{m.label} score: {m.score}% — {m.tone === "warning" ? "Caution zone" : "Within range"}</p>}
              />
            ))}
          </div>
        )}
        {confSection === 1 && (
          <>
            {confidenceFixture.conflicts.map((c) => (
              <div key={c.label} style={{ marginBottom: "6px" }}>
                <DataRow label={c.label} value="Active" tone="warning" />
                <p className="dashboard-precision-body-text" style={{ marginTop: "2px" }}>{c.detail}</p>
              </div>
            ))}
            <p className="dashboard-precision-note">Contradictions reduce effective confidence by ~15%.</p>
          </>
        )}
        {confSection === 2 && (
          <>
            <DataRow label="Data quality" value={`${confidenceFixture.dataQuality}%`} tone="neutral" />
            <MiniMeter score={confidenceFixture.dataQuality} tone="neutral" />
            <DataRow label="Source coverage" value="3 of 5 active" tone="warning" />
            <DataRow label="Staleness risk" value="Low-moderate" tone="neutral" />
            <p className="dashboard-precision-note">{confidenceFixture.summary}</p>
          </>
        )}
        <ActionBar onExpand={() => openDrawer("Matrix", "Confidence Decomposition", "confidence")} />
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
        {watchSection === 0 && watchlistFixture.map((a) => (
          <HoverPreviewCard
            key={a.ticker}
            trigger={
              <div className="dashboard-precision-data-row">
                <span className="dashboard-precision-data-label" style={{ minWidth: "28px" }}>{a.ticker}</span>
                <span style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178" }}>{a.change}</span>
                <Chip value={a.bias} tone={a.biasTone} />
              </div>
            }
            preview={<><p className="dashboard-precision-body-text">{a.name} — {a.last}</p><DataRow label="Confidence" value={a.confidence} tone={a.biasTone} /></>}
          />
        ))}
        {watchSection === 1 && (
          <SlideStripWrapper>
            <Chip value="ES: Structure watch" tone="warning" />
            <Chip value="NQ: Momentum active" tone="positive" />
            <Chip value="GC: Pending review" tone="pending" />
          </SlideStripWrapper>
        )}
        {watchSection === 2 && watchlistFixture.map((a) => (
          <DataRow key={a.ticker} label={a.ticker} value={`${a.bias} (${a.confidence})`} tone={a.biasTone} />
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
              <HoverPreviewCard
                key={e.label}
                trigger={<><DataRow label={e.label} value={e.value} tone={e.tone} /><MiniMeter score={e.score} tone={e.tone} /></>}
                preview={<><p className="dashboard-precision-body-text">{e.category}: {e.label} — Score {e.score}%</p><Chip value={`Freshness: ${e.freshness}`} tone={e.freshness === "Current" ? "positive" : "warning"} /></>}
              />
            ))}
            <div style={{ marginTop: "6px", borderTop: "1px solid rgba(138,129,120,0.1)", paddingTop: "4px" }}>
              <DataRow label="Aggregate conviction" value={`${evidenceConviction}%`} tone="positive" />
              <MiniMeter score={evidenceConviction} tone="positive" />
            </div>
          </>
        )}
        {evidSection === 1 && (
          <div className="dashboard-two-col">
            {evidenceFixture.map((e) => (
              <DataRow key={e.label} label={`${e.category}: ${e.label}`} value={`${e.score}%`} tone={e.tone} />
            ))}
          </div>
        )}
        {evidSection === 2 && (
          <div className="dashboard-two-col">
            <div>
              <DataRow label="Macro vs momentum" value="Contradicting" tone="warning" />
              <p className="dashboard-precision-body-text">Macro context contradicts momentum.</p>
            </div>
            <div>
              <DataRow label="Sentiment vs breadth" value="Diverging" tone="warning" />
              <p className="dashboard-precision-body-text">Sentiment cautious despite structure confirmation.</p>
            </div>
          </div>
        )}
        <ActionBar onExpand={() => openDrawer("Evidence", "Full Evidence Chain", "evidence")} />
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
        {newsSection === 0 && (
          <div className="dashboard-news-timeline">
            {newsFixture.map((h, i) => (
              <HoverPreviewCard
                key={h.title}
                className={i % 2 === 0 ? "dashboard-news-timeline__left" : "dashboard-news-timeline__right"}
                trigger={
                  <div className="dashboard-news-timeline__item">
                    <span className={`dashboard-news-timeline__dot dashboard-news-timeline__dot--${h.impact}`} />
                    <span className="dashboard-precision-body-text" style={{ margin: 0, flex: 1 }}>{h.title}</span>
                    <Chip value={h.impact} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} />
                  </div>
                }
                preview={<><p className="dashboard-precision-body-text">Source: {h.source} — {h.time}</p><Chip value={`Impact: ${h.impact}`} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} /></>}
              />
            ))}
          </div>
        )}
        {newsSection === 1 && (
          <SlideStripWrapper>
            {macroEvents.map((ev) => (
              <HoverPreviewCard
                key={ev.label}
                trigger={
                  <div style={{ minWidth: "120px", padding: "2px 0" }}>
                    <DataRow label={ev.label} value={ev.time} tone={ev.impact === "high" ? "warning" : "neutral"} />
                  </div>
                }
                preview={<p className="dashboard-precision-body-text">{ev.label} — {ev.status}. Impact: {ev.impact}</p>}
              />
            ))}
          </SlideStripWrapper>
        )}
        {newsSection === 2 && (
          <div className="dashboard-compare-split">
            <div>
              <DataRow label="USD Index" value="Soft" tone="warning" />
              <DataRow label="EUR/USD" value="Firm" tone="positive" />
            </div>
            <div>
              <DataRow label="Gold" value="Bid" tone="positive" />
              <DataRow label="Yields" value="Flat" tone="neutral" />
            </div>
          </div>
        )}
        <StatusLabel label="Provider Pending" />
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
        <SectionNav items={["Focus", "Discipline", "Journal"]} active={coachSection} onSelect={setCoachSection} />
        {coachSection === 0 && (
          <div className="dashboard-compare-split">
            <div>
              <p className="dashboard-precision-metric" style={{ fontSize: "clamp(12px, 0.75vw, 16px)" }}>{coachingFixture.headline}</p>
              <p className="dashboard-precision-body-text">{coachingFixture.body}</p>
            </div>
            <div>
              {coachingFixture.checklist.slice(0, 2).map((item) => (
                <div key={item} className="dashboard-precision-data-row">
                  <span className="dashboard-precision-data-label">☐</span>
                  <span style={{ color: "#b8afa6" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {coachSection === 1 && (
          <SlideStripWrapper>
            {coachingFixture.tiles.map((t) => (
              <HoverPreviewCard
                key={t.label}
                trigger={<Chip value={`${t.label}: ${t.message}`} tone={t.tone} />}
                preview={<p className="dashboard-precision-body-text">{t.label} — {t.message}</p>}
              />
            ))}
          </SlideStripWrapper>
        )}
        {coachSection === 2 && (
          <>
            {coachingFixture.checklist.map((item) => (
              <div key={item} className="dashboard-precision-data-row">
                <span className="dashboard-precision-data-label">☐</span>
                <span className="dashboard-precision-body-text" style={{ margin: 0 }}>{item}</span>
              </div>
            ))}
            <ActionBar onExpand={() => openDrawer("Coaching", "Journal Prompt", "coaching")} actions={["Add to Journal", "Save View"]} />
          </>
        )}
        {coachSection !== 2 && <ActionBar onExpand={() => openDrawer("Coaching", "Coaching Rationale", "coaching")} />}
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
        <SectionNav items={["Pulse", "Correlation", "Liquidity"]} active={regimeSection} onSelect={setRegimeSection} />
        {regimeSection === 0 && (
          <SlideStripWrapper>
            {regimeFixture.map((r) => (
              <HoverPreviewCard
                key={r.asset}
                trigger={
                  <div style={{ minWidth: "90px" }}>
                    <DataRow label={r.asset} value={r.direction} tone={r.tone} />
                    <MiniMeter score={r.strength} tone={r.tone} />
                  </div>
                }
                preview={<p className="dashboard-precision-body-text">{r.asset}: {r.direction} — Strength {r.strength}%</p>}
              />
            ))}
          </SlideStripWrapper>
        )}
        {regimeSection === 1 && (
          <div className="dashboard-two-col">
            <div>
              {regimeStrip.slice(0, 2).map((s) => <DataRow key={s.label} label={s.label} value={s.value} tone={s.tone} />)}
            </div>
            <div>
              {regimeStrip.slice(2).map((s) => <DataRow key={s.label} label={s.label} value={s.value} tone={s.tone} />)}
            </div>
          </div>
        )}
        {regimeSection === 2 && (
          <div className="dashboard-compare-split">
            <div>
              <DataRow label="Liquidity" value="Adequate" tone="positive" />
              <DataRow label="Spread environment" value="Normal" tone="neutral" />
            </div>
            <div>
              <DataRow label="Volatility regime" value="Moderate" tone="neutral" />
              <DataRow label="Correlation" value="Elevated" tone="warning" />
            </div>
          </div>
        )}
      </div>

      {/* ═══ PANEL EXPAND BUTTONS ═══ */}
      {(Object.keys(PANEL_FRAME_RECTS) as Array<keyof typeof PANEL_FRAME_RECTS>).map((key) => {
        const rect = PANEL_FRAME_RECTS[key];
        const btnStyle = {
          position: "absolute" as const,
          left: `${((rect.x + rect.w - 28) / 1920) * 100}%`,
          top: `${((rect.y + 6) / 1080) * 100}%`,
          zIndex: expandedPanel === key ? 130 : 25,
        };
        return (
          <div key={key} style={btnStyle}>
            <PanelExpandButton expanded={expandedPanel === key} onToggle={() => toggleExpand(key)} />
          </div>
        );
      })}

      {/* Expanded panel overlay */}
      {expandedPanel && (
        <div className="dashboard-panel-expand-overlay" onClick={() => setExpandedPanel(null)} />
      )}

      {/* ═══ DETAIL DRAWER ═══ */}
      <DashboardResponsiveDetailDrawer open={drawerOpen} title={drawerTitle} eyebrow={drawerEyebrow} onClose={() => setDrawerOpen(false)}>
        {drawerPanel === "bias" && (
          <>
            <DrawerSection title="Bias Snapshot">
              <DataRow label="Direction" value={biasFixture.direction} tone="positive" />
              <DataRow label="Strength" value={biasFixture.strength} tone={biasFixture.strengthTone} />
              <DataRow label="Condition" value={biasFixture.condition} tone={biasFixture.conditionTone} />
            </DrawerSection>
            <DrawerSection title="Driver Weighting">
              {biasFixture.drivers.map((d) => <DataRow key={d.label} label={d.label} value={d.freshness} tone={d.tone} />)}
            </DrawerSection>
            <DrawerSection title="Conditions to Watch">
              <p className="dashboard-precision-body-text">{biasFixture.watchCondition}</p>
              <p className="dashboard-precision-body-text">{biasFixture.invalidation}</p>
            </DrawerSection>
            <DrawerSection title="Contradiction Notes">
              <p className="dashboard-precision-note">Macro tension unresolved. Momentum supports upside but broader context mixed.</p>
            </DrawerSection>
          </>
        )}
        {drawerPanel === "confidence" && (
          <>
            <DrawerSection title="Confidence Decomposition">
              {confidenceFixture.metrics.map((m) => <><DataRow key={m.label} label={m.label} value={`${m.score}%`} tone={m.tone} /><MiniMeter score={m.score} tone={m.tone} /></>)}
            </DrawerSection>
            <DrawerSection title="Freshness">
              <DataRow label="Review window" value="Active" tone="positive" />
              <DataRow label="Staleness risk" value="Low-moderate" tone="neutral" />
            </DrawerSection>
            <DrawerSection title="Contradiction">
              {confidenceFixture.conflicts.map((c) => <p key={c.label} className="dashboard-precision-body-text">{c.label}: {c.detail}</p>)}
            </DrawerSection>
            <DrawerSection title="Data Quality">
              <DataRow label="Quality score" value={`${confidenceFixture.dataQuality}%`} tone="neutral" />
              <p className="dashboard-precision-note">3 of 5 sources active in fixture mode.</p>
            </DrawerSection>
          </>
        )}
        {drawerPanel === "evidence" && (
          <>
            <DrawerSection title="Evidence Hierarchy">
              {evidenceFixture.map((e) => <DataRow key={e.label} label={`${e.category}: ${e.label}`} value={`${e.score}%`} tone={e.tone} />)}
            </DrawerSection>
            <DrawerSection title="Weighted Drivers">
              <DataRow label="Aggregate conviction" value={`${evidenceConviction}%`} tone="positive" />
              <MiniMeter score={evidenceConviction} tone="positive" />
            </DrawerSection>
            <DrawerSection title="Contradictions">
              <p className="dashboard-precision-body-text">Macro context contradicts momentum. Sentiment cautious despite structure confirmation.</p>
            </DrawerSection>
            <DrawerSection title="Provider Status">
              <StatusLabel label="Provider Pending — Fixture Mode" />
              <p className="dashboard-precision-note">Evidence based on fixture reasoning data only.</p>
            </DrawerSection>
          </>
        )}
        {drawerPanel === "coaching" && (
          <>
            <DrawerSection title="Discipline Rationale">
              <p className="dashboard-precision-body-text">{coachingFixture.body}</p>
            </DrawerSection>
            <DrawerSection title="Scenario Checklist">
              {coachingFixture.checklist.map((item) => <DataRow key={item} label="☐" value={item} tone="neutral" />)}
            </DrawerSection>
            <DrawerSection title="Journal Prompt">
              <p className="dashboard-precision-body-text">Document current bias reasoning, contradiction awareness, and review conditions before next session.</p>
            </DrawerSection>
            <DrawerSection title="Review Window">
              <DataRow label="Next review" value="Next session open" tone="neutral" />
              <p className="dashboard-precision-note">Reassess if structure zone breaks or macro catalyst arrives.</p>
            </DrawerSection>
          </>
        )}
        {!["bias", "confidence", "evidence", "coaching"].includes(drawerPanel) && (
          <p className="dashboard-precision-body-text">Panel detail content for this section. Fixture mode — no provider connection active.</p>
        )}
        <StatusLabel label="Fixture Mode" />
        <DrawerActions />
      </DashboardResponsiveDetailDrawer>
    </>
  );
}
