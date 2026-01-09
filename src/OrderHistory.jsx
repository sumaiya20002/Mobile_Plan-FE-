import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";

function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8088/orders/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="center-text">Loading transactions...</p>;

  return (
    <div className="history-container">

      <h2 className="history-title">Transaction Timeline</h2>
      <div className="timeline">
        {history.map(item => (
          <div className="timeline-item" key={item.id}>
            <div className={`timeline-dot ${item.status.toLowerCase()}`}></div>
  
            <div className="timeline-card">
              <div className="card-header">
                <span className="amount">₹{item.amount}</span>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
  
              <div className="card-body">
                <p><b>Mode:</b> {item.paymentMode}</p>
                <p><b>Date:</b> {item.date}</p>
                <p><b>Txn ID:</b> #{item.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default OrderHistory;
