import type { AccessState } from "./accessTypes";

export const visitorAccess: AccessState = {
  plan: "visitor",
  adminRole: "none",
  isAuthenticated: false,
  providerStatus: "fixture_only",
  persistenceStatus: "memory_fallback",
};

export const kickoffAccess: AccessState = {
  plan: "kickoff",
  adminRole: "none",
  isAuthenticated: true,
  providerStatus: "provider_pending",
  persistenceStatus: "durable",
};

export const focusAccess: AccessState = {
  plan: "focus",
  adminRole: "none",
  isAuthenticated: true,
  providerStatus: "ready",
  persistenceStatus: "durable",
};

export const giftAccess: AccessState = {
  plan: "gift",
  adminRole: "none",
  isAuthenticated: true,
  providerStatus: "provider_pending",
  persistenceStatus: "durable",
};

export const restrictedAccess: AccessState = {
  plan: "restricted",
  adminRole: "none",
  isAuthenticated: true,
  denialCode: "restricted_user",
  providerStatus: "blocked_live_activation",
  persistenceStatus: "durable",
};

export const adminReadAccess: AccessState = {
  plan: "focus",
  adminRole: "admin_read",
  isAuthenticated: true,
  providerStatus: "ready",
  persistenceStatus: "durable",
};

export const superAdminAccess: AccessState = {
  plan: "focus",
  adminRole: "super_admin",
  isAuthenticated: true,
  providerStatus: "ready",
  persistenceStatus: "durable",
};
