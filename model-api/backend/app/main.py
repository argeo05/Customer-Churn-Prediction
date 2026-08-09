import pandas as pd

from fastapi import FastAPI

from app.schemas import PredictionRequest, PredictionResponse
from app.model import models, preprocessor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "API works!"}

@app.post(
        "/predict",
        response_model=PredictionResponse
)
async def predict(request: PredictionRequest) -> PredictionResponse:
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

    return PredictionResponse(probability=pred)