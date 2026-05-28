/**
 * DashboardResponsiveDetailDrawer.tsx
 *
 * Lightweight detail drawer shell for the responsive dashboard.
 * Opens from panel action buttons, shows fixture detail content.
 * Right-side panel on desktop. Keyboard accessible.
 *
 * No route change. No raw payloads. No provider secrets.
 */

import { useEffect, useRef, type ReactNode } from "react";

interface DetailDrawerProps {
  open: boolean;
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function DashboardResponsiveDetailDrawer({
  open,
  title,
  eyebrow,
  onClose,
  children,
}: DetailDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="dashboard-detail-drawer-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="dashboard-detail-drawer" ref={drawerRef}>
        <div className="dashboard-detail-drawer__header">
          <div>
            {eyebrow && <p className="dashboard-precision-eyebrow">{eyebrow}</p>}
            <h2 className="dashboard-precision-title">{title}</h2>
          </div>
          <button
            className="dashboard-detail-drawer__close"
            onClick={onClose}
            aria-label="Close drawer"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="dashboard-detail-drawer__body">
          {children}
        </div>
      </div>
    </div>
  );
}
