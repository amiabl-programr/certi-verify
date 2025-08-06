import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://certi-verify.onrender.com', // Set your base URL here
  // baseURL: 'http://localhost:3000', // Set your base URL here
  timeout: 50000,                     // Optional: timeout in ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // or use context/store
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Example: redirect to login
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
