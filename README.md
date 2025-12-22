# 🚀 Smart Task Manager - Full-Stack + AI Application

A modern, full-stack task management application built with **React** (frontend), **Node.js/Express** (backend), **PostgreSQL** database, and **AI-powered priority suggestion** using a pre-trained Hugging Face model.

## 📋 Features

### Part 1: Core CRUD
- ✅ **Create Tasks** - Add tasks with title, description, and due date
- ✅ **View Tasks** - See all tasks in an organized list
- ✅ **Update Tasks** - Edit task details inline
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Database Persistence** - All data stored in PostgreSQL
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Clean UI** - Modern, intuitive user interface

### Part 2: AI-Powered Priority Suggestion
- ✅ **Automatic Priority** - AI analyzes task description and suggests priority
- ✅ **Pre-trained NLP Model** - Uses Hugging Face DistilBERT for text classification
- ✅ **Zero-shot Classification** - Maps descriptions to priority levels (High/Medium/Low)
- ✅ **Fallback Logic** - Defaults to "Medium" if AI service is unavailable
- ✅ **Microservice Architecture** - Separate Python service keeps AI logic modular

## 🏗️ Project Structure

```
Project_1_Task_Manager/
├── backend/                    # Node.js/Express server
│   ├── controllers/
│   │   └── taskController.js  # CRUD + AI integration logic
│   ├── models/
│   │   └── Task.js            # Database operations
│   ├── routes/
│   │   └── taskRoutes.js      # REST API routes
│   ├── services/
│   │   ├── aiClient.js        # Node client calling Python AI service
│   │   ├── priorityService.py # Pre-trained NLP model (Python)
│   │   └── requirements.txt   # Python dependencies
│   ├── db.js                  # Database connection & auto-migration
│   ├── server.js              # Express app setup
│   ├── package.json           # Node dependencies
│   ├── .env.example           # Environment template
│   └── README.md              # Backend instructions
│
└── frontend/                   # React application
    ├── public/
    │   └── index.html         # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx   # Create task form (no manual priority)
    │   │   ├── TaskList.jsx   # Tasks list container
    │   │   └── TaskItem.jsx   # Individual task card + AI note
    │   ├── pages/
    │   │   └── Dashboard.jsx  # Main dashboard page
    │   ├── services/
    │   │   └── api.js         # Axios API service
    │   ├── App.jsx            # Root component
    │   ├── index.js           # React entry point
    │   └── index.css          # Global styles
    ├── package.json           # Frontend dependencies
    ├── .env.example           # Environment template
    └── README.md              # Frontend instructions
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 with Hooks, Axios, CSS3 |
| **Backend** | Node.js, Express.js |
| **AI Microservice** | Python, FastAPI, Hugging Face Transformers |
| **Database** | PostgreSQL |
| **API** | REST API with CRUD operations |
| **NLP Model** | DistilBERT (zero-shot classification) |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 with Hooks, Axios, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **API** | REST API with CRUD operations |

## 📦 Prerequisites

Before you start, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Database Setup

Create a PostgreSQL database and table:

```sql
-- Create database
CREATE DATABASE task_manager;

-- Connect to the database
\c task_manager

