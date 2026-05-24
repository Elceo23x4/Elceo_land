interface WorkspaceTab {
  id: string;
  label: string;
  locked?: boolean;
}

interface WorkspaceTabsProps {
  tabs: WorkspaceTab[];
  activeTabId: string;
  onChange: (id: string) => void;
}

export type { WorkspaceTab };

export default function WorkspaceTabs({ tabs, activeTabId, onChange }: WorkspaceTabsProps) {
  return (
    <div className="elceo-tabs" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const cls = [
          "elceo-tabs__btn",
          isActive ? "elceo-tabs__btn--active" : "",
          tab.locked ? "elceo-tabs__btn--locked" : "",
        ].filter(Boolean).join(" ");

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.locked}
            className={cls}
            onClick={() => !tab.locked && onChange(tab.id)}
            type="button"
          >
            {tab.label}
            {tab.locked && <span aria-hidden="true"> &#x1f512;</span>}
          </button>
        );
      })}
    </div>
  );
}
