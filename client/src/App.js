// client/src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import the Register component
import AdminHome from "./pages/AdminHome";
import EmployeeHome from "./pages/EmployeeHome";
import Departments from "./pages/Departments";
import Navbar from "./components/Navbar";
import { userService } from "./services/userService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log("Loaded user from localStorage:", parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("Handle Login:", userData);
    setIsLoggedIn(true);
    setUser(userData); // Store the whole storedUser object with employee data
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />{" "}
        {/* Add the Register route */}
        {/* Admin Routes */}
        <Route
          path='/admin/home'
          element={
            isLoggedIn && user?.role === "admin" ? (
              <AdminHome />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/admin/departments'
          element={
            isLoggedIn && user?.role === "admin" ? (
              <Departments />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        {/* Employee Routes */}
        <Route
          path='/employee/home'
          element={
            isLoggedIn && user?.role === "employee" ? (
              <EmployeeHome user={user} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App;
