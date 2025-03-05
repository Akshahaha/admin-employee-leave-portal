// client/src/pages/Login.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../services/userService";


function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Assuming userService.login returns { token, user }
      const { token, user } = await userService.login(email, password);

      // Store the token
      localStorage.setItem("token", token);

      // Log for debugging (CRUCIAL!)
      console.log("Received data from login API:", { token, user });

      // Validate employeeProfile here
      if (!user || !user.id) {
        console.error("Invalid employee object:", user);
        setError("Login failed: Could not retrieve employee profile.");
        return;
      }

      const storedUser = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      console.log("Storing user in localStorage:", storedUser);

      localStorage.setItem("user", JSON.stringify(storedUser));
      onLogin(storedUser);

      // Redirect based on user role
      console.log("User role:", storedUser.role);
      console.log("User object:", storedUser);
      if (storedUser.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/employee/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  };
  return (
    <Container maxWidth='sm'>
      <Box mt={4}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color='error' align='center'>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            mt={2}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
