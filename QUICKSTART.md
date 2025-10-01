# Quick Start Guide

Get TransitFlow AI up and running in 15 minutes!

## Prerequisites

Ensure you have these installed:
- Node.js v18+
- Python 3.10+
- Docker & Docker Compose
- Git

## 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/Nefnief-tech/Transit-App.git
cd Transit-App

# Copy environment file
cp .env.example .env
```

## 2. Configure API Keys

Edit `.env` and add your API keys:

```bash
# Required for MVP
TRANSLINK_API_KEY=your_key_here          # Get from: https://developer.translink.ca/
OPENWEATHER_API_KEY=your_key_here        # Get from: https://openweathermap.org/api
MAPBOX_API_KEY=your_key_here             # Get from: https://www.mapbox.com/

# Optional for Germany features
DB_FAHRPLAN_API_KEY=your_key_here        # Get from: https://developers.deutschebahn.com/
```

## 3. Start Infrastructure

```bash
# Start PostgreSQL, MongoDB, Redis
docker-compose up -d

# Verify services are running
docker-compose ps
```

## 4. Install Dependencies

### Backend
```bash
cd backend
npm install
cd ..
```

### Frontend (Mobile)
```bash
cd frontend
npm install
cd ..
```

### ML Service
```bash
cd ml
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Web
```bash
cd web
npm install
cd ..
```

## 5. Run the Application

Open 4 terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - ML Service:**
```bash
cd ml
source venv/bin/activate
python app.py
```

**Terminal 3 - Mobile App:**
```bash
cd frontend
npm start
# Then press 'i' for iOS or 'a' for Android
```

**Terminal 4 - Web App:**
```bash
cd web
npm start
```

## 6. Access the Application

- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:5000
- **Web App**: http://localhost:3001
- **Mobile App**: Use Expo Go app or emulator

## Troubleshooting

### Ports Already in Use?
```bash
# Check what's using port 3000
lsof -i :3000
# Kill the process or change PORT in .env
```

### Database Connection Issues?
```bash
# Restart Docker services
docker-compose restart

# Check logs
docker-compose logs postgres
```

### Module Not Found?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Read the Documentation**:
   - [Development Setup](docs/DEVELOPMENT_SETUP.md) - Complete setup guide
   - [API Integration](docs/API_INTEGRATION.md) - Working with transit APIs
   - [AI/ML Architecture](docs/AI_ML_ARCHITECTURE.md) - Understanding AI features

2. **Explore the Codebase**:
   - `backend/` - API implementation
   - `frontend/` - Mobile app
   - `ml/` - AI/ML models
   - `web/` - Web application

3. **Run Tests**:
   ```bash
   npm test
   ```

4. **Start Contributing**:
   - Check [CONTRIBUTING.md](CONTRIBUTING.md)
   - Look for open issues on GitHub
   - Join the team discussion

## Need Help?

- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Open an issue on GitHub
- **Questions**: See CONTRIBUTING.md for communication channels

## Quick Reference

### Common Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Useful URLs

- API Documentation: http://localhost:3000/api-docs
- Database (pgAdmin): http://localhost:5050 (if configured)
- Monitoring: http://localhost:9090 (if configured)

## What's Next?

The current repository contains:
- ✅ Complete project documentation
- ✅ Architecture and design documents
- ✅ Development setup guides
- ✅ Docker configuration
- ⏳ Backend implementation (to be developed)
- ⏳ Frontend implementation (to be developed)
- ⏳ ML models (to be developed)

Follow the [Project Roadmap](docs/PROJECT_ROADMAP.md) for the development timeline.

---

**Note**: This is the initial project setup. Most application code is yet to be implemented following the 6-phase development plan. See [PROJECT_ROADMAP.md](docs/PROJECT_ROADMAP.md) for details.
