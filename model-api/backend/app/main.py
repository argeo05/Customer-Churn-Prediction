from fastapi import FastAPI

from app.schemas import PredictionRequest

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@app.post("/predict")
async def predict(request: PredictionRequest):
    return {"prediction": f"Predicted value for age {request.age}, salary {request.salary}, experience {request.experience}"}

