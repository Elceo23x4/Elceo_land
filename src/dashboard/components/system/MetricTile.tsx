interface MetricTileProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "flat" | "mixed";
  tone?: "neutral" | "positive" | "warning" | "danger";
  freshness?: string;
  locked?: boolean;
}

const TREND_LABELS: Record<string, string> = {
  up: "Trending higher",
  down: "Trending lower",
  flat: "Stable",
  mixed: "Mixed conditions",
};

export default function MetricTile({ label, value, trend, tone = "neutral", freshness, locked }: MetricTileProps) {
  const toneClass = tone !== "neutral" ? ` elceo-metric__value--${tone}` : "";
  return (
    <div className={`elceo-metric${locked ? " elceo-metric--locked" : ""}`}>
      <p className="elceo-metric__label">{label}</p>
      <p className={`elceo-metric__value${toneClass}`}>
        {locked ? "—" : value}
      </p>
      {trend && !locked && (
        <p className="elceo-metric__trend">{TREND_LABELS[trend]}</p>
      )}
      {freshness && !locked && (
        <p className="elceo-metric__freshness">{freshness}</p>
      )}
    </div>
  );
}
