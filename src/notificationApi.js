import axios from "axios";

const BASE_URL = "http://localhost:8088";

export const getNotifications = (userId) => {
  return axios.get(`${BASE_URL}/notifications/${userId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
};
