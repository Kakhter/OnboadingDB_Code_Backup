import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import UserContext from "./context/UserContext";
import { useContext } from "react";
import logo from "../../assets/gyansys-logo-white.png";
import UserPopover from "../UserPopover";
import { Stack, Tooltip, Badge, Avatar } from "@mui/material";
import { Bell } from "@phosphor-icons/react";
import { Height } from "@mui/icons-material";
const Navbar = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); 
  };
  const open = Boolean(anchorEl);

  return (
    <Box style={{ position: "sticky", top: 0, zIndex: 100, Height: "10vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ textAlign: "left" }}>
            <img
              src={logo}
              style={{
                width: "131px",
                marginTop: "10px",
              }}
            />
          </Typography>

          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
          
            <Tooltip title="Notifications">
              {user ? (
                <Badge badgeContent={4} color="success" variant="dot">
                  <IconButton>
                    <Bell />
                  </IconButton>
                </Badge>
              ) : (
                ""
              )}
            </Tooltip>
            <Typography> {user ? user.FullName : ""}</Typography>
            {user ? (
              <Avatar sx={{ cursor: "pointer" }} onClick={handleAvatarClick} />
            ) : (
              ""
            )}
          </Stack>

          <UserPopover
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            open={open}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
