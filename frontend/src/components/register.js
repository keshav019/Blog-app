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
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    dispatch(register(userData));
  };
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
      <TextField
        required
        label="Fullname"
        size="small"
        name="fullname"
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
        label="UserName"
        size="small"
        name="username"
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
      <Button
        onClick={handleSubmit}
        size="small"
        variant="contained"
        startIcon={<LoginIcon />}
        disabled={loading}
      >
        Register
      </Button>
    </FormControl>
  );
};

export default Register;
