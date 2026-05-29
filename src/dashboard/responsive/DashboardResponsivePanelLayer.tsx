/**
 * DashboardResponsivePanelLayer.tsx
 *
 * R6C: Market-only cockpit. Complete drawer coverage for all 7 panels.
 * User-facing source language (no internal/backend wording).
 */

import { useState, useCallback, useEffect } from "react";
import {
  DirectionalBiasFrame, ConfidenceMatrixFrame, WatchlistFrame,
  EvidenceStackFrame, NewsMacroFrame, CoachingFrame, MarketRegimeFrame,
} from "./dashboardResponsiveAssets";
import {
  assetCockpitFixture, biasFixture, confidenceFixture,
  watchlistFixture, watchlistFxMajors, watchlistAlerts, scenarioMapFixture,
  evidenceFixture, evidenceConviction, marketInsightsFixture,
  newsFixture, macroEvents, currencyCompareFixture, macroPulseFixture,
  coachingFixture, journalNoteFixture, disciplineFixture,
  regimeFixture, regimeStrip, volatilityFixture, correlationFixture,
  sourceStatusFixture, timeframeContextByValue,
} from "./responsivePanelFixtures";
import { Chip, DataRow, MiniMeter, SectionNav, ActionBar, SlideStripWrapper, StatusLabel } from "./panelContent/PanelPrimitives";
import HoverPreviewCard from "./panelContent/HoverPreviewCard";
import { MiniSparkline, MiniDonutScore, EvidenceWeightBar, SessionBadge, CrossAssetMiniPulse } from "./panelContent/MiniVisuals";
import PrecisionPanelGroup from "./PrecisionPanelGroup";
import type { PanelId } from "./PrecisionPanelGroup";
import DashboardResponsiveDetailDrawer from "./DashboardResponsiveDetailDrawer";
import { assetContextBySymbol } from "./responsivePanelFixtures";
import { getDashboardCognitionSnapshot } from "./dashboardCognitionFixtureEngine";
import { getDashboardScenarioSnapshot } from "./dashboardScenarioFixtureEngine";
import type { LinkedPanel } from "./chartIntelligenceFixture";
import type { ReactNode } from "react";

/* ─── LinkedPanel to PanelId mapping ─── */
const LINKED_PANEL_MAP: Record<string, PanelId> = {
  bias: "directionalBiasSummary",
  confidence: "confidenceContextMatrix",
  evidence: "evidenceStackReasoningEngine",
  macro: "newsMacroIntelligence",
  regime: "marketRegimeCrossAssetPulse",
};

function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (<div style={{ marginBottom: "12px" }}><p className="dashboard-precision-data-label" style={{ marginBottom: "4px" }}>{title}</p>{children}</div>);
}


function MarketDrawerActions() {
  return (
    <div className="dashboard-panel-action-bar" style={{ marginTop: "14px" }}>
      <button type="button" className="dashboard-panel-action-btn">Expand Evidence</button>
      <button type="button" className="dashboard-panel-action-btn">Capture Journal Note</button>
      <button type="button" className="dashboard-panel-action-btn">Save Market View</button>
    </div>
  );
}

interface PanelLayerProps {
  activeAsset: string;
  activeTimeframe?: string;
  linkedPanel?: LinkedPanel | null;
}

