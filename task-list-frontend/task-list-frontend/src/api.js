import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Замените на ваш URL бэкенда
});

export const registerUser  = (userData) => api.post('/auth/register', userData);
export const loginUser  = (userData) => api.post('/auth/login', userData);
export const fetchTasks = (token) => api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (taskData, token) => api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTask = (id, taskData, token) => api.put(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTask = (id, token) => api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;