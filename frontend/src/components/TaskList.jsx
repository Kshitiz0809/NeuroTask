import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  // Show empty state if no tasks
  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <div className="empty-state">
          <p>No tasks yet!</p>
          <p className="empty-subtitle">Create a new task to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
