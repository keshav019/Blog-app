import { TextField, FormControl, Button, Alert, Link, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login } from '../store/auth';
import axios from 'axios'
import { baseurl } from '../constant'
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(`${baseurl}/api/v1/auth/login`, userData);
      setLoading(false);
      dispatch(login(res.data));
      navigate('/');
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, []);
  return (
    <Card sx={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl sx={{ p: '20px', maxWidth: '350px', mt: '-50px', borderRadius: '8px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', transition: 'box-shadow 0.3s ease' }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
          Login
        </Typography>
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
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
        <Link href="/forgot-password" underline="hover" mt={1} mx={5}>Forgot password</Link>
      </FormControl>
    </Card>
  );
};

export default Login;
