import type { ProviderStatus } from "../../../shared/access/accessTypes";

interface ProviderReadinessBadgeProps {
  status: ProviderStatus;
  label?: string;
}

const STATUS_MAP: Record<ProviderStatus, { label: string; cls: string }> = {
  ready: { label: "Ready", cls: "elceo-badge--ready" },
  provider_pending: { label: "Provider pending", cls: "elceo-badge--pending" },
  blocked_live_activation: { label: "Activation blocked", cls: "elceo-badge--blocked" },
  fixture_only: { label: "Fixture only", cls: "elceo-badge--fixture" },
};

export default function ProviderReadinessBadge({ status, label }: ProviderReadinessBadgeProps) {
  const mapped = STATUS_MAP[status];
  return (
    <span className={`elceo-badge ${mapped.cls}`}>
      {label ?? mapped.label}
    </span>
  );
}
