import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DashboardLayout.css";
import NotificationBell from "./NotificationBell";


function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`dashboard ${dark ? "dark" : ""}`}>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <span className="menu-btn" onClick={() => setCollapsed(!collapsed)}>
            ☰
          </span>
          {!collapsed && <h2>Mobile App</h2>}
        </div>

        <nav>
          <NavLink to="/dashboard">🏠 Dashboard</NavLink>
          <NavLink to="/plan">📦 Plans</NavLink>
          <NavLink to="/offers">🎁 Offers</NavLink>
          <NavLink to="/subscription">📄 Subscriptions</NavLink>
          <NavLink to="/cart">🛒 Cart</NavLink>
          <NavLink to="/history">🧾 History</NavLink>
          <NavLink to="/support">🎫 Support</NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      <div className="main">
        <header className="top-header">
          <h3>Mobile Plan Change & Fulfillment</h3>

          {/* RIGHT SIDE ICONS */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <NotificationBell />

            {/* DARK MODE */}
            <button
              className="theme-btn"
              onClick={() => setDark(!dark)}
              title="Toggle Theme"
            >
              {dark ? "🌞" : "🌙"}
            </button>

            {/* MY PROFILE (LAST) */}
            <button
              className="theme-btn"
              onClick={() => navigate("/profile")}
              title="My Profile"
            >
              👤
            </button>
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default DashboardLayout;
