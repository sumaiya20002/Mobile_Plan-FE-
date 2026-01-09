import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./OtpVerify.css";


function OtpVerify() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const identifier = state?.identifier; // ✅ email OR phone

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:8088/otp/verify", {
        identifier,
        otp
      });

      navigate("/reset-password", {
        state: { identifier } // ✅ pass same identifier
      });
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="center-box">
      <h2>OTP Verification</h2>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
}

export default OtpVerify;
