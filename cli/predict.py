import pandas as pd
import joblib
from pathlib import Path
from src.data import load_and_preprocess


def predict_and_save(model_path='saved models/xgboost.joblib', output_dir='.', data_dir='data'):
    """Загружает модель, делает предсказания и сохраняет submission."""
    
    X_train, X_valid, y_train, y_valid, X_test, preprocessor = load_and_preprocess(data_dir=data_dir)
    
    test = pd.read_csv(Path(data_dir) / 'test.csv')
    
    model = joblib.load(model_path)
    
    test_proba = model.predict_proba(X_test)[:, 1]
    
    submission = pd.DataFrame({
        "id": test["id"],
        "Churn": test_proba
    })
    
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / 'submission.csv'

    submission.to_csv(output_path, index=False)
    print(f"Submission saved to {output_path}")
    print(submission.head())
    
    return submission
