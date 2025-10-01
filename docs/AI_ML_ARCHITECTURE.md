# AI/ML Architecture

This document describes the AI and Machine Learning architecture for TransitFlow AI, including model designs, training pipelines, and deployment strategies.

## Overview

TransitFlow AI leverages machine learning to provide intelligent features that go beyond traditional transit apps. Our AI/ML stack focuses on:
- Predictive analytics (delays, crowding)
- Natural language understanding
- Personalized recommendations
- Dynamic optimization

## AI Features

### 1. Predictive Delay Forecasting

**Objective**: Predict transit delays before they're officially reported

**Model Type**: Time-series forecasting with LSTM/GRU networks

**Input Features**:
- Historical delay patterns
- Time of day, day of week
- Weather conditions (temperature, precipitation, wind)
- Traffic data
- Special events
- Season/holidays
- Route-specific characteristics

**Architecture**:
```
Input Layer (feature vector: 20-30 dimensions)
    ↓
LSTM Layer (128 units, dropout=0.2)
    ↓
LSTM Layer (64 units, dropout=0.2)
    ↓
Dense Layer (32 units, ReLU)
    ↓
Output Layer (1 unit, linear) → Delay prediction in minutes
```

**Training Data**:
- Historical GTFS Realtime archives (2+ years)
- Weather data aligned with transit events
- Crowd-sourced delay reports

**Performance Metrics**:
- Mean Absolute Error (MAE) < 3 minutes
- Root Mean Square Error (RMSE) < 5 minutes
- R² score > 0.75

**Implementation**:
```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

def build_delay_model(input_shape):
    model = Sequential([
        LSTM(128, return_sequences=True, input_shape=input_shape),
        Dropout(0.2),
        LSTM(64, return_sequences=False),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(1, activation='linear')
    ])
    
    model.compile(
        optimizer='adam',
        loss='mse',
        metrics=['mae', 'mse']
    )
    
    return model
```

**Update Frequency**: Retrain monthly with new data

### 2. Natural Language Query Interface

**Objective**: Allow users to ask questions in natural language

**Model Type**: Fine-tuned Large Language Model (LLM) or BERT-based NLU

**Capabilities**:
- Intent classification
- Entity extraction (locations, times, preferences)
- Contextual understanding

**Example Queries**:
- "What's the fastest way from Vancouver Airport to downtown at 5 PM?"
- "Show me wheelchair-accessible routes to UBC"
- "How crowded is the 99 B-Line right now?"

**Architecture Approach 1: Fine-tuned BERT**

```
Query: "Get me to Berlin Hauptbahnhof by 6 PM"
    ↓
Tokenizer (BERT tokenizer)
    ↓
BERT Encoder (bert-base-multilingual-cased)
    ↓
Intent Classifier → "route_planning"
Entity Extractor → {destination: "Berlin Hauptbahnhof", time: "18:00"}
    ↓
API Call Generator → route_planning(to="Berlin Hauptbahnhof", arrive_by="18:00")
```

**Architecture Approach 2: LLM with Function Calling**

Use GPT-3.5/4 or open-source alternatives (LLaMA 2, Mistral):

```python
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

functions = [
    {
        "name": "plan_route",
        "description": "Plan a transit route between two locations",
        "parameters": {
            "type": "object",
            "properties": {
                "origin": {"type": "string"},
                "destination": {"type": "string"},
                "time": {"type": "string"},
                "preferences": {"type": "array"}
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_query}],
    functions=functions,
    function_call="auto"
)
```

**Fallback**: Rule-based pattern matching for common queries

**Multilingual Support**:
- English (primary)
- German (Deutsch)
- French (Français)

### 3. Crowd Density Prediction

**Objective**: Estimate how crowded vehicles will be

**Model Type**: Classification (Low/Medium/High) or Regression (occupancy %)

**Input Features**:
- Time of day
- Day of week
- Route and direction
- Weather
- Special events
- Historical ridership patterns
- Real-time vehicle capacity data (if available)

