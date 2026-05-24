import type { PersistenceStatus } from "../../../shared/access/accessTypes";

interface PersistenceStatusBadgeProps {
  status: PersistenceStatus;
  internalOnly?: boolean;
}

const STATUS_MAP: Record<PersistenceStatus, { label: string; cls: string }> = {
  durable: { label: "Durable", cls: "elceo-badge--durable" },
  memory_fallback: { label: "Memory fallback", cls: "elceo-badge--memory" },
};

export default function PersistenceStatusBadge({ status, internalOnly }: PersistenceStatusBadgeProps) {
  const mapped = STATUS_MAP[status];
  return (
    <span className={`elceo-badge ${mapped.cls}`} title={internalOnly ? "Internal admin view" : undefined}>
      {mapped.label}
      {status === "memory_fallback" && (
        <span style={{ fontSize: "0.55rem", opacity: 0.7, marginLeft: "0.3em" }}>
          — not production persistence
        </span>
      )}
    </span>
  );
}
