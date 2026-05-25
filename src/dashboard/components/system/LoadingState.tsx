interface LoadingStateProps {
  label?: string;
  variant?: "panel" | "page" | "inline";
}

export default function LoadingState({ label, variant = "panel" }: LoadingStateProps) {
  const variantClass = variant === "page" ? " elceo-loading--page" : variant === "inline" ? " elceo-loading--inline" : "";
  return (
    <div className={`elceo-loading${variantClass}`} role="status" aria-label={label ?? "Loading"}>
      <div className="elceo-loading__bar elceo-loading__bar--w80" />
      <div className="elceo-loading__bar elceo-loading__bar--w60" />
      <div className="elceo-loading__bar elceo-loading__bar--w40" />
      {label && <p className="elceo-loading__label">{label}</p>}
    </div>
  );
}