**Architecture**:
```
Input Layer (feature vector: 15-20 dimensions)
    ↓
Dense Layer (64 units, ReLU, Dropout=0.3)
    ↓
Dense Layer (32 units, ReLU, Dropout=0.3)
    ↓
Output Layer (3 units, softmax) → [Low, Medium, High] probabilities
```

**Training Data**:
- Historical ridership data from transit agencies
- User-generated crowding reports (with validation)
- Automated passenger counting (APC) data where available

**Validation**: Cross-validate with real-world observations

### 4. Personalized Route Recommendations

**Objective**: Learn user preferences and suggest optimal routes

**Model Type**: Collaborative filtering + Content-based recommendation

**User Features**:
- Historical route choices
- Preferred departure times
- Mode preferences (bus vs. train)
- Walking speed/distance tolerance
- Accessibility needs

**Route Features**:
- Travel time
- Number of transfers
- Walking distance
- Crowding level
- Reliability score
- Carbon footprint

**Architecture**: Hybrid recommender system

```
User Embeddings (64-dim)  +  Route Embeddings (64-dim)
           ↓                           ↓
           +---------------------------+
                       ↓
            Dense Layer (128 units, ReLU)
                       ↓
            Dense Layer (64 units, ReLU)
                       ↓
            Output (1 unit, sigmoid) → Preference score
```

**Cold Start Problem**: Use content-based recommendations for new users

**Privacy**: All personalization done on-device or with anonymized data

### 5. Dynamic Re-routing

**Objective**: Suggest alternative routes when disruptions occur

**Model Type**: Reinforcement Learning (RL) or heuristic optimization

**Approach**: Real-time graph search with ML-enhanced edge weights

**Components**:
- Graph representation of transit network
- Real-time edge weight updates based on:
  - Current delays
  - Predicted delays (from model 1)
  - Crowd density (from model 3)
  - Weather impacts
- A* or Dijkstra's algorithm with ML-weighted edges

**ML Enhancement**:
Train a model to predict optimal route adjustments:

```python
# Reinforcement Learning approach
class RouteOptimizationEnv:
    """Environment for learning optimal routing strategies."""
    
    def __init__(self, transit_graph):
        self.graph = transit_graph
        self.state = None
    
    def step(self, action):
        """Take an action (select next route segment)."""
        # Update state based on action
        # Calculate reward (negative of travel time + penalties)
        reward = self.calculate_reward()
        done = self.is_destination_reached()
        return next_state, reward, done
    
    def calculate_reward(self):
        # Minimize: travel_time + transfers + walking_distance
        # Maximize: comfort + reliability
        pass
```

### 6. Sustainability Insights

**Objective**: Calculate and compare carbon footprints of routes

**Model Type**: Rule-based calculations with ML-enhanced factors

**Carbon Emissions by Mode** (g CO₂ per passenger-km):
- Bus: 89g (diesel), 27g (electric)
- Train: 41g (diesel), 14g (electric)
- Tram: 18g
- Ferry: 120g (diesel), 35g (electric)
- Walking/Cycling: 0g

**ML Enhancement**: Predict actual emissions based on:
- Vehicle age and efficiency
- Occupancy (higher occupancy = lower per-capita emissions)
- Route terrain (hills increase emissions)
- Driving behavior

**Output**:
```json
{
  "route_id": "route_123",
  "total_emissions_kg": 0.45,
  "comparison_to_car": "87% less CO₂",
  "eco_rating": "A+",
  "alternative_greener_routes": [...]
}
```

## ML Infrastructure

### Training Pipeline

**Data Collection**:
```
GTFS Feeds → ETL Pipeline → Data Lake (S3)
Realtime APIs → Stream Processor (Kafka) → Time-series DB (InfluxDB)
Weather API → Batch Processor → Feature Store
```

