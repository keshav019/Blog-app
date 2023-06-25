import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  FormControl,
  TextField,
  Box,
  Tooltip,
  Link,
} from "@mui/material";
import {
  AccountCircle,
  Add,
  BookmarkBorder,
  NotificationsNone,
  Search,
} from "@mui/icons-material";
import SearchModal from "./searchModal";
import { useSelector } from "react-redux";

const DeskTopHeader = ({ isLoggedIn }) => {
  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "1px solid gray",
          padding: "2px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        }}
      >
        <Search sx={{ mr: "7px" }} />
        <TextField
          variant="standard"
          placeholder="Search..."
          sx={{ input: { color: "white" } }}
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </FormControl>
      <Box sx={{ ml: "auto" }}>
        {isLoggedIn ? (
          <>
            <Tooltip
              title="Notification"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <NotificationsNone />
            </Tooltip>
            <Tooltip
              title="Saved Story"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <BookmarkBorder />
            </Tooltip>
            <Tooltip
              title="Write Story"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
              }}
            >
              <Add />
            </Tooltip>
            <Tooltip
              title="Your Account"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <AccountCircle />
            </Tooltip>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Our Story
            </Link>
            <Link
              href="/auth"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              SignIn
            </Link>
          </>
        )}
      </Box>
    </>
  );
};

const MobileHeader = ({ isLoggedIn }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <SearchModal open={open} handleClose={handleClose}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px",
          }}
        >
          <Search onClick={handleOpen} sx={{ mr: "7px" }} />
        </FormControl>
      </SearchModal>
      <Box sx={{ ml: "auto" }}>
        {isLoggedIn ? (
          <>
            <Tooltip
              title="Notification"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <NotificationsNone />
            </Tooltip>
            <Tooltip
              title="Saved Story"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <BookmarkBorder />
            </Tooltip>
            <Tooltip
              title="Write Story"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
              }}
            >
              <Add />
            </Tooltip>
            <Tooltip
              title="Your Account"
              sx={{ cursor: "pointer", mx: "5px", p: "5px" }}
            >
              <AccountCircle />
            </Tooltip>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Our Story
            </Link>
            <Link
              href="/auth"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              SignIn
            </Link>
          </>
        )}
      </Box>
    </>
  );
};
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsloggedIn] = useState(auth.user);
  useEffect(() => {
    setIsloggedIn(auth.user);
  }, [auth]);
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Logo
          </Typography>
          <Box display={{ xs: "none", sm: "flex" }} sx={{ flexGrow: "1" }}>
            <DeskTopHeader isLoggedIn={isLoggedIn} />
          </Box>
          <Box display={{ xs: "flex", sm: "none" }} sx={{ flexGrow: "1" }}>
            <MobileHeader isLoggedIn={isLoggedIn}></MobileHeader>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
