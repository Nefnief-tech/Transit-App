import React from 'react'
import './BusLineCard.css'

function BusLineCard({ busLine }) {
  return (
    <div className="bus-line-card">
      <div className="bus-line-header">
        <div className="bus-line-number">{busLine.RouteNo}</div>
        <div className="bus-line-name">{busLine.RouteName}</div>
      </div>
      
      {busLine.Direction && (
        <div className="bus-line-direction">
          <span className="direction-label">Direction:</span>
          <span className="direction-value">{busLine.Direction}</span>
        </div>
      )}

      {busLine.Destination && (
        <div className="bus-line-destination">
          <span className="destination-label">To:</span>
          <span className="destination-value">{busLine.Destination}</span>
        </div>
      )}

      <div className="bus-line-actions">
        <button className="bus-line-action-button">View Schedule</button>
        <button className="bus-line-action-button secondary">Track Live</button>
      </div>
    </div>
  )
}

export default BusLineCard
