import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MySubscriptions.css";

function MySubscriptions() {
  const [subs, setSubs] = useState([]);
  const [tab, setTab] = useState("ACTIVE");
  const navigate = useNavigate();

  // 🔹 LOAD SUBSCRIPTIONS
  const loadSubscriptions = () => {
    axios
      .get(`http://localhost:8088/subscriptions/${tab.toLowerCase()}`)
      .then(res => setSubs(res.data))
      .catch(err => console.error("LOAD ERROR:", err));
  };

  useEffect(() => {
    loadSubscriptions();
  }, [tab]);

  // 🔹 CANCEL SUBSCRIPTION
  const cancelSub = (id) => {
    axios
      .put(`http://localhost:8088/subscriptions/cancel/${id}`)
      .then(() => {
        // remove immediately from UI
        setSubs(prev => prev.filter(s => s.subscriptionId !== id));
        navigate("/cancel-success");
      })
      .catch(err => console.error("CANCEL ERROR:", err));
  };

  // 🔹 RE-ACTIVATE SUBSCRIPTION
  const reactivateSub = (id) => {
    axios
      .put(`http://localhost:8088/subscriptions/activate/${id}`)
      .then(() => {
        // remove immediately from cancelled/expired UI
        setSubs(prev => prev.filter(s => s.subscriptionId !== id));
        navigate("/reactivate-success");
      })
      .catch(err => console.error("REACTIVATE ERROR:", err));
  };

  // 🔹 DAYS LEFT
  const daysLeft = (endDate) => {
    const diff = new Date(endDate) - new Date();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  return (
    <div className="subs-container">
      <h2>My Subscriptions</h2>

      {/* TABS */}
      <div className="tabs">
        <button className={tab === "ACTIVE" ? "active" : ""}
          onClick={() => setTab("ACTIVE")}>
          Active
        </button>

        <button className={tab === "EXPIRED" ? "active" : ""}
          onClick={() => setTab("EXPIRED")}>
          Expired
        </button>

        <button className={tab === "CANCELLED" ? "active" : ""}
          onClick={() => setTab("CANCELLED")}>
          Cancelled
        </button>
      </div>

      {/* CARDS */}
      <div className="subs-grid">
        {subs.length === 0 && <p>No subscriptions found</p>}

        {subs.map(s => (
          <div className="subs-card" key={s.subscriptionId}>
            <h3>Plan ID: {s.planId}</h3>
            <p>Status: <b>{s.status}</b></p>
            <p>Start: {s.startDate}</p>
            <p>End: {s.endDate}</p>

            {s.status === "ACTIVE" && (
              <>
                <p className="countdown">
                  ⏳ {daysLeft(s.endDate)} days left
                </p>

                <button
                  className="cancel-btn"
                  onClick={() => cancelSub(s.subscriptionId)}>
                  Cancel
                </button>
              </>
            )}

            {(s.status === "EXPIRED" || s.status === "CANCELLED") && (
              <button
                className="reactivate-btn"
                onClick={() => reactivateSub(s.subscriptionId)}>
                Re-Activate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MySubscriptions;
