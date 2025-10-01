import React, { useState, useEffect } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './TransitMap.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY

// Sample data for Metro Vancouver
const sampleStops = [
  { id: 1, name: 'Waterfront Station', lat: 49.2859, lng: -123.1119, type: 'skytrain' },
  { id: 2, name: 'Burrard Station', lat: 49.2859, lng: -123.1205, type: 'skytrain' },
  { id: 3, name: 'Granville Station', lat: 49.2832, lng: -123.1161, type: 'skytrain' },
  { id: 4, name: 'Stadium-Chinatown', lat: 49.2795, lng: -123.1095, type: 'skytrain' },
  { id: 5, name: 'Main Street-Science World', lat: 49.2731, lng: -123.1004, type: 'skytrain' },
]

const sampleVehicles = [
  { id: 1, route: '99 B-Line', lat: 49.2827, lng: -123.1207, type: 'bus' },
  { id: 2, route: 'Expo Line', lat: 49.2850, lng: -123.1100, type: 'skytrain' },
  { id: 3, route: 'Canada Line', lat: 49.2835, lng: -123.1180, type: 'skytrain' },
]

function TransitMap({ fullscreen = false }) {
  const [viewState, setViewState] = useState({
    longitude: -123.1207,
    latitude: 49.2827,
    zoom: 12
  })
  const [selectedStop, setSelectedStop] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  return (
    <div className={`transit-map-wrapper ${fullscreen ? 'fullscreen' : ''}`}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <GeolocateControl position="top-right" />

        {/* Transit Stops */}
        {sampleStops.map(stop => (
          <Marker
            key={`stop-${stop.id}`}
            longitude={stop.lng}
            latitude={stop.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation()
              setSelectedStop(stop)
            }}
          >
            <div className="stop-marker">
              <div className="stop-marker-icon"></div>
            </div>
          </Marker>
        ))}

        {/* Vehicles */}
        {sampleVehicles.map(vehicle => (
          <Marker
            key={`vehicle-${vehicle.id}`}
            longitude={vehicle.lng}
            latitude={vehicle.lat}
            anchor="center"
            onClick={e => {
              e.originalEvent.stopPropagation()
              setSelectedVehicle(vehicle)
            }}
          >
            <div className={`vehicle-marker ${vehicle.type}`}>
              <div className="vehicle-pulse"></div>
              <div className="vehicle-icon"></div>
            </div>
          </Marker>
        ))}

        {/* Stop Popup */}
        {selectedStop && (
          <Popup
            longitude={selectedStop.lng}
            latitude={selectedStop.lat}
            anchor="top"
            onClose={() => setSelectedStop(null)}
            closeOnClick={false}
          >
            <div className="map-popup">
              <h3>{selectedStop.name}</h3>
              <p className="stop-type">{selectedStop.type.toUpperCase()}</p>
              <div className="arrivals">
                <p className="arrival-time">Next arrival: 3 min</p>
                <p className="arrival-time">Following: 8 min</p>
              </div>
            </div>
          </Popup>
        )}

        {/* Vehicle Popup */}
        {selectedVehicle && (
          <Popup
            longitude={selectedVehicle.lng}
            latitude={selectedVehicle.lat}
            anchor="top"
            onClose={() => setSelectedVehicle(null)}
            closeOnClick={false}
          >
            <div className="map-popup">
              <h3>{selectedVehicle.route}</h3>
              <p className="vehicle-status">In Service</p>
              <p className="vehicle-info">Next stop in 2 min</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  )
}

export default TransitMap
