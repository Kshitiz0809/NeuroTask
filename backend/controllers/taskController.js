import Task from '../models/Task.js';
import { suggestPriority } from '../services/aiClient.js';

export const getTasks = async (_req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Ask AI for priority suggestion
    const ai = await suggestPriority(description || '');
    const priority = ai.priority; // High | Medium | Low

    const newTask = await Task.create({ title, description, due_date, priority });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    // Recompute priority when description is provided (simple heuristic)
    let priority;
    if (typeof description === 'string') {
      const ai = await suggestPriority(description);
      priority = ai.priority;
    }

    const updatedTask = await Task.update(id, { title, description, due_date, priority });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted', id: deleted.id });
  } catch (error) {
    console.error('Error deleting task', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
