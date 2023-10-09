import { TextField, FormControl, Button, Alert, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseurl } from '../constant'
const ForgotPassword = () => {
    const auth = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({
        email: "",
        otp: "",
        password: "",
    });
    const validateEmail = async () => {
        setError(null);
        setLoading(true);
        try {
            await axios.put(`${baseurl}/api/v1/auth/forgot-password`, { email: email });
            setLoading(false);
            setUserData({ ...userData, email: email });
            setStep(2);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
            setLoading(false);
        }
    }
    const resetPassword = async () => {
        setError(null);
        setLoading(true);
        try {
            await axios.put(`${baseurl}/api/v1/auth/reset-password`, userData);
            setLoading(false);
            navigate("/login")
        } catch (err) {
            if (err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
            setLoading(false);
        }
    };
    useEffect(() => {
        if (auth.user) {
            navigate("/")
        }
    }, []);

    return (
        <div
            style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                paddingTop: "30px",
                minHeight: "90vh",
            }}
        >
            <Box
                sx={{
                    width: "300px",
                    mx: "auto",
                    p: '20px 10px',
                    border: "1px solid gray",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FormControl>
                    {error && <Alert severity="error">{error}</Alert>}
                    {step === 1 && <>
                        <TextField
                            required
                            label="Email"
                            size="small"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ my: "10px", mx: "auto", width: "250px" }}
                        />
                        <Button
                            onClick={validateEmail}
                            size="small"
                            variant="contained"
                            startIcon={<LoginIcon />}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Verify Email'}
                        </Button>
                    </>}
                    {step === 2 && <>
                        <TextField
                            required
                            label="Email"
                            size="small"
                            name="email"
                            disabled
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            sx={{ my: "10px", mx: "auto", width: "250px" }}
                        />
                        <TextField
                            required
                            label="Otp"
                            name="otp"
                            size="small"
                            onChange={(e) => setUserData({ ...userData, otp: e.target.value })}
                            sx={{ my: "10px", mx: "auto", width: "250px" }}
                        />
                        <TextField
                            required
                            label="Password"
                            name="password"
                            size="small"
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            sx={{ my: "10px", mx: "auto", width: "250px" }}
                        />
                        <Button
                            onClick={resetPassword}
                            size="small"
                            variant="contained"
                            startIcon={<LoginIcon />}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Reset Password'}
                        </Button>
                    </>}
                </FormControl>
            </Box>
        </div>
    );
};

export default ForgotPassword;
