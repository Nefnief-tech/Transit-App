# Data Sources Reference

Comprehensive reference for all transit and supplementary data sources used in TransitFlow AI.

## Metro Vancouver (Canada)

### TransLink Open API

**Provider**: TransLink (South Coast British Columbia Transportation Authority)

**Coverage**: Metro Vancouver region
- SkyTrain (Expo, Millennium, Canada Lines)
- West Coast Express
- SeaBus
- Bus network (200+ routes)

**Documentation**: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources

**Registration**: https://developer.translink.ca/

**Data Types**:
- Real-time bus positions
- Real-time arrivals/departures
- Service alerts
- Route information
- Stop information

**API Format**: REST (JSON)

**Authentication**: API Key (free)

**Rate Limits**: Check developer portal (typically generous for non-commercial)

**Update Frequency**:
- Real-time data: 30 seconds
- Static data: Weekly

**Key Endpoints**:
- `/rttiapi/v1/stops/{stopNo}/estimates` - Real-time arrivals
- `/rtti/v1/buses` - Bus locations
- `/RTTI/V1/alerts` - Service alerts

**Example Usage**:
```bash
curl -H "Accept: application/json" \
  "https://api.translink.ca/rttiapi/v1/stops/51234/estimates?apikey=YOUR_KEY"
```

### TransLink GTFS Static

**Documentation**: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/gtfs/gtfs-data

**Format**: GTFS (ZIP archive with CSV files)

**Authentication**: None (public download)

**Files Included**:
- agency.txt
- stops.txt
- routes.txt
- trips.txt
- stop_times.txt
- calendar.txt
- calendar_dates.txt
- shapes.txt
- transfers.txt
- feed_info.txt

**Update Frequency**: Weekly (usually Mondays)

**Download**: Direct download from TransLink website

**Storage**: ~50MB compressed, ~200MB uncompressed

### TransLink GTFS Realtime

**Format**: Protocol Buffers (GTFS-RT)

**Feed Types**:
- Vehicle Positions
- Trip Updates
- Service Alerts

**Authentication**: API Key (same as Open API)

**Update Frequency**: 30 seconds

**Integration**: Part of TransLink Open API

### Additional Vancouver Data

#### UBC Abacus Transit GIS Data

**URL**: https://abacus.library.ubc.ca/dataset.xhtml?persistentId=hdl:11272.1/AB2/FOC8VO

**Provider**: University of British Columbia Library

**Content**:
- Station locations (GeoJSON)
- Route geometries
- Transit network topology

**Format**: GeoJSON, Shapefile

**License**: Open Data (various licenses per dataset)

**Use Case**: Mapping, spatial analysis, route visualization

#### City of Vancouver Open Data

**URL**: https://opendata.vancouver.ca/explore/dataset/rapid-transit-stations/

**Content**:
- Rapid transit station locations
- Station amenities
- Accessibility features

**Formats**: GeoJSON, CSV, JSON, Shapefile

**License**: Open Government Licence - Vancouver

**Update Frequency**: As needed (station changes)

## Germany

### DB Transport REST API

**Provider**: Community-maintained (derhuerst)

**URL**: https://v6.db.transport.rest/

**Coverage**: Germany nationwide
- Deutsche Bahn trains (ICE, IC, EC, regional)
- Regional buses and trams
- S-Bahn and U-Bahn networks

**Authentication**: None required (fair use)

**API Format**: REST (JSON)

**Rate Limits**: Fair use policy (be respectful)

**Data Types**:
- Location search
- Journey planning
- Departures/Arrivals
- Station information
- Trip details

**Key Endpoints**:
- `/locations?query={name}` - Search locations
- `/journeys?from={id}&to={id}` - Plan journey
- `/stops/{id}/departures` - Get departures
- `/stops/{id}/arrivals` - Get arrivals
- `/stops/nearby?latitude={lat}&longitude={lon}` - Nearby stops

**Example**:
```bash
curl 'https://v6.db.transport.rest/locations?query=Berlin+Hauptbahnhof'
```

**Advantages**:
- Free and open
- Well-maintained
- Comprehensive documentation
- Active community

### DB Fahrplan API

**Provider**: Deutsche Bahn (official)

**URL**: https://www.facts.dev/api/db-fahrplan-api/

**Documentation**: https://developers.deutschebahn.com/

**Coverage**: DB train network

**Authentication**: API Key required

