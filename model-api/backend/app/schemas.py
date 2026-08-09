from typing import Literal

from pydantic import BaseModel


class Customer(BaseModel):
    gender: Literal["Male", "Female"]
    SeniorCitizen: Literal[0, 1]
    Partner: Literal["Yes", "No"]
    Dependents: Literal["Yes", "No"]
    tenure: int
    PhoneService: Literal["Yes", "No"]
    MultipleLines: Literal[
        "Yes",
        "No",
        "No phone service"
    ]
    InternetService: Literal[
        "DSL",
        "Fiber optic",
        "No"
    ]
    OnlineSecurity: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    OnlineBackup: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    DeviceProtection: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    TechSupport: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    StreamingTV: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    StreamingMovies: Literal[
        "Yes",
        "No",
        "No internet service"
    ]
    Contract: Literal[
        "Month-to-month",
        "One year",
        "Two year"
    ]
    PaperlessBilling: Literal["Yes", "No"]
    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)"
    ]
    MonthlyCharges: float
    TotalCharges: float

class PredictionRequest(BaseModel):
    model: Literal[
        "catboost", 
        "xgboost", 
        "random_forest", 
        "stack_logreg", 
        "stack_lightgbm",
        "logistic_regression"
    ]
    customer: Customer

class PredictionResponse(BaseModel):
    probability: float

