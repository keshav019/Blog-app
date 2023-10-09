import { TextField, FormControl, Button, Alert,Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = () => {
    dispatch(login(userData));
  };
  useEffect(() => {
    if (auth.isLoading) {
      setLoading(true);
    }
    if (auth.error) {
      setError(auth.error.message);
    }
    if (auth.user) {
      setLoading(false);
    }
  }, [auth]);
  return (
    <FormControl>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        required
        label="Email or UserName"
        size="small"
        name="email"
        onChange={handleChange}
        sx={{ my: "10px", mx: "auto", width: "250px" }}
      />
      <TextField
        required
        label="Password"
        size="small"
        name="password"
        onChange={handleChange}
        sx={{ my: "10px", mx: "auto", width: "250px" }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        disabled={loading}
        startIcon={<LoginIcon />}
      >
        Login
      </Button>
      <Link href="/forgot-password" underline="hover" mt={1} mx={5}>Forgot password</Link>
    </FormControl>
  );
};

export default Login;
