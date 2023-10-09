import { TextField, FormControl, Button, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { register } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
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
    setStep(2);
    dispatch(register(userData));
  };

  const validateEmail = async () => {
    
  }
  useEffect(() => {
    if (auth.isLoading) {
      setLoading(true);
    }
    if (auth.error) {
      setLoading(false);
      setError(auth.error.message);
    }
    if (auth.user) {
      setLoading(false);
    }
  }, [auth]);
  
  return (
    <FormControl>
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
          required
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
          Register
        </Button>
      </>}
      {step === 2 && <>
        <p>Use OTP 123456 to verify</p>
        <TextField
          required
          label="Email"
          size="small"
          name="email"
          disabled
          onChange={(e)=>setVerifyEmail({...verifyEmail,email:e.target.value})}
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
          Validate
        </Button>
      </>}
    </FormControl>
  );
};

export default Register;
