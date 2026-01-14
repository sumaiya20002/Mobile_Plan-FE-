import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";
import "./Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8088/users/signup", {
        name,
        email,
        phone,
        password
      });
      navigate("/");
    } catch {
      setMsg("Signup failed");
    }
  };

  return (
    <Box className="login-page">
      <Card className="login-card">
        <CardContent>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField label="Name" fullWidth margin="normal" required onChange={e => setName(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" required onChange={e => setEmail(e.target.value)} />
            <TextField label="Phone" fullWidth margin="normal" onChange={e => setPhone(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" required onChange={e => setPassword(e.target.value)} />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign Up
            </Button>

            {msg && <Typography color="error">{msg}</Typography>}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signup;
