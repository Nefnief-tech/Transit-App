# Data Pipeline

This directory contains data processing scripts, ETL pipelines, and GTFS data management for TransitFlow AI.

## Structure (To Be Implemented)

```
data/
├── gtfs/                 # GTFS feed storage
│   ├── translink/        # Vancouver TransLink data
│   ├── db/               # Deutsche Bahn data
│   └── regional/         # Regional transit data
├── raw/                  # Raw data downloads
├── processed/            # Processed data
├── cache/                # Cached results
├── scripts/              # Data processing scripts
│   ├── download_gtfs.py
│   ├── process_gtfs.py
│   ├── validate_gtfs.py
│   └── import_to_db.py
├── etl/                  # ETL pipelines
│   ├── extract/
│   ├── transform/
│   └── load/
└── README.md            # This file
```

## Data Sources

### GTFS Static Feeds

Static schedule data in GTFS format:
- **TransLink (Vancouver)**: https://www.translink.ca/gtfs
- **Deutsche Bahn**: Via regional providers
- **European Feeds**: https://eu.data.public-transport.earth/

### GTFS Realtime Feeds

Real-time updates (Protocol Buffers):
- Vehicle positions
- Trip updates
- Service alerts

### Supplementary Data

- Weather data (OpenWeatherMap)
- Historical archives
- User-generated reports

## GTFS Data Management

### Download Feeds

```bash
# Download TransLink GTFS
python scripts/download_gtfs.py --provider translink --output gtfs/translink/

# Download DB regional data
python scripts/download_gtfs.py --provider db --region berlin --output gtfs/db/
```

### Process GTFS

```bash
# Process and validate GTFS feed
python scripts/process_gtfs.py \
  --input gtfs/translink/gtfs.zip \
  --output processed/translink/ \
  --validate

# Import to database
python scripts/import_to_db.py \
  --provider translink \
  --input processed/translink/
```

### Validate GTFS

```bash
# Validate GTFS feed
python scripts/validate_gtfs.py --input gtfs/translink/gtfs.zip

# Check for errors
# - Missing required files
# - Invalid data formats
# - Referential integrity issues
```

## ETL Pipeline

### Architecture

```
Data Sources → Extract → Transform → Load → Database
                  ↓          ↓          ↓
               Raw Data → Processed → PostgreSQL/MongoDB
```

### Extract

Extract data from various sources:
```python
# scripts/etl/extract.py
def extract_translink_api():
    """Extract data from TransLink API."""
    # Fetch real-time data
    # Store in raw/
    pass

def extract_gtfs_static():
    """Extract GTFS static feeds."""
    # Download GTFS zip
    # Extract files
    pass
```

### Transform

Transform and clean data:
```python
# scripts/etl/transform.py
def transform_gtfs(feed_path):
    """Transform GTFS data."""
    # Parse CSV files
    # Normalize data
    # Add calculated fields
    # Validate integrity
    pass
```

### Load

Load into databases:
```python
# scripts/etl/load.py
def load_to_postgres(data, table):
    """Load data to PostgreSQL."""
    # Bulk insert
    # Update indexes
    pass
```

## Data Processing Scripts

### download_gtfs.py

Download GTFS feeds from providers:

```bash
python scripts/download_gtfs.py \
  --provider translink \
  --output gtfs/translink/ \
  --update-if-newer
```

### process_gtfs.py

Process and validate GTFS data:

```bash
python scripts/process_gtfs.py \
  --input gtfs/translink/gtfs.zip \
  --output processed/translink/ \
  --validate \
  --add-geo-features
```

### import_to_db.py

Import processed data to database:

```bash
python scripts/import_to_db.py \
  --provider translink \
  --input processed/translink/ \
  --db-uri postgresql://localhost/transitflow
```

### sync_realtime.py

Sync real-time data continuously:

```bash
python scripts/sync_realtime.py \
  --provider translink \
  --interval 30 \
  --output cache/realtime/
```

## Data Models

### GTFS Tables

Standard GTFS tables imported:
- agency
- routes
- trips
- stops
- stop_times
- calendar
- calendar_dates
- shapes
- transfers
- feed_info

### Extended Tables

Additional tables for app features:
- stop_facilities (accessibility info)
- route_patterns (common patterns)
- historical_delays (for ML training)
- user_feedback (crowdsourcing)

## Real-time Processing

### Streaming Architecture

```
GTFS-RT Feed → Kafka → Stream Processor → Cache (Redis) → API
                          ↓
                    Time-series DB (InfluxDB)
```

### Stream Processing

```python
from kafka import KafkaConsumer
from google.transit import gtfs_realtime_pb2

def process_vehicle_positions():
    consumer = KafkaConsumer('vehicle-positions')
    
    for message in consumer:
        feed = gtfs_realtime_pb2.FeedMessage()
        feed.ParseFromString(message.value)
        
        for entity in feed.entity:
            if entity.HasField('vehicle'):
                # Update Redis cache
                # Store in time-series DB
                pass
```

## Data Quality

### Validation Checks

- Required files present
- Valid data formats
- Referential integrity
- Temporal consistency
- Spatial accuracy

### Monitoring

```python
def monitor_data_quality():
    """Monitor data quality metrics."""
    metrics = {
        'missing_values': check_missing(),
        'outliers': detect_outliers(),
        'freshness': check_data_age(),
        'completeness': check_completeness()
    }
    return metrics
```

## Scheduled Jobs

### Cron Schedule

```bash
# Daily GTFS static update (2 AM)
0 2 * * * /app/scripts/download_gtfs.py --provider translink

# Hourly data quality check
0 * * * * /app/scripts/check_data_quality.py

# Weekly cleanup
0 0 * * 0 /app/scripts/cleanup_old_data.py
```

## Storage

### Local Storage

- Raw data: `data/raw/`
- Processed: `data/processed/`
- Cache: `data/cache/`

### Cloud Storage (Production)

- S3 bucket: `transitflow-data`
- Structure:
  - `gtfs-static/[provider]/[date]/`
  - `gtfs-realtime/[provider]/[date]/`
  - `processed/[provider]/[date]/`

## Tools

### GTFS Utilities

```bash
# Install GTFS toolkit
pip install gtfs-kit

# Use in Python
import gtfs_kit as gk

feed = gk.read_feed('gtfs.zip', dist_units='km')
stops = feed.stops
routes = feed.routes
```

### Data Visualization

```python
import geopandas as gpd
import matplotlib.pyplot as plt

# Visualize stops
gdf = gpd.GeoDataFrame(stops, geometry='geometry')
gdf.plot()
plt.show()
```

## Performance

### Optimization

- Parallel processing for large feeds
- Incremental updates (only changed data)
- Indexing for fast queries
- Partitioning for large tables
- Compression for storage

## Contributing

When adding new data sources:
1. Document the source in `docs/API_INTEGRATION.md`
2. Add extraction script in `scripts/`
3. Add transformation logic
4. Update database schema if needed
5. Add tests
6. Update this README

## Resources

- [GTFS Specification](https://gtfs.org/)
- [GTFS Best Practices](https://gtfs.org/best-practices/)
- [GTFS Realtime](https://gtfs.org/realtime/)
