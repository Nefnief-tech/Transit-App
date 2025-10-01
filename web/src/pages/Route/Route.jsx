import React from 'react'
import './Route.css'

function Route() {
  return (
    <div className="route-page">
      <h1>Transit Map</h1>
      <div className="map-container">
        <div className="map-placeholder">
          <p>Interactive Transit Map</p>
          <p className="map-info">Map integration with Mapbox GL JS coming soon</p>
          <div className="map-features">
            <div className="map-feature">
              <h3>Full-screen View</h3>
              <p>Explore the transit network in detail</p>
            </div>
            <div className="map-feature">
              <h3>Vehicle Tracking</h3>
              <p>See real-time vehicle positions</p>
            </div>
            <div className="map-feature">
              <h3>Stop Information</h3>
              <p>Get details about stops and schedules</p>
            </div>
            <div className="map-feature">
              <h3>Route Overlays</h3>
              <p>View different routes and their paths</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Route
