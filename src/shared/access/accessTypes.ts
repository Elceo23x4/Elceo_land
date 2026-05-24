export type UserPlan =
  | "visitor"
  | "kickoff"
  | "focus"
  | "gift"
  | "restricted";

export type AdminRole =
  | "none"
  | "admin_read"
  | "admin_ops"
  | "super_admin";

export type ProviderStatus =
  | "ready"
  | "provider_pending"
  | "blocked_live_activation"
  | "fixture_only";

export type PersistenceStatus =
  | "durable"
  | "memory_fallback";

export type DenialCode =
  | "feature_not_in_trial_allowlist"
  | "subscription_required"
  | "missing_social_identifier"
  | "blocked_live_activation"
  | "restricted_user"
  | "provider_pending"
  | "step_up_required"
  | "step_up_verification_failed";

export interface AccessState {
  plan: UserPlan;
  adminRole: AdminRole;
  isAuthenticated: boolean;
  denialCode?: DenialCode;
  providerStatus?: ProviderStatus;
  persistenceStatus?: PersistenceStatus;
}
