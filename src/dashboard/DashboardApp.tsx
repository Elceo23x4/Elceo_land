import RouteGate from "../shared/components/RouteGate";
import { kickoffAccess } from "../shared/access/mockAccessState";
import DashboardCockpit from "./cockpit/DashboardCockpit";

export default function DashboardApp() {
  return (
    <RouteGate access={kickoffAccess} requiresAuth>
      <DashboardCockpit />
    </RouteGate>
  );
}
