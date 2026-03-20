import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;