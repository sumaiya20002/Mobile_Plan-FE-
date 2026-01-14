import "./DashboardHome.css";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      {/* WELCOME PANEL */}
      <div className="welcome-card">
        <h1>Happy to see you again 👋</h1>
        <p>
          Manage your mobile plans, subscriptions, and offers efficiently from
          one place.
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="card-grid">
        <div className="card" onClick={() => navigate("/plan")}>
          <h3>📦 Plans</h3>
          <p>Browse and manage available plans</p>
        </div>

        <div className="card" onClick={() => navigate("/offers/1")}>
          <h3>🎁 Offers</h3>
          <p>View special and limited-time offers</p>
        </div>

        <div className="card" onClick={() => navigate("/subscription")}>
          <h3>📄 Subscriptions</h3>
          <p>View your active and past subscriptions</p>
        </div>

        <div className="card" onClick={() => navigate("/cart")}>
          <h3>🛒 Cart & Checkout</h3>
          <p>Review selected plans and complete payment</p>
        </div>

        <div className="card" onClick={() => navigate("/support")}>
  <h3>🎫 Support Tickets</h3>
  <p>Raise and track your support requests</p>
</div>


        {/* 🤖 AI CHAT */}
        <div className="card" onClick={() => navigate("/ai-chat")}>
          <h3>🤖 AI Assistant</h3>
          <p>Ask about recharge plans, offers & support</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
