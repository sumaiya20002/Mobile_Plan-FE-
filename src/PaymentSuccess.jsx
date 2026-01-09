import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/order-tracking");
    }, 5000); // 2 seconds
  }, []);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-check">✔</div>
        <h2>Payment Successful</h2>
        <p>Your transaction is completed.</p>
        <p>Redirecting to order tracking...</p>
      </div>
    </div>
  );
}

export default PaymentSuccess;
