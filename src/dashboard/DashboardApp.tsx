import RouteGate from "../shared/components/RouteGate";
import { kickoffAccess } from "../shared/access/mockAccessState";
import DashboardFoundationScreen from "./DashboardFoundationScreen";

export default function DashboardApp() {
  return (
    <RouteGate access={kickoffAccess} requiresAuth>
      <DashboardFoundationScreen />
    </RouteGate>
  );
}
