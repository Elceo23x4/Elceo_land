import RouteGate from "../shared/components/RouteGate";
import { kickoffAccess } from "../shared/access/mockAccessState";
import { DashboardResponsiveCockpit } from "./responsive";

// Legacy absolute 1920×1080 cockpit. Not active runtime.
// import DashboardCockpit from "./cockpit/DashboardCockpit";

export default function DashboardApp() {
  return (
    <RouteGate access={kickoffAccess} requiresAuth>
      <DashboardResponsiveCockpit />
    </RouteGate>
  );
}
