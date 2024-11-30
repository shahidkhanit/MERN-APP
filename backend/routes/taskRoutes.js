const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a new task
router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

// Update a task
router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Delete a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
