import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from pathlib import Path

RANDOM_STATE = 42


def load_and_preprocess(data_dir='data', train_file='train.csv', test_file='test.csv'):
    data_dir = Path(data_dir)
    train = pd.read_csv(data_dir / train_file)
    test = pd.read_csv(data_dir / test_file)
    
    X = train.drop(columns=['id', 'Churn'])
    y = train['Churn'].map({'No': 0, 'Yes': 1}).to_numpy()
    X_test = test.drop(columns=['id'])
    
    numeric_features = ['SeniorCitizen', 'tenure', 'MonthlyCharges', 'TotalCharges']
    categorical_features = [col for col in X.columns if col not in numeric_features]
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features),
        ],
        remainder='drop',
        verbose_feature_names_out=False,
    )
    
    X = preprocessor.fit_transform(X)
    X_test = preprocessor.transform(X_test)
    
    X_train, X_valid, y_train, y_valid = train_test_split(
        X, y,
        test_size=0.2,
        random_state=RANDOM_STATE,
        stratify=y,
    )
    
    return X_train, X_valid, y_train, y_valid, X_test, preprocessor