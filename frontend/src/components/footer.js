import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  const currentTime = new Date();
  return (
    <Box sx={{ backgroundColor: "hsl(210,8%,15%)" }}>
      <Typography color={"white"}>
        Copyright {currentTime.getFullYear()} by Refsnes Data. All Rights
        Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
