// client/src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust if needed

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const register = async (userData) => {
  let response; // <---- Declare response here

  try {
    console.log(
      `userService.js - Registering user at: ${API_URL}/register with data:`,
      userData
    );

    response = await axios.post(`${API_URL}/register`, userData, {
      // <---- Assign value inside the try block
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { user, token } = response.data;
    return { user, token };
  } catch (error) {
    console.error("userService.js - Error registering user:", error); // Log the error
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Repsonse of Login.js = ", response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


const getProfile = async () => {
  try {
    const token = localStorage.getItem("token"); //Get the token from local storage
    setAuthHeader(token); //Set the authorization header
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
    const response = await axios.put(`${API_URL}/profile`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
    const response = await axios.get(`${API_URL}`); // No ID needed for get all
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(token);
    await axios.delete(`${API_URL}/${id}`); // Delete doesn't usually return data
    return; // Or return a success message
  } catch (error) {
    throw error;
  }
};

export const userService = {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  setAuthHeader, // Export setAuthHeader for use in other services
};

export default userService;
