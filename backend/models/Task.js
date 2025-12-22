import { query } from '../db.js';

export const Task = {
  async getAll() {
    const result = await query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  },

  async create({ title, description, due_date, priority }) {
    const insertSql = `
      INSERT INTO tasks (title, description, due_date, priority)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, description, due_date || null, priority];
    const result = await query(insertSql, values);
    return result.rows[0];
  },

  async update(id, { title, description, due_date, priority }) {
    // Build dynamic update to only change provided fields
    const fields = [];
    const values = [];
    let idx = 1;

    if (typeof title !== 'undefined') {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }
    if (typeof description !== 'undefined') {
      fields.push(`description = $${idx++}`);
      values.push(description);
    }
    if (typeof due_date !== 'undefined') {
      fields.push(`due_date = $${idx++}`);
      values.push(due_date || null);
    }
    if (typeof priority !== 'undefined') {
      fields.push(`priority = $${idx++}`);
      values.push(priority);
    }

    if (fields.length === 0) {
      const resultNoop = await query('SELECT * FROM tasks WHERE id = $1', [id]);
      return resultNoop.rows[0];
    }

    const updateSql = `
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *;
    `;
    values.push(id);

    const result = await query(updateSql, values);
    return result.rows[0];
  },

  async remove(id) {
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  },
};

export default Task;
