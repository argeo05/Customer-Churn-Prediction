# Анализ вероятности ухода клиента из банка

Пет-проект по предсказанию оттока клиента на данных о банковских клиентах. Здесь собран полный мини-пайплайн: от загрузки и подготовки данных до сравнения моделей, подбора гиперпараметров.

## Что реализовано

### Полная версия (ноутбук `analyze.ipynb`)
- Подготовка данных: чтение `train.csv` и `test.csv`, разделение признаков на числовые и категориальные, масштабирование и one-hot encoding.
- Единый хаб для экспериментов: класс `modelsHub` считает метрики на Stratified K-Fold, сравнивает модели и ведёт leaderboard.
- Бейзлайн и сильные модели: Logistic Regression, Random Forest, CatBoost, LightGBM и XGBoost.
- Подбор гиперпараметров: grid search для части моделей и Optuna для XGBoost и мета-моделей в стекинге.
- **Стекинг**: реализованы два варианта мета-модели (`StackingLogReg` и `StackingLightGBM`).
- Интерпретация признаков: SHAP анализ для понимания вклада каждого признака в предсказания модели.
- Сохранение артефактов: обученные модели складываются в папку `saved models/`.

### Упрощённая версия (CLI скрипты)
- CLI entrypoint: единый скрипт `scripts/main.py` для обучения моделей и создания predictions.
- 4 базовые модели (без стекинга): XGBClassifier, CatBoostClassifier, LightGBM, RandomForestClassifier, LogisticRegression.
- Модульная архитектура: логика обучения (`src/train.py`), предсказания (`src/predict.py`), загрузки данных (`src/data.py`).

## Где что находится

### Основной ноутбук

[analyze.ipynb](analyze.ipynb) — содержит полный пайплайн с интерпретацией признаков, подбором параметров и стекингом.

- Импорты, загрузка данных и первичная подготовка находятся в начале ноутбука.
- Класс `modelsHub`, который отвечает за кросс-валидацию, метрики и leaderboard, находится в блоке `Создание Baseline`.
- Эксперименты с `RandomForestClassifier`, `CatBoostClassifier`, `LGBMClassifier` и `XGBClassifier` идут отдельными секциями.
- SHAP анализ и интерпретация признаков.
- Код для построения стекинга (`StackingLogReg`, `StackingLightGBM`) и создания submission-файла в конце ноутбука.

### CLI скрипты

[scripts/main.py](scripts/main.py) — единый entrypoint для обучения и предсказания.

Модули в папке `src/`:
- [src/train.py](src/train.py) — обучение моделей (5 моделей без стекинга).
- [src/predict.py](src/predict.py) — создание predictions и submission.
- [src/data.py](src/data.py) — загрузка и препроцессинг данных.

### Данные

- `data/train.csv` — обучающая выборка.
- `data/test.csv` — тестовая выборка для submission.
- `data/sample_submission.csv` — пример формата итогового файла.

### Сохранённые модели лучшие модели

- `saved models/random_forest.joblib`
- `saved models/catboost_model.cbm`
- `saved models/lightgbm.joblib`
- `saved models/xgboost.joblib`
- `saved models/stack_logreg.joblib`
- `saved models/stack_lightgbm.joblib`

## Как это работает

### Полная версия (ноутбук)

1. Данные читаются из `data/`.
2. Признаки разделяются на числовые и категориальные.
3. Препроцессор приводит данные к виду, удобному для моделей.
4. `modelsHub` прогоняет кросс-валидацию и считает метрики.
5. Для выбранных моделей подбираются параметры (grid search, Optuna).
6. Строится стекинг с двумя мета-моделями.

### Упрощённая версия (CLI)

1. Скрипт `scripts/main.py` принимает параметры командной строки.
2. Режим `--mode train` обучает выбранную модель на данных из `--data-dir`.
3. Обученная модель сохраняется в `--models-dir`.
4. Режим `--mode predict` загружает модель и создаёт predictions на тесте.
5. Submission сохраняется в `--output-dir`.

## Как запустить

### Установка зависимостей

```bash
pip install pandas numpy scikit-learn catboost lightgbm xgboost optuna joblib tqdm shap
```

### Полная версия (ноутбук)

1. Открыть [analyze.ipynb](analyze.ipynb) и выполнить ячейки сверху вниз :)

### Упрощённая версия (CLI)

**Обучение модели:**
```bash
python scripts/main.py --mode train --model XGBClassifier --data-dir data --models-dir "saved models"
python scripts/main.py --mode train --model CatBoostClassifier
python scripts/main.py --mode train --model LightGBM
python scripts/main.py --mode train --model RandomForestClassifier
python scripts/main.py --mode train --model LogisticRegression
```

**Создание predict:**
```bash
python scripts/main.py --mode predict --data-dir data --model-path "saved models/xgboost.joblib" --output-dir .
```

**Доступные параметры:**
- `--mode` — режим работы: `train` или `predict` (по умолчанию `predict`)
- `--model` — название модели для обучения (XGBClassifier, CatBoostClassifier, LightGBM, RandomForestClassifier, LogisticRegression)
- `--data-dir` — папка с `train.csv` и `test.csv` (по умолчанию `data`)
- `--model-path` — путь к сохранённой модели для prediction (по умолчанию `saved models/xgboost.joblib`)
- `--models-dir` — папка для сохранения обученных моделей (по умолчанию `saved models`)
- `--output-dir` — папка для сохранения `submission.csv` (по умолчанию текущая папка)


## Итоги

По итоговой таблице получился плотный топ моделей по `ROC-AUC`: почти все сильные решения находятся в диапазоне ~`0.916`.

Коротко по наблюдениям:

- Лидер по качеству: `XGBClassifier (loaded)` с `ROC-AUC = 0.9166` и `F1 = 0.6763`.
- `CatBoostClassifier (loaded)` показал практически такое же качество (`ROC-AUC = 0.9166`), разница минимальная.
- `LightGBM (loaded)` тоже рядом (`ROC-AUC = 0.9166`) и с очень близким `F1 = 0.6764`.
- `StackingLightGBM` не обошёл лучшие одиночные модели по `ROC-AUC` (`0.9160`) и просел по `recall`.
- `StackingLogReg` дал лучший `recall` (`0.8142`) и лучший `F1` (`0.7000`) среди показанных запусков, но при этом уступил по `accuracy` и `ROC-AUC`.