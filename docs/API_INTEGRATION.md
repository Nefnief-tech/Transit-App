# API Integration Guide

This document provides detailed information about integrating with various transit APIs for TransitFlow AI.

## Overview

TransitFlow AI integrates with multiple transit data providers across Metro Vancouver and Germany/Europe. All integrations follow standardized patterns using GTFS (General Transit Feed Specification) where possible.

## Metro Vancouver APIs

### TransLink Open API

**Purpose**: Real-time bus positions, arrivals, and service alerts

**Documentation**: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources

**Authentication**: API Key required
- Register at: developer.translink.ca
- Add key to environment variables: `TRANSLINK_API_KEY`

**Endpoints**:
- Real-time arrivals: `/rttiapi/v1/stops/{stopNo}/estimates`
- Bus locations: `/rtti/v1/buses`
- Service alerts: `/RTTI/V1/alerts`

**Rate Limits**: Check developer portal for current limits

**Example Request**:
```bash
curl -H "Accept: application/json" \
     "https://api.translink.ca/rttiapi/v1/stops/51234/estimates?apikey=YOUR_API_KEY"
```

**Response Format**: JSON

### TransLink GTFS Static Data

**Purpose**: Schedules, routes, stops, and route shapes

**Download**: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/gtfs/gtfs-data

**Format**: ZIP archive containing CSV files
- agency.txt
- stops.txt
- routes.txt
- trips.txt
- stop_times.txt
- calendar.txt
- shapes.txt

**Update Frequency**: Weekly (check for updates regularly)

**Storage**: Download and store in `data/gtfs/translink/`

**Processing**:
```python
import gtfs_kit as gk

# Load GTFS feed
feed = gk.read_feed('data/gtfs/translink/gtfs.zip', dist_units='km')

# Access stops
stops = feed.stops
```

### TransLink GTFS Realtime

**Purpose**: Live vehicle positions and trip updates

**Documentation**: Integrated with Open API

**Protocol**: Protocol Buffers (protobuf)

**Feed URLs**:
- Vehicle Positions: `/gtfsrealtime?apikey=YOUR_API_KEY`
- Trip Updates: `/gtfsrealtime/TripUpdates?apikey=YOUR_API_KEY`
- Service Alerts: `/gtfsrealtime/Alerts?apikey=YOUR_API_KEY`

**Processing**:
```python
from google.transit import gtfs_realtime_pb2
import requests

# Fetch realtime feed
response = requests.get(FEED_URL)
feed = gtfs_realtime_pb2.FeedMessage()
feed.ParseFromString(response.content)

# Process entities
for entity in feed.entity:
    if entity.HasField('vehicle'):
        print(f"Vehicle {entity.vehicle.vehicle.id} at position...")
```

### Additional Vancouver Data

**UBC Abacus Transit GIS Data**:
- URL: https://abacus.library.ubc.ca/dataset.xhtml?persistentId=hdl:11272.1/AB2/FOC8VO
- Format: GeoJSON
- Content: Station locations, route geometries

**City of Vancouver Open Data**:
- URL: https://opendata.vancouver.ca/explore/dataset/rapid-transit-stations/
- Format: GeoJSON, CSV, JSON
- Content: Rapid transit station locations with amenities

## Germany APIs

### DB Transport REST API

**Purpose**: Comprehensive timetables, real-time data, station info

**Documentation**: https://v6.db.transport.rest/

**Authentication**: None required for non-commercial use

**Key Features**:
- Location search
- Journey planning
- Departures/Arrivals
- Nearby stops
- Trip details

**Endpoints**:
- Locations: `/locations?query={name}`
- Journeys: `/journeys?from={id}&to={id}`
- Departures: `/stops/{id}/departures`
- Arrivals: `/stops/{id}/arrivals`
- Nearby: `/stops/nearby?latitude={lat}&longitude={lon}`

**Example Request**:
```bash
curl 'https://v6.db.transport.rest/locations?query=Berlin%20Hauptbahnhof&results=1'
```

**Response Format**: JSON (detailed, nested structure)

**Rate Limits**: Fair use policy for non-commercial use

### DB Fahrplan API

**Purpose**: Schedules, routes, real-time information

**Documentation**: https://www.facts.dev/api/db-fahrplan-api/

**Authentication**: API Key required
- Register at: developers.deutschebahn.com
- Add key to environment variables: `DB_FAHRPLAN_API_KEY`

