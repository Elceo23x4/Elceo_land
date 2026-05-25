import type { UserPlan } from "../../../shared/access/accessTypes";

interface PlanBadgeProps {
  plan: UserPlan;
  size?: "sm" | "md";
  showLabel?: boolean;
}

const PLAN_MAP: Record<UserPlan, { label: string; cls: string }> = {
  visitor: { label: "Visitor", cls: "elceo-badge--visitor" },
  kickoff: { label: "Kick off", cls: "elceo-badge--kickoff" },
  focus: { label: "Focus", cls: "elceo-badge--focus" },
  gift: { label: "Gift", cls: "elceo-badge--gift" },
  restricted: { label: "Restricted", cls: "elceo-badge--restricted" },
};

export default function PlanBadge({ plan, size, showLabel = true }: PlanBadgeProps) {
  const { label, cls } = PLAN_MAP[plan];
  const sizeClass = size === "sm" ? " elceo-badge--sm" : "";
  return (
    <span className={`elceo-badge ${cls}${sizeClass}`}>
      {showLabel && label}
    </span>
  );
}
