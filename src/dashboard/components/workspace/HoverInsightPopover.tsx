import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";

interface HoverInsightPopoverProps {
  trigger: ReactNode;
  title: string;
  summary: string;
  detail?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export default function HoverInsightPopover({
  trigger,
  title,
  summary,
  detail,
  side = "bottom",
}: HoverInsightPopoverProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const visible = hovered || pinned;

  const handleClick = useCallback(() => {
    setPinned((p) => !p);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [pinned]);

  return (
    <div
      className="elceo-popover-anchor"
      ref={anchorRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className="elceo-popover-trigger"
        onClick={handleClick}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        type="button"
        aria-expanded={visible}
      >
        {trigger}
      </button>
      <div
        className={`elceo-popover elceo-popover--${side}${visible ? " elceo-popover--visible" : ""}`}
        role="tooltip"
        aria-hidden={!visible}
      >
        <p className="elceo-popover__title">{title}</p>
        <p className="elceo-popover__summary">{summary}</p>
        {pinned && detail && (
          <div className="elceo-popover__detail">{detail}</div>
        )}
      </div>
    </div>
  );
}