**Endpoints**:
- Location search: `/location.name`
- Departure board: `/departureBoard`
- Arrival board: `/arrivalBoard`
- Journey details: `/journeyDetail`

**Format**: XML responses (consider converting to JSON)

### RIS::Stations API

**Purpose**: Official DB InfraGO stop-place data

**Documentation**: https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-stations/api/ris-stations

**Authentication**: API Key required
- Register at: developers.deutschebahn.com
- Add key to environment variables: `DB_RIS_API_KEY`

**Endpoints**:
- All stations: `/stations`
- Station by ID: `/stations/{id}`
- Search stations: `/stations?name={query}`

**Features**:
- Station metadata
- Facilities and accessibility
- Geographic coordinates
- Operating companies

**Example Request**:
```bash
curl -H "DB-Client-Id: YOUR_CLIENT_ID" \
     -H "DB-Api-Key: YOUR_API_KEY" \
     'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stations'
```

### Verbundkarte Collection

**Purpose**: Aggregated German regional transport data

**Repository**: https://github.com/highsource/verbundkarte

**Content**:
- GTFS feeds from various Verkehrsverbunde
- Regional transport networks (HVV, VBB, VRR, etc.)

**Usage**:
- Clone or download specific regional datasets
- Parse GTFS data as with TransLink
- Coordinate conversion may be required

## European APIs

### European Transport Feeds

**Purpose**: Comprehensive GTFS/NeTEx feeds across Europe

**Portal**: https://eu.data.public-transport.earth/

**Coverage**:
- France (SNCF, local transit)
- Netherlands (NS, local transit)
- Switzerland (SBB, local transit)
- Austria, Belgium, Spain, Italy, and more

**Format**: GTFS and NeTEx
- GTFS: Standard format (same as TransLink)
- NeTEx: European XML standard (requires conversion)

**Access**: Direct download links per region

### Lyko Public Transit API

**Purpose**: Aggregated data from 300+ European operators

**Documentation**: https://lyko.tech/en/public-transit-api/

**Authentication**: API Key required
- Contact Lyko for access
- Add key to environment variables: `LYKO_API_KEY`

**Features**:
- Multi-modal journey planning
- Real-time departures/arrivals
- Intermodal connections
- Cross-border routing

**Coverage**: DB, SNCF, NS, SBB, and many regional operators

**Benefits**:
- Single API for wide European coverage
- Standardized response format
- Reduced integration complexity

**Pricing**: Tiered pricing based on API calls

### Swiss Public Transport API

**Purpose**: Swiss transport network (trains, buses, trams, boats)

**Documentation**: https://transport.opendata.ch/

**Authentication**: None required (rate limits apply)

**Endpoints**:
- Locations: `/v1/locations`
- Connections: `/v1/connections`
- Stationboard: `/v1/stationboard`

**Example**:
```bash
curl 'https://transport.opendata.ch/v1/connections?from=Zürich&to=Bern'
```

**Response**: JSON with detailed journey information

### National Access Points (NAPs)

**Purpose**: EU-mandated country-specific data portals

**Overview**: https://www.trafiklab.se/api/other-apis/public-transport-europe/

**Per Country**:
- Germany: Mobilithek (mobilithek.info)
- France: transport.data.gouv.fr
- Netherlands: ndovloket.nl
- UK: data.gov.uk (TfL, National Rail)

**Benefits**: Official, comprehensive, free

**Challenges**: Different formats per country

## Supplementary APIs

### Weather Data

**OpenWeatherMap API**

**Purpose**: Weather data for delay prediction models

**Documentation**: https://openweathermap.org/api

**Authentication**: API Key required
- Sign up at openweathermap.org
- Add key to environment variables: `OPENWEATHER_API_KEY`

**Endpoints**:
- Current weather: `/data/2.5/weather`
- 5-day forecast: `/data/2.5/forecast`
- Historical: `/data/2.5/onecall/timemachine`

**Example**:
```bash
curl 'https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=YOUR_API_KEY'
```

**Free Tier**: 1,000 calls/day

## Best Practices

### Authentication Management

**Environment Variables**:
```bash
# .env file (never commit this!)
TRANSLINK_API_KEY=your_translink_key
DB_FAHRPLAN_API_KEY=your_db_key
DB_RIS_API_KEY=your_ris_key
LYKO_API_KEY=your_lyko_key
OPENWEATHER_API_KEY=your_weather_key
```

