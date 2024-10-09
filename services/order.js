import api from "./api";
import handleRequest from '../utils/handleRequest';

export const createOrder = async (order) => {
  return handleRequest(() => api.post('/orders', order));
};

export const getOrders = async () => {
  return handleRequest(() => api.get('/orders'));
};

// export const getAllusers = async () => {
//   return handleRequest(() => api.get('/user'));
// };
//
// export const getUserById = async (id) => {
//   return handleRequest(() => api.get(`/user/${id}`));
// };
//
// export const updateUser = async (id, userData) => {
//   return handleRequest(() => api.put(`/user/${id}`, userData));
// };
//
//
// export const updateUserPassword = async (id, userData) => {
//   return handleRequest(() => api.put(`/user/${id}/password`, userData));
// };
//
// export const deleteUser = async (id) => {
//   return handleRequest(() => api.delete(`/user/${id}`));
// };
