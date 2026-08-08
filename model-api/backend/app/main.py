import pandas as pd

from fastapi import FastAPI

from app.schemas import PredictionRequest
from app.model import models, preprocessor

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/predict")
async def predict(request: PredictionRequest):
    data = pd.DataFrame([request.customer.model_dump()])
    X = preprocessor.transform(data)

    if request.model != "stack_logreg":
        model = models[request.model]
        pred = float(model.predict_proba(X)[0, 1])
    else:
        stack_input = pd.DataFrame({
            "lightgbm": [models["lightgbm"].predict_proba(X)[0, 1]],
            "catboost": [models["catboost"].predict_proba(X)[0, 1]],
            "random_forest": [models["random_forest"].predict_proba(X)[0, 1]],
            "xgboost": [models["xgboost"].predict_proba(X)[0, 1]],
        })

        pred = float(models["stack_logreg"].predict_proba(stack_input)[0, 1])

    return {"probability": pred}