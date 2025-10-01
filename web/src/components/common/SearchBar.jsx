import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (origin && destination && onSearch) {
      onSearch(origin, destination)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-inputs">
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
      </div>
      <button type="submit" className="search-button">
        Search Routes
      </button>
    </form>
  )
}

export default SearchBar
