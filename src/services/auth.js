import api from "./api";
import handleRequest from '../utils/handleRequest';

export const login = async (credentials) => {
  return handleRequest(() => api.get('/login', credentials));
}
