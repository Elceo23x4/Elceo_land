/**
 * DashboardAlertBellIcon.tsx
 *
 * Designed bell icon for panel alert buttons.
 * Sized to fill ~70% of button area. Uses currentColor.
 * No source SVG edits. Stroke-based for clarity.
 */

export interface DashboardAlertBellIconProps {
  armed?: boolean;
  className?: string;
}

export default function DashboardAlertBellIcon({ className }: DashboardAlertBellIconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 14 C6.5 14 7.2 12.5 7.5 10.5 C7.8 8.5 8.2 6.2 10 5.5 C11.8 6.2 12.2 8.5 12.5 10.5 C12.8 12.5 13.5 14 13.5 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 14 H14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.8 16.2 Q10 17.5 11.2 16.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