**Registration**: https://developers.deutschebahn.com/

**API Format**: REST (XML responses)

**Rate Limits**: Tiered based on plan

**Data Types**:
- Timetables
- Delays
- Platform information
- Station data

**Key Endpoints**:
- `/location.name` - Search stations
- `/departureBoard` - Departure information
- `/arrivalBoard` - Arrival information
- `/journeyDetail` - Journey details

**Note**: XML responses require conversion to JSON

### RIS::Stations API

**Provider**: DB InfraGO (official)

**URL**: https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-stations/api/ris-stations

**Coverage**: All German railway stations

**Authentication**: API Key + Client ID

**Registration**: DB Developer Portal

**API Format**: REST (JSON)

**Data Types**:
- Station master data
- Facilities and amenities
- Accessibility information
- Geographic coordinates
- Operating companies

**Key Endpoints**:
- `/stations` - All stations
- `/stations/{id}` - Station by ID
- `/stations?name={query}` - Search stations

**Example**:
```bash
curl -H "DB-Client-Id: YOUR_ID" \
     -H "DB-Api-Key: YOUR_KEY" \
     'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stations'
```

**Advantages**:
- Official source
- High quality data
- Comprehensive metadata

### Verbundkarte Collection

**Repository**: https://github.com/highsource/verbundkarte

**Provider**: Community (highsource)

**Coverage**: Regional German transport networks
- HVV (Hamburg)
- VBB (Berlin-Brandenburg)
- VRR (Rhine-Ruhr)
- MVV (Munich)
- And many more Verkehrsverbunde

**Format**: GTFS feeds

**Authentication**: None (public)

**Access**: Clone repository or download specific feeds

**Use Case**: Regional transit integration beyond DB

**Update Frequency**: Varies by source

## Europe (Cross-Border)

### European Transport Feeds

**Portal**: https://eu.data.public-transport.earth/

**Provider**: MobilityData and European contributors

**Coverage**: 30+ European countries

**Countries Included**:
- France (SNCF, regional)
- Netherlands (NS, regional)
- Switzerland (SBB, regional)
- Austria (ÖBB, regional)
- Belgium (SNCB/NMBS)
- Spain (Renfe, regional)
- Italy (Trenitalia, regional)
- And more...

**Format**: GTFS and NeTEx

**Authentication**: None (public downloads)

**Access**: Direct download per region/operator

**GTFS vs NeTEx**:
- GTFS: Standard format (easier to use)
- NeTEx: European standard (requires conversion)

**Use Case**: Multi-country trip planning

### Lyko Public Transit API

**Provider**: Lyko Technologies

**URL**: https://lyko.tech/en/public-transit-api/

**Coverage**: 300+ European operators
- Deutsche Bahn
- SNCF (France)
- NS (Netherlands)
- SBB (Switzerland)
- Regional operators

**Authentication**: API Key (commercial)

**API Format**: REST (JSON)

**Pricing**: Tiered based on usage
- Free tier: Limited calls
- Paid tiers: Higher limits

**Features**:
- Multi-modal journey planning
- Real-time departures
- Intermodal connections
- Cross-border routing

**Advantages**:
- Single API for wide coverage
- Standardized format
- Commercial support

**Contact**: info@lyko.tech

### Swiss Public Transport API

**URL**: https://transport.opendata.ch/

**Provider**: OpenData.ch

**Coverage**: Swiss public transport
- SBB trains
- Regional trains
- Buses
- Trams
- Boats

**Authentication**: None (rate limited)

**API Format**: REST (JSON)

**Rate Limits**: 1000 requests/day (fair use)

**Endpoints**:
- `/v1/locations` - Search locations
- `/v1/connections` - Plan connections
- `/v1/stationboard` - Departures/arrivals

**Example**:
```bash
curl 'https://transport.opendata.ch/v1/connections?from=Zürich&to=Bern'
```

**Advantages**:
- Free
- Well-documented
- Reliable
- Easy to use

### National Access Points (NAPs)

**Overview**: https://www.trafiklab.se/api/other-apis/public-transport-europe/

**Description**: EU-mandated data portals per country

**Germany**:
- Portal: Mobilithek (mobilithek.info)
- Format: Various (GTFS, NeTEx)
- Coverage: Nationwide

**France**:
- Portal: transport.data.gouv.fr
- Format: GTFS, NeTEx
- Coverage: Nationwide

