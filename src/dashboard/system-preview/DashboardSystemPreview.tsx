import { useState } from "react";
import "../styles/dashboard.core.css";
import "../styles/dashboard.states.css";
import "../styles/dashboard.interactions.css";
import "../styles/dashboard.system-preview.css";

import {
  PlanBadge,
  ProviderReadinessBadge,
  PersistenceStatusBadge,
  LoadingState,
  EmptyState,
  StaleDataWarning,
  SubscriptionWall,
  RestrictedPanel,
  MetricTile,
  SystemNotice,
  SafeStatusList,
} from "../components/system";

import {
  PanelWorkspace,
  HoverInsightPopover,
  DetailDrawer,
} from "../components/workspace";

const MACRO_TABS = [
  { id: "headlines", label: "Headlines" },
  { id: "currency", label: "Currency Comparison" },
  { id: "calendar", label: "Calendar" },
  { id: "drivers", label: "Driver Breakdown" },
  { id: "freshness", label: "Source Freshness" },
];

export default function DashboardSystemPreview() {
  const [macroTab, setMacroTab] = useState("currency");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="elceo-dashboard-scope">
      <div className="system-preview">
        <header className="system-preview__header">
          <h1 className="system-preview__title">
            Dashboard Design System Preview
          </h1>
          <p className="system-preview__subtitle">
            Batch 2 — Internal component catalog. Not live product data.
          </p>
        </header>


        {/* ─── Plan Badges ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Plan Badges</h2>
          <div className="system-preview__row">
            <PlanBadge plan="visitor" />
            <PlanBadge plan="kickoff" />
            <PlanBadge plan="focus" />
            <PlanBadge plan="gift" />
            <PlanBadge plan="restricted" />
          </div>
          <div className="system-preview__row">
            <PlanBadge plan="kickoff" size="sm" />
            <PlanBadge plan="focus" size="sm" />
          </div>
        </section>

        {/* ─── Provider Readiness ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Provider Readiness</h2>
          <div className="system-preview__row">
            <ProviderReadinessBadge status="ready" />
            <ProviderReadinessBadge status="provider_pending" />
            <ProviderReadinessBadge status="blocked_live_activation" />
            <ProviderReadinessBadge status="fixture_only" />
          </div>
        </section>

        {/* ─── Persistence Status ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Persistence Status</h2>
          <div className="system-preview__row">
            <PersistenceStatusBadge status="durable" />
            <PersistenceStatusBadge status="memory_fallback" internalOnly />
          </div>
        </section>

        {/* ─── Loading States ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Loading States</h2>
          <LoadingState label="Loading panel data..." variant="panel" />
          <div style={{ marginTop: "1rem" }}>
            <LoadingState variant="inline" />
          </div>
        </section>

        {/* ─── Empty State ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Empty State</h2>
          <EmptyState
            title="No journal entries"
            message="Your reasoning journal is empty. Entries will appear here after your first session."
          />
        </section>

        {/* ─── Stale Data Warning ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Stale Data Warning</h2>
          <div className="system-preview__row" style={{ flexDirection: "column", gap: "0.5rem" }}>
            <StaleDataWarning severity="low" lastUpdatedLabel="2 min ago" />
            <StaleDataWarning severity="medium" lastUpdatedLabel="14 min ago" />
            <StaleDataWarning severity="high" message="Data source has not refreshed. Values may be significantly outdated." lastUpdatedLabel="45+ min ago" />
          </div>
        </section>


        {/* ─── Subscription Wall ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Subscription Wall</h2>
          <SubscriptionWall reason="feature_not_in_trial_allowlist" />
          <div style={{ marginTop: "1.5rem" }}>
            <SubscriptionWall reason="subscription_required" ctaLabel="View plans" onCtaClick={() => {}} />
          </div>
        </section>

        {/* ─── Restricted Panel ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Restricted Panel</h2>
          <RestrictedPanel />
          <div style={{ marginTop: "1rem" }}>
            <SubscriptionWall reason="restricted_user" />
          </div>
        </section>

        {/* ─── Metric Tiles ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Metric Tiles</h2>
          <div className="system-preview__row">
            <MetricTile label="Confidence" value="72%" trend="up" tone="positive" freshness="Updated 3m ago" />
            <MetricTile label="Contradiction" value="Medium" trend="mixed" tone="warning" freshness="Updated 8m ago" />
            <MetricTile label="Freshness" value="Stale" trend="down" tone="danger" freshness="Last update 42m ago" />
            <MetricTile label="Zone Strength" value="—" locked />
          </div>
        </section>

        {/* ─── System Notices ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">System Notices</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <SystemNotice tone="info" title="Provider pending">
              <p style={{ margin: 0, fontSize: "0.72rem" }}>Activation is awaiting provider confirmation.</p>
            </SystemNotice>
            <SystemNotice tone="warning" title="Memory fallback active">
              <p style={{ margin: 0, fontSize: "0.72rem" }}>Session data is not being persisted durably.</p>
            </SystemNotice>
            <SystemNotice tone="danger" title="Blocked activation">
              <p style={{ margin: 0, fontSize: "0.72rem" }}>Live activation is blocked in this environment.</p>
            </SystemNotice>
            <SystemNotice tone="success" title="All systems ready" />
          </div>
        </section>

        {/* ─── Safe Status List ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Safe Status List</h2>
          <SafeStatusList items={[
            { label: "Provider", value: "Ready", tone: "positive" },
            { label: "Persistence", value: "Durable", tone: "positive" },
            { label: "Notifications", value: "Pending", tone: "warning" },
            { label: "2FA", value: "Not activated", tone: "danger" },
            { label: "Plan", value: "Kick off", tone: "neutral" },
          ]} />
        </section>


        {/* ─── Panel Workspace: Macro Intelligence ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Panel Workspace — Macro Intelligence</h2>
          <PanelWorkspace
            title="Macro Intelligence"
            eyebrow="Panel Workspace"
            tabs={MACRO_TABS}
            activeTabId={macroTab}
            onTabChange={setMacroTab}
          >
            {macroTab === "currency" && (
              <div>
                <div className="system-preview__macro-grid">
                  <div className="system-preview__macro-col">
                    <p style={{ color: "var(--elceo-orange)", margin: "0 0 0.5em", fontWeight: 600 }}>USD Macro Pressure</p>
                    <p style={{ margin: 0 }}>Pressure: elevated</p>
                    <p style={{ margin: "0.3em 0 0", fontSize: "0.7rem", color: "var(--elceo-muted)" }}>Multiple drivers converging toward directional bias</p>
                  </div>
                  <div className="system-preview__macro-col">
                    <p style={{ color: "var(--elceo-orange)", margin: "0 0 0.5em", fontWeight: 600 }}>JPY Macro Pressure</p>
                    <p style={{ margin: 0 }}>Pressure: stabilizing</p>
                    <p style={{ margin: "0.3em 0 0", fontSize: "0.7rem", color: "var(--elceo-muted)" }}>Conditions normalizing after prior volatility</p>
                  </div>
                  <div className="system-preview__macro-footer">
                    <p style={{ margin: 0 }}>Relative pressure: mixed | Contradiction: medium</p>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <HoverInsightPopover
                    trigger="Why contradiction is medium"
                    title="Contradiction Analysis"
                    summary="Some drivers support the dominant bias while others remain unresolved."
                    detail={
                      <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.65rem", lineHeight: 1.8 }}>
                        <li>Rate expectations: aligned with dominant direction</li>
                        <li>Positioning data: partially conflicting</li>
                        <li>Cross-asset correlation: weakening</li>
                        <li>Seasonal pattern: neutral context</li>
                      </ul>
                    }
                    side="bottom"
                  />
                </div>
              </div>
            )}
            {macroTab === "headlines" && (
              <EmptyState title="No headlines loaded" message="Headline aggregation is not active in this preview." />
            )}
            {macroTab === "calendar" && (
              <EmptyState title="Calendar preview" message="Economic calendar data not connected in this preview." />
            )}
            {macroTab === "drivers" && (
              <EmptyState title="Driver breakdown" message="Driver decomposition requires live data connection." />
            )}
            {macroTab === "freshness" && (
              <SafeStatusList items={[
                { label: "Central bank feeds", value: "Fresh", tone: "positive" },
                { label: "Positioning reports", value: "12h old", tone: "warning" },
                { label: "News aggregator", value: "Stale", tone: "danger" },
                { label: "Correlation engine", value: "Fresh", tone: "positive" },
              ]} />
            )}
          </PanelWorkspace>
        </section>


        {/* ─── Detail Drawer ─── */}
        <section className="system-preview__section">
          <h2 className="system-preview__section-title">Detail Drawer</h2>
          <button
            className="elceo-sub-wall__cta"
            onClick={() => setDrawerOpen(true)}
            type="button"
          >
            Open evidence detail drawer
          </button>
          <DetailDrawer
            open={drawerOpen}
            title="Evidence Detail"
            subtitle="Safe preview only"
            onClose={() => setDrawerOpen(false)}
          >
            <SafeStatusList items={[
              { label: "Source family", value: "Central bank commentary", tone: "neutral" },
              { label: "Freshness", value: "3 hours", tone: "warning" },
              { label: "Direction pressure", value: "Moderate bias", tone: "neutral" },
              { label: "Contradiction note", value: "Low conflict", tone: "positive" },
            ]} />
            <div style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--elceo-muted)" }}>
              <p>This is a safe fixture preview. No raw provider data or secrets are displayed.</p>
            </div>
          </DetailDrawer>
        </section>

      </div>
    </div>
  );
}
