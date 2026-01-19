import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ChangePlan.css";   // ✅ IMPORT ADDED

function ChangePlan() {
  const { state } = useLocation();

  const [subscriptionId, setSubscriptionId] = useState("");
  const [validityDays, setValidityDays] = useState("");   // ✅ FIXED

  const newPlanId = state?.newPlanId;

  const changePlan = async () => {
    try {
      await axios.put(
        "http://localhost:8088/subscriptions/change",
        null,
        {
          params: {
            subscriptionId: subscriptionId,
            newPlanId: newPlanId,
            validityDays: validityDays
          }
        }
      );

      window.alert("Change Plan Successful");  // ✅ ALERT WORKS

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="change-plan-wrapper">
      <div className="change-plan-card">
        <h2>Change Plan</h2>

        <input
          placeholder="Subscription ID"
          value={subscriptionId}
          onChange={e => setSubscriptionId(e.target.value)}
        />

        <input
          placeholder="Validity Days"
          value={validityDays}
          onChange={e => setValidityDays(e.target.value)}
        />

        <button onClick={changePlan}>
          Change Plan
        </button>
      </div>
    </div>
  );
}

export default ChangePlan;
