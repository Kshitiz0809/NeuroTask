import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Centralized Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected database error', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);

// Simple bootstrap to ensure tasks table exists (idempotent)
async function initialize() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      due_date DATE,
      priority VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableSQL);
    // Optional: index for faster ordering by created_at
    await pool.query('CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at)');
  } catch (err) {
    console.error('Database initialization failed:', err.message);
  }
}

initialize();

export default { query };
