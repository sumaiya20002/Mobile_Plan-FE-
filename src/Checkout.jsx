import { useEffect, useState } from "react";
import { checkout, getCart } from "./cartApi";
import "./Checkout.css";

function Checkout() {
  const userId = 2;
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCart(userId).then(res => {
      const sum = res.data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sum);
    });
  }, []);

  const payNow = () => {
    checkout(userId, paymentMode)
      .then(() => window.location.href = "/payment-success")
      .catch(() => alert("Payment Link as send your phone"));
  };
  

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>Secure Checkout</h2>

        <div className="total-amount">₹ {total}</div>

        <div className="payment-options">
          {["UPI", "CARD", "NET_BANKING", "WALLET"].map(mode => (
            <div
              key={mode}
              className={`payment-option ${paymentMode === mode ? "active" : ""}`}
              onClick={() => setPaymentMode(mode)}
            >
              {mode}
            </div>
          ))}
        </div>

        <button className="pay-btn" onClick={payNow}>
          Pay Securely
        </button>
      </div>
    </div>
  );
}

export default Checkout;
