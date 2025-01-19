import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../../api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const response = await fetchTasks(token);
        setTasks(response.data);
    };

    useEffect(() => {
        getTasks();
    }, [token]);

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        getTasks(); // Обновляем список задач
    };

    return (
        <div>
            <TaskForm token={token} getTasks={getTasks} />
            <h2>Список задач</h2>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={handleDelete} token={token} />
            ))}
        </div>
    );
};

export default TaskList;