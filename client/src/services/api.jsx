import axios from 'axios';

// determine the base URL for backend calls; always point at the `/api` prefix
let API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
if (!API_URL.endsWith('/api')) {
  // append `/api` so that callers don't accidentally hit the wrong route
  API_URL = API_URL.replace(/\/*$/, ''); // strip trailing slash
  API_URL += '/api';
}

console.log('🌐 API baseURL set to', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests and log the final URL for troubleshooting
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('➡️ outgoing request', config.method.toUpperCase(), config.baseURL + config.url);
  return config;
});

export default api;