**Netherlands**:
- Portal: ndovloket.nl
- Format: GTFS
- Coverage: Nationwide

**UK**:
- Portal: data.gov.uk
- Includes: TfL, National Rail
- Format: Various

**Advantages**:
- Official sources
- Comprehensive
- Free

**Challenges**:
- Different formats per country
- Varying update frequencies
- Documentation quality varies

### Awesome Transit Repository

**URL**: https://github.com/MobilityData/awesome-transit

**Description**: Curated list of transit APIs and datasets

**Content**:
- Global transit APIs
- Open data sources
- Tools and libraries
- Community resources

**Use Case**: Discovering additional data sources

## Supplementary Data

### Weather Data - OpenWeatherMap

**URL**: https://openweathermap.org/api

**Purpose**: Weather data for delay predictions

**Registration**: https://openweathermap.org/appid

**API Format**: REST (JSON)

**Authentication**: API Key

**Free Tier**: 1,000 calls/day

**Paid Tiers**: Higher limits available

**Endpoints**:
- `/data/2.5/weather` - Current weather
- `/data/2.5/forecast` - 5-day forecast
- `/data/2.5/onecall/timemachine` - Historical data

**Data Types**:
- Temperature
- Precipitation
- Wind speed
- Humidity
- Air pressure

**Example**:
```bash
curl 'https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=YOUR_KEY'
```

### Historical Transit Data

**Sources**:
- GTFS Realtime archives
- Transit agency historical APIs
- Academic datasets
- OpenStreetMap transit data

**Purpose**: ML model training

**Storage**: Time-series databases (InfluxDB)

### User-Generated Data

**Types**:
- Route preferences
- Delay reports
- Crowding observations
- Accessibility feedback

**Privacy**: Anonymized and aggregated

**Consent**: Required via opt-in

**Compliance**: GDPR-compliant

## Data Integration Strategy

### Priority Tiers

**Tier 1 (MVP)**:
- TransLink (Vancouver)
- DB Transport REST API (Germany)
- OpenWeatherMap

**Tier 2 (Post-MVP)**:
- Swiss Public Transport API
- DB Fahrplan API
- RIS::Stations API
- Verbundkarte data

**Tier 3 (Future)**:
- Lyko API (for comprehensive European coverage)
- European Transport Feeds (selected regions)
- Additional NAPs

### Data Standardization

**Approach**: Convert all data to internal format based on GTFS

**Benefits**:
- Consistent API
- Easier maintenance
- Simplified client integration

**Pipeline**:
```
External API → Adapter → Internal Format → Cache → Client API
```

### Data Quality

**Validation Steps**:
1. Format validation
2. Completeness check
3. Referential integrity
4. Temporal consistency
5. Spatial accuracy

**Monitoring**:
- Data freshness alerts
- Quality metrics dashboard
- Automated validation tests

## API Key Management

### Required Keys

For development and production:
- TransLink API Key (free)
- DB Developer Portal (free tier)
- OpenWeatherMap API Key (free tier)
- Mapbox API Key (free tier)

Optional:
- Lyko API Key (paid)
- Premium weather data (paid)

### Key Storage

**Development**: `.env` file (gitignored)

**Production**: AWS Secrets Manager or similar

**Rotation**: Every 6 months or as needed

## Legal and Compliance

### Data Usage Rights

- **TransLink**: Open API license (check terms)
- **DB**: Developer API terms
- **OpenWeatherMap**: Free tier terms
- **Community APIs**: Fair use

### Attribution Requirements

Give credit where required:
- Map data: © OpenStreetMap contributors
- Transit data: © respective agencies
- Weather data: © OpenWeatherMap

### Privacy Compliance

- GDPR (Europe)
- PIPEDA (Canada)
- User consent for personalization
- Data minimization
- Right to deletion

## Support and Updates

### Monitoring

- API status pages
- Uptime monitoring
- Alert systems for outages

### Communication Channels

- API provider newsletters
- Developer forums
- GitHub repositories
- Email notifications

### Regular Reviews

- Quarterly: Review API usage and costs
- Bi-annually: Evaluate new data sources
- Annually: Comprehensive data audit

## Resources

- [GTFS Specification](https://gtfs.org/)
- [GTFS Best Practices](https://gtfs.org/best-practices/)
- [European Transport Data](https://www.trafiklab.se/api/)
- [MobilityData](https://mobilitydata.org/)

Last Updated: 2024
