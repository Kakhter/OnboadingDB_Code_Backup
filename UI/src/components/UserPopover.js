import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import UserContext from "./userpages/context/UserContext";
import { SignOut as SignOutIcon } from "@phosphor-icons/react";

const UserPopover = ({ anchorEl, onClose, open }) => {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    onClose();
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">{user?.email}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.Email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default UserPopover;
