import { useNavigate } from "react-router-dom";
import "./CancelSuccess.css";

function CancelSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card danger">
        <h1>❌ Subscription Cancelled</h1>
        <p>Your plan has been cancelled successfully</p>

        <button onClick={() => navigate("/subscription")}>
          Back to Subscriptions
        </button>
      </div>
    </div>
  );
}

export default CancelSuccess;
