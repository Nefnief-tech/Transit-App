import React, { useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import RouteCard from '../../components/transit/RouteCard'
import './Search.css'

function Search() {
  const [routes, setRoutes] = useState([])

  const handleSearch = (origin, destination) => {
    // Placeholder for API integration
    console.log('Searching routes from', origin, 'to', destination)
    // Mock data for demonstration
    setRoutes([
      {
        id: 1,
        origin: origin,
        destination: destination,
        duration: '45 min',
        transfers: 1,
        modes: ['Bus', 'Train']
      }
    ])
  }

  return (
    <div className="search-page">
      <h1>Route Planner</h1>
      <SearchBar onSearch={handleSearch} />
      
      <div className="search-results">
        {routes.length === 0 ? (
          <p className="no-results">Enter your origin and destination to find routes</p>
        ) : (
          <div className="routes-list">
            {routes.map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
