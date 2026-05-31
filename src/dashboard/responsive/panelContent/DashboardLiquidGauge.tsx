/**
 * DashboardLiquidGauge.tsx
 *
 * Premium SVG-native liquid gauge. Fill is clipped to the real arc chamber.
 * Uses unique IDs per instance via useId. No SVG source edits.
 * Accessible: role="meter". Respects reduced motion.
 */

import { useId } from "react";
import LiquidGaugeSvg from "../../../assets/source/dashboard/shell/liquid_gauge.svg?react";

export interface DashboardLiquidGaugeProps {
  value: number;
  label: string;
  tone?: "auto" | "red" | "amber" | "green";
  className?: string;
}

function getTone(value: number, tone?: string): "red" | "amber" | "green" {
  if (tone && tone !== "auto") return tone as "red" | "amber" | "green";
  if (value < 40) return "red";
  if (value < 60) return "amber";
  return "green";
}

const TONE_GRADIENTS = {
  red: { top: "#ff6a54", mid: "#e03838", bottom: "#8d0f18" },
  amber: { top: "#ffe25e", mid: "#ffae33", bottom: "#b95f17" },
  green: { top: "#64ffd2", mid: "#15f18e", bottom: "#087d3a" },
};

// Chamber clip path from source SVG
const CHAMBER_PATH = "M 307.00 706.00 A 461.00 372.00 0 0 1 1229.00 706.00 L 994.00 706.00 A 226.00 205.00 0 0 0 542.00 706.00 Z";

// Liquid layer paths from source SVG (recolored dynamically)
const LIQUID_BASE = "M 309 706 L 309 661 C 339 642 356 612 367 573 C 382 522 415 493 461 464 C 509 433 558 404 608 377 C 665 346 720 333 781 338 C 836 342 876 364 929 358 C 974 354 1010 374 1047 407 C 1093 449 1122 505 1138 568 C 1149 613 1154 662 1159 706 Z";
const LIQUID_MID = "M 322 706 L 322 655 C 354 635 372 594 393 552 C 417 501 465 472 520 440 C 580 405 640 379 707 368 C 775 357 831 367 893 374 C 948 380 989 390 1034 424 C 1076 459 1102 510 1114 571 C 1123 617 1122 665 1118 706 Z";
const LIQUID_CREST = "M 313 706 L 313 654 C 350 629 361 591 378 553 C 396 512 431 487 477 458 C 536 421 594 391 655 367 C 704 348 753 345 806 354 C 852 362 888 377 929 361 C 966 348 1002 358 1033 382 C 1055 400 1072 419 1100 427 L 1181 394 L 1132 449 C 1102 481 1066 516 1048 557 C 1025 610 1017 662 1013 706 Z";
const LIQUID_FLOOR = "M 309 706 L 1217 706 L 1214 628 C 1165 604 1124 604 1074 612 C 1014 622 958 644 887 635 C 812 626 759 599 686 607 C 603 617 544 644 479 657 C 403 672 348 664 309 681 Z";

const CHAMBER_TOP_Y = 334;
const CHAMBER_BOTTOM_Y = 706;

export default function DashboardLiquidGauge({ value, label, tone, className }: DashboardLiquidGaugeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const resolvedTone = getTone(clamped, tone);
  const colors = TONE_GRADIENTS[resolvedTone];

  // Unique IDs per instance
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");
  const chamberClipId = `lc-${safeId}`;
  const fillClipId = `lf-${safeId}`;
  const gradBaseId = `gb-${safeId}`;
  const gradMidId = `gm-${safeId}`;
  const gradCrestId = `gc-${safeId}`;

  // Fill level in SVG coordinates
  const fillY = CHAMBER_BOTTOM_Y - (clamped / 100) * (CHAMBER_BOTTOM_Y - CHAMBER_TOP_Y);

  return (
    <div
      className={`dashboard-liquid-gauge ${className ?? ""}`}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={`${label}: ${clamped}%`}
    >
      {/* SVG-native clipped liquid layer — behind frame */}
      <svg className="dashboard-liquid-gauge__native-liquid" viewBox="0 0 1536 857" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <clipPath id={chamberClipId}>
            <path d={CHAMBER_PATH} />
          </clipPath>
          <clipPath id={fillClipId}>
            <rect x="260" y={fillY} width="1020" height={CHAMBER_BOTTOM_Y - fillY + 40} />
          </clipPath>
          <linearGradient id={gradBaseId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.top} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.bottom} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={gradMidId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.top} stopOpacity="0.7" />
            <stop offset="60%" stopColor={colors.mid} stopOpacity="0.85" />
            <stop offset="100%" stopColor={colors.bottom} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={gradCrestId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.top} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.mid} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${chamberClipId})`}>
          <g clipPath={`url(#${fillClipId})`}>
            <path className="dashboard-liquid-gauge__flow-slow" d={LIQUID_FLOOR} fill={`url(#${gradBaseId})`} opacity="0.5" />
            <path className="dashboard-liquid-gauge__flow-slow" d={LIQUID_BASE} fill={`url(#${gradBaseId})`} opacity="0.75" />
            <path className="dashboard-liquid-gauge__flow-mid" d={LIQUID_MID} fill={`url(#${gradMidId})`} opacity="0.85" />
            <path className="dashboard-liquid-gauge__crest" d={LIQUID_CREST} fill={`url(#${gradCrestId})`} opacity="0.95" />
          </g>
        </g>
      </svg>

      {/* SVG frame (acrylic rim, ticks, scale) — above liquid */}
      <div className="dashboard-liquid-gauge__frame" aria-hidden="true">
        <LiquidGaugeSvg preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Score text — above all */}
      <div className="dashboard-liquid-gauge__score">
        <span className="dashboard-liquid-gauge__value">{clamped}%</span>
      </div>
      <div className="dashboard-liquid-gauge__label">{label}</div>
    </div>
  );
}
