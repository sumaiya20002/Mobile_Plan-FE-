import { useEffect, useState } from "react";
import { getCart } from "./cartApi";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const userId = Number(localStorage.getItem("userId"));
  const [cartItem, setCartItem] = useState(null);

  // customization (frontend only for now)
  const [extraData, setExtraData] = useState(0);
  const [extraSms, setExtraSms] = useState(0);
  const [roaming, setRoaming] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    getCart(userId).then(res => {
      if (res.data && res.data.length > 0) {
        const latest = [...res.data].sort(
          (a, b) => b.cartItemId - a.cartItemId
        )[0];
        setCartItem(latest);
      }
    });
  }, [userId]);

  if (!userId) {
    return <p style={{ textAlign: "center" }}>User not logged in</p>;
  }

  if (!cartItem) {
    return <p style={{ textAlign: "center" }}>Loading cart...</p>;
  }

  // price calculation
  const basePrice = cartItem.price;
  const dataCost = extraData * 10;
  const smsCost = (extraSms / 10) * 1;
  const roamingCost = roaming ? 99 : 0;

  const totalPrice = basePrice + dataCost + smsCost + roamingCost;
  const discountAmount = totalPrice * 0.1;
  const totalPayable = totalPrice - discountAmount;

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-title">Review Your Order</h2>

        <div className="cart-item single">
          <div>
            <strong>{cartItem.productName}</strong>
            <div className="item-price">₹{basePrice}</div>

            <div className="plan-details">
              <p>📶 Data: {cartItem.dataLimit}</p>
              <p>📞 Voice: {cartItem.voiceMinutes} mins</p>
              <p>✉️ SMS: {cartItem.smsLimit}</p>
              <p>📅 Validity: {cartItem.validityDays} days</p>
            </div>
          </div>
        </div>

        {/* CUSTOMIZATION (Jio-style UI) */}
        <div className="bill-box">
          <h3>Customize Your Plan</h3>

          <label>Extra Data (GB): {extraData}</label>
          <input
            type="range"
            min="0"
            max="10"
            value={extraData}
            onChange={e => setExtraData(Number(e.target.value))}
          />

          <label>Extra SMS: {extraSms}</label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={extraSms}
            onChange={e => setExtraSms(Number(e.target.value))}
          />

          <label>
            <input
              type="checkbox"
              checked={roaming}
              onChange={e => setRoaming(e.target.checked)}
            />
            International Roaming (+₹99)
          </label>
        </div>

        {/* PRICE DETAILS */}
        <div className="bill-box">
          <h3>Price Details</h3>

          <div className="bill-row">
            <span>Base Price</span>
            <span>₹{basePrice}</span>
          </div>

          <div className="bill-row">
            <span>Add-ons</span>
            <span>₹{dataCost + smsCost + roamingCost}</span>
          </div>

          <div className="bill-row discount">
            <span>Offer Discount</span>
            <span>-₹{discountAmount}</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>Amount Payable</span>
            <span>₹{totalPayable}</span>
          </div>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Pay ₹{totalPayable}
        </button>
      </div>
    </div>
  );
}

export default Cart;
 