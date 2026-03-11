import { Outlet, useLocation } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";

const DASHBOARD_ROUTES = [
  "/dashboard",
  "/flashcards",
  "/focus",
  "/analytics",
  "/calendar",
  "/settings",
  "/profile",
  "/notes",
  "/leaderboard",
];

export function Root() {
  const location = useLocation();
  const isDashboard = DASHBOARD_ROUTES.some((r) => location.pathname.startsWith(r));

  if (isDashboard) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  return <Outlet />;
}
