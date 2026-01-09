import axios from "axios";

const BASE_URL = "http://localhost:8088";

const authHeader = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
};

export const getCart = (userId) => {
  return axios.get(`${BASE_URL}/cart/${userId}`, authHeader);
};

export const addToCart = (cartItem) => {
  return axios.post(`${BASE_URL}/cart/add`, cartItem, authHeader);
};

export const checkout = (userId, paymentMode) => {
  return axios.post(
    `${BASE_URL}/checkout/pay`,
    null,
    {
      params: { userId, paymentMode },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
};

export const getHistory = (userId) => {
  return axios.get(`${BASE_URL}/checkout/history/${userId}`, authHeader);
};
