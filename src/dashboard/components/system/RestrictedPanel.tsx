interface RestrictedPanelProps {
  title?: string;
  message?: string;
  supportLabel?: string;
}

export default function RestrictedPanel({
  title = "Account access is restricted",
  message = "Your account access is currently restricted. Contact support or wait for review.",
  supportLabel = "Contact support if you believe this is an error.",
}: RestrictedPanelProps) {
  return (
    <div className="elceo-restricted">
      <h2 className="elceo-restricted__title">{title}</h2>
      <p className="elceo-restricted__message">{message}</p>
      <p className="elceo-restricted__support">{supportLabel}</p>
    </div>
  );
}
