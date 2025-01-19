import React from 'react';

const TaskItem = ({ task, onDelete }) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? 'Выполнено' : 'Не выполнено'}</p>
            <button onClick={() => onDelete(task._id)}>Удалить</button>
        </div>
    );
};

export default TaskItem;