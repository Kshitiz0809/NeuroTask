# Smart Task Manager API

## Setup
1. Install dependencies:
```
npm install
```
2. Copy `.env.example` to `.env` and update `DATABASE_URL`.
   - Optional: set `AI_SERVICE_URL` to point to the Python AI service (`http://localhost:8001`).
3. Start the server:
```
npm run dev
```
The API will run on `http://localhost:4000`.

> Note: the server now auto-creates the `tasks` table if it does not exist.

## AI Priority Suggestion (Part 2)
A separate Python service suggests task priority using a pre-trained Hugging Face model.

Start the AI service:
```
cd services
python -m venv .venv
. .venv/Scripts/Activate.ps1  # PowerShell on Windows
pip install -r requirements.txt
uvicorn priorityService:app --host 0.0.0.0 --port 8001
```
Optionally set a model:
```
set AI_MODEL=typeform/distilbert-base-uncased-mnli
```

The Node API will call `POST {AI_SERVICE_URL}/predict` when creating/updating tasks to assign priority automatically.

## Endpoints
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
