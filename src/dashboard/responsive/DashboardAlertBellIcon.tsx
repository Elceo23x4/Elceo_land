/**
 * DashboardAlertBellIcon.tsx
 *
 * Designed bell icon extracted from elceo-svg-09-arrows-alerts-rings.svg.
 * Normalized to 24x24 viewBox. Uses currentColor. No source SVG edits.
 */

export interface DashboardAlertBellIconProps {
  armed?: boolean;
  className?: string;
}

export default function DashboardAlertBellIcon({ className }: DashboardAlertBellIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M10.2 17.5 C10.8 14.2 11.5 11.5 12 11.2 C12.5 11.5 13.2 14.2 13.8 17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.2 17.5 H14.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M11.1 19 Q12 20 12.9 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
