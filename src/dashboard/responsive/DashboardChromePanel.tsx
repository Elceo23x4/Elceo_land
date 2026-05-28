import type { ComponentType, ReactNode, SVGProps } from "react";

/**
 * DashboardChromePanel
 *
 * Reusable panel component for the responsive dashboard.
 * Renders an isolated SVG frame as background chrome with
 * real DOM content positioned above it.
 *
 * - Frame SVG is absolute-positioned behind content
 * - Content is relative above the frame
 * - Body area supports internal scroll
 * - Container queries enabled for adaptive typography
 */

interface DashboardChromePanelProps {
  /** SVG frame component imported via ?react */
  frame: ComponentType<SVGProps<SVGSVGElement>>;
  /** Panel title */
  title: string;
  /** Panel eyebrow text (above title) */
  eyebrow?: string;
  /** Additional className for the panel wrapper */
  className?: string;
  /** Panel body content */
  children: ReactNode;
  /** Enable internal scroll on body area */
  bodyScroll?: boolean;
}

export default function DashboardChromePanel({
  frame: FrameSvg,
  title,
  eyebrow,
  className = "",
  children,
  bodyScroll = true,
}: DashboardChromePanelProps) {
  return (
    <div className={`dashboard-chrome-panel ${className}`}>
      {/* Frame chrome — decorative SVG background */}
      <div className="dashboard-panel-frame" aria-hidden="true">
        <FrameSvg preserveAspectRatio="none" />
      </div>

      {/* Content above frame */}
      <div className="dashboard-panel-content">
        {/* Header */}
        <div className="dashboard-panel-header">
          {eyebrow && (
            <p className="dashboard-panel-eyebrow">{eyebrow}</p>
          )}
          <h3 className="dashboard-panel-title">{title}</h3>
        </div>

        {/* Body */}
        <div
          className="dashboard-panel-body"
          style={bodyScroll ? undefined : { overflow: "visible" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
