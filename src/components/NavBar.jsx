import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const NavBar = ({ toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderBottom: darkMode ? "none" : "2px solid #EFEFEF",
      }}
      elevation={1}
    >
      {" "}
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          height: "9vh",
        }}
      >
        {" "}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: darkMode ? "white" : "black",fontWeight:'bold' }}
        >
          Task Tracker App
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="settings"
          onClick={handleMenuOpen}
          sx={{ color: darkMode ? "white" : "black" }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Typography variant="body1">Dark Mode</Typography>
            <Switch
              checked={darkMode}
              onChange={handleDarkModeChange}
              color="primary"
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
