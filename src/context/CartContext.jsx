import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState(null);

  const addToCart = async (plan) => {
    await axios.post(
      "http://localhost:8088/cart/add",
      {
        userId: localStorage.getItem("userId"),
        productId: plan.planId,
        productName: plan.planName,
        price: plan.price,
        quantity: 1,
  
        // ✅ MATCH CartItem entity
        dataLimit: plan.dataLimit,
        validityDays: plan.validityDays,
        voiceMinutes: plan.voiceMinutes,
        smsLimit: plan.smsLimit,
        planType: plan.planType
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
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
