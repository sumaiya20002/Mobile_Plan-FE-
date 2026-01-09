import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";


function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:8088/otp/generate", {
        identifier
      });

      navigate("/verify-otp", { state: { identifier } });
    } catch {
      setMsg("Failed to send OTP");
    }
  };

  return (
    <div className="center-box">
      <h2>Forgot Password</h2>

      <input
        placeholder="Email or Phone"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>

      <p>{msg}</p>
    </div>
  );
}

export default ForgotPassword;
