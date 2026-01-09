import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OfferList.css";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8088/offers/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => setOffers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="offers-page">
      <h1>Available Offers</h1>
      <p>Choose an active offer to apply</p>

      <div className="offers-grid">
        {offers.map(offer => (
          <div
            key={offer.offerId}
            className={`offer-card ${offer.active ? "active" : "disabled"}`}
            onClick={() =>
              offer.active && navigate(`/offers/${offer.planId}`)
            }
          >
            {/* COMING SOON */}
            {!offer.active && (
              <div className="coming-soon-badge">Coming Soon</div>
            )}

            <h3>{offer.offerName}</h3>

            <div className="discount-circle">
              <span>{offer.discountPercent}%</span>
              <small>OFF</small>
            </div>

            <p className="dates">
              {offer.startDate} → {offer.endDate}
            </p>

            <p className="plan">Plan ID: {offer.planId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferList;