**Feature Engineering**:
```python
def engineer_features(raw_data):
    """Transform raw transit data into ML features."""
    features = {}
    
    # Temporal features
    features['hour_sin'] = np.sin(2 * np.pi * raw_data['hour'] / 24)
    features['hour_cos'] = np.cos(2 * np.pi * raw_data['hour'] / 24)
    features['day_of_week'] = raw_data['day_of_week']
    features['is_weekend'] = int(features['day_of_week'] >= 5)
    
    # Weather features
    features['temperature'] = raw_data['temp']
    features['precipitation'] = raw_data['precip']
    features['is_rainy'] = int(raw_data['precip'] > 1.0)
    
    # Route features
    features['route_length_km'] = raw_data['route_length']
    features['num_stops'] = raw_data['num_stops']
    
    return features
```

**Training Workflow**:
```bash
# 1. Extract data
python scripts/extract_training_data.py --start-date 2022-01-01 --end-date 2024-01-01

# 2. Feature engineering
python scripts/engineer_features.py --input data/raw/ --output data/processed/

# 3. Train model
python scripts/train_model.py --model delay_predictor --config configs/lstm_config.yaml

# 4. Evaluate
python scripts/evaluate_model.py --model delay_predictor --test-data data/test/

# 5. Deploy
python scripts/deploy_model.py --model delay_predictor --version v1.2.0
```

**Experiment Tracking**: Use MLflow or Weights & Biases

```python
import mlflow

with mlflow.start_run():
    mlflow.log_param("learning_rate", 0.001)
    mlflow.log_param("batch_size", 32)
    
    # Train model
    model = train_model(params)
    
    mlflow.log_metric("mae", mae)
    mlflow.log_metric("rmse", rmse)
    mlflow.keras.log_model(model, "model")
```

### Model Deployment

**Serving Architecture**:
```
Client App → API Gateway → Load Balancer
                              ↓
                   [Model Server 1] [Model Server 2] [Model Server 3]
                              ↓
                   Model Registry (S3/GCS)
```

**Model Serving with TensorFlow Serving**:
```bash
# Start TensorFlow Serving
docker run -p 8501:8501 \
  --mount type=bind,source=/models/delay_predictor,target=/models/delay_predictor \
  -e MODEL_NAME=delay_predictor \
  tensorflow/serving
```

**REST API for Predictions**:
```python
from fastapi import FastAPI
import tensorflow as tf

app = FastAPI()
model = tf.keras.models.load_model('models/delay_predictor')

@app.post("/predict/delay")
async def predict_delay(features: dict):
    """Predict transit delay."""
    # Preprocess features
    X = preprocess_features(features)
    
    # Make prediction
    prediction = model.predict(X)
    
    return {
        "predicted_delay_minutes": float(prediction[0]),
        "confidence": calculate_confidence(prediction),
        "timestamp": datetime.now().isoformat()
    }
```

**A/B Testing**: Deploy multiple model versions and compare

### Monitoring and Retraining

**Model Performance Monitoring**:
```python
from prometheus_client import Histogram, Counter

prediction_latency = Histogram('model_prediction_latency_seconds', 'Prediction latency')
prediction_errors = Counter('model_prediction_errors_total', 'Prediction errors')

@prediction_latency.time()
def make_prediction(features):
    try:
        return model.predict(features)
    except Exception as e:
        prediction_errors.inc()
        raise
```

**Data Drift Detection**:
```python
from alibi_detect.cd import KSDrift

# Initialize drift detector
drift_detector = KSDrift(reference_data, p_val=0.05)

# Check for drift
drift_result = drift_detector.predict(new_data)
if drift_result['data']['is_drift']:
    alert_ops_team("Data drift detected - retrain model")
```

**Automated Retraining**:
- Trigger: Monthly schedule or drift detection
- Process: Full pipeline execution with latest data
- Validation: Compare new model to production model
- Deployment: Gradual rollout (canary → 100%)

## AI Ethics and Fairness

### Bias Mitigation