export default function DashboardResponsivePanelLayer({ activeAsset, activeTimeframe, linkedPanel }: PanelLayerProps) {
  const linkedPanelId = linkedPanel ? LINKED_PANEL_MAP[linkedPanel] ?? null : null;
  const assetCtx = assetContextBySymbol[activeAsset];
  const tfCtx = timeframeContextByValue[activeTimeframe || "1H"];
  const cognition = getDashboardCognitionSnapshot(activeAsset, activeTimeframe || "1H");
  const scenario = getDashboardScenarioSnapshot(activeAsset, activeTimeframe || "1H", cognition);
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


      {/* ═══ DIRECTIONAL BIAS — Bias / Scenario / Drivers / Asset ═══ */}
      <PrecisionPanelGroup panelId="directionalBiasSummary" expanded={expandedPanel === "directionalBiasSummary"} onToggleExpand={() => toggleExpand("directionalBiasSummary")} linked={linkedPanelId === "directionalBiasSummary"} frameSvg={<DirectionalBiasFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Reasoning Snapshot</p><h3 className="dashboard-precision-title">Directional Bias</h3></>}
        bodyContent={<>
          <SectionNav items={["Bias", "Scenario", "Drivers", "Asset"]} active={biasMode} onSelect={setBiasMode} />
          {biasMode === 0 && (<>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", margin: "2px 0 4px" }}>
              <SessionBadge session={biasFixture.session} /><Chip value={activeAsset} tone="positive" /><Chip value={activeTimeframe || "1H"} tone="neutral" />
            </div>
            <p className="dashboard-precision-metric">{assetCtx?.bias ?? biasFixture.direction}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "4px 0" }}>
              <Chip value={`Confidence: ${scenario.scenarioConfidence}%`} tone={scenario.scenarioTone} />
              <Chip value={biasFixture.condition} tone={biasFixture.conditionTone} />
              <StatusLabel label={biasFixture.status} />
            </div>
            <p className="dashboard-precision-body-text">{scenario.primaryScenario}</p>
            <p className="dashboard-precision-note">Review window: {scenario.reviewWindow}</p>
            <p className="dashboard-precision-note">{scenario.cautionNote}</p>
          </>)}
          {biasMode === 1 && (<>
            <DataRow label="Primary" value={scenario.primaryScenario} tone={scenario.scenarioTone} />
            <DataRow label="Alternate" value={scenario.alternateScenario} tone="warning" />
            <DataRow label="Confidence" value={`${scenario.scenarioConfidence}%`} tone={scenario.scenarioConfidence >= 55 ? "positive" : "neutral"} />
            <DataRow label="Condition" value={scenario.conditionSummary} tone={scenario.scenarioTone} />
            <DataRow label="Review window" value={scenario.reviewWindow} tone="neutral" />
            <p className="dashboard-precision-note">{scenario.cautionNote}</p>
          </>)}
          {biasMode === 2 && scenario.conditions.map((cond) => (
            <DataRow key={cond.id} label={cond.label} value={cond.detail} tone={cond.tone} />
          ))}
          {biasMode === 3 && (<>
            <DataRow label="Active asset" value={activeAsset} tone="positive" />
            <DataRow label="Class" value={assetCtx?.assetClass ?? "—"} tone="neutral" />
            <DataRow label="Timeframe" value={assetCtx?.timeframe ?? "1H"} tone="neutral" />
            <DataRow label="Bias" value={assetCtx?.bias ?? "—"} tone={assetCtx?.biasTone ?? "neutral"} />
            <DataRow label="Source mode" value="Fixture Mode" tone="neutral" />
            <p className="dashboard-precision-note">{assetCtx?.scenario ?? ""}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Reasoning", "Directional Bias", "bias")} />
        </>} />


      {/* ═══ CONFIDENCE — Confidence / Contradiction / Freshness / Data Quality ═══ */}
      <PrecisionPanelGroup panelId="confidenceContextMatrix" expanded={expandedPanel === "confidenceContextMatrix"} onToggleExpand={() => toggleExpand("confidenceContextMatrix")} linked={linkedPanelId === "confidenceContextMatrix"} frameSvg={<ConfidenceMatrixFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Reasoning Matrix</p><h3 className="dashboard-precision-title">Confidence &amp; Context</h3></>}
        bodyContent={<>
          <SectionNav items={["Confidence", "Contradiction", "Freshness", "Data Quality"]} active={confMode} onSelect={setConfMode} />
          {confMode === 0 && (
            <div className="dashboard-two-col">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={cognition.confidenceScore} tone={cognition.confidenceScore >= 60 ? "positive" : cognition.confidenceScore >= 45 ? "neutral" : "warning"} /><div style={{ flex: 1 }}><DataRow label="Confidence" value={`${cognition.confidenceScore}%`} tone={cognition.confidenceScore >= 60 ? "positive" : "neutral"} /></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={cognition.contradictionScore} tone={cognition.contradictionScore >= 40 ? "warning" : "positive"} /><div style={{ flex: 1 }}><DataRow label="Contradiction" value={`${cognition.contradictionScore}%`} tone={cognition.contradictionScore >= 40 ? "warning" : "positive"} /></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={cognition.freshnessScore} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} /><div style={{ flex: 1 }}><DataRow label="Freshness" value={`${cognition.freshnessScore}%`} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} /></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={cognition.zoneStrengthScore} tone={cognition.zoneStrengthScore >= 60 ? "positive" : "neutral"} /><div style={{ flex: 1 }}><DataRow label="Zone strength" value={`${cognition.zoneStrengthScore}%`} tone={cognition.zoneStrengthScore >= 60 ? "positive" : "neutral"} /></div></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><MiniDonutScore score={cognition.evidenceWeight} tone={cognition.evidenceWeight >= 55 ? "positive" : "neutral"} /><div style={{ flex: 1 }}><DataRow label="Evidence weight" value={`${cognition.evidenceWeight}%`} tone={cognition.evidenceWeight >= 55 ? "positive" : "neutral"} /></div></div>
            </div>
          )}
          {confMode === 1 && (<>
            <DataRow label="Contradiction score" value={`${cognition.contradictionScore}%`} tone={cognition.contradictionScore >= 40 ? "warning" : "positive"} />
            <MiniMeter score={cognition.contradictionScore} tone={cognition.contradictionScore >= 40 ? "warning" : "positive"} />
            {scenario.contradictionItems.map((c) => (
              <DataRow key={c.id} label={c.label} value={c.summary} tone={c.tone} />
            ))}
            <DataRow label="Condition" value={scenario.conditionSummary} tone={scenario.scenarioTone} />
            <DataRow label="Caution" value={scenario.cautionNote} tone={cognition.cautionTone} />
          </>)}
          {confMode === 2 && (<>
            <DataRow label="Freshness score" value={`${cognition.freshnessScore}%`} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <MiniMeter score={cognition.freshnessScore} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <DataRow label="Sensitivity" value={tfCtx?.freshnessSensitivity ?? ""} tone="neutral" />
            <DataRow label="Market data" value={sourceStatusFixture.marketData} tone="warning" />
            <DataRow label="Extraction" value={sourceStatusFixture.extraction} tone="warning" />
            <p className="dashboard-precision-note">{cognition.freshnessReason}</p>
          </>)}
          {confMode === 3 && (<>
            <DataRow label="Data quality" value={`${confidenceFixture.dataQuality}%`} tone="positive" />
            <MiniMeter score={confidenceFixture.dataQuality} tone="positive" />
            <DataRow label="Active asset" value={activeAsset} tone="positive" />
            <DataRow label="Source freshness" value={sourceStatusFixture.sourceFreshness} tone="neutral" />
            <DataRow label="Evidence coverage" value="8 of 10 categories active" tone="positive" />
            <DataRow label="Staleness risk" value="Low-moderate" tone="neutral" />
            <p className="dashboard-precision-note">{assetCtx?.cautionNote ?? confidenceFixture.summary}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Matrix", "Confidence Detail", "confidence")} />
        </>} />


      {/* ═══ WATCHLIST — Featured / FX Majors / Alerts / Scenario Map ═══ */}
      <PrecisionPanelGroup panelId="watchlist" expanded={expandedPanel === "watchlist"} onToggleExpand={() => toggleExpand("watchlist")} linked={linkedPanelId === "watchlist"} frameSvg={<WatchlistFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Active Instruments</p><h3 className="dashboard-precision-title">Watchlist</h3></>}
        bodyContent={<>
          <SectionNav items={["Featured", "FX Majors", "Alerts", "Scenario Map"]} active={watchMode} onSelect={setWatchMode} />
          {watchMode === 0 && watchlistFixture.map((a) => (
            <HoverPreviewCard key={a.ticker}
              trigger={<div className={`dashboard-precision-data-row${a.ticker === activeAsset ? " dashboard-precision-data-row--active" : ""}`}><span className="dashboard-watchlist-ticker" style={{ minWidth: "52px" }}>{a.ticker}</span><MiniSparkline data={a.sparkline} tone={a.changeTone} /><span className="dashboard-precision-data-value--mono" style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178", minWidth: "42px", textAlign: "right" }}>{a.change}</span><Chip value={a.bias} tone={a.biasTone} /></div>}
              preview={<><p className="dashboard-precision-body-text">{a.name} — {a.last}</p><DataRow label="Confidence" value={a.confidence} tone={a.biasTone} />{a.ticker === activeAsset && <DataRow label="Status" value="Active asset" tone="positive" />}</>} />
          ))}
          {watchMode === 1 && watchlistFxMajors.map((a) => (
            <HoverPreviewCard key={a.ticker}
              trigger={<div className={`dashboard-precision-data-row${a.ticker === activeAsset ? " dashboard-precision-data-row--active" : ""}`}><span className="dashboard-watchlist-ticker" style={{ minWidth: "52px" }}>{a.ticker}</span><MiniSparkline data={a.sparkline} tone={a.changeTone} /><span className="dashboard-precision-data-value--mono" style={{ color: a.changeTone === "positive" ? "#5cba6e" : a.changeTone === "negative" ? "#e05555" : "#8a8178", minWidth: "42px", textAlign: "right" }}>{a.change}</span><Chip value={a.bias} tone={a.biasTone} /></div>}
              preview={<><p className="dashboard-precision-body-text">{a.name} — {a.last}</p><DataRow label="Confidence" value={a.confidence} tone={a.biasTone} />{a.ticker === activeAsset && <DataRow label="Status" value="Active asset" tone="positive" />}</>} />
          ))}
          {watchMode === 2 && watchlistAlerts.map((al) => (
            <HoverPreviewCard key={al.asset} trigger={<DataRow label={al.asset} value={al.alert} tone={al.tone} />}
              preview={<p className="dashboard-precision-body-text">{al.asset}: {al.alert}</p>} />
          ))}
          {watchMode === 3 && (<>
            <DataRow label="Timeframe" value={`${activeTimeframe || "1H"} — ${tfCtx?.scenarioPace ?? ""}`} tone="neutral" />
            {scenarioMapFixture.map((s) => (
            <DataRow key={s.asset} label={`${s.asset}${s.asset === activeAsset ? " ●" : ""}`} value={s.asset === activeAsset ? (assetCtx?.scenario ?? s.scenario) : s.scenario} tone={s.tone} />
            ))}
          </>)}
          <ActionBar onExpand={() => openDrawer("Watchlist", "Asset Intelligence", "watchlist")} />
        </>} />


      {/* ═══ EVIDENCE — Stack / Insights / Source Status / Source Freshness ═══ */}
      <PrecisionPanelGroup panelId="evidenceStackReasoningEngine" expanded={expandedPanel === "evidenceStackReasoningEngine"} onToggleExpand={() => toggleExpand("evidenceStackReasoningEngine")} linked={linkedPanelId === "evidenceStackReasoningEngine"} frameSvg={<EvidenceStackFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Signal Alignment</p><h3 className="dashboard-precision-title">Evidence · Insights</h3></>}
        bodyContent={<>
          <SectionNav items={["Stack", "Insights", "Source Status", "Freshness"]} active={evidMode} onSelect={setEvidMode} />
          {evidMode === 0 && (<>
            {scenario.evidenceItems.map((e) => (
              <DataRow key={e.id} label={e.label} value={e.summary} tone={e.tone} />
            ))}
            <div style={{ marginTop: "6px", borderTop: "1px solid rgba(138,129,120,0.1)", paddingTop: "4px" }}>
              <DataRow label="Aggregate conviction" value={`${cognition.evidenceWeight}%`} tone={cognition.evidenceWeight >= 55 ? "positive" : "neutral"} mono />
              <MiniMeter score={cognition.evidenceWeight} tone={cognition.evidenceWeight >= 55 ? "positive" : "neutral"} />
            </div>
          </>)}
          {evidMode === 1 && (<>
            <DataRow label="Primary scenario" value={scenario.primaryScenario} tone={scenario.scenarioTone} />
            <DataRow label="Alternate" value={scenario.alternateScenario} tone="warning" />
            <DataRow label="Condition" value={scenario.conditionSummary} tone={scenario.scenarioTone} />
            <DataRow label="Evidence weight" value={`${cognition.evidenceWeight}%`} tone={cognition.evidenceWeight >= 55 ? "positive" : "neutral"} />
            {scenario.contradictionItems.map((c) => <DataRow key={c.id} label="Contradicts" value={c.summary} tone={c.tone} />)}
            <p className="dashboard-precision-note">{scenario.cautionNote}</p>
          </>)}
          {evidMode === 2 && (<>
            <DataRow label="Market data" value={sourceStatusFixture.marketData} tone="warning" />
            <DataRow label="News" value={sourceStatusFixture.news} tone="neutral" />
            <DataRow label="Macro" value={sourceStatusFixture.macro} tone="neutral" />
            <DataRow label="Extraction" value={sourceStatusFixture.extraction} tone="warning" />
            <DataRow label="Chart data" value={sourceStatusFixture.chartData} tone="neutral" />
            <DataRow label="Source freshness" value={sourceStatusFixture.sourceFreshness} tone="neutral" />
            <StatusLabel label="Market Data Pending" />
          </>)}
          {evidMode === 3 && (<>
            <DataRow label="Freshness score" value={`${cognition.freshnessScore}%`} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <MiniMeter score={cognition.freshnessScore} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <DataRow label="Stale risk" value={cognition.freshnessScore >= 70 ? "Low" : cognition.freshnessScore >= 55 ? "Low-moderate" : "Moderate"} tone={cognition.freshnessScore >= 60 ? "neutral" : "warning"} />
            <DataRow label="Next review cue" value={cognition.reviewWindow} tone="neutral" />
            <p className="dashboard-precision-note">{cognition.freshnessReason}</p>
          </>)}
          <ActionBar onExpand={() => openDrawer("Evidence", "Evidence Chain", "evidence")} />
        </>} />


      {/* ═══ NEWS & MACRO — Headlines / Events / Currency / Macro Pulse ═══ */}
      <PrecisionPanelGroup panelId="newsMacroIntelligence" expanded={expandedPanel === "newsMacroIntelligence"} onToggleExpand={() => toggleExpand("newsMacroIntelligence")} linked={linkedPanelId === "newsMacroIntelligence"} frameSvg={<NewsMacroFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Context Drivers</p><h3 className="dashboard-precision-title">News &amp; Macro</h3></>}
        bodyContent={<>
          <SectionNav items={["Headlines", "Events", "Currency", "Macro Pulse"]} active={newsMode} onSelect={setNewsMode} />
          {newsMode === 0 && (
            <div className="dashboard-news-timeline">
              {newsFixture.map((h, i) => (
                <HoverPreviewCard key={h.title} className={i % 2 === 0 ? "dashboard-news-timeline__left" : "dashboard-news-timeline__right"}
                  trigger={<div className="dashboard-news-timeline__item"><span className={`dashboard-news-timeline__dot dashboard-news-timeline__dot--${h.impact}`} /><span className="dashboard-precision-body-text" style={{ margin: 0, flex: 1 }}>{h.title}</span><Chip value={h.impact} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} /></div>}
                  preview={<><p className="dashboard-precision-body-text">Source: {h.source} — {h.time}</p><Chip value={`Impact: ${h.impact}`} tone={h.impact === "high" ? "negative" : h.impact === "medium" ? "positive" : "warning"} /></>} />
              ))}
            </div>
          )}
          {newsMode === 1 && (
            <div className="dashboard-events-flow">
              {macroEvents.map((ev) => (
                <HoverPreviewCard key={ev.label} className={`dashboard-event-node dashboard-event-node--${ev.impact}`}
                  trigger={<div className="dashboard-event-node__content"><span className="dashboard-precision-metadata">{ev.time}</span><span className="dashboard-precision-body-text" style={{ margin: 0 }}>{ev.label}</span><div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}><Chip value={ev.impact} tone={ev.impact === "high" ? "negative" : ev.impact === "medium" ? "positive" : "warning"} /><Chip value={ev.status} tone="neutral" /></div></div>}
                  preview={<p className="dashboard-precision-body-text">{ev.label} — {ev.status}. Scheduled macro catalyst.</p>} />
              ))}
            </div>
          )}
          {newsMode === 2 && (<>
            <DataRow label="Active asset context" value={assetCtx?.macroSensitivity ?? "—"} tone="neutral" />
            <DataRow label={currencyCompareFixture.usdVsGold.label} value={currencyCompareFixture.usdVsGold.direction} tone={currencyCompareFixture.usdVsGold.tone} />
            <DataRow label={currencyCompareFixture.usdVsJpy.label} value={currencyCompareFixture.usdVsJpy.direction} tone={currencyCompareFixture.usdVsJpy.tone} />
            <DataRow label={currencyCompareFixture.eurUsd.label} value={currencyCompareFixture.eurUsd.direction} tone={currencyCompareFixture.eurUsd.tone} />
            <DataRow label={currencyCompareFixture.realYields.label} value={currencyCompareFixture.realYields.direction} tone={currencyCompareFixture.realYields.tone} />
          </>)}
          {newsMode === 3 && (<>
            <DataRow label="Review lens" value={tfCtx?.reviewLens ?? ""} tone="neutral" />
            <DataRow label="Macro sensitivity" value={cognition.macroSensitivity} tone="neutral" />
            <DataRow label="Regime pressure" value={cognition.regimePressure} tone={cognition.scenarioTone} />
            <DataRow label="Liquidity" value={cognition.liquidityCondition} tone="positive" />
            <DataRow label="Contradiction" value={cognition.contradictionReason} tone={cognition.cautionTone} />
            <StatusLabel label="Fixture Mode" />
          </>)}
          <ActionBar onExpand={() => openDrawer("Macro", "News & Macro Context", "news")} />
        </>} />


      {/* ═══ COACHING — Coaching / Journal Note / Discipline / Behavior ═══ */}
      <PrecisionPanelGroup panelId="coachingInsights" expanded={expandedPanel === "coachingInsights"} onToggleExpand={() => toggleExpand("coachingInsights")} linked={linkedPanelId === "coachingInsights"} frameSvg={<CoachingFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Decision Support</p><h3 className="dashboard-precision-title">Coaching · Journal</h3></>}
        bodyContent={<>
          <SectionNav items={["Coaching", "Journal Note", "Discipline", "Behavior"]} active={coachMode} onSelect={setCoachMode} />
          {coachMode === 0 && (<>
            <p className="dashboard-precision-metric" style={{ fontSize: "clamp(12px, 0.75vw, 16px)" }}>{`Await structure confirmation on ${activeAsset}`}</p>
            <p className="dashboard-precision-body-text">{cognition.cautionNote}</p>
            <DataRow label="Confidence" value={`${cognition.confidenceScore}%`} tone={cognition.confidenceScore >= 60 ? "positive" : "neutral"} />
            <DataRow label="Volatility" value={cognition.volatilityCondition} tone={cognition.cautionTone} />
            <DataRow label="Review window" value={cognition.reviewWindow} tone="neutral" />
          </>)}
          {coachMode === 1 && (<>
            <DataRow label="Asset" value={`${activeAsset} · ${activeTimeframe || "1H"}`} tone="positive" />
            <DataRow label="Prompt" value={`What evidence supports the current ${activeAsset} ${activeTimeframe || "1H"} bias?`} tone="neutral" />
            <DataRow label="Emotional state" value={journalNoteFixture.emotionalState} tone="positive" />
            <DataRow label="Discipline" value={`Awaiting confirmation on ${activeAsset} — not front-running scenario`} tone="neutral" />
            <DataRow label="Last note" value={journalNoteFixture.lastNote} tone="neutral" />
            <p className="dashboard-precision-note">Tags: {journalNoteFixture.tags.join(", ")}</p>
          </>)}
          {coachMode === 2 && (<>
            <DataRow label="Discipline score" value={`${disciplineFixture.disciplineScore}%`} tone="positive" />
            <DataRow label="Review consistency" value={`${disciplineFixture.reviewConsistency}%`} tone="neutral" />
            <DataRow label="Overconfidence watch" value={disciplineFixture.overconfidenceWatch} tone="warning" />
            <DataRow label="Best session" value={disciplineFixture.bestSession} tone="positive" />
            <DataRow label="Missed reviews" value={`${disciplineFixture.missedReviews} this week`} tone="warning" />
            <p className="dashboard-precision-note">{disciplineFixture.behaviorCaution}</p>
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
          <ActionBar onExpand={() => openDrawer("Coaching", "Coaching & Discipline", "coaching")} />
        </>} />


      {/* ═══ MARKET REGIME — Cross-Asset / Liquidity / Volatility / Correlation ═══ */}
      <PrecisionPanelGroup panelId="marketRegimeCrossAssetPulse" expanded={expandedPanel === "marketRegimeCrossAssetPulse"} onToggleExpand={() => toggleExpand("marketRegimeCrossAssetPulse")} linked={linkedPanelId === "marketRegimeCrossAssetPulse"} frameSvg={<MarketRegimeFrame preserveAspectRatio="none" />}
        headerContent={<><p className="dashboard-precision-eyebrow">Environment State</p><h3 className="dashboard-precision-title">Market Regime</h3></>}
        bodyContent={<>
          <SectionNav items={["Cross-Asset", "Liquidity", "Volatility", "Correlation"]} active={regimeMode} onSelect={setRegimeMode} />
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
            <DataRow label="Active asset" value={`${activeAsset} · ${activeTimeframe || "1H"}`} tone="neutral" />
            <DataRow label="Regime pressure" value={cognition.regimePressure} tone={cognition.scenarioTone} />
            <DataRow label="Vol condition" value={cognition.volatilityCondition} tone={cognition.cautionTone} />
            <DataRow label="Zone strength" value={`${cognition.zoneStrengthScore}%`} tone={cognition.zoneStrengthScore >= 60 ? "positive" : "neutral"} />
            <DataRow label="Liquidity" value={cognition.liquidityCondition} tone="positive" />
          </>)}
          {regimeMode === 3 && correlationFixture.map((c) => (
            <DataRow key={c.pair} label={c.pair} value={c.direction} tone={c.tone} />
          ))}
          <ActionBar onExpand={() => openDrawer("Regime", "Market Regime Detail", "regime")} />
        </>} />


      {/* ═══ DETAIL DRAWER ═══ */}
      <DashboardResponsiveDetailDrawer open={drawerOpen} title={drawerTitle} eyebrow={drawerEyebrow} onClose={() => setDrawerOpen(false)}>
        {drawerPanel === "bias" && (<>
          <DrawerSection title="Scenario Summary">
            <DataRow label="Primary" value={scenario.primaryScenario} tone={scenario.scenarioTone} />
            <DataRow label="Alternate" value={scenario.alternateScenario} tone="warning" />
            <DataRow label="Confidence" value={`${scenario.scenarioConfidence}%`} tone={scenario.scenarioConfidence >= 55 ? "positive" : "neutral"} />
            <DataRow label="Review window" value={scenario.reviewWindow} tone="neutral" />
          </DrawerSection>
          <DrawerSection title="Condition Checks">
            <p className="dashboard-precision-body-text">{scenario.conditionSummary}</p>
            {scenario.conditions.map((cond) => <DataRow key={cond.id} label={cond.label} value={cond.status} tone={cond.tone} />)}
          </DrawerSection>
          <DrawerSection title="Caution">
            <p className="dashboard-precision-body-text">{scenario.cautionNote}</p>
          </DrawerSection>
        </>)}
        {drawerPanel === "confidence" && (<>
          <DrawerSection title="Scenario Confidence">
            <DataRow label="Scenario confidence" value={`${scenario.scenarioConfidence}%`} tone={scenario.scenarioConfidence >= 55 ? "positive" : "neutral"} />
            <DataRow label="Confidence" value={`${cognition.confidenceScore}%`} tone={cognition.confidenceScore >= 60 ? "positive" : "neutral"} />
            <DataRow label="Contradiction" value={`${cognition.contradictionScore}%`} tone={cognition.contradictionScore >= 40 ? "warning" : "positive"} />
            <DataRow label="Freshness" value={`${cognition.freshnessScore}%`} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <p className="dashboard-precision-note">{cognition.confidenceReason}</p>
          </DrawerSection>
          <DrawerSection title="Contradiction Drilldown">
            {scenario.contradictionItems.map((c) => <DataRow key={c.id} label={c.label} value={c.summary} tone={c.tone} />)}
          </DrawerSection>
          <DrawerSection title="Condition Summary">
            <p className="dashboard-precision-body-text">{scenario.conditionSummary}</p>
          </DrawerSection>
        </>)}
        {drawerPanel === "evidence" && (<>
          <DrawerSection title="Evidence Drilldown">
            {scenario.evidenceItems.map((e) => <DataRow key={e.id} label={`${e.category}: ${e.label}`} value={e.summary} tone={e.tone} />)}
          </DrawerSection>
          <DrawerSection title="Contradiction Items">
            {scenario.contradictionItems.map((c) => <DataRow key={c.id} label={c.label} value={c.summary} tone={c.tone} />)}
          </DrawerSection>
          <DrawerSection title="Freshness Items">
            {scenario.freshnessItems.map((f) => <DataRow key={f.id} label={f.label} value={f.summary} tone={f.tone} />)}
          </DrawerSection>
          <DrawerSection title="Source Freshness">
            <DataRow label="Freshness score" value={`${cognition.freshnessScore}%`} tone={cognition.freshnessScore >= 65 ? "positive" : "warning"} />
            <p className="dashboard-precision-note">{cognition.freshnessReason}</p>
          </DrawerSection>
        </>)}
        {drawerPanel === "coaching" && (<>
          <DrawerSection title="Coaching Rationale">
            <DataRow label="Active asset" value={activeAsset} tone="positive" />
            <p className="dashboard-precision-body-text">{assetCtx?.scenario ?? coachingFixture.body}</p>
          </DrawerSection>
          <DrawerSection title="Journal Note">
            <DataRow label="Prompt" value={`What evidence supports the current ${activeAsset} bias?`} tone="neutral" />
            <DataRow label="State" value={journalNoteFixture.emotionalState} tone="positive" />
            <DataRow label="Discipline" value={`Awaiting confirmation on ${activeAsset}`} tone="neutral" />
          </DrawerSection>
          <DrawerSection title="Discipline">
            <DataRow label="Score" value={`${disciplineFixture.disciplineScore}%`} tone="positive" />
            <DataRow label="Consistency" value={`${disciplineFixture.reviewConsistency}%`} tone="neutral" />
            <DataRow label="Review window" value={assetCtx?.reviewWindow ?? ""} tone="neutral" />
          </DrawerSection>
        </>)}
        {drawerPanel === "watchlist" && (<>
          <DrawerSection title="Featured Assets">
            {watchlistFixture.map((a) => <DataRow key={a.ticker} label={a.ticker} value={`${a.bias} (${a.confidence})`} tone={a.biasTone} />)}
          </DrawerSection>
          <DrawerSection title="FX Majors">
            {watchlistFxMajors.slice(0, 4).map((a) => <DataRow key={a.ticker} label={a.ticker} value={a.bias} tone={a.biasTone} />)}
          </DrawerSection>
          <DrawerSection title="Scenario Alerts">
            {watchlistAlerts.map((al) => <DataRow key={al.asset} label={al.asset} value={al.alert} tone={al.tone} />)}
          </DrawerSection>
          <DrawerSection title="Active Focus">
            <DataRow label="Focus asset" value={activeAsset} tone="positive" />
            <DataRow label="Asset class" value={assetCtx?.assetClass ?? ""} tone="neutral" />
            <DataRow label="Scenario" value={assetCtx?.scenario ?? ""} tone="neutral" />
            <DataRow label="Session" value={assetCockpitFixture.session} tone="positive" />
          </DrawerSection>
        </>)}
        {drawerPanel === "news" && (<>
          <DrawerSection title="Macro Scenario Context">
            <DataRow label="Active asset" value={activeAsset} tone="positive" />
            <DataRow label="Macro sensitivity" value={cognition.macroSensitivity} tone="neutral" />
            <DataRow label="Regime pressure" value={cognition.regimePressure} tone={cognition.scenarioTone} />
            {scenario.conditions.filter(c => c.linkedArea === "macro").map((c) => <DataRow key={c.id} label={c.label} value={c.detail} tone={c.tone} />)}
          </DrawerSection>
          <DrawerSection title="Alternate Scenario Note">
            <p className="dashboard-precision-body-text">{scenario.alternateScenario}</p>
          </DrawerSection>
          <DrawerSection title="Currency Drivers">
            <DataRow label={currencyCompareFixture.usdVsGold.label} value={currencyCompareFixture.usdVsGold.direction} tone={currencyCompareFixture.usdVsGold.tone} />
            <DataRow label={currencyCompareFixture.usdVsJpy.label} value={currencyCompareFixture.usdVsJpy.direction} tone={currencyCompareFixture.usdVsJpy.tone} />
            <DataRow label={currencyCompareFixture.realYields.label} value={currencyCompareFixture.realYields.direction} tone={currencyCompareFixture.realYields.tone} />
          </DrawerSection>
        </>)}
        {drawerPanel === "regime" && (<>
          <DrawerSection title="Regime Scenario Context">
            <DataRow label="Active asset" value={activeAsset} tone="positive" />
            <DataRow label="Regime pressure" value={cognition.regimePressure} tone={cognition.scenarioTone} />
            <DataRow label="Liquidity" value={cognition.liquidityCondition} tone="positive" />
            <DataRow label="Volatility" value={cognition.volatilityCondition} tone={cognition.cautionTone} />
            {scenario.conditions.filter(c => c.linkedArea === "regime" || c.linkedArea === "liquidity").map((c) => <DataRow key={c.id} label={c.label} value={c.detail} tone={c.tone} />)}
          </DrawerSection>
          <DrawerSection title="Cross-Asset Pulse">
            {regimeFixture.slice(0, 4).map((r) => <DataRow key={r.asset} label={r.asset} value={r.direction} tone={r.tone} />)}
          </DrawerSection>
          <DrawerSection title="Correlation">
            {correlationFixture.slice(0, 3).map((c) => <DataRow key={c.pair} label={c.pair} value={c.direction} tone={c.tone} />)}
          </DrawerSection>
        </>)}
        {!["bias", "confidence", "evidence", "coaching", "watchlist", "news", "regime"].includes(drawerPanel) && (
          <p className="dashboard-precision-body-text">Market context for this section. Fixture mode.</p>
        )}
        <StatusLabel label="Fixture Mode" />
        <MarketDrawerActions />
      </DashboardResponsiveDetailDrawer>
    </>
  );
}
