import api from "./api";
import handleRequest from '../utils/handleRequest';

export const createUser = async (userData) => {
  return handleRequest(() => api.post('/user', userData));
};

export const getAllusers = async () => {
  return handleRequest(() => api.get('/user'));
};

export const getUserById = async (id) => {
  return handleRequest(() => api.get(`/user/${id}`));
};

export const updateUser = async (id, userData) => {
  return handleRequest(() => api.put(`/user/${id}`, userData));
};

export const deleteUser = async (id) => {
  return handleRequest(() => api.delete(`/user/${id}`));
};
