import pytest
import warnings

warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

MODELS = [
    "catboost",
    "xgboost",
    "lightgbm",
    "random_forest",
    "logistic_regression",
    "stack_logreg",
]

@pytest.mark.parametrize("model", MODELS)
def test_predict(model):
    payload = {
        "model": model,
        "customer": {
            "gender": "Male",
            "SeniorCitizen": 0,
            "Partner": "Yes",
            "Dependents": "Yes",
            "tenure": 5,
            "PhoneService": "Yes",
            "MultipleLines": "No",
            "InternetService": "DSL",
            "OnlineSecurity": "Yes",
            "OnlineBackup": "Yes",
            "DeviceProtection": "Yes",
            "TechSupport": "Yes",
            "StreamingTV": "No",
            "StreamingMovies": "No",
            "Contract": "Month-to-month",
            "PaperlessBilling": "Yes",
            "PaymentMethod": "Electronic check",
            "MonthlyCharges": 75.5,
            "TotalCharges": 450.2
        }
    }

    response = client.post("/predict", json=payload)

    assert response.status_code == 200
    assert isinstance(response.json()["probability"], float)
    assert 0 <= response.json()["probability"] <= 1