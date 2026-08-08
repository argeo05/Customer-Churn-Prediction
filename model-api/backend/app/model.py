from catboost import CatBoostClassifier
import joblib

model = CatBoostClassifier()

model.load_model("models/catboost_model.cbm")
preprocessor = joblib.load("./models/preprocessor.joblib")

