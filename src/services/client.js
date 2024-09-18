
import api from "./api";
import handleRequest from '../utils/handleRequest';

export const createClient = async (clientData) => {
  return handleRequest(() => api.post('/client', clientData));
};

export const getAllclient = async () => {
  return handleRequest(() => api.get('/client'));
};

export const getClientById = async (id) => {
  return handleRequest(() => api.get(`/client/${id}`));
};

export const updateClient = async (id, clientData) => {
  return handleRequest(() => api.put(`/client/${id}`, clientData));
};

export const deleteClient = async (id) => {
  return handleRequest(() => api.delete(`/client/${id}`));
};

