import pandas as pd

from fastapi import FastAPI

from app.schemas import PredictionRequest
from app.model import model, preprocessor

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/predict")
async def predict(request: PredictionRequest):
    data = pd.DataFrame([request.model_dump()])
    X = preprocessor.transform(data)


