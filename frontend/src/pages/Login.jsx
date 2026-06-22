import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../components/AuthLayout.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Paper
        sx={{
          p: 4,
          width: 380,
          backdropFilter: "blur(16px)",
          background: "rgba(17,21,37,0.7)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "rise 0.5s ease",
          "@keyframes rise": {
            from: { opacity: 0, transform: "translateY(16px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={1}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Log in to see what people are sharing
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.2,
              background: "linear-gradient(90deg,#6366f1,#22d3ee)",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
                boxShadow: "0 6px 24px rgba(99,102,241,0.45)",
              },
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <Typography variant="body2" color="text.secondary" mt={3} textAlign="center">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" color="secondary.main">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </AuthLayout>
  );
};

export default Login;
