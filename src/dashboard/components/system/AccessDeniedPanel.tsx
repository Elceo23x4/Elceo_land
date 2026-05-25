import type { DenialCode } from "../../../shared/access/accessTypes";

interface AccessDeniedPanelProps {
  reason: DenialCode;
  title?: string;
  message?: string;
}

const REASON_MESSAGES: Record<DenialCode, { title: string; message: string }> = {
  feature_not_in_trial_allowlist: {
    title: "Feature Unavailable",
    message: "This feature is not included in your current plan allowlist.",
  },
  subscription_required: {
    title: "Subscription Required",
    message: "An active subscription is required to access this area.",
  },
  missing_social_identifier: {
    title: "Identifier Missing",
    message: "A social identifier is needed before proceeding.",
  },
  blocked_live_activation: {
    title: "Activation Blocked",
    message: "This feature requires live activation which is not yet available.",
  },
  restricted_user: {
    title: "Access Restricted",
    message: "Your account is restricted. Contact support for assistance.",
  },
  provider_pending: {
    title: "Provider Pending",
    message: "The provider is still being activated. Try again later.",
  },
  step_up_required: {
    title: "Verification Required",
    message: "Additional verification is required for this action.",
  },
  step_up_verification_failed: {
    title: "Verification Failed",
    message: "Verification failed or has expired. Please try again.",
  },
};

export default function AccessDeniedPanel({ reason, title, message }: AccessDeniedPanelProps) {
  const defaults = REASON_MESSAGES[reason];
  return (
    <div className="elceo-access-denied">
      <h2 className="elceo-access-denied__title">{title ?? defaults.title}</h2>
      <p className="elceo-access-denied__message">{message ?? defaults.message}</p>
    </div>
  );
}
