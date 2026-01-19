import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const identifier = state?.identifier; // email OR phone

  const resetPassword = async () => {
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8088/auth/reset-password", {
        identifier,
        password
      });

      alert("Password updated successfully");
      navigate("/");
    } catch (err) {
      setMsg("Failed to reset password");
    }
  };

  return (
    <div className="center-box">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
      />

      <button onClick={resetPassword}>Update Password</button>

      <p>{msg}</p>
    </div>
  );
}

export default ResetPassword;
