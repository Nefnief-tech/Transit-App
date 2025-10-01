import React from 'react'
import SearchBar from '../../components/common/SearchBar'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>TransitFlow AI</h1>
        <p className="hero-subtitle">
          AI-powered public transport navigation for Metro Vancouver and Germany/Europe
        </p>
        <SearchBar />
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-time Tracking</h3>
            <p>Track vehicles and arrivals in real-time</p>
          </div>
          <div className="feature-card">
            <h3>AI-Powered Routing</h3>
            <p>Get intelligent route suggestions with predictive delays</p>
          </div>
          <div className="feature-card">
            <h3>Multi-modal Transit</h3>
            <p>Seamlessly combine buses, trains, trams, and more</p>
          </div>
          <div className="feature-card">
            <h3>Eco-Friendly</h3>
            <p>Calculate carbon footprint and find greener alternatives</p>
          </div>
        </div>
      </section>

      <section className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <a href="/search" className="quick-link">Plan a Route</a>
          <a href="/route" className="quick-link">View Transit Map</a>
          <a href="/about" className="quick-link">Learn More</a>
        </div>
      </section>
    </div>
  )
}

export default Home
