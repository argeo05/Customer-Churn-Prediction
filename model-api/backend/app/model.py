from catboost import CatBoostClassifier

import joblib

catboost = CatBoostClassifier()
catboost.load_model("models/catboost_model.cbm")

xgboost = joblib.load("models/xgboost.joblib")
lightgbm = joblib.load("models/lightgbm.joblib")
random_forest = joblib.load("models/random_forest.joblib")
stack_lightgbm = joblib.load("models/stack_lightgbm.joblib")
stack_logreg = joblib.load("models/stack_logreg.joblib")
logistic_regression  = joblib.load("models/logistic_regression.joblib")
models = {
    "catboost": catboost,
    "xgboost": xgboost,
    "lightgbm": lightgbm,
    "random_forest": random_forest,
    "logistic_regression": logistic_regression,
    "stack_logreg": stack_logreg,
}
preprocessor = joblib.load("models/preprocessor.joblib")

