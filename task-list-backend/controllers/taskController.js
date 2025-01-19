const Task = require('../models/Task');

const getTasks = async (req, res) => {
    console.log('Запрос на получение задач');

    try {
        const tasks = await Task.findAll();
        console.log('Задачи успешно получены:', tasks);
        res.json(tasks);
    } catch (error) {
        console.error('Ошибка получения задач:', error); 
        res.status(500).json({ message: 'Ошибка получения задач' });
    }
};

const createTask = async (req, res) => {
    const { title, completed } = req.body;
    console.log('Создание задачи:', { title, completed });

    try {
        const newTask = await Task.create({ title, completed });
        console.log('Задача успешно создана:', newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Ошибка создания задачи:', error); 
        res.status(500).json({ message: 'Ошибка создания задачи' });
    }
};

module.exports = { getTasks, createTask };