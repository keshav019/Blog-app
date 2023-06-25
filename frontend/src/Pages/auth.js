import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import Register from "../components/register";
import LoginComponent from "../components/login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Auth = () => {
  const [value, setValue] = useState("one");
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleChange = (value, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingTop: "30px",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          width: "300px",
          mx: "auto",
          border: "1px solid gray",
          backgroundColor: "white",
          boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          variant="fullWidth"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Login" />
          <Tab value="two" label="Register" />
        </Tabs>
        <TabPanel value={value} index={"one"}>
          <LoginComponent />
        </TabPanel>
        <TabPanel value={value} index={"two"}>
          <Register />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Auth;
