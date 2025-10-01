# TransitFlow AI - Implementation Guide

This guide documents the recent implementation of the map view and backend API with Nothing OS 3.0 inspired design.

## What's New

### 1. Interactive Transit Map
- Full-screen Mapbox GL JS integration
- Real-time vehicle tracking with animated markers
- Transit stop markers with information popups
- Interactive controls (zoom, rotation, fullscreen, geolocation)
- Dark theme matching Nothing OS aesthetics

### 2. Nothing OS 3.0 Inspired Design
The entire web application has been redesigned with Nothing OS 3.0 aesthetics:

**Visual Design:**
- Pure black background (#000000)
- Red accent color (#FF0000)
- Monospace typography (Roboto Mono)
- Uppercase headings with increased letter spacing
- Minimalist bordered elements
- Subtle glow effects on interactive elements

**Components Updated:**
- Navigation bar
- Home page hero and features
- Search bar
- Map page
- About page
- All buttons and form elements

### 3. Backend API
Complete RESTful API implementation with:
- Transit data endpoints (routes, stops, arrivals, vehicles)
- Route planning endpoints (plan, alternatives, optimize)
- AI feature endpoints (predict-delay, nlp-query, crowd-density)
- Mock data services for testing
- CORS configuration
- Error handling

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Nefnief-tech/Transit-App.git
cd Transit-App
```

2. **Install web dependencies:**
```bash
cd web
npm install
```

3. **Install backend dependencies:**
```bash
cd ../backend
npm install
```

### Configuration

1. **Web Configuration:**
Create `web/.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MAPBOX_API_KEY=your_mapbox_key
VITE_ENVIRONMENT=development
```

2. **Backend Configuration:**
Create `backend/.env` file:
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

### Running the Application

1. **Start the Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:3000

2. **Start the Web App (in a new terminal):**
```bash
cd web
npm run dev
```
Web app runs on http://localhost:3001

## Project Structure

### Web Application (web/)
```
web/
├── src/
│   ├── components/
│   │   ├── common/          # Navigation, SearchBar
│   │   └── map/             # TransitMap component
│   ├── pages/
│   │   ├── Home/            # Homepage
│   │   ├── Search/          # Route search
│   │   ├── Route/           # Map page
│   │   └── About/           # About page
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   └── App.jsx
├── package.json
└── vite.config.js
```

### Backend API (backend/)
```
backend/
├── src/
│   ├── api/
│   │   ├── routes/          # API route definitions
│   │   │   ├── transit.js
│   │   │   ├── routing.js
│   │   │   └── ai.js
│   │   └── controllers/     # Request handlers
│   │       ├── transitController.js
│   │       ├── routingController.js
│   │       └── aiController.js
│   ├── services/            # Business logic
│   │   ├── transit/
│   │   ├── routing/
│   │   └── realtime/
│   └── index.js             # Entry point
├── package.json
└── .env.example
```

## Design System

### Color Palette
```css
--color-black: #000000;      /* Background */
--color-red: #FF0000;        /* Primary accent */
--color-white: #FFFFFF;      /* Primary text */
--color-gray-light: #CCCCCC; /* Secondary text */
--color-gray: #999999;       /* Tertiary text */
--color-gray-dark: #333333;  /* Borders */
--color-green: #00FF00;      /* Success */
```

### Typography
```css
font-family: 'Roboto Mono', monospace;
```

**Headings:**
- Uppercase
- Letter-spacing: 1-3px
- Font-weight: 700

**Body Text:**
- Font-size: 14px
- Line-height: 1.6-1.8
- Color: #CCCCCC

### Components

**Buttons:**
```css
background: transparent;
border: 1px solid #FF0000;
color: #FFFFFF;

/* Hover */
background: #FF0000;
color: #000000;
box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
```

**Input Fields:**
```css
background: #000000;
border: 1px solid #333333;
color: #FFFFFF;

/* Focus */
border-color: #FF0000;
box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
```

**Cards:**
```css
background: #000000;
border: 1px solid #333333;

/* Hover */
border-color: #FF0000;
box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
```

## API Usage Examples

### Get Transit Routes
```javascript
fetch('http://localhost:3000/api/transit/routes')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Plan a Route
```javascript
fetch('http://localhost:3000/api/routes/plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    origin: 'Waterfront Station',
    destination: 'Burrard Station'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### Natural Language Query
```javascript
fetch('http://localhost:3000/api/ai/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'How do I get from Waterfront to Burrard?'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
```

## Features Implemented

### Map View
✅ Interactive Mapbox GL JS integration
✅ Real-time vehicle tracking
✅ Transit stop markers
✅ Information popups
✅ Map controls (zoom, rotation, fullscreen, geolocation)
✅ Dark theme styling

### UI/UX
✅ Nothing OS 3.0 inspired design
✅ Consistent color scheme
✅ Monospace typography
✅ Responsive layout
✅ Smooth animations
✅ Accessibility considerations

### Backend
✅ RESTful API structure
✅ Transit data endpoints
✅ Route planning endpoints
✅ AI feature endpoints
✅ Mock data services
✅ CORS configuration
✅ Error handling
✅ Environment configuration

## Next Steps

### Frontend
- [ ] Connect to real backend API
- [ ] Implement route planning with map visualization
- [ ] Add user authentication
- [ ] Implement saved routes/favorites
- [ ] Add offline support (PWA)
- [ ] Implement real-time updates via WebSocket

### Backend
- [ ] Integrate with real transit APIs (TransLink, Deutsche Bahn)
- [ ] Implement database (PostgreSQL)
- [ ] Add Redis caching
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Set up API documentation (Swagger)
- [ ] Add unit and integration tests
- [ ] Deploy to production

### AI Features
- [ ] Implement actual ML models for delay prediction
- [ ] Improve NLP query processing
- [ ] Add crowd density prediction model
- [ ] Implement carbon footprint calculation

## Troubleshooting

### Map not loading
- Check that Mapbox API key is set in `web/.env`
- Verify internet connection for map tiles

### Backend connection errors
- Ensure backend is running on port 3000
- Check CORS configuration in `backend/.env`
- Verify no firewall blocking

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

See LICENSE file in the root directory.

## Support

For questions or issues, please open an issue on GitHub.
