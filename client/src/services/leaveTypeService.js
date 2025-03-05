// client/src/services/leaveTypeService.js
import axios from "axios";
import { userService } from "./userService";

const API_URL = "/api/leave-types";

const createLeaveType = async (leaveTypeData) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.post(`${API_URL}`, leaveTypeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllLeaveTypes = async () => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getLeaveTypeById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateLeaveType = async (id, leaveTypeData) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    const response = await axios.put(`${API_URL}/${id}`, leaveTypeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteLeaveType = async (id) => {
  try {
    const token = localStorage.getItem("token");
    userService.setAuthHeader(token);
    await axios.delete(`${API_URL}/${id}`);
    return;
  } catch (error) {
    throw error;
  }
};

export const leaveTypeService = {
  createLeaveType,
  getAllLeaveTypes,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
};
