import React, { useState } from 'react'
import TransitMap from '../../components/map/TransitMap'
import './Route.css'

function Route() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="route-page">
      <div className="route-header">
        <h1>TRANSIT.MAP</h1>
        <div className="route-controls">
          <button className="control-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <TransitMap fullscreen={isFullscreen} />
      </div>
      <div className="map-info-bar">
        <div className="info-item">
          <span className="info-label">STATUS</span>
          <span className="info-value active">ACTIVE</span>
        </div>
        <div className="info-item">
          <span className="info-label">TRACKING</span>
          <span className="info-value">REAL-TIME</span>
        </div>
        <div className="info-item">
          <span className="info-label">REGION</span>
          <span className="info-value">METRO VANCOUVER</span>
        </div>
      </div>
    </div>
  )
}

export default Route
