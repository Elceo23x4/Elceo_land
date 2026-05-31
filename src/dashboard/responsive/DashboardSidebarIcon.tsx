/**
 * DashboardSidebarIcon.tsx
 *
 * Designed sidebar icons extracted from elceo-svg-04-nav-icons-display-safe.svg.
 * Paths normalized to 0-48 viewBox for consistent sizing.
 * Uses currentColor for stroke. No source SVG edits.
 */

import type { ReactNode } from "react";

export type DashboardSidebarIconName =
  | "cockpit"
  | "chart"
  | "assets"
  | "evidence"
  | "macro"
  | "regime"
  | "journal";

export interface DashboardSidebarIconProps {
  name: DashboardSidebarIconName;
  className?: string;
}

const ICON_PATHS: Record<DashboardSidebarIconName, ReactNode> = {
  cockpit: (
    <>
      <rect x="12" y="12" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="26" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="12" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="26" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </>
  ),
  macro: (
    <>
      <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.84" />
      <path d="M 8 24 H 40 M 24 8 C 15 17 15 31 24 40 M 24 8 C 33 17 33 31 24 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  assets: (
    <>
      <path d="M 16 30 C 10 19 19 9 24 14 C 28 9 38 19 32 30 C 38 39 28 47 24 40 C 20 47 10 39 16 30 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.84" />
      <path d="M 24 14 V 40 M 16 26 H 32 M 18 34 H 30" fill="none" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  evidence: (
    <>
      <polygon points="24,6 28,18 40,19 31,28 33,41 24,35 15,41 17,28 8,19 20,18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.84" />
    </>
  ),
  chart: (
    <>
      <rect x="6" y="24" width="9" height="18" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.84" />
      <rect x="19.5" y="14" width="9" height="28" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.84" />
      <rect x="33" y="6" width="9" height="36" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.84" />
    </>
  ),
  regime: (
    <>
      <rect x="6" y="24" width="36" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.84" />
      <path d="M 17 24 V 18 H 31 V 24 M 6 32 H 42" fill="none" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  journal: (
    <>
      <path d="M 12 6 H 32 L 39 13 V 42 H 12 Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.84" />
      <path d="M 32 6 V 13 H 39 M 17 21 H 32 M 17 29 H 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function DashboardSidebarIcon({ name, className }: DashboardSidebarIconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}
