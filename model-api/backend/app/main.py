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
    data = pd.DataFrame([request['customer'].model_dump()])
    X = preprocessor.transform(data)
    print(type(model))
    pred = float(model.predict_proba(X)[0, 1])
    return pred
