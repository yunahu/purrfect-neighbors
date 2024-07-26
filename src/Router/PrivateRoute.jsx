import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/useAuth";

function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default PrivateRoute;
