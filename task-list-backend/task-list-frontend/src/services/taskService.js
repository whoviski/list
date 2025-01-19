import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // 

// Функция для создания задачи
export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`, //
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; 
    }
};


export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; 
    }
};

