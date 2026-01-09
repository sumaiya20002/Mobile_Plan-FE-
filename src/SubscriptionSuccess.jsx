import { useLocation, useNavigate } from "react-router-dom";
import "./SubscriptionSuccess.css";

function SubscriptionSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">✔</div>

        <h1>Subscription Activated</h1>

        <p className="success-message">
          Your plan has been successfully activated.
        </p>

        <div className="success-details">
          <p>
            <b>Validity:</b> {state?.validityDays} Days
          </p>
          <p>
            <b>Status:</b> <span className="active">ACTIVE</span>
          </p>
        </div>

        <p className="success-note">
          You can view your subscription details anytime from the dashboard.
        </p>

        <button
          className="success-btn"
          onClick={() => navigate("/subscription")}
        >
          View My Subscription
        </button>

      </div>
    </div>
  );
}

export default SubscriptionSuccess;
