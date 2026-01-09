import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SubscriptionDetails.css";

function SubscriptionDetails() {
  const { id } = useParams();
  const [sub, setSub] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8088/subscriptions/${id}`)
      .then(res => setSub(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!sub) return <p>Loading...</p>;

  return (
    <div className="sub-view-wrapper">
      <div className="sub-view-card">
        <h2>📄 Subscription Details</h2>

        <p><b>ID:</b> {sub.subscriptionId}</p>
        <p><b>Plan:</b> {sub.planId}</p>
        <p><b>Start:</b> {sub.startDate}</p>
        <p><b>End:</b> {sub.endDate}</p>

        <p className={`status ${sub.status.toLowerCase()}`}>
          {sub.status}
        </p>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
