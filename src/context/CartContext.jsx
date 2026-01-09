import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState(null);

  const addToCart = async (plan) => {
    await axios.post(
      "http://localhost:8088/cart/add",
      {
        userId: 2,                     // ✅ REQUIRED
        productId: plan.planId,        // ✅ MUST match backend column
        productName: plan.planName,
        price: plan.price,
        quantity: 1
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );

    setCartItem(plan);
  };

  const clearCart = () => setCartItem(null);

  return (
    <CartContext.Provider value={{ cartItem, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartContext;
