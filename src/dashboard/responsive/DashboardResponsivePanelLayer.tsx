/**
 * DashboardResponsivePanelLayer.tsx
 *
 * R6A: Production-simulation content architecture.
 * Each panel has 4 modes covering all ELCEO user-facing surfaces.
 * No coordinate changes. No live data. No unsafe wording.
 */

import { useState, useCallback, useEffect } from "react";
import {
  DirectionalBiasFrame, ConfidenceMatrixFrame, WatchlistFrame,
  EvidenceStackFrame, NewsMacroFrame, CoachingFrame, MarketRegimeFrame,
} from "./dashboardResponsiveAssets";
import {
  assetCockpitFixture, biasFixture, confidenceDecompositionFixture,
  watchlistFixture, watchlistFxMajors, portfolioWatchlistFixture,
  evidenceStackFixture, evidenceConviction, marketInsightsFixture,
  macroIntelligenceFixture, coachingFixture, journalQuickCaptureFixture,
  analyticsPreviewFixture, regimeFixture, regimeStrip,
  notificationReadinessFixture, accountBillingReadinessFixture,
  providerTraceFixture, routePreviewFixture, dashboardAccessFixture,
} from "./responsivePanelFixtures";
import { Chip, DataRow, MiniMeter, SectionNav, ActionBar, SlideStripWrapper, StatusLabel } from "./panelContent/PanelPrimitives";
import HoverPreviewCard from "./panelContent/HoverPreviewCard";
import { MiniSparkline, MiniDonutScore, EvidenceWeightBar, SessionBadge, CrossAssetMiniPulse } from "./panelContent/MiniVisuals";
import PrecisionPanelGroup from "./PrecisionPanelGroup";
import type { PanelId } from "./PrecisionPanelGroup";
import DashboardResponsiveDetailDrawer from "./DashboardResponsiveDetailDrawer";
import type { ReactNode } from "react";


/* ─── Drawer Templates ─── */
function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (<div style={{ marginBottom: "12px" }}><p className="dashboard-precision-data-label" style={{ marginBottom: "4px" }}>{title}</p>{children}</div>);
}
function DrawerActions({ panel }: { panel: string }) {
  const actions: Record<string, string[]> = {
    bias: ["Open Evidence", "Add Journal Note", "View Analytics"],
    confidence: ["Open Evidence", "View Provider Trace", "Account Readiness"],
    evidence: ["Open Market Evidence", "Add Journal Note", "View Analytics"],
    coaching: ["Add Journal Note", "View Analytics", "Open Notifications"],
    news: ["Open Evidence", "View Analytics", "Open Notifications"],
    regime: ["Open Notifications", "Account Readiness", "View Billing"],
  };
  return (
    <div className="dashboard-panel-action-bar" style={{ marginTop: "14px" }}>
      {(actions[panel] ?? ["Open Evidence", "Add Journal Note", "Account Readiness"]).map((a) => (
        <button key={a} type="button" className="dashboard-panel-action-btn">{a}</button>
      ))}
    </div>
  );
}


