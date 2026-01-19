// Payment.jsx
import { useLocation, useNavigate } from "react-router-dom";


function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p style={{ textAlign: "center" }}>No payment data</p>;
  }

  const { plan, totalPayable, discountAmount } = state;

  return (
    <div className="payment-wrapper">
      <h2>Payment Summary</h2>

      <div className="payment-card">
        <h3>{plan.planName}</h3>

        <div className="row">
          <span>Plan Price</span>
          <span>₹{plan.price}</span>
        </div>

        <div className="row discount">
          <span>Discount</span>
          <span>-₹{discountAmount}</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total Payable</span>
          <span>₹{totalPayable}</span>
        </div>

        <button
          onClick={() => navigate("/payment-success")}
        >
          Pay ₹{totalPayable}
        </button>
      </div>
    </div>
  );
}

export default Payment;
