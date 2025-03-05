import axios from "axios";
import { userService } from "./userService";

const BASE_URL = "http://localhost:5000/api/departments/add"; // Set correct backend URL

const createDepartment = async (departmentData) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.post(BASE_URL, departmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const departmentService = {
  createDepartment,
  getAllDepartments: async () => axios.get(BASE_URL).then((res) => res.data),
  getDepartmentById: async (id) =>
    axios.get(`${BASE_URL}/${id}`).then((res) => res.data),
  updateDepartment: async (id, departmentData) =>
    axios.put(`${BASE_URL}/${id}`, departmentData).then((res) => res.data),
  deleteDepartment: async (id) => axios.delete(`${BASE_URL}/${id}`),
};