/* ─── Panel Layer ─── */
export default function DashboardResponsivePanelLayer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerEyebrow, setDrawerEyebrow] = useState("");
  const [drawerPanel, setDrawerPanel] = useState("");
  const [expandedPanel, setExpandedPanel] = useState<PanelId | null>(null);

  const openDrawer = useCallback((eyebrow: string, title: string, panel: string) => {
    setDrawerEyebrow(eyebrow); setDrawerTitle(title); setDrawerPanel(panel); setDrawerOpen(true);
  }, []);
  const toggleExpand = useCallback((panelId: PanelId) => {
    setExpandedPanel((prev) => (prev === panelId ? null : panelId));
  }, []);

  useEffect(() => {
    if (!expandedPanel) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setExpandedPanel(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [expandedPanel]);

  const [biasMode, setBiasMode] = useState(0);
  const [confMode, setConfMode] = useState(0);
  const [watchMode, setWatchMode] = useState(0);
  const [evidMode, setEvidMode] = useState(0);
  const [newsMode, setNewsMode] = useState(0);
  const [coachMode, setCoachMode] = useState(0);
  const [regimeMode, setRegimeMode] = useState(0);

  return (
    <>
      {expandedPanel && <div className="dashboard-panel-expand-overlay" onClick={() => setExpandedPanel(null)} />}


      {/* ═══ DIRECTIONAL BIAS — Modes: Bias / Scenario / Readiness / Asset ═══ */}
      <PrecisionPanelGroup panelId="directionalBiasSummary" expanded={expandedPanel === "directionalBiasSummary"} onToggleExpand={() => toggleExpand("directionalBiasSummary")} frameSvg={<DirectionalBiasFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Reasoning Snapshot</p><h3 className="dashboard-precision-title">Directional Bias</h3></>}
        bodyContent={<>
          <SectionNav items={["Bias", "Scenario", "Readiness", "Asset"]} active={biasMode} onSelect={setBiasMode} />
          {biasMode === 0 && (<>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", margin: "2px 0 4px" }}>
              <SessionBadge session={biasFixture.session} /><Chip value={biasFixture.activeAsset} tone="positive" />
            </div>
            <p className="dashboard-precision-metric">{biasFixture.direction}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "4px 0" }}>
              <Chip value={biasFixture.strength} tone={biasFixture.strengthTone} />
              <Chip value={biasFixture.condition} tone={biasFixture.conditionTone} />
              <StatusLabel label={biasFixture.status} />
            </div>
            <p className="dashboard-precision-body-text">{biasFixture.headline}</p>
            {biasFixture.drivers.slice(0, 3).map((d) => (
              <HoverPreviewCard key={d.label} trigger={<DataRow label={d.label} value={d.summary} tone={d.tone} />}
                preview={<><p className="dashboard-precision-body-text">{d.summary}</p><Chip value={`Freshness: ${d.freshness}`} tone={d.freshness === "Current" ? "positive" : "warning"} /></>} />
            ))}
          </>)}
          {biasMode === 1 && (<>
            <DataRow label="Primary" value={biasFixture.scenarios.primary} tone="positive" />
            <DataRow label="Alternate" value={biasFixture.scenarios.alternate} tone="warning" />
            <DataRow label="Invalidation" value={biasFixture.scenarios.invalidation} tone="negative" />
            <p className="dashboard-precision-note">{biasFixture.watchCondition}</p>
            <DataRow label="Next review" value={marketInsightsFixture.nextReviewTrigger} tone="neutral" />
          </>)}
          {biasMode === 2 && (<>
            <DataRow label="Confidence" value={`${confidenceDecompositionFixture.metrics[0].score}%`} tone="positive" />
            <DataRow label="Freshness" value={confidenceDecompositionFixture.metrics[2].value} tone="positive" />
            <DataRow label="Contradiction" value={confidenceDecompositionFixture.metrics[1].value} tone="warning" />
            <DataRow label="Provider mode" value={dashboardAccessFixture.providerMode} tone="neutral" />
            <p className="dashboard-precision-note">{coachingFixture.behaviorOverlay.readinessGate}</p>
          </>)}
          {biasMode === 3 && (<>
            <DataRow label="Active asset" value={assetCockpitFixture.activeAsset} tone="positive" />
            <DataRow label="Class" value={assetCockpitFixture.assetClass} tone="neutral" />
            <DataRow label="Timeframe" value={assetCockpitFixture.timeframe} tone="neutral" />
            <DataRow label="Session" value={assetCockpitFixture.session} tone="positive" />
            <DataRow label="Route" value={assetCockpitFixture.route} tone="neutral" />
            <p className="dashboard-precision-note">Available tabs: {assetCockpitFixture.availableAssetTabs.join(", ")}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Reasoning", "Directional Bias Detail", "bias")} />
        </>}
      />


      {/* ═══ CONFIDENCE — Modes: Confidence / Contradiction / Freshness / Access ═══ */}
      <PrecisionPanelGroup panelId="confidenceContextMatrix" expanded={expandedPanel === "confidenceContextMatrix"} onToggleExpand={() => toggleExpand("confidenceContextMatrix")} frameSvg={<ConfidenceMatrixFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Reasoning Matrix</p><h3 className="dashboard-precision-title">Confidence &amp; Context</h3></>}
        bodyContent={<>
          <SectionNav items={["Confidence", "Contradiction", "Freshness", "Access"]} active={confMode} onSelect={setConfMode} />
          {confMode === 0 && (
            <div className="dashboard-two-col">
              {confidenceDecompositionFixture.metrics.map((m) => (
                <HoverPreviewCard key={m.label}
                  trigger={<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={m.score} tone={m.tone} /><div style={{ flex: 1 }}><DataRow label={m.label} value={m.value} tone={m.tone} /></div></div>}
                  preview={<p className="dashboard-precision-body-text">{m.label}: {m.score}% — {m.tone === "warning" ? "Caution zone" : "Within range"}</p>} />
              ))}
            </div>
          )}
          {confMode === 1 && (<>
            {confidenceDecompositionFixture.conflicts.map((c) => (
              <div key={c.label} style={{ marginBottom: "6px" }}><DataRow label={c.label} value="Active" tone="warning" /><p className="dashboard-precision-body-text" style={{ marginTop: "2px" }}>{c.detail}</p></div>
            ))}
            <DataRow label="Why not higher" value={confidenceDecompositionFixture.whyNotHigher} tone="warning" />
            <DataRow label="Why not lower" value={confidenceDecompositionFixture.whyNotLower} tone="positive" />
          </>)}
          {confMode === 2 && (<>
            <DataRow label="Freshness score" value={`${confidenceDecompositionFixture.metrics[2].score}%`} tone="positive" />
            <DataRow label="Data quality" value={`${confidenceDecompositionFixture.dataQuality}%`} tone="neutral" />
            <MiniMeter score={confidenceDecompositionFixture.dataQuality} tone="neutral" />
            <DataRow label="Provider mode" value={providerTraceFixture.marketData} tone="warning" />
            <DataRow label="Extraction" value={providerTraceFixture.extraction} tone="warning" />
            <p className="dashboard-precision-note">{marketInsightsFixture.freshnessNote}</p>
          </>)}
          {confMode === 3 && (<>
            <DataRow label="Plan" value={accountBillingReadinessFixture.plan} tone="positive" />
            <DataRow label="Plan state" value={accountBillingReadinessFixture.planState} tone="positive" />
            <DataRow label="Live activation" value={dashboardAccessFixture.liveActivation} tone="warning" />
            <DataRow label="Restricted" value={accountBillingReadinessFixture.restrictedUser ? "Yes" : "No"} tone="positive" />
            <p className="dashboard-precision-note">{accountBillingReadinessFixture.subscriptionWallPreview}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Matrix", "Confidence Decomposition", "confidence")} />
        </>}
      />


      {/* ═══ WATCHLIST — Modes: Featured / FX Majors / Alerts / Portfolio ═══ */}
      <PrecisionPanelGroup panelId="watchlist" expanded={expandedPanel === "watchlist"} onToggleExpand={() => toggleExpand("watchlist")} frameSvg={<WatchlistFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Active Instruments</p><h3 className="dashboard-precision-title">Watchlist</h3></>}
        bodyContent={<>
          <SectionNav items={["Featured", "FX Majors", "Alerts", "Portfolio"]} active={watchMode} onSelect={setWatchMode} />
          {watchMode === 0 && watchlistFixture.map((a) => (
            <HoverPreviewCard key={a.ticker}
              trigger={<div className="dashboard-precision-data-row"><span className="dashboard-watchlist-ticker" style={{ minWidth: "52px" }}>{a.ticker}</span><MiniSparkline data={a.sparkline} tone={a.changeTone} /><span className="dashboard-precision-data-value--mono" style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178", minWidth: "42px", textAlign: "right" }}>{a.change}</span><Chip value={a.bias} tone={a.biasTone} /></div>}
              preview={<><p className="dashboard-precision-body-text">{a.name} — {a.last}</p><DataRow label="Confidence" value={a.confidence} tone={a.biasTone} /></>} />
          ))}
          {watchMode === 1 && watchlistFxMajors.map((a) => (
            <HoverPreviewCard key={a.ticker}
              trigger={<div className="dashboard-precision-data-row"><span className="dashboard-watchlist-ticker" style={{ minWidth: "52px" }}>{a.ticker}</span><MiniSparkline data={a.sparkline} tone={a.changeTone} /><span className="dashboard-precision-data-value--mono" style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178", minWidth: "42px", textAlign: "right" }}>{a.change}</span><Chip value={a.bias} tone={a.biasTone} /></div>}
              preview={<><p className="dashboard-precision-body-text">{a.name} — {a.last}</p><DataRow label="Confidence" value={a.confidence} tone={a.biasTone} /></>} />
          ))}
          {watchMode === 2 && portfolioWatchlistFixture.alerts.map((al) => (
            <HoverPreviewCard key={al.asset} trigger={<DataRow label={al.asset} value={al.alert} tone={al.tone} />}
              preview={<p className="dashboard-precision-body-text">{al.asset}: {al.alert}</p>} />
          ))}
          {watchMode === 3 && (<>
            {portfolioWatchlistFixture.trackedScenarios.map((s) => (
              <DataRow key={s.asset} label={s.asset} value={s.scenario} tone={s.tone} />
            ))}
            <DataRow label="Route" value={portfolioWatchlistFixture.routePreview} tone="neutral" />
            <p className="dashboard-precision-note">{portfolioWatchlistFixture.lockedPreview}</p>
          </>)}
        </>}
      />


      {/* ═══ EVIDENCE — Modes: Stack / Insights / Provider Trace / Freshness ═══ */}
      <PrecisionPanelGroup panelId="evidenceStackReasoningEngine" expanded={expandedPanel === "evidenceStackReasoningEngine"} onToggleExpand={() => toggleExpand("evidenceStackReasoningEngine")} frameSvg={<EvidenceStackFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Signal Alignment</p><h3 className="dashboard-precision-title">Evidence · Insights</h3></>}
        bodyContent={<>
          <SectionNav items={["Stack", "Insights", "Provider", "Freshness"]} active={evidMode} onSelect={setEvidMode} />
          {evidMode === 0 && (<>
            {evidenceStackFixture.map((e) => (
              <HoverPreviewCard key={e.label} trigger={<><DataRow label={e.label} value={e.value} tone={e.tone} /><EvidenceWeightBar score={e.score} tone={e.tone} /></>}
                preview={<><p className="dashboard-precision-body-text">{e.category}: {e.label} — Score {e.score}%</p><Chip value={`Freshness: ${e.freshness}`} tone={e.freshness === "Current" ? "positive" : "warning"} /></>} />
            ))}
            <div style={{ marginTop: "6px", borderTop: "1px solid rgba(138,129,120,0.1)", paddingTop: "4px" }}>
              <DataRow label="Aggregate conviction" value={`${evidenceConviction}%`} tone="positive" mono />
              <MiniMeter score={evidenceConviction} tone="positive" />
            </div>
          </>)}
          {evidMode === 1 && (<>
            <p className="dashboard-precision-body-text">{marketInsightsFixture.summary}</p>
            <DataRow label="Supports" value={marketInsightsFixture.topSupports[0]} tone="positive" />
            <DataRow label="Supports" value={marketInsightsFixture.topSupports[1]} tone="positive" />
            <DataRow label="Contradicts" value={marketInsightsFixture.topContradictions[0]} tone="warning" />
            <DataRow label="Contradicts" value={marketInsightsFixture.topContradictions[1]} tone="warning" />
            <p className="dashboard-precision-note">{marketInsightsFixture.cautionNote}</p>
          </>)}
          {evidMode === 2 && (<>
            <DataRow label="Market data" value={providerTraceFixture.marketData} tone="warning" />
            <DataRow label="News" value={providerTraceFixture.news} tone="neutral" />
            <DataRow label="Macro" value={providerTraceFixture.macro} tone="neutral" />
            <DataRow label="Extraction" value={providerTraceFixture.extraction} tone="warning" />
            <DataRow label="Notifications" value={providerTraceFixture.notifications} tone="neutral" />
            <DataRow label="Persistence" value={providerTraceFixture.persistenceStatus} tone="neutral" />
            <StatusLabel label="Provider Pending" />
          </>)}
          {evidMode === 3 && (<>
            <DataRow label="Freshness score" value={`${confidenceDecompositionFixture.metrics[2].score}%`} tone="positive" />
            <MiniMeter score={confidenceDecompositionFixture.metrics[2].score} tone="positive" />
            <DataRow label="Stale risk" value="Low-moderate" tone="neutral" />
            <DataRow label="Next review cue" value={marketInsightsFixture.nextReviewTrigger} tone="neutral" />
            <p className="dashboard-precision-note">{marketInsightsFixture.freshnessNote}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Evidence", "Full Evidence Chain", "evidence")} />
        </>}
      />


      {/* ═══ NEWS & MACRO — Modes: Headlines / Events / Currency / Macro Pulse ═══ */}
      <PrecisionPanelGroup panelId="newsMacroIntelligence" expanded={expandedPanel === "newsMacroIntelligence"} onToggleExpand={() => toggleExpand("newsMacroIntelligence")} frameSvg={<NewsMacroFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Context Drivers</p><h3 className="dashboard-precision-title">News &amp; Macro</h3></>}
        bodyContent={<>
          <SectionNav items={["Headlines", "Events", "Currency", "Macro Pulse"]} active={newsMode} onSelect={setNewsMode} />
          {newsMode === 0 && (
            <div className="dashboard-news-timeline">
              {macroIntelligenceFixture.headlines.map((h, i) => (
                <HoverPreviewCard key={h.title} className={i % 2 === 0 ? "dashboard-news-timeline__left" : "dashboard-news-timeline__right"}
                  trigger={<div className="dashboard-news-timeline__item"><span className={`dashboard-news-timeline__dot dashboard-news-timeline__dot--${h.impact}`} /><span className="dashboard-precision-body-text" style={{ margin: 0, flex: 1 }}>{h.title}</span><Chip value={h.impact} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} /></div>}
                  preview={<><p className="dashboard-precision-body-text">Source: {h.source} — {h.time}</p><Chip value={`Impact: ${h.impact}`} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} /></>} />
              ))}
            </div>
          )}
          {newsMode === 1 && (
            <div className="dashboard-events-flow">
              {macroIntelligenceFixture.events.map((ev) => (
                <HoverPreviewCard key={ev.label} className={`dashboard-event-node dashboard-event-node--${ev.impact}`}
                  trigger={<div className="dashboard-event-node__content"><span className="dashboard-precision-metadata">{ev.time}</span><span className="dashboard-precision-body-text" style={{ margin: 0 }}>{ev.label}</span><div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}><Chip value={ev.impact} tone={ev.impact === "high" ? "negative" : ev.impact === "medium" ? "positive" : "warning"} /><Chip value={ev.status} tone="neutral" /></div></div>}
                  preview={<p className="dashboard-precision-body-text">{ev.label} — {ev.status}. Scheduled macro catalyst.</p>} />
              ))}
            </div>
          )}
          {newsMode === 2 && (<>
            <DataRow label={macroIntelligenceFixture.currencyCompare.usdVsGold.label} value={macroIntelligenceFixture.currencyCompare.usdVsGold.direction} tone={macroIntelligenceFixture.currencyCompare.usdVsGold.tone} />
            <DataRow label={macroIntelligenceFixture.currencyCompare.usdVsJpy.label} value={macroIntelligenceFixture.currencyCompare.usdVsJpy.direction} tone={macroIntelligenceFixture.currencyCompare.usdVsJpy.tone} />
            <DataRow label={macroIntelligenceFixture.currencyCompare.eurUsd.label} value={macroIntelligenceFixture.currencyCompare.eurUsd.direction} tone={macroIntelligenceFixture.currencyCompare.eurUsd.tone} />
            <DataRow label={macroIntelligenceFixture.currencyCompare.realYields.label} value={macroIntelligenceFixture.currencyCompare.realYields.direction} tone={macroIntelligenceFixture.currencyCompare.realYields.tone} />
          </>)}
          {newsMode === 3 && (<>
            <DataRow label="Central bank tone" value={macroIntelligenceFixture.macroPulse.centralBankTone} tone="positive" />
            <DataRow label="Liquidity" value={macroIntelligenceFixture.macroPulse.liquidity} tone="positive" />
            <DataRow label="Risk event" value={macroIntelligenceFixture.macroPulse.riskEvent} tone="warning" />
            <DataRow label="Provider status" value={macroIntelligenceFixture.macroPulse.providerStatus} tone="neutral" />
            <StatusLabel label="Provider Pending" />
          </>)}
        </>}
      />


      {/* ═══ COACHING — Modes: Coaching / Journal / Analytics / Behavior ═══ */}
      <PrecisionPanelGroup panelId="coachingInsights" expanded={expandedPanel === "coachingInsights"} onToggleExpand={() => toggleExpand("coachingInsights")} frameSvg={<CoachingFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Decision Support</p><h3 className="dashboard-precision-title">Coaching · Journal</h3></>}
        bodyContent={<>
          <SectionNav items={["Coaching", "Journal", "Analytics", "Behavior"]} active={coachMode} onSelect={setCoachMode} />
          {coachMode === 0 && (<>
            <p className="dashboard-precision-metric" style={{ fontSize: "clamp(12px, 0.75vw, 16px)" }}>{coachingFixture.headline}</p>
            <p className="dashboard-precision-body-text">{coachingFixture.body}</p>
            {coachingFixture.checklist.slice(0, 3).map((item) => (
              <div key={item} className="dashboard-precision-data-row"><span className="dashboard-precision-data-label">☐</span><span style={{ color: "#b8afa6" }}>{item}</span></div>
            ))}
          </>)}
          {coachMode === 1 && (<>
            <DataRow label="Asset" value={journalQuickCaptureFixture.asset} tone="positive" />
            <DataRow label="Prompt" value={journalQuickCaptureFixture.prompt} tone="neutral" />
            <DataRow label="Emotional state" value={journalQuickCaptureFixture.emotionalState} tone="positive" />
            <DataRow label="Discipline" value={journalQuickCaptureFixture.disciplineNote} tone="neutral" />
            <DataRow label="Last entry" value={journalQuickCaptureFixture.lastEntry} tone="neutral" />
            <p className="dashboard-precision-note">Tags: {journalQuickCaptureFixture.tags.join(", ")}</p>
            <DataRow label="Route" value={journalQuickCaptureFixture.suggestedRoute} tone="neutral" />
          </>)}
          {coachMode === 2 && (<>
            {analyticsPreviewFixture.metrics.map((m) => (
              <DataRow key={m.label} label={m.label} value={m.value} tone={m.tone} />
            ))}
            <p className="dashboard-precision-note">{analyticsPreviewFixture.behaviorCaution}</p>
            <DataRow label="Route" value={analyticsPreviewFixture.performanceLensRoute} tone="neutral" />
          </>)}
          {coachMode === 3 && (<>
            <DataRow label="Recent quality" value={coachingFixture.behaviorOverlay.recentQuality} tone="positive" />
            <DataRow label="Readiness gate" value={coachingFixture.behaviorOverlay.readinessGate} tone="neutral" />
            <DataRow label="Caution" value={coachingFixture.behaviorOverlay.caution} tone="positive" />
            <SlideStripWrapper>
              {coachingFixture.tiles.map((t) => (
                <HoverPreviewCard key={t.label} trigger={<Chip value={`${t.label}: ${t.message}`} tone={t.tone} />}
                  preview={<p className="dashboard-precision-body-text">{t.label} — {t.message}</p>} />
              ))}
            </SlideStripWrapper>
          </>)}
          <ActionBar onExpand={() => openDrawer("Coaching", "Coaching & Journal", "coaching")} />
        </>}
      />


      {/* ═══ MARKET REGIME — Modes: Cross-Asset / Liquidity / Notifications / Account ═══ */}
      <PrecisionPanelGroup panelId="marketRegimeCrossAssetPulse" expanded={expandedPanel === "marketRegimeCrossAssetPulse"} onToggleExpand={() => toggleExpand("marketRegimeCrossAssetPulse")} frameSvg={<MarketRegimeFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Environment State</p><h3 className="dashboard-precision-title">Market Regime</h3></>}
        bodyContent={<>
          <SectionNav items={["Cross-Asset", "Liquidity", "Notifications", "Account"]} active={regimeMode} onSelect={setRegimeMode} />
          {regimeMode === 0 && (
            <SlideStripWrapper>
              {regimeFixture.map((r) => (
                <HoverPreviewCard key={r.asset}
                  trigger={<div style={{ minWidth: "90px" }}><DataRow label={r.asset} value={r.direction} tone={r.tone} /><CrossAssetMiniPulse strength={r.strength} tone={r.tone} /></div>}
                  preview={<p className="dashboard-precision-body-text">{r.asset}: {r.direction} — Strength {r.strength}%</p>} />
              ))}
            </SlideStripWrapper>
          )}
          {regimeMode === 1 && (
            <div className="dashboard-compare-split">
              <div>
                {regimeStrip.slice(0, 2).map((s) => <DataRow key={s.label} label={s.label} value={s.value} tone={s.tone} />)}
                <DataRow label="Spread" value="Normal" tone="neutral" />
              </div>
              <div>
                {regimeStrip.slice(2).map((s) => <DataRow key={s.label} label={s.label} value={s.value} tone={s.tone} />)}
              </div>
            </div>
          )}
          {regimeMode === 2 && (<>
            <DataRow label="Inbox" value={`${notificationReadinessFixture.inboxCount} pending`} tone="neutral" />
            {notificationReadinessFixture.topics.map((t) => <DataRow key={t} label="Topic" value={t} tone="neutral" />)}
            <DataRow label="Quiet hours" value={notificationReadinessFixture.quietHours} tone="neutral" />
            <DataRow label="Delivery" value={notificationReadinessFixture.delivery} tone="warning" />
            <DataRow label="Route" value={notificationReadinessFixture.routePreview} tone="neutral" />
          </>)}
          {regimeMode === 3 && (<>
            <DataRow label="Plan" value={accountBillingReadinessFixture.plan} tone="positive" />
            <DataRow label="Social ID" value={accountBillingReadinessFixture.socialIdentifierReadiness} tone="positive" />
            <DataRow label="Payment" value={accountBillingReadinessFixture.paymentReadiness} tone="positive" />
            <DataRow label="Live activation" value={accountBillingReadinessFixture.billingReadiness} tone="warning" />
            <DataRow label="Restricted" value={accountBillingReadinessFixture.restrictedUser ? "Yes" : "No"} tone="positive" />
            <p className="dashboard-precision-note">{accountBillingReadinessFixture.subscriptionWallPreview}</p>
          </>)}
        </>}
      />


      {/* ═══ DETAIL DRAWER ═══ */}
      <DashboardResponsiveDetailDrawer open={drawerOpen} title={drawerTitle} eyebrow={drawerEyebrow} onClose={() => setDrawerOpen(false)}>
        {drawerPanel === "bias" && (<>
          <DrawerSection title="Bias Snapshot">
            <DataRow label="Direction" value={biasFixture.direction} tone="positive" />
            <DataRow label="Strength" value={biasFixture.strength} tone={biasFixture.strengthTone} />
            <DataRow label="Active asset" value={biasFixture.activeAsset} tone="positive" />
          </DrawerSection>
          <DrawerSection title="Scenarios">
            <DataRow label="Primary" value={biasFixture.scenarios.primary} tone="positive" />
            <DataRow label="Alternate" value={biasFixture.scenarios.alternate} tone="warning" />
          </DrawerSection>
          <DrawerSection title="Drivers">{biasFixture.drivers.map((d) => <DataRow key={d.label} label={d.label} value={d.freshness} tone={d.tone} />)}</DrawerSection>
          <DrawerSection title="Route Preview"><DataRow label={routePreviewFixture.assetCockpit.route} value={routePreviewFixture.assetCockpit.shownState} tone="positive" /></DrawerSection>
        </>)}
        {drawerPanel === "confidence" && (<>
          <DrawerSection title="Confidence Decomposition">
            {confidenceDecompositionFixture.metrics.map((m) => <><DataRow key={m.label} label={m.label} value={`${m.score}%`} tone={m.tone} /><MiniMeter score={m.score} tone={m.tone} /></>)}
          </DrawerSection>
          <DrawerSection title="Contradictions">{confidenceDecompositionFixture.conflicts.map((c) => <p key={c.label} className="dashboard-precision-body-text">{c.label}: {c.detail}</p>)}</DrawerSection>
          <DrawerSection title="Access &amp; Billing">
            <DataRow label="Plan" value={accountBillingReadinessFixture.plan} tone="positive" />
            <DataRow label="Billing" value={accountBillingReadinessFixture.billingReadiness} tone="warning" />
          </DrawerSection>
        </>)}
        {drawerPanel === "evidence" && (<>
          <DrawerSection title="Evidence Hierarchy">{evidenceStackFixture.map((e) => <DataRow key={e.label} label={`${e.category}: ${e.label}`} value={`${e.score}%`} tone={e.tone} />)}</DrawerSection>
          <DrawerSection title="Market Insights">
            <p className="dashboard-precision-body-text">{marketInsightsFixture.summary}</p>
            <p className="dashboard-precision-note">{marketInsightsFixture.scenarioNote}</p>
          </DrawerSection>
          <DrawerSection title="Provider Trace">
            <DataRow label="Market data" value={providerTraceFixture.marketData} tone="warning" />
            <DataRow label="Extraction" value={providerTraceFixture.extraction} tone="warning" />
            <DataRow label="Persistence" value={providerTraceFixture.persistenceStatus} tone="neutral" />
          </DrawerSection>
          <DrawerSection title="Route Preview"><DataRow label={routePreviewFixture.evidence.route} value={routePreviewFixture.evidence.shownState} tone="positive" /></DrawerSection>
        </>)}
        {drawerPanel === "coaching" && (<>
          <DrawerSection title="Coaching Rationale"><p className="dashboard-precision-body-text">{coachingFixture.body}</p></DrawerSection>
          <DrawerSection title="Journal Quick Capture">
            <DataRow label="Prompt" value={journalQuickCaptureFixture.prompt} tone="neutral" />
            <DataRow label="Emotional state" value={journalQuickCaptureFixture.emotionalState} tone="positive" />
            <DataRow label="Route" value={journalQuickCaptureFixture.suggestedRoute} tone="neutral" />
          </DrawerSection>
          <DrawerSection title="Analytics Preview">
            {analyticsPreviewFixture.metrics.map((m) => <DataRow key={m.label} label={m.label} value={m.value} tone={m.tone} />)}
          </DrawerSection>
          <DrawerSection title="Behavior Overlay">
            <DataRow label="Recent quality" value={coachingFixture.behaviorOverlay.recentQuality} tone="positive" />
            <DataRow label="Readiness gate" value={coachingFixture.behaviorOverlay.readinessGate} tone="neutral" />
          </DrawerSection>
          <DrawerSection title="Routes">
            <DataRow label={routePreviewFixture.journal.route} value={routePreviewFixture.journal.shownState} tone="positive" />
            <DataRow label={routePreviewFixture.analytics.route} value={routePreviewFixture.analytics.shownState} tone="positive" />
            <DataRow label={routePreviewFixture.coaching.route} value={routePreviewFixture.coaching.shownState} tone="positive" />
          </DrawerSection>
        </>)}
        {drawerPanel === "news" && (<>
          <DrawerSection title="Macro Pulse">
            <DataRow label="Central bank" value={macroIntelligenceFixture.macroPulse.centralBankTone} tone="positive" />
            <DataRow label="Risk event" value={macroIntelligenceFixture.macroPulse.riskEvent} tone="warning" />
          </DrawerSection>
          <DrawerSection title="Routes">
            <DataRow label={routePreviewFixture.evidence.route} value={routePreviewFixture.evidence.shownState} tone="positive" />
            <DataRow label={routePreviewFixture.notifications.route} value={routePreviewFixture.notifications.shownState} tone="pending" />
          </DrawerSection>
        </>)}
        {drawerPanel === "regime" && (<>
          <DrawerSection title="Notifications">
            <DataRow label="Inbox" value={`${notificationReadinessFixture.inboxCount} pending`} tone="neutral" />
            <DataRow label="Delivery" value={notificationReadinessFixture.delivery} tone="warning" />
          </DrawerSection>
          <DrawerSection title="Account &amp; Billing">
            <DataRow label="Plan" value={accountBillingReadinessFixture.plan} tone="positive" />
            <DataRow label="Social ID" value={accountBillingReadinessFixture.socialIdentifierReadiness} tone="positive" />
            <DataRow label="Live activation" value={accountBillingReadinessFixture.billingReadiness} tone="warning" />
          </DrawerSection>
          <DrawerSection title="Routes">
            <DataRow label={routePreviewFixture.notifications.route} value={routePreviewFixture.notifications.shownState} tone="pending" />
            <DataRow label={routePreviewFixture.account.route} value={routePreviewFixture.account.shownState} tone="positive" />
            <DataRow label={routePreviewFixture.billing.route} value={routePreviewFixture.billing.shownState} tone="warning" />
          </DrawerSection>
        </>)}
        {!["bias", "confidence", "evidence", "coaching", "news", "regime"].includes(drawerPanel) && (
          <p className="dashboard-precision-body-text">Panel detail content. Fixture mode — no provider connection active.</p>
        )}
        <StatusLabel label="Fixture Mode" />
        <DrawerActions panel={drawerPanel} />
      </DashboardResponsiveDetailDrawer>
    </>
  );
}
