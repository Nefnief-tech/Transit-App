# ML/AI Services

This directory contains the machine learning and AI services for TransitFlow AI.

## Structure (To Be Implemented)

```
ml/
├── models/               # Trained models
│   ├── delay_predictor/
│   ├── crowd_predictor/
│   └── nlp/
├── training/             # Training scripts
│   ├── train_delay.py
│   ├── train_crowd.py
│   └── train_nlp.py
├── inference/            # Inference services
│   ├── delay_service.py
│   ├── crowd_service.py
│   └── nlp_service.py
├── data/                 # Data processing
│   ├── extract/
│   ├── transform/
│   └── load/
├── notebooks/            # Jupyter notebooks
├── tests/                # Tests
├── app.py                # Main application
├── requirements.txt      # Python dependencies
├── Dockerfile
└── README.md            # This file
```

## Features

### Models

1. **Delay Prediction**
   - LSTM-based time series forecasting
   - Predicts transit delays up to 30 minutes ahead
   - Inputs: Historical delays, weather, time features

2. **Crowd Density Prediction**
   - Classification model (Low/Medium/High)
   - Predicts vehicle crowding levels
   - Inputs: Time, route, historical ridership

3. **Natural Language Understanding**
   - Fine-tuned BERT for intent classification
   - Entity extraction for locations and times
   - Multilingual support (EN, DE, FR)

4. **Route Recommendation**
   - Hybrid recommender system
   - Personalized route suggestions
   - Cold-start handling

5. **Carbon Footprint Calculator**
   - Rule-based with ML enhancements
   - Per-route emission estimates
   - Alternative suggestions

## Technology Stack

- **Frameworks**: TensorFlow/Keras, PyTorch
- **NLP**: Hugging Face Transformers, spaCy
- **Data**: Pandas, NumPy, Scikit-learn
- **MLOps**: MLflow, Kubeflow
- **Serving**: FastAPI, TensorFlow Serving
- **Monitoring**: Prometheus, Grafana

## Getting Started

### Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Training Models

```bash
# Extract training data
python training/extract_data.py --start-date 2022-01-01 --end-date 2024-01-01

# Train delay predictor
python training/train_delay.py --config configs/delay_lstm.yaml

# Evaluate model
python training/evaluate.py --model delay_predictor --test-data data/test/
```

### Running Inference Service

```bash
python app.py
```

Service will start at http://localhost:5000

### API Endpoints

- `POST /predict/delay` - Predict transit delay
- `POST /predict/crowd` - Predict crowd density
- `POST /nlp/query` - Process natural language query
- `POST /recommend/route` - Get route recommendations
- `POST /carbon/calculate` - Calculate carbon footprint

### Example Request

```python
import requests

response = requests.post('http://localhost:5000/predict/delay', json={
    'route_id': '99',
    'stop_id': '51234',
    'time': '2024-01-15T17:00:00Z',
    'weather': {'temp': 12, 'precip': 0.5}
})

print(response.json())
# {'predicted_delay_minutes': 8.5, 'confidence': 0.82}
```

## Model Development

### Experiment Tracking

```bash
# Start MLflow UI
mlflow ui --port 5001
```

Visit http://localhost:5001 to view experiments

### Model Registry

Models are versioned and stored in:
- Local: `models/` directory
- Production: S3 bucket (AWS)

### Retraining

Models are retrained on a monthly schedule or when data drift is detected.

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test
pytest tests/test_delay_predictor.py
```

## Contributing

See [AI/ML Architecture](../docs/AI_ML_ARCHITECTURE.md) for detailed information.
