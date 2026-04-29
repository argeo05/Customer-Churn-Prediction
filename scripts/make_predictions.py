#!/usr/bin/env python3
"""CLI скрипт для инференса и создания submission."""

import argparse
from src.predict import predict_and_save


def main():
    parser = argparse.ArgumentParser(description='Predict and create submission')
    parser.add_argument(
        '--model',
        default='saved models/xgboost.joblib',
        help='Path to model file (default: saved models/xgboost.joblib)'
    )
    parser.add_argument(
        '--output',
        default='submission.csv',
        help='Output path for submission (default: submission.csv)'
    )
    
    args = parser.parse_args()
    predict_and_save(model_path=args.model, output_path=args.output)


if __name__ == '__main__':
    main()
