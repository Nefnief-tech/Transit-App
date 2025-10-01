# TransitFlow AI - Backend API Documentation

## Overview

The TransitFlow AI backend provides RESTful API endpoints for transit data, route planning, and AI-powered features. The API is built with Node.js and Express.

**Base URL:** `http://localhost:3000/api`

## Authentication

Currently, the API does not require authentication. Future versions will implement JWT-based authentication.

## Endpoints

### Health Check

#### GET /health

Returns the health status of the API server.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-01T05:15:46.715Z",
  "uptime": 426.152175686
}
```

---

### Transit Data

#### GET /api/transit/routes

Get all available transit routes.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Expo Line",
      "type": "skytrain",
      "color": "#0098D8"
    },
    ...
  ]
}
```

#### GET /api/transit/stops

Get all transit stops.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Waterfront Station",
      "lat": 49.2859,
      "lng": -123.1119,
      "type": "skytrain"
    },
    ...
  ]
}
```

#### GET /api/transit/arrivals/:stopId

Get real-time arrival information for a specific stop.

**Parameters:**
- `stopId` (path parameter): The ID of the transit stop

**Response:**
```json
{
  "success": true,
  "data": {
    "stopId": 1,
    "stopName": "Waterfront Station",
    "arrivals": [
      {
        "route": "Expo Line",
        "destination": "King George",
        "minutes": 3,
        "scheduled": "10:15"
      },
      ...
    ]
  }
}
```

#### GET /api/transit/vehicles

Get current locations of all vehicles.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "routeId": 4,
      "route": "99 B-Line",
      "lat": 49.2827,
      "lng": -123.1207,
      "type": "bus",
      "heading": 90
    },
    ...
  ]
}
```

---

### Route Planning

#### POST /api/routes/plan

Plan a route between two locations.

**Request Body:**
```json
{
  "origin": "Waterfront Station",
  "destination": "Burrard Station",
  "departureTime": "2025-10-01T10:00:00Z",
  "preferences": {
    "minimize": "time",
    "accessible": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "origin": "Waterfront Station",
    "destination": "Burrard Station",
    "departureTime": "2025-10-01T10:00:00Z",
    "duration": 35,
    "distance": 8.5,
    "legs": [
      {
        "mode": "walk",
        "from": "Waterfront Station",
        "to": "Waterfront Station",
        "duration": 5,
        "distance": 0.4
      },
      ...
    ],
    "carbonFootprint": 0.5,
    "cost": 3.15
  }
}
```

#### GET /api/routes/alternatives

Get alternative route options.

**Query Parameters:**
- `origin` (required): Starting location
- `destination` (required): Ending location

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "duration": 35,
      "transfers": 1,
      "modes": ["walk", "skytrain", "walk"],
      "carbonFootprint": 0.5
    },
    ...
  ]
}
```

#### POST /api/routes/optimize

Optimize a route using AI.

**Request Body:**
```json
{
  "route": {
    "origin": "Waterfront Station",
    "destination": "Burrard Station"
  },
  "preferences": {
    "minimize": "crowding",
    "accessible": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "optimized": true,
    "improvements": [
      "Switched to earlier departure for less crowded vehicle",
      "Optimized walking route to reduce distance by 100m"
    ],
    "carbonSaved": 0.1,
    "timeSaved": 5
  }
}
```

---

### AI Features

#### POST /api/ai/predict-delay

Predict potential delays for a route.

**Request Body:**
```json
{
  "routeId": 1,
  "stopId": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "routeId": 1,
    "stopId": 5,
    "prediction": {
      "expectedDelay": 2,
      "confidence": 0.85,
      "factors": [
        "Traffic congestion on Main St",
        "Weather conditions",
        "Time of day"
      ],
      "updatedArrival": "2025-10-01T10:15:00Z"
    }
  }
}
```

#### POST /api/ai/query

Process natural language queries.

**Request Body:**
```json
{
  "query": "How do I get from Waterfront to Burrard?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "intent": "route_planning",
    "entities": {
      "origin": "Waterfront Station",
      "destination": "Burrard Station"
    },
    "response": "The fastest route from Waterfront to Burrard is via the Expo Line. It takes approximately 3 minutes.",
    "suggestedAction": "plan_route"
  }
}
```

#### GET /api/ai/crowd-density

Get crowd density predictions for a route.

**Query Parameters:**
- `routeId` (required): The route ID
- `time` (optional): ISO timestamp for prediction

**Response:**
```json
{
  "success": true,
  "data": {
    "routeId": 1,
    "time": "2025-10-01T08:00:00Z",
    "density": "high",
    "level": 85,
    "recommendation": "Consider taking an alternative route or waiting for the next vehicle"
  }
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### HTTP Status Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

Currently not implemented. Future versions will include rate limiting.

---

## CORS

CORS is enabled for the frontend application running on `http://localhost:3001`.

---

## Development

### Running the Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001
```

---

## Future Enhancements

- [ ] Real API integration with TransLink and Deutsche Bahn
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Redis caching
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] WebSocket support for real-time updates
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
