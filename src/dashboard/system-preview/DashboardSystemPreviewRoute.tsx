import RouteGate from "../../shared/components/RouteGate";
import { kickoffAccess } from "../../shared/access/mockAccessState";
import DashboardSystemPreview from "./DashboardSystemPreview";

export default function DashboardSystemPreviewRoute() {
  return (
    <RouteGate access={kickoffAccess} requiresAuth>
      <DashboardSystemPreview />
    </RouteGate>
  );
}
