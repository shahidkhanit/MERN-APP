import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        try {
            await axios.post('http://localhost:5000/api/tasks', { title: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Task Manager</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} - {task.completed ? 'Completed' : 'Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
