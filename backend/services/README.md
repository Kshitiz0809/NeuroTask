# Priority Suggestion Service (Python)

This FastAPI microservice uses a Hugging Face zero-shot classification model to map task descriptions to priorities.

## Quick start

```bash
cd backend/services
python -m venv .venv
# Windows PowerShell:
. .venv/Scripts/Activate.ps1
# Or cmd:
.venv\Scripts\activate

pip install -r requirements.txt

# Optional: choose a different model
set AI_MODEL=typeform/distilbert-base-uncased-mnli

# Run the service
uvicorn priorityService:app --host 0.0.0.0 --port 8001
```

API:
- GET /health → { status: ok }
- POST /predict { description } → { label: High|Medium|Low, raw_label, score }
