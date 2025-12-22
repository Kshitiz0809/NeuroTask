from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal
import os

from transformers import pipeline

# Config
MODEL_NAME = os.environ.get("AI_MODEL", "typeform/distilbert-base-uncased-mnli")
CANDIDATE_LABELS = ["urgent", "normal", "low priority"]

app = FastAPI(title="Priority Suggestion Service")

classifier = pipeline("zero-shot-classification", model=MODEL_NAME)

class PredictRequest(BaseModel):
    description: str

class PredictResponse(BaseModel):
    label: Literal["High", "Medium", "Low"]
    raw_label: str
    score: float


@app.get("/health")
async def health():
    return {"status": "ok", "model": MODEL_NAME}


@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    text = req.description or ""
    if not text.strip():
        # If no description, default to Medium
        return PredictResponse(label="Medium", raw_label="normal", score=1.0)

    result = classifier(text, CANDIDATE_LABELS, multi_label=False)
    raw_label = result["labels"][0]
    score = float(result["scores"][0])

    mapping = {
        "urgent": "High",
        "normal": "Medium",
        "low priority": "Low",
    }
    label = mapping.get(raw_label, "Medium")

    return PredictResponse(label=label, raw_label=raw_label, score=score)
