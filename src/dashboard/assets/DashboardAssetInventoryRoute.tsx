import RouteGate from "../../shared/components/RouteGate";
import { kickoffAccess } from "../../shared/access/mockAccessState";
import DashboardAssetInventory from "./DashboardAssetInventory";

export default function DashboardAssetInventoryRoute() {
  return (
    <RouteGate access={kickoffAccess} requiresAuth>
      <DashboardAssetInventory />
    </RouteGate>
  );
}
