import api from "./api";
import handleRequest from '../utils/handleRequest';

export const createProduct = async (productData) => {
  return handleRequest(() => api.post('/product', productData));
};

export const getAllProducts = async () => {
  return handleRequest(() => api.get('/product'));
};

export const getProductById = async (id) => {
  return handleRequest(() => api.get(`/product/${id}`));
};

export const updateProduct = async (id, productData) => {
  return handleRequest(() => api.put(`/product/${id}`, productData));
};

export const deleteProduct = async (id) => {
  return handleRequest(() => api.delete(`/product/${id}`));
};


export const getStats = async () => {
  return handleRequest(() => api.get(`/stats`));
};


