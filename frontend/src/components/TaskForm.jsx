import React, { useState } from 'react';
import { createTask } from '../services/api';
import './TaskForm.css';

function TaskForm({ onTaskCreated }) {
  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create task via API
      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || null,
      });

      // Notify parent component and reset form
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Create task error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create a New Task</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter task description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-note">Priority suggested by AI after creation.</div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}

export default TaskForm;
