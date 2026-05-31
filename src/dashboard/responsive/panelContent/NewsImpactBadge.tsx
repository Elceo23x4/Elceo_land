/**
 * NewsImpactBadge.tsx
 *
 * V1B-5: Inline impact badge for News & Macro headlines.
 * Visual language extracted from elceo-svg-08-news-impact-badges.svg.
 * Source SVG not modified — capsule+bars pattern replicated faithfully.
 *
 * Colors from source asset:
 *   High  → #ff3e3e (red)
 *   Medium → #22e46f (green)
 *   Low   → #ffb23a (amber)
 */

export interface NewsImpactBadgeProps {
  impact: "high" | "medium" | "low";
  label?: string;
  className?: string;
}

const IMPACT_COLORS: Record<string, string> = {
  high: "#ff3e3e",
  medium: "#22e46f",
  low: "#ffb23a",
};

export default function NewsImpactBadge({ impact, label, className }: NewsImpactBadgeProps) {
  const color = IMPACT_COLORS[impact] ?? IMPACT_COLORS.low;
  const barCount = impact === "high" ? 4 : impact === "medium" ? 3 : 2;

  return (
    <span className={`dashboard-news-impact-badge dashboard-news-impact-badge--${impact}${className ? ` ${className}` : ""}`} aria-label={label ?? `${impact} impact`}>
      <svg
        className="dashboard-news-impact-badge__icon"
        viewBox="0 0 48 18"
        fill="none"
        aria-hidden="true"
      >
        {/* Capsule outline — faithful to source asset shape */}
        <rect
          x="0.6"
          y="0.6"
          width="46.8"
          height="16.8"
          rx="5"
          fill="rgba(10,8,4,0.35)"
          stroke={color}
          strokeWidth="1.1"
          strokeOpacity="0.75"
        />
        {/* Impact bars — graduated opacity like source */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={i}
            x={7 + i * 11}
            y="7"
            width="7"
            height="4"
            rx="1"
            fill={color}
            fillOpacity={i < barCount ? 0.9 - i * 0.15 : 0.12}
          />
        ))}
      </svg>
    </span>
  );
}
