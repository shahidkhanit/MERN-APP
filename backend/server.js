const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend (React app running on port 3000)
}));
app.use(express.json()); // To parse incoming JSON data

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      // Use the new URL parser
            useUnifiedTopology: true,  // Use the new topology engine for better performance and stability
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

connectDB();

// Task Schema and Model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        res.json(tasks); // Send the tasks as a response
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ message: 'Server error' }); // Return error message if something goes wrong
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTask = new Task({ title, completed });
        await newTask.save(); // Save the new task in the database
        res.status(201).json(newTask); // Return the created task as response
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ message: 'Server error' }); // Return error message if something goes wrong
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
