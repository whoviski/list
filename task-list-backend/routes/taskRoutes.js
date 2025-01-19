const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController');
const router = express.Router();

console.log('taskRoutes loaded');
router.get('/', getTasks);
router.post('/', createTask);

module.exports = router;