-- Create tasks table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATE,
  priority VARCHAR(10) CHECK (priority IN ('Low', 'Medium', 'High')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgres://username:password@localhost:5432/task_manager
# PORT=4000
```

Update `.env` with your PostgreSQL connection string:
```
DATABASE_URL=postgres://your_username:your_password@localhost:5432/task_manager
PORT=4000
```

**Start the backend server:**
```bash
npm run dev
```

✅ Backend running at: `http://localhost:4000`

### 2.1 Start AI Priority Service (Python)
```
cd backend/services
python -m venv .venv
. .venv/Scripts/Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
uvicorn priorityService:app --host 0.0.0.0 --port 8001
```
Optional: choose a different model (default: typeform/distilbert-base-uncased-mnli):
```
set AI_MODEL=typeform/distilbert-base-uncased-mnli
```

Ensure backend `.env` has `AI_SERVICE_URL=http://localhost:8001`.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# The .env.local file is already configured for localhost:4000
```

**Start the frontend development server:**
```bash
npm start
```

✅ Frontend running at: `http://localhost:3000` (opens automatically)

## 📡 API Endpoints

All endpoints use JSON format.

### Create a Task
```
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager",
  "due_date": "2025-12-31"
}

Response: 201 Created  (priority assigned by AI)
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager",
  "due_date": "2025-12-31",
  "priority": "High",
  "created_at": "2025-12-22T10:30:00.000Z"
}
```

### Get All Tasks
```
GET /tasks

Response: 200 OK
[
  {
    "id": 1,
    "title": "Complete project",
    ...
  },
  ...
]
```

### Update a Task
```
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "due_date": "2025-12-25"
}

Response: 200 OK  (priority may be re-evaluated by AI when description changes)
{ ... updated task ... }
```

### Delete a Task
```
DELETE /tasks/:id

Response: 200 OK
{
  "message": "Task deleted",
  "id": 1
}
```

## 🎨 Frontend Features

### TaskForm Component
- Form validation (title required)
- Date picker for due dates
- Priority dropdown (High, Medium, Low)
- Loading state during submission
- Error handling and user feedback

### TaskList Component
- Displays all tasks in order (newest first)
- Empty state when no tasks exist
- Task counter
- Responsive grid layout

### TaskItem Component
- Task card with title, description, due date
- Priority badge with color coding
- Created timestamp
- **Edit button** - Inline edit mode for updating
- **Delete button** - Delete with confirmation
- Date formatting for readability

### Dashboard Page
- Main entry point of the application
- Fetches tasks on load
- Manages task state
- Real-time updates after CRUD operations
- Error display for API failures

## 🔄 Workflow Example

1. **Open** `http://localhost:3000` in your browser
2. **Create a task** - Fill the form and click "Create Task"
3. **View task** - Task appears in the list with created timestamp
4. **Edit task** - Click "Edit", modify details, click "Save"
5. **Delete task** - Click "Delete", confirm removal
6. **Watch updates** - All changes sync with PostgreSQL database

## 🎯 Key Code Highlights

### Backend - API Routes
```javascript
// routes/taskRoutes.js
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

router.get('/', getTasks);              // Fetch all
router.post('/', createTask);           // Create
router.put('/:id', updateTask);         // Update
router.delete('/:id', deleteTask);      // Delete
```

### Frontend - API Service
```javascript
// services/api.js
export const fetchTasks = () => api.get('/tasks');
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
```

### Frontend - State Management
```javascript
// pages/Dashboard.jsx
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadTasks(); // Fetch on mount
}, []);
```

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env` is correct
- Check if port 4000 is already in use

### Frontend shows "Failed to load tasks"
- Ensure backend is running on `http://localhost:4000`
- Check if `REACT_APP_API_URL` is set correctly in `.env.local`
- Open browser DevTools → Console to see error details

### Database connection error
- Verify PostgreSQL credentials in `.env`
- Ensure `task_manager` database exists
- Check if `tasks` table was created successfully

## 📝 Environment Variables

### Backend (.env)
```
PORT=4000
DATABASE_URL=postgres://username:password@localhost:5432/task_manager
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:4000
```

## 🎓 Learning Path

This project demonstrates:

1. **React Hooks** - `useState`, `useEffect` for state and side effects
2. **Component Architecture** - Functional, reusable components
3. **REST API Integration** - Axios for HTTP requests
4. **Form Handling** - Validation, submission, error states
5. **Database Design** - SQL schema, relationships, constraints
6. **Backend API** - Express routing, controllers, models
7. **CRUD Operations** - Create, Read, Update, Delete patterns
8. **Responsive Design** - Mobile-first CSS layout
9. **Error Handling** - Try-catch, error boundaries
10. **State Management** - Lifting state up, prop drilling

## 🚀 Next Steps (Future Enhancements)

- Add task filtering (by priority, due date)
- Add task categories/projects
- Add user authentication
- Add task search functionality
- Add task sorting options
- Add notifications for due dates
- Deploy to cloud (Heroku, Vercel, AWS)
- Add unit tests with Jest
- Add task comments/notes

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips for Beginners

1. **Start Simple** - Understand each component before adding complexity
2. **Read Error Messages** - They're your best debugging tool
3. **Use DevTools** - React DevTools and Network tab are powerful
4. **Break Down Problems** - Tackle one feature at a time
5. **Test Manually** - Create, edit, delete tasks to verify functionality
6. **Check Console** - Browser console shows important errors
7. **Learn SQL Basics** - Understanding databases helps backend work

---

**Happy coding! 🎉 This project is perfect for learning full-stack web development.**
