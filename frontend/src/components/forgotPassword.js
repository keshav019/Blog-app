import { TextField, FormControl, Button, Alert, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { register } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
const ForgotPassword = () => {
    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();
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
        setStep(2);
    }
    const resetPassword = async () => {
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
                            Verify
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
                            Reset Password
                        </Button>
                    </>}
                </FormControl>
            </Box>
        </div>
    );
};

export default ForgotPassword;
