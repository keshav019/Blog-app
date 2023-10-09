import { TextField, FormControl, Button, Alert, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LoginIcon from "@mui/icons-material/Login";
import axios from 'axios'
import { baseurl } from '../constant'
const Register = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    bio: "",
  });
  const [verifyEmail, setVerifyEmail] = useState({
    email: '',
    otp: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await axios.post(`${baseurl}/api/v1/auth/signup`, userData);
      setVerifyEmail({ ...verifyEmail, email: userData.email })
      setLoading(false);
      setStep(2);
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
      setLoading(false);
    }

  };

  const validateEmail = async () => {
    setError(null);
    setLoading(true);
    try {
      await axios.put(`${baseurl}/api/v1/auth/verify-email`, verifyEmail);
      setLoading(false);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, []);

  return (
    <Card sx={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl sx={{ p: '10px', maxWidth: '350px', borderRadius: '8px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)', transition: 'box-shadow 0.3s ease' }}>
        <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
          Register
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {step === 1 && <>
          <TextField
            required
            label="Firstname"
            size="small"
            name="firstname"
            onChange={handleChange}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <TextField
            required
            label="Lastname"
            size="small"
            name="lastname"
            onChange={handleChange}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <TextField
            required
            label="Email"
            size="small"
            name="email"
            onChange={handleChange}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <TextField
            required
            label="Password"
            name="password"
            size="small"
            onChange={handleChange}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <TextField
            label="Bio"
            size="small"
            name="bio"
            multiline
            minRows={3}
            maxRows={5}
            onChange={handleChange}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <Button
            onClick={handleSubmit}
            size="small"
            variant="contained"
            startIcon={<LoginIcon />}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </>}
        {step === 2 && <>
          <TextField
            required
            label="Email"
            size="small"
            name="email"
            disabled
            value={verifyEmail.email}
            onChange={(e) => setVerifyEmail({ ...verifyEmail, email: e.target.value })}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <TextField
            required
            label="Otp"
            name="otp"
            size="small"
            onChange={(e) => setVerifyEmail({ ...verifyEmail, otp: e.target.value })}
            sx={{ my: "10px", mx: "auto", width: "250px" }}
          />
          <Button
            onClick={validateEmail}
            size="small"
            variant="contained"
            startIcon={<LoginIcon />}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Validate'}
          </Button>
        </>}
      </FormControl>
    </Card>
  );
};

export default Register;
