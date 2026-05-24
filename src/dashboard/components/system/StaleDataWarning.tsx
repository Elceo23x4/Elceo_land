interface StaleDataWarningProps {
  lastUpdatedLabel?: string;
  severity?: "low" | "medium" | "high";
  message?: string;
}

export default function StaleDataWarning({
  lastUpdatedLabel,
  severity = "medium",
  message = "Data may be delayed or stale. Verify freshness before relying on displayed values.",
}: StaleDataWarningProps) {
  return (
    <div className={`elceo-stale elceo-stale--${severity}`} role="alert">
      <span>{message}</span>
      {lastUpdatedLabel && (
        <span style={{ marginLeft: "auto", opacity: 0.7 }}>{lastUpdatedLabel}</span>
      )}
    </div>
  );
}
