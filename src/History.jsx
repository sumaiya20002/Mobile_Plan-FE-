import { useEffect, useState } from "react";
import { getHistory } from "./cartApi";
import "./History.css";

function History() {
  const userId = 2;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory(userId).then(res => setHistory(res.data));
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">Transaction History</h2>

      <div className="timeline">
        {history.map(h => (
          <div className="timeline-item" key={h.paymentId}>
            <div className={`timeline-dot ${h.paymentStatus.toLowerCase()}`}></div>

            <div className="timeline-card">
              <div className="card-header">
                <span className="amount">₹{h.amount}</span>
                <span className={`status ${h.paymentStatus.toLowerCase()}`}>
                  {h.paymentStatus}
                </span>
              </div>

              <div className="card-body">
                <p><b>Payment ID:</b> {h.paymentId}</p>
                <p><b>Mode:</b> {h.paymentMode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
