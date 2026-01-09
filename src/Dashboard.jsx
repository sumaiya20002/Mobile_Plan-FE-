import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios.post(
      "http://localhost:8088/auth/dashboard",
      {},
      { headers: { Authorization: "Bearer " + token } }
    )
    .then(res => setMessage(res.data))
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/");
    });
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>

      <button onClick={() => navigate("/plan")}>
        View Plans
      </button>

      <br /><br />

      <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
