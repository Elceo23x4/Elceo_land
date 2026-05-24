import type { DenialCode } from "../../../shared/access/accessTypes";
import RestrictedPanel from "./RestrictedPanel";

interface SubscriptionWallProps {
  reason: DenialCode;
  title?: string;
  message?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const DENIAL_MESSAGES: Record<DenialCode, { title: string; message: string }> = {
  feature_not_in_trial_allowlist: {
    title: "Feature Unavailable",
    message: "This insight is part of Focus Plan.",
  },
  subscription_required: {
    title: "Subscription Required",
    message: "Your Kick off trial has ended.",
  },
  missing_social_identifier: {
    title: "Identifier Required",
    message: "Add one social identifier before checkout.",
  },
  blocked_live_activation: {
    title: "Activation Blocked",
    message: "Checkout is not yet active in this environment.",
  },
  restricted_user: {
    title: "Access Restricted",
    message: "Account access is restricted.",
  },
  provider_pending: {
    title: "Provider Pending",
    message: "Provider activation is pending.",
  },
  step_up_required: {
    title: "Verification Required",
    message: "Step-up verification is required before this action.",
  },
  step_up_verification_failed: {
    title: "Verification Failed",
    message: "Step-up verification failed or expired.",
  },
};


export default function SubscriptionWall({
  reason,
  title,
  message,
  ctaLabel,
  onCtaClick,
}: SubscriptionWallProps) {
  // Restricted user override: never show upgrade CTA
  if (reason === "restricted_user") {
    return <RestrictedPanel title={title} message={message} />;
  }

  const defaults = DENIAL_MESSAGES[reason];

  return (
    <div className="elceo-sub-wall">
      <h2 className="elceo-sub-wall__title">{title ?? defaults.title}</h2>
      <p className="elceo-sub-wall__message">{message ?? defaults.message}</p>
      {ctaLabel && onCtaClick && (
        <button className="elceo-sub-wall__cta" onClick={onCtaClick} type="button">
          {ctaLabel}
        </button>
      )}
      <p style={{ fontSize: "0.6rem", color: "#555", marginTop: "1rem" }}>
        Backend guards remain the source of truth.
      </p>
    </div>
  );
}
