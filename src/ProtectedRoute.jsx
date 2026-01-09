import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setChecked(true);
  }, []);

  if (!checked) return null; // ⛔ prevents blink

  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
