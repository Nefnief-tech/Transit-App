# Development Setup Guide

This guide will help you set up your local development environment for TransitFlow AI.

## Prerequisites

### Required Software
- **Node.js**: v18.x or higher
- **Python**: 3.10 or higher
- **Git**: Latest version
- **Docker**: Latest version (for containerization)
- **Docker Compose**: Latest version

### Recommended Tools
- **Visual Studio Code**: With extensions for React Native, Python, Docker
- **Postman**: For API testing
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)
- **pgAdmin**: For PostgreSQL management
- **MongoDB Compass**: For MongoDB management

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nefnief-tech/Transit-App.git
cd Transit-App
```

### 2. Install Dependencies

#### Backend (Node.js)
```bash
cd backend
npm install
```

#### Backend (Python - for ML services)
```bash
cd ml
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Frontend (Mobile)
```bash
cd frontend
npm install
```

#### Web
```bash
cd web
npm install
```

### 3. Environment Configuration

Create environment files for each component:

#### Backend `.env`
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Server
NODE_ENV=development
PORT=3000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=transitflow
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

MONGODB_URI=mongodb://localhost:27017/transitflow

# API Keys
TRANSLINK_API_KEY=your_translink_key
DB_FAHRPLAN_API_KEY=your_db_key
DB_RIS_API_KEY=your_ris_key
LYKO_API_KEY=your_lyko_key
OPENWEATHER_API_KEY=your_weather_key

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# AWS (for production)
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET=transitflow-data
```

#### ML Service `.env`
```bash
cd ml
cp .env.example .env
```

Edit `ml/.env`:
```env
# ML Service
ML_SERVICE_PORT=5000

# Model Storage
MODEL_PATH=./models
S3_MODEL_BUCKET=transitflow-models

# Database
POSTGRES_URI=postgresql://postgres:password@localhost:5432/transitflow

# Monitoring
MLFLOW_TRACKING_URI=http://localhost:5001
```

#### Mobile `.env`
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
API_BASE_URL=http://localhost:3000/api
MAPBOX_API_KEY=your_mapbox_key
ENVIRONMENT=development
```

### 4. Database Setup

#### PostgreSQL

**Using Docker**:
```bash
docker run --name transitflow-postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=transitflow \
  -p 5432:5432 \
  -d postgres:15
```

**Create Schema**:
```bash
cd backend
npm run db:migrate
npm run db:seed  # Optional: seed with sample data
```

#### MongoDB

**Using Docker**:
```bash
docker run --name transitflow-mongo \
  -p 27017:27017 \
  -d mongo:7
```

#### Redis

**Using Docker**:
```bash
docker run --name transitflow-redis \
  -p 6379:6379 \
  -d redis:7
```

### 5. API Key Registration

You'll need to register for API keys from various providers:

#### TransLink (Vancouver)
1. Visit: https://developer.translink.ca/
2. Create an account
3. Register an application
4. Copy API key to `.env`

#### Deutsche Bahn (Germany)
1. Visit: https://developers.deutschebahn.com/
2. Create an account
3. Subscribe to required APIs
4. Copy API keys to `.env`

#### OpenWeatherMap
1. Visit: https://openweathermap.org/api
2. Sign up for free tier
3. Copy API key to `.env`

#### Mapbox
1. Visit: https://www.mapbox.com/
2. Create account
3. Create access token
4. Copy to mobile `.env`

## Running the Application

### Development Mode

#### Option 1: Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

#### Option 2: Manual Start

**Terminal 1 - Backend API**:
```bash
cd backend
npm run dev
```

**Terminal 2 - ML Service**:
```bash
cd ml
source venv/bin/activate
python app.py
```

**Terminal 3 - Mobile App**:
```bash
cd frontend
npm start

# In a new terminal, start iOS
npm run ios

# Or Android
npm run android
```

**Terminal 4 - Web App**:
```bash
cd web
npm start
```

### Accessing the Application

- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:5000
- **Web App**: http://localhost:3001
- **Mobile App**: Use Expo Go app or emulator
- **API Docs**: http://localhost:3000/api-docs

## Development Workflow

### Git Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat(scope): description"
```

3. Push and create PR:
```bash
git push origin feature/your-feature-name
```

### Code Style

#### JavaScript/TypeScript

**ESLint Configuration**:
```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

**Prettier**:
```bash
# Format code
npm run format
```

#### Python

**Black & Flake8**:
```bash
# Format code
black .

# Check style
flake8 .

# Type checking
mypy .
```

### Testing

#### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm run test:coverage       # With coverage
```

#### ML Tests
```bash
cd ml
pytest                      # Run all tests
pytest --cov=.             # With coverage
pytest -v                   # Verbose
```

#### Frontend Tests
```bash
cd frontend
npm test                    # Run all tests
npm test -- --coverage      # With coverage
```

#### Integration Tests
```bash
# From root directory
npm run test:integration
```

### Debugging

#### VS Code Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/src/index.js",
      "envFile": "${workspaceFolder}/backend/.env"
    },
    {
      "type": "python",
      "request": "launch",
      "name": "Debug ML Service",
      "program": "${workspaceFolder}/ml/app.py",
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/ml/.env"
    }
  ]
}
```

#### Chrome DevTools

For debugging React apps:
1. Open Chrome DevTools
2. Go to Sources tab
3. Set breakpoints in source files

#### React Native Debugger

```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Start debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

## Data Management

### Download GTFS Data

```bash
# TransLink
cd data/gtfs/translink
wget https://transitfeeds.com/p/translink-vancouver/29/latest/download

# DB (Germany)
cd data/gtfs/db
# Download from appropriate source
```

### Process GTFS Data

```bash
cd data
python scripts/process_gtfs.py --provider translink --input gtfs/translink/gtfs.zip
```

### Populate Database

```bash
cd backend
npm run db:import-gtfs -- --provider translink
```

## ML Development

### Training Models

```bash
cd ml

# Extract training data
python scripts/extract_training_data.py \
  --start-date 2022-01-01 \
  --end-date 2024-01-01

# Train delay prediction model
python scripts/train_model.py \
  --model delay_predictor \
  --config configs/lstm_config.yaml \
  --epochs 50

# Evaluate model
python scripts/evaluate_model.py \
  --model delay_predictor \
  --test-data data/test/
```

### Experiment Tracking

```bash
# Start MLflow UI
mlflow ui --port 5001

# View experiments at http://localhost:5001
```

### Model Deployment

```bash
# Export model
python scripts/export_model.py \
  --model delay_predictor \
  --version v1.0.0 \
  --format saved_model

# Deploy to serving infrastructure
python scripts/deploy_model.py \
  --model delay_predictor \
  --version v1.0.0 \
  --environment staging
```

## Mobile Development

### iOS Setup (macOS only)

```bash
# Install CocoaPods
sudo gem install cocoapods

# Install iOS dependencies
cd frontend/ios
pod install

# Run on iOS simulator
cd ..
npm run ios
```

### Android Setup

```bash
# Ensure Android SDK is installed via Android Studio

# Run on Android emulator
cd frontend
npm run android
```

### Testing on Physical Devices

**iOS**:
1. Connect device via USB
2. Enable developer mode on device
3. Run: `npm run ios -- --device "Your Device Name"`

**Android**:
1. Enable USB debugging on device
2. Connect via USB
3. Run: `npm run android`

## Performance Monitoring

### Local Monitoring

```bash
# Start Prometheus
docker run -p 9090:9090 -v $(pwd)/infrastructure/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

# Start Grafana
docker run -p 3002:3000 grafana/grafana
```

Access:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3002

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart container
docker restart transitflow-postgres

# Check logs
docker logs transitflow-postgres
```

#### Node Module Issues
```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Python Virtual Environment Issues
```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### React Native Issues
```bash
# Clear Metro bundler cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all

# iOS: Clean build
cd ios
xcodebuild clean
pod install
cd ..
```

### Getting Help

1. Check documentation in `/docs`
2. Search GitHub Issues
3. Ask in team chat
4. Contact relevant team member:
   - Backend: [Developer 1]
   - ML: [AI Specialist]
   - Mobile: [Developer 2]
   - DevOps: [DevOps Engineer]

## Additional Resources

### Documentation
- [API Integration Guide](./API_INTEGRATION.md)
- [AI/ML Architecture](./AI_ML_ARCHITECTURE.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

### External Resources
- [React Native Docs](https://reactnative.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TensorFlow Guides](https://www.tensorflow.org/guide)
- [GTFS Documentation](https://gtfs.org/)

### Community
- GitHub Discussions: [Link to be added]
- Slack Channel: [Link to be added]
- Monthly Dev Calls: [Schedule to be added]

## Next Steps

After setup is complete:
1. Run all tests to ensure everything works
2. Review [Contributing Guidelines](../CONTRIBUTING.md)
3. Check open issues for tasks to work on
4. Join the team communication channels

Last Updated: 2024
