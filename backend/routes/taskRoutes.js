const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Get all tasks
router.get('/', auth, taskController.getTasks);

// Get tasks by date range
router.get('/range', auth, taskController.getTasksByDateRange);

// Create a new task
router.post('/', auth, taskController.createTask);

// Update task status
router.put('/:id/status', auth, taskController.updateTaskStatus);

// Delete a task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 