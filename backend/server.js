import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Smart Task Manager API is running');
});

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
