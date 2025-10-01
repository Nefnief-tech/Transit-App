import React from 'react'
import './RouteCard.css'

function RouteCard({ route }) {
  return (
    <div className="route-card">
      <div className="route-header">
        <div className="route-info">
          <span className="route-origin">{route.origin}</span>
          <span className="route-arrow">→</span>
          <span className="route-destination">{route.destination}</span>
        </div>
        <div className="route-duration">{route.duration}</div>
      </div>
      
      <div className="route-details">
        <div className="route-detail-item">
          <span className="detail-label">Transfers:</span>
          <span className="detail-value">{route.transfers}</span>
        </div>
        <div className="route-detail-item">
          <span className="detail-label">Modes:</span>
          <span className="detail-value">{route.modes.join(', ')}</span>
        </div>
      </div>

      <div className="route-actions">
        <button className="route-action-button">View Details</button>
        <button className="route-action-button secondary">Save Route</button>
      </div>
    </div>
  )
}

export default RouteCard
