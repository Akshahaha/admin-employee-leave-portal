// client/src/pages/Register.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = {
        first_name,
        last_name,
        email,
        password,
        role,
        departmentId: null, // Set to null initially (can be updated later)
      };
      console.log("Register.js - Request Body:", userData);
      const { user, token } = await userService.register(userData);
      if (!user || !token) {
        throw new Error("Missing user or token in response");
      }

      // Store the token in local storage
      localStorage.setItem("token", token);
      console.log("Register js Success");

      // Redirect to the appropriate home page based on user role
      navigate(user.role === "admin" ? "/admin/home" : "/employee/home");
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message || error.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box mt={4}>
        <Typography variant='h4' align='center' gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography color='error' align='center'>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='First Name'
            margin='normal'
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label='Last Name'
            margin='normal'
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
          <TextField
            fullWidth
            select
            label='Role'
            margin='normal'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value='employee'>Employee</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </TextField>

          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
