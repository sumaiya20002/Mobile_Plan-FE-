import { useNavigate } from "react-router-dom";
import "./CancelSuccess.css";

function ReactivateSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card success">
        <h1>✅ Subscription Activated</h1>
        <p>Your plan is active again</p>

        <button onClick={() => navigate("/subscription")}>
          View Active Plans
        </button>
      </div>
    </div>
  );
}

export default ReactivateSuccess;
