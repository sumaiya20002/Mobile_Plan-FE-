import { useEffect, useState } from "react";
import { getCart, addToCart } from "./cartApi";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const userId = 2;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    getCart(userId).then(res => setCart(res.data));
  };

  const handleAdd = () => {
    addToCart({
      userId: 2,
      productId: 1,
      productName: "Unlimited Plus",
      price: 349,
      quantity: 1
    }).then(() => loadCart());
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2 className="cart-title">Your Cart</h2>

        <button className="add-plan-btn" onClick={handleAdd}>
          + Add Plan
        </button>

        {cart.map(item => (
          <div className="cart-item" key={item.cartItemId}>
            <div>
              <strong>{item.productName}</strong>
              <div>₹{item.price}</div>
            </div>

            <div className="qty-control">
              <button className="qty-btn">−</button>
              <span className="qty-value">{item.quantity}</span>
              <button className="qty-btn">+</button>
            </div>
          </div>
        ))}

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
