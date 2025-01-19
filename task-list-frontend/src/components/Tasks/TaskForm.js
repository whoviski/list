import React, { useState } from 'react';
import { createTask } from '../../services/taskService'; // Правильный путь

const TaskForm = ({ token, getTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask({ title, description }, token);
        setTitle('');
        setDescription('');
        getTasks(); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Добавить задачу</h2>
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Добавить</button>
        </form>
    );
};

export default TaskForm;