**Check for Bias**:
```python
def analyze_fairness(model, test_data, protected_attributes):
    """Analyze model fairness across demographic groups."""
    results = {}
    
    for attr in protected_attributes:
        groups = test_data.groupby(attr)
        
        for group_name, group_data in groups:
            predictions = model.predict(group_data)
            results[f"{attr}_{group_name}"] = {
                "mae": mean_absolute_error(group_data.y, predictions),
                "count": len(group_data)
            }
    
    return results
```

**Ensure Fairness**:
- No discrimination based on location (wealthy vs. low-income areas)
- Equal quality recommendations for all users
- Transparent decision-making

### Explainability

**Model Interpretability with SHAP**:
```python
import shap

# Create explainer
explainer = shap.TreeExplainer(model)

# Calculate SHAP values
shap_values = explainer.shap_values(X)

# Visualize
shap.summary_plot(shap_values, X)
```

**User-Facing Explanations**:
```json
{
  "prediction": "15 minutes delayed",
  "explanation": "This prediction is based on:",
  "factors": [
    {"factor": "Current weather", "impact": "High"},
    {"factor": "Rush hour traffic", "impact": "Medium"},
    {"factor": "Historical delays on this route", "impact": "Medium"}
  ]
}
```

### Privacy

**Privacy-Preserving ML**:
- On-device inference for personalization
- Differential privacy for aggregated statistics
- Federated learning for collaborative model improvement

```python
# Differential privacy example
from diffprivlib.models import LogisticRegression

model = LogisticRegression(epsilon=1.0)  # Privacy budget
model.fit(X_train, y_train)
```

## Technology Stack

### Frameworks
- **TensorFlow/Keras**: Deep learning models
- **PyTorch**: Research and experimentation
- **Scikit-learn**: Classical ML algorithms
- **XGBoost/LightGBM**: Gradient boosting

### NLP
- **Hugging Face Transformers**: Pre-trained models
- **spaCy**: Text processing
- **NLTK**: Additional NLP utilities

### MLOps
- **MLflow**: Experiment tracking
- **Kubeflow**: ML workflows on Kubernetes
- **TensorFlow Serving**: Model serving
- **BentoML**: Alternative serving framework

### Data Processing
- **Pandas**: Data manipulation
- **NumPy**: Numerical computing
- **Apache Spark**: Large-scale data processing
- **Dask**: Parallel computing

### Monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Alibi Detect**: Data drift detection

## Development Roadmap

### Phase 1 (MVP) - Weeks 9-12
- [ ] Delay prediction model (basic LSTM)
- [ ] Simple NLU (rule-based + intent classification)
- [ ] Carbon footprint calculator (rule-based)

### Phase 2 - Weeks 13-16
- [ ] Crowd density prediction
- [ ] Personalized recommendations (basic collaborative filtering)
- [ ] Model serving infrastructure

### Phase 3 - Weeks 17-20
- [ ] Advanced NLU (fine-tuned BERT)
- [ ] Dynamic re-routing with RL
- [ ] A/B testing framework
- [ ] Monitoring and alerting

### Phase 4 - Post-Launch
- [ ] Federated learning for privacy
- [ ] Advanced explainability
- [ ] Multi-agent reinforcement learning
- [ ] Edge deployment for offline inference

## Resources

### Datasets
- [GTFS Archives](https://transitfeeds.com/)
- [Weather Historical Data](https://openweathermap.org/history)
- [Carbon Emissions Data](https://www.eea.europa.eu/)

### Research Papers
- "Deep Learning for Transportation" (survey paper)
- "BERT: Pre-training of Deep Bidirectional Transformers"
- "Attention Is All You Need" (Transformers)

### Tools
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [PyTorch Tutorials](https://pytorch.org/tutorials/)
- [Hugging Face Course](https://huggingface.co/course)

## Support

For AI/ML questions:
- Review this documentation
- Check GitHub Issues (label: `ml`)
- Consult with AI specialist on the team

Last Updated: 2024
