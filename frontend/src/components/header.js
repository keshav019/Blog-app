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
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Add,
  BookmarkBorder,
  NotificationsNone,
  Search,
} from "@mui/icons-material";
import SearchModal from "./searchModal";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/auth";
const Drawer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.auth.user);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <>
      <Tooltip
        title="Your Profile"
        sx={{
          cursor: "pointer",
          mx: "5px",
          p: "5px",
        }}
        onClick={handleClick}
      >
        <Avatar
          sx={{ width: 35, height: 35, cursor: "pointer" }}
          alt={"  "}
          src={user && user.firstname}
        >
          {user && user.firstname.charAt(0).toUpperCase()}
        </Avatar>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <Link href="/profile" sx={{ textDecoration: "none", color: "black" }}>
            My account
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};
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
      <Box sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
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
            <Drawer />
          </>
        ) : (
          <>
            <Link
              href="/register"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
            <Link
              href="/login"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Login
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
      <Box sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
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
            <Drawer />
          </>
        ) : (
          <>
            <Link
              href="/register"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
            <Link
              href="/login"
              color="rgb(255,255,255)"
              sx={{
                cursor: "pointer",
                mx: "5px",
                p: "5px",
                display: "inline",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </>
        )}
      </Box>
    </>
  );
};
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsloggedIn] = useState(auth.user != null);
  useEffect(() => {
    setIsloggedIn(auth.user!=null);
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
