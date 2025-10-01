import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchType, setSearchType] = useState('route')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [busNumber, setBusNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchType === 'route' && origin && destination && onSearch) {
      onSearch({ type: 'route', origin, destination })
    } else if (searchType === 'bus' && busNumber && onSearch) {
      onSearch({ type: 'bus', busNumber })
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-type-selector">
        <button
          type="button"
          className={`type-button ${searchType === 'route' ? 'active' : ''}`}
          onClick={() => setSearchType('route')}
        >
          Route Search
        </button>
        <button
          type="button"
          className={`type-button ${searchType === 'bus' ? 'active' : ''}`}
          onClick={() => setSearchType('bus')}
        >
          Bus Line Search
        </button>
      </div>

      <div className="search-inputs">
        {searchType === 'route' ? (
          <>
            <input
              type="text"
              placeholder="Enter origin..."
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Enter destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="search-input"
            />
          </>
        ) : (
          <input
            type="text"
            placeholder="Enter bus number (e.g., 99, 4, R4)..."
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            className="search-input"
          />
        )}
      </div>
      <button type="submit" className="search-button">
        {searchType === 'route' ? 'Search Routes' : 'Search Bus Line'}
      </button>
    </form>
  )
}

export default SearchBar
