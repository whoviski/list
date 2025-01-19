import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';

const App = () => {
    const [token, setToken] = useState(null);
    return (
        <Router>
            <div>
                <h1>Список задач</h1>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={token ? <TaskList token={token} /> : <Login setToken={setToken} />} />
                    <Route path="/" element={<h2>Добро пожаловать! Пожалуйста, войдите или зарегистрируйтесь.</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;