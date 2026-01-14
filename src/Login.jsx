import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";



import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    console.log(email+" "+password);
    
    try {
      console.log(email+" "+password+" try 1");
      const res = await axios.post(
        "http://localhost:8088/auth/login",
        { email, password }
      );

      console.log(email+" "+password+" try 2");

      // rememberMe
      //   ? localStorage.setItem("token", res.data.token)
      //   : sessionStorage.setItem("token", res.data.token);

      localStorage.setItem("token",res.data.token);

        console.log(email+" "+password+" try 3"+res.data.token);

      navigate("/dashboard");
    } catch {
      setMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page">
      <Card className="login-card">
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            className="login-title"
          >
            Mobile Plan Change & Fulfillment
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Secure Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, height: 45 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            {msg && (
              <Typography
                color="error"
                className="login-error"
              >
                {msg}
              </Typography>
            )}

<div className="login-link">
  <Link to="/forgot-password">Forgot Password?</Link>
  <br />
  <Link to="/signUp">New user? Sign Up</Link>
</div>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
