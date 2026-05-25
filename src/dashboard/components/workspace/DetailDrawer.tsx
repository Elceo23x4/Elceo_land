import { useEffect, useCallback, type ReactNode } from "react";

interface DetailDrawerProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  side?: "right" | "bottom";
}

export default function DetailDrawer({
  open,
  title,
  subtitle,
  onClose,
  children,
  side = "right",
}: DetailDrawerProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  return (
    <>
      <div
        className={`elceo-drawer-backdrop${open ? " elceo-drawer-backdrop--open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`elceo-drawer elceo-drawer--${side}${open ? " elceo-drawer--open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label={title}
      >
        <div className="elceo-drawer__header">
          <div>
            <h3 className="elceo-drawer__title">{title}</h3>
            {subtitle && <p className="elceo-drawer__subtitle">{subtitle}</p>}
          </div>
          <button className="elceo-drawer__close" onClick={onClose} type="button" aria-label="Close">
            &#x2715;
          </button>
        </div>
        <div className="elceo-drawer__body">{children}</div>
      </aside>
    </>
  );
}
