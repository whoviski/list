import React, { useEffect, useState, useCallback } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { fetchTasks, deleteTask } from '../../api'; 

const TaskList = ({ token, setToken }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = useCallback(async () => {
        const response = await fetchTasks(token);
        setTasks(response.data);
    }, [token]); 

    useEffect(() => {
        getTasks();
    }, [token, getTasks]); 

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        getTasks(); 
    };

    const handleLogout = () => {
        setToken(null); 
    };

    return (
        <div>
            <button onClick={handleLogout}>Выйти</button>
            <TaskForm token={token} getTasks={getTasks} />
            <h2>Список задач</h2>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={handleDelete} token={token} />
            ))}
        </div>
    );
};

export default TaskList;