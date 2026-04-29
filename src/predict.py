import pandas as pd
import joblib
from src.data import load_and_preprocess


def predict_and_save(model_path='saved models/xgboost.joblib', output_path='submission.csv'):
    """Загружает модель, делает предсказания и сохраняет submission."""
    
    X_train, X_valid, y_train, y_valid, X_test, preprocessor = load_and_preprocess()
    
    test = pd.read_csv('data/test.csv')
    
    model = joblib.load(model_path)
    
    test_proba = model.predict_proba(X_test)[:, 1]
    
    submission = pd.DataFrame({
        "id": test["id"],
        "Churn": test_proba
    })
    
    submission.to_csv(output_path, index=False)
    print(f"Submission saved to {output_path}")
    print(submission.head())
    
    return submission
