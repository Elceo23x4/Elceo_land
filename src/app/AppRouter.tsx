import { BrowserRouter } from "../lib/router";
import AppRoutes from "./routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
