import { useEffect, useState } from "react";
import "./OrderTracking.css";

function OrderTracking() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let value = 0;
      const interval = setInterval(() => {
        value += 1;
        setProgress(value);
        if (value >= 100) clearInterval(interval);
      }, 40); // smooth animation
    }, 1000); // 1 sec white delay
  }, []);

  return (
    <div className="track-bg">
      <div className="track-line-card">
        <h3>Activating Your Plan</h3>

        <div className="line-bg">
          <div
            className="line-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="status-text">
          {progress < 100 ? "Please wait..." : "Plan Activated Successfully"}
        </p>
      </div>
    </div>
  );
}

export default OrderTracking;
