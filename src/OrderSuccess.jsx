import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="center-box">
      <h2>🎉 Order Successful</h2>
      <p>Your payment was completed successfully.</p>

      <button onClick={() => navigate("/orders")}>
        View Order History
      </button>
    </div>
  );
}

export default OrderSuccess;
