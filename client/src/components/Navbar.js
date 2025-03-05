// client/src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from the parent component
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          Leave Management System
        </Typography>
        {isLoggedIn ? (
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color='inherit' onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color='inherit' onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
