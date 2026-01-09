import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Offer.css";

function Offer() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (!planId) return;

    axios.get(`http://localhost:8088/offers/${planId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => setOffer(res.data))
    .catch(err => console.error(err));
  }, [planId]);

  if (!offer) {
    return <p style={{ textAlign: "center" }}>No offer found</p>;
  }

  return (
    <div className="offer-page">
      <div className="offer-3d-card">

        <div className="offer-badge">🎁 Special Offer</div>

        <h2 className="offer-name">{offer.offerName}</h2>

        <div className="discount-ring">
          <span>{offer.discountPercent}%</span>
          <small>OFF</small>
        </div>

        <div className="offer-info">
          <p>📅 Valid till <b>{offer.endDate}</b></p>
        </div>

        {/* ✅ ONLY THIS BUTTON */}
        <button
  className="apply-offer-btn"
  onClick={() =>
    navigate("/offer-success", {
      state: {
        offerName: offer.offerName,
        discountPercent: offer.discountPercent,
        endDate: offer.endDate
      }
    })
  }
>
  Apply Offer
</button>


      </div>
    </div>
  );
}

export default Offer;
