import axios from "axios";

const API_URL = "http://localhost:3000/todos/";

async function createTodo(task) {
  try {
    const { data: newTodo } = await axios.post(API_URL, { task });
    return newTodo;
  } catch (error) {
    handleError(error);
  }
}

async function deleteTodo(id) {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data; 
  } catch (error) {
    handleError(error);
  }
}

async function updateTodo(id, payload) {
  try {
    const { data: updatedTodo } = await axios.put(`${API_URL}${id}`, payload);
    return updatedTodo;
  } catch (error) {
    handleError(error);
  }
}

async function getAllTodos() {
  try {
    const { data: todos } = await axios.get(API_URL);
    return todos;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  if (error.response) {
    console.error('Ошибка:', error.response.status);
    console.error('Данные:', error.response.data);
    throw new Error(`Ошибка ${error.response.status}: ${error.response.data.message || 'Неизвестная ошибка'}`);
  } else if (error.request) {
    console.error('Запрос был сделан, но ответа не было:', error.request);
    throw new Error('Нет ответа от сервера');
  } else {
    console.error('Ошибка:', error.message);
    throw new Error('Ошибка при выполнении запроса');
  }
}

const APIHelper = {
  createTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
};

export default APIHelper;