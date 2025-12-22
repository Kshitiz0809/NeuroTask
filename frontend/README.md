# Smart Task Manager Frontend

A React-based frontend for the Smart Task Manager application built with functional components and hooks.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and set your API URL:
```bash
REACT_APP_API_URL=http://localhost:4000
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`.

## Features

- ✅ Create new tasks with title, description, due date, and priority
- ✅ View all tasks in a clean list
- ✅ Edit task details (inline editing)
- ✅ Delete tasks with confirmation
- ✅ Responsive design for mobile and desktop
- ✅ Real-time updates with backend API

## Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx       # Form for creating tasks
│   ├── TaskForm.css
│   ├── TaskItem.jsx       # Individual task card with edit/delete
│   ├── TaskItem.css
│   ├── TaskList.jsx       # List container for all tasks
│   └── TaskList.css
├── pages/
│   ├── Dashboard.jsx      # Main dashboard page
│   └── Dashboard.css
├── services/
│   └── api.js            # Axios API service for backend calls
├── App.jsx               # Root component
├── App.css
├── index.js              # React entry point
└── index.css             # Global styles
```

## Technology Stack

- **React 18** - UI library
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with responsive design

## Development

- Run `npm start` for development server
- Run `npm build` to create production build
- Run `npm test` to run tests

## Notes

- Ensure backend API is running on `http://localhost:4000`
- Tasks are fetched and stored in component state
- Changes are persisted to the database via API calls
