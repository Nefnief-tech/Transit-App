import React, { useState } from 'react'
import SearchBar from '../../components/common/SearchBar'
import RouteCard from '../../components/transit/RouteCard'
import BusLineCard from '../../components/transit/BusLineCard'
import transitService from '../../services/transitService'
import './Search.css'

function Search() {
  const [searchType, setSearchType] = useState(null)
  const [routes, setRoutes] = useState([])
  const [busLines, setBusLines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (searchData) => {
    setLoading(true)
    setError(null)
    
    try {
      if (searchData.type === 'route') {
        // Placeholder for route search
        console.log('Searching routes from', searchData.origin, 'to', searchData.destination)
        setSearchType('route')
        // Mock data for demonstration
        setRoutes([
          {
            id: 1,
            origin: searchData.origin,
            destination: searchData.destination,
            duration: '45 min',
            transfers: 1,
            modes: ['Bus', 'Train']
          }
        ])
        setBusLines([])
      } else if (searchData.type === 'bus') {
        // Search for bus lines
        console.log('Searching bus line:', searchData.busNumber)
        setSearchType('bus')
        const response = await transitService.searchBusLines(searchData.busNumber)
        if (response.success) {
          setBusLines(response.data)
          setRoutes([])
        }
      }
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to fetch data. Please try again.')
      setRoutes([])
      setBusLines([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-page">
      <h1>Route Planner</h1>
      <SearchBar onSearch={handleSearch} />
      
      <div className="search-results">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : !searchType ? (
          <p className="no-results">Enter your search to find routes or bus lines</p>
        ) : searchType === 'route' && routes.length === 0 ? (
          <p className="no-results">No routes found</p>
        ) : searchType === 'bus' && busLines.length === 0 ? (
          <p className="no-results">No bus lines found</p>
        ) : (
          <div className="results-list">
            {searchType === 'route' && routes.map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
            {searchType === 'bus' && busLines.map((busLine, index) => (
              <BusLineCard key={index} busLine={busLine} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