**Loading in Code**:
```python
import os
from dotenv import load_dotenv

load_dotenv()

TRANSLINK_KEY = os.getenv('TRANSLINK_API_KEY')
```

### Rate Limiting

**Implement Backoff**:
```python
import time
from functools import wraps

def rate_limit(max_per_second):
    min_interval = 1.0 / max_per_second
    last_called = [0.0]
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            wait = min_interval - elapsed
            if wait > 0:
                time.sleep(wait)
            result = func(*args, **kwargs)
            last_called[0] = time.time()
            return result
        return wrapper
    return decorator

@rate_limit(max_per_second=10)
def api_call():
    # Make API call
    pass
```

### Caching

**Use Redis for Realtime Data**:
```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, db=0)

def get_cached_or_fetch(key, fetch_func, ttl=60):
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached)
    
    data = fetch_func()
    redis_client.setex(key, ttl, json.dumps(data))
    return data
```

### Error Handling

**Robust API Calls**:
```python
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

def create_session():
    session = requests.Session()
    retry = Retry(
        total=3,
        backoff_factor=0.3,
        status_forcelist=[500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

session = create_session()

try:
    response = session.get(url, timeout=10)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.RequestException as e:
    # Log error and handle gracefully
    print(f"API call failed: {e}")
```

### Data Validation

**Validate GTFS Data**:
```python
def validate_gtfs_feed(feed_path):
    """Validate GTFS feed completeness and integrity."""
    required_files = [
        'agency.txt', 'stops.txt', 'routes.txt',
        'trips.txt', 'stop_times.txt'
    ]
    
    # Check file existence
    # Validate data formats
    # Check referential integrity
    pass
```

### Monitoring

**Track API Health**:
```python
import logging
from prometheus_client import Counter, Histogram

api_calls = Counter('api_calls_total', 'Total API calls', ['provider', 'endpoint'])
api_latency = Histogram('api_latency_seconds', 'API call latency', ['provider'])

@api_latency.labels(provider='translink').time()
def call_translink_api():
    api_calls.labels(provider='translink', endpoint='arrivals').inc()
    # Make API call
    pass
```

## Integration Roadmap

### Phase 1 (MVP)
- [ ] TransLink Open API (real-time)
- [ ] TransLink GTFS Static
- [ ] DB Transport REST API
- [ ] OpenWeatherMap API

### Phase 2
- [ ] TransLink GTFS Realtime
- [ ] DB Fahrplan API
- [ ] RIS::Stations API
- [ ] Swiss Public Transport API

### Phase 3
- [ ] Lyko API (for wide European coverage)
- [ ] European Transport Feeds (selected regions)
- [ ] Verbundkarte data integration
- [ ] Additional NAPs

## Testing

### Mock APIs for Development

Create mock responses for testing without API calls:

```python
# tests/mocks/translink_mock.py
MOCK_ARRIVALS = {
    "stopNo": "51234",
    "estimates": [
        {
            "routeNo": "99",
            "destination": "UBC",
            "schedules": [
                {"expectedCountdown": 5, "scheduleStatus": "*"}
            ]
        }
    ]
}
```

### Integration Tests

```python
import pytest

def test_translink_api_integration():
    """Test real API call (requires API key)."""
    if not os.getenv('TRANSLINK_API_KEY'):
        pytest.skip("API key not available")
    
    # Test API call
    pass
```

## Troubleshooting

### Common Issues

**API Key Errors**:
- Verify key is correctly set in environment
- Check key permissions and scope
- Ensure key hasn't expired

**Rate Limit Exceeded**:
- Implement caching
- Add request queuing
- Consider upgrading API tier

**Data Inconsistencies**:
- Validate feed versions
- Check for feed updates
- Implement data reconciliation

**Network Timeouts**:
- Increase timeout values
- Implement retry logic
- Check API status pages

## Resources

- [GTFS Specification](https://gtfs.org/)
- [GTFS Realtime](https://gtfs.org/realtime/)
- [NeTEx Standard](http://netex-cen.eu/)
- [Awesome Transit](https://github.com/MobilityData/awesome-transit)

## Support

For API-specific issues:
- TransLink: developer.translink.ca
- Deutsche Bahn: developers.deutschebahn.com
- GitHub Issues: Report integration problems

Last Updated: 2024
