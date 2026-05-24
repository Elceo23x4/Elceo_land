import { Route, Routes } from "react-router-dom";
import LandingExperience from "../landing/LandingExperience";
import DashboardApp from "../dashboard/DashboardApp";
import DashboardAssetInventoryRoute from "../dashboard/assets/DashboardAssetInventoryRoute";
import NotFound from "./NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingExperience />} />
      <Route path="/dashboard" element={<DashboardApp />} />
      <Route path="/dashboard/assets" element={<DashboardAssetInventoryRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
