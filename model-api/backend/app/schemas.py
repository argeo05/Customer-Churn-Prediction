from pydantic import BaseModel

class PredictionRequest(BaseModel):
    age: int
    salary: float
    experience: int