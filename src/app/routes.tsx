import { Route, Routes } from "../lib/router";
import LandingExperience from "../landing/LandingExperience";
import DashboardApp from "../dashboard/DashboardApp";
import NotFound from "./NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingExperience />} />
      <Route path="/dashboard" element={<DashboardApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
