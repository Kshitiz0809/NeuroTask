import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  // State for tasks and loading
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Function to load all tasks from API
  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please check your backend connection.');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle new task created
  const handleTaskCreated = (newTask) => {
    // Add new task to the beginning of the list
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handle task updated
  const handleTaskUpdated = (updatedTask) => {
    // Update task in the list
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Handle task deleted
  const handleTaskDeleted = (deletedId) => {
    // Remove task from the list
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedId));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📝 Smart Task Manager</h1>
        <p>Organize and track your tasks efficiently</p>
      </header>

      {error && <div className="dashboard-error">{error}</div>}

      <div className="dashboard-content">
        <TaskForm onTaskCreated={handleTaskCreated} />

        {loading ? (
          <div className="loading-spinner">
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
