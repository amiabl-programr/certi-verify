import api from "./axios";

export const fetchUsers = () => api.get('/users');

export const loginUser = (data: object) => api.post('/api/auth/login', data);
export const registerUser = (data: object) => api.post('/api/auth/register', data);