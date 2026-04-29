import joblib
from pathlib import Path

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier
from xgboost import XGBClassifier

from src.data import load_and_preprocess

MODELS_CONFIG = {
    "XGBClassifier": {
        "class": XGBClassifier,
        "params": {
            "objective": "binary:logistic",
            "colsample_bytree": 0.7718500461081756,
            "gamma": 0.0018768875329013197,
            "learning_rate": 0.06380730584961225,
            "max_depth": 5,
            "min_child_weight": 8,
            "n_estimators": 454,
            "n_jobs": -1,
            "random_state": 42,
            "reg_alpha": 3.3149587052001917e-07,
            "reg_lambda": 0.01347090624623844,
            "subsample": 0.9229828604603908,
            "tree_method": "hist",
            "verbosity": 0,
            "eval_metric": "logloss",
        }
    },
    "CatBoostClassifier": {
        "class": CatBoostClassifier,
        "params": {
            "depth": 6,
            "random_seed": 42,
            "od_wait": 50,
            "l2_leaf_reg": 0.5,
            "iterations": 5000,
            "verbose": 0,
            "loss_function": "Logloss",
        }
    },
    "LightGBM": {
        "class": LGBMClassifier,
        "params": {
            "boosting_type": "gbdt",
            "colsample_bytree": 1.0,
            "learning_rate": 0.05,
            "max_depth": 6,
            "min_child_samples": 20,
            "n_estimators": 500,
            "n_jobs": -1,
            "num_leaves": 31,
            "random_state": 42,
            "reg_alpha": 1,
            "reg_lambda": 1,
            "subsample": 1.0,
            "verbosity": -1,
        }
    },
    "RandomForestClassifier": {
        "class": RandomForestClassifier,
        "params": {
            "n_estimators": 200,
            "max_depth": 10,
            "max_features": "sqrt",
            "random_state": 42,
            "n_jobs": -1,
        }
    }
}

MODELS_DIR = Path(__file__).parent.parent / "saved models"


def train_model(model_name: str, data_dir='data', models_dir=None):
    """Train model with best parameters."""
    
    if model_name not in MODELS_CONFIG:
        print(f"Error: Model '{model_name}' not found.")
        print(f"Available models: {', '.join(MODELS_CONFIG.keys())}")
        return False
    
    config = MODELS_CONFIG[model_name]
    model_class = config["class"]
    params = config["params"].copy()
    
    print(f"\nTraining {model_name}...")
    print(f"Parameters: {params}\n")
    
    X_train, X_valid, y_train, y_valid, X_test, preprocessor = load_and_preprocess(data_dir=data_dir)
    
    model = model_class(**params)
    
    print(f"Fitting {model_name}...")
    model.fit(X_train, y_train)
    
    # Evaluate
    train_score = model.score(X_train, y_train)
    valid_score = model.score(X_valid, y_valid)
    
    print(f"Train accuracy: {train_score:.4f}")
    print(f"Validation accuracy: {valid_score:.4f}")
    
    target_models_dir = Path(models_dir) if models_dir is not None else MODELS_DIR
    target_models_dir.mkdir(parents=True, exist_ok=True)
    
    if model_name == "CatBoostClassifier":
        save_path = target_models_dir / f"{model_name.lower()}_model.cbm"
        model.save_model(str(save_path))
    else:
        save_path = target_models_dir / f"{model_name.lower()}.joblib"
        joblib.dump(model, save_path)
    
    print(f"Model saved to: {save_path}\n")
    return True



