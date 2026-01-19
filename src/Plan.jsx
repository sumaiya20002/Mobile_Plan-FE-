import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Plan.css";
import { useCart } from "./context/CartContext";

function Plan() {
  const [plans, setPlans] = useState([]);
  const [comparePlans, setComparePlans] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:8088/plans/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setPlans(res.data))
    .catch(err => console.error(err));
  }, []);

  const toggleCompare = (plan) => {
    setComparePlans(prev => {
      if (prev.find(p => p.planId === plan.planId)) {
        return prev.filter(p => p.planId !== plan.planId);
      }
      if (prev.length < 2) return [...prev, plan];
      return prev;
    });
  };

  // ✅ SAME FUNCTION – NO CHANGE
  const handleChangePlan = (planId) => {
    alert("Plan selected for change");
    navigate("/change-plan", {
      state: { newPlanId: planId }
    });
  };

  return (
    <div className="plan-container">
      <h2 className="plan-title">Available Plans</h2>

      {comparePlans.length === 2 && (
        <button
          className="compare-btn"
          onClick={() => navigate("/compare", { state: comparePlans })}
        >
          Compare Plans
        </button>
      )}

      <div className="plan-grid">
        {plans.map(p => (
          <div className="plan-card" key={p.planId}>
            <input
              type="checkbox"
              checked={comparePlans.some(cp => cp.planId === p.planId)}
              onChange={() => toggleCompare(p)}
            />

            {/* PLAN NAME ONLY (NO BUTTON HERE) */}
            <div className="plan-name">{p.planName}</div>

            <div className="plan-price">₹{p.price}</div>

            <div className="plan-details">
              <p>📶 {p.dataLimit} GB/day</p>
              <p>📞 {p.voiceMinutes} mins</p>
              <p>✉️ {p.smsLimit}/day</p>
              <p>📅 {p.validityDays} days</p>
            </div>

            {/* 🔽 BUTTON MOVED DOWN HERE */}
            <div className="plan-actions">
              <button
                className="view-offers"
                onClick={() => navigate(`/offers/${p.planId}`)}
              >
                View Offers
              </button>

              <button
                className="change-plan-btn"
                onClick={() => handleChangePlan(p.planId)}
              >
                Change Plan
              </button>

              <button
                className="add-cart"
                onClick={async () => {
                  await addToCart(p);
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Plan;
