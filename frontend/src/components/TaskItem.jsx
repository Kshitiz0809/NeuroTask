import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';
import './TaskItem.css';

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [loading, setLoading] = useState(false);

  // Handle edit mode toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset edits if canceling
    if (isEditing) {
      setEditedTask(task);
    }
  };

  // Handle task field changes during edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save edited task
  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateTask(task.id, {
        title: editedTask.title,
        description: editedTask.description,
        due_date: editedTask.due_date || null,
      });
      onTaskUpdated(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await deleteTask(task.id);
        onTaskDeleted(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format created timestamp
  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#f44336';
      case 'Medium':
        return '#ff9800';
      case 'Low':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Task title"
            disabled={loading}
          />
          <textarea
            name="description"
            value={editedTask.description || ''}
            onChange={handleChange}
            placeholder="Task description"
            rows="3"
            disabled={loading}
          />
          <div className="edit-row">
            <input
              type="date"
              name="due_date"
              value={editedTask.due_date || ''}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="edit-actions">
            <button
              onClick={handleSave}
              disabled={loading}
              className="save-btn"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleEditToggle}
              disabled={loading}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
          <span className="ai-note" title="Predicted from description">
            Priority suggested by AI
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="meta-item">
          <strong>Due:</strong> {formatDate(task.due_date)}
        </span>
        <span className="meta-item">
          <strong>Created:</strong> {formatCreatedAt(task.created_at)}
        </span>
      </div>

      <div className="task-actions">
        <button
          onClick={handleEditToggle}
          disabled={loading}
          className="edit-btn"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
