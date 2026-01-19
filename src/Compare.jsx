import { useLocation, useNavigate } from "react-router-dom";
import "./Compare.css";

function Compare() {
  const { state: plans } = useLocation();
  const navigate = useNavigate();

  if (!plans || plans.length !== 2) return null;

  const isDifferent = (key) => plans[0][key] !== plans[1][key];

  return (
    <div className="compare-page">
      <h2>Compare Plans</h2>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            {plans.map(p => (
              <th key={p.planId}>
                <h3>{p.planName}</h3>
                <p className="price">₹{p.price}</p>

               
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className={isDifferent("dataLimit") ? "highlight" : ""}>
            <td>Data</td>
            {plans.map(p => (
              <td key={p.planId}>{p.dataLimit} GB/day</td>
            ))}
          </tr>

          <tr className={isDifferent("voiceMinutes") ? "highlight" : ""}>
            <td>Voice</td>
            {plans.map(p => (
              <td key={p.planId}>
                {p.voiceMinutes === 0 ? "Unlimited" : p.voiceMinutes + " mins"}
              </td>
            ))}
          </tr>

          <tr className={isDifferent("smsLimit") ? "highlight" : ""}>
            <td>SMS</td>
            {plans.map(p => (
              <td key={p.planId}>{p.smsLimit}/day</td>
            ))}
          </tr>

          <tr className={isDifferent("validityDays") ? "highlight" : ""}>
            <td>Validity</td>
            {plans.map(p => (
              <td key={p.planId}>{p.validityDays} days</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Compare;
