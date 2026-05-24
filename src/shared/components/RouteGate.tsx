import type { ReactNode } from "react";
import type { AccessState } from "../access/accessTypes";

interface RouteGateProps {
  children: ReactNode;
  access: AccessState;
  requiresAuth?: boolean;
}

function AccessDeniedPlaceholder({ reason }: { reason: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "monospace",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "420px" }}>
        <h2 style={{ color: "#d4790a", marginBottom: "1rem", fontSize: "1.25rem" }}>
          Access Required
        </h2>
        <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{reason}</p>
        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", opacity: 0.4 }}>
          Backend guards remain the source of truth.
        </p>
      </div>
    </div>
  );
}

export default function RouteGate({ children, access, requiresAuth }: RouteGateProps) {
  if (requiresAuth && !access.isAuthenticated) {
    return (
      <AccessDeniedPlaceholder reason="Authentication is required to access this surface." />
    );
  }

  if (access.plan === "restricted") {
    return (
      <AccessDeniedPlaceholder reason="Your account access is currently restricted. Contact support if you believe this is an error." />
    );
  }

  return <>{children}</>;
}
