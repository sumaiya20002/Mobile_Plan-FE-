import axios from "axios";

const API_URL = "http://localhost:8088/api/ai/chat";

export const sendAiMessage = async (message) => {
  const token = localStorage.getItem("token");

  return axios.post(
    API_URL,
    { message: message },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};
