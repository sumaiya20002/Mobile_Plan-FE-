import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Subscribe.css";

function Subscribe() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const confirmSubscribe = () => {
    const token = localStorage.getItem("token");
  
    axios.post(
      `http://localhost:8088/subscriptions/${planId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => navigate("/subscription-success"))
    .catch(err => console.error("403 SUBSCRIBE:", err.response?.status));
  };
  

  return (
    <div className="subscribe-wrapper">
      <div className="subscribe-card">
        <h2>Confirm Subscription</h2>
        <p>Activate this plan</p>
        <button onClick={confirmSubscribe}>
          Confirm & Subscribe
        </button>
      </div>
    </div>
  );
}

export default Subscribe;
