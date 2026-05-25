import type { ReactNode } from "react";

interface PanelFrameProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  actions?: ReactNode;
  tone?: "neutral" | "warning" | "danger" | "positive";
  compact?: boolean;
}

export default function PanelFrame({
  title,
  eyebrow,
  children,
  actions,
  tone = "neutral",
  compact,
}: PanelFrameProps) {
  return (
    <div className={`elceo-panel-frame elceo-panel-frame--${tone}${compact ? " elceo-panel-frame--compact" : ""}`}>
      <div className="elceo-panel-frame__header">
        <div>
          {eyebrow && <p className="elceo-panel-frame__eyebrow">{eyebrow}</p>}
          <h3 className="elceo-panel-frame__title">{title}</h3>
        </div>
        {actions && <div className="elceo-panel-frame__actions">{actions}</div>}
      </div>
      <div className="elceo-panel-frame__body">
        {children}
      </div>
    </div>
  );
}
