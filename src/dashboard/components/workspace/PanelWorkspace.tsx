import type { ReactNode } from "react";
import WorkspaceTabs from "./WorkspaceTabs";
import type { WorkspaceTab } from "./WorkspaceTabs";
import { SubscriptionWall, StaleDataWarning } from "../system";

interface PanelWorkspaceProps {
  title: string;
  eyebrow?: string;
  tabs?: WorkspaceTab[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  actions?: ReactNode;
  children: ReactNode;
  locked?: boolean;
  stale?: boolean;
}

export default function PanelWorkspace({
  title,
  eyebrow,
  tabs,
  activeTabId,
  onTabChange,
  actions,
  children,
  locked,
  stale,
}: PanelWorkspaceProps) {
  return (
    <div className="elceo-workspace">
      <div className="elceo-workspace__header">
        <div>
          {eyebrow && <p className="elceo-panel__eyebrow">{eyebrow}</p>}
          <h2 className="elceo-panel__title">{title}</h2>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {tabs && activeTabId && onTabChange && (
        <WorkspaceTabs tabs={tabs} activeTabId={activeTabId} onChange={onTabChange} />
      )}
      {stale && <StaleDataWarning severity="medium" />}
      <div className="elceo-workspace__body">
        {locked ? (
          <SubscriptionWall reason="feature_not_in_trial_allowlist" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
