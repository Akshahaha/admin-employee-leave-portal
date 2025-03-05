// client/src/services/leaveApplicationService.js
import axios from "axios";
import { userService } from "./userService";

const API_URL = "/api/leave-applications";

const createLeaveApplication = async (leaveApplicationData) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.post(`${API_URL}`, leaveApplicationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllLeaveApplications = async () => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getLeaveApplicationById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateLeaveApplication = async (id, leaveApplicationData) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.put(`${API_URL}/${id}`, leaveApplicationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getEmployeeLeaveHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveApplicationService = {
  createLeaveApplication,
  getAllLeaveApplications,
  getLeaveApplicationById,
  updateLeaveApplication,
  getEmployeeLeaveHistory,
};
