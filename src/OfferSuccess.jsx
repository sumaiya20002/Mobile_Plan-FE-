import { useLocation, useNavigate } from "react-router-dom";
import "./OfferSuccess.css";

function OfferSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p style={{ textAlign: "center" }}>No offer data</p>;
  }

  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h1>🎉 Congratulations!</h1>

        <p className="success-text">
          You have successfully applied the offer
        </p>

        <div className="offer-summary">
          <h3>{state.offerName}</h3>
          <div className="big-discount">
            {state.discountPercent}% OFF
          </div>
          <p>Valid till: {state.endDate}</p>
        </div>

        {/* ONLY UI – NO BACKEND NOW */}
        <button onClick={() => navigate("/plan")}>
          Back to Plans
        </button>
      </div>
    </div>
  );
}

export default OfferSuccess;
