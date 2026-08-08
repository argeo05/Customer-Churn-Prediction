import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from src.train import train_model, MODELS_CONFIG
from src.predict import predict_and_save


def main():
    parser = argparse.ArgumentParser(description="Train a model or create a submission.")
    parser.add_argument(
        "--mode",
        choices=("train", "predict"),
        default="predict",
        help="Operation mode: train a model or generate predictions.",
    )
    parser.add_argument(
        "--model",
        help=f"Model name for training. Options: {', '.join(MODELS_CONFIG.keys())}",
    )
    parser.add_argument(
        "--data-dir",
        default="data",
        help="Directory with train.csv and test.csv.",
    )
    parser.add_argument(
        "--model-path",
        default="saved models/xgboost.joblib",
        help="Path to a saved model for prediction.",
    )
    parser.add_argument(
        "--models-dir",
        default="saved models",
        help="Directory where trained models will be stored.",
    )
    parser.add_argument(
        "--output-dir",
        default=".",
        help="Directory where submission.csv will be saved.",
    )

    args = parser.parse_args()

    if args.mode == "train":
        if not args.model:
            parser.error("--model is required when --mode train")
        train_model(args.model, data_dir=args.data_dir, models_dir=args.models_dir)
        return 1

    predict_and_save(model_path=args.model_path, output_dir=args.output_dir, data_dir=args.data_dir)


if __name__ == '__main__':
    main()
