import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Plan.css";

// ✅ ADD THIS
import { useCart } from "./context/CartContext";

function Plan() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  // ✅ ADD THIS
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:8088/plans/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setPlans(res.data))
    .catch(err => console.error("PLAN ERROR:", err));
  }, []);

  return (
    <div className="plan-container">
      <h2 className="plan-title">Available Plans</h2>

      <div className="plan-grid">
        {plans.map(p => (
          <div className="plan-card" key={p.planId}>
            <div className="plan-name">{p.planName}</div>

            <div className="plan-price">₹{p.price}</div>

            <div className="plan-details">
              <p>📶 Data: {p.dataLimit} GB</p>
              <p>📞 Voice: {p.voiceMinutes} mins</p>
              <p>✉️ SMS: {p.smsLimit}</p>
              <p>📅 Validity: {p.validityDays} days</p>
            </div>

            <div className="plan-actions">
              {/* EXISTING BUTTON – UNCHANGED */}
              <button
                className="view-offers"
                onClick={() => navigate(`/offers/${p.planId}`)}
              >
                View Offers
              </button>

              {/* ✅ ADD TO CART BUTTON */}
              <button
                className="add-cart"
                onClick={() => {
                  addToCart(p);
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
