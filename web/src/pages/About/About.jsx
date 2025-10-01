import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <h1>About TransitFlow AI</h1>
      
      <section className="about-section">
        <h2>Overview</h2>
        <p>
          TransitFlow AI is an AI-powered daily driver for public transport navigation 
          in Metro Vancouver (Canada) and Germany/Europe. We focus on simplicity, 
          reliability, and enhanced user experience through predictive analytics, 
          natural language queries, and optimized routing.
        </p>
      </section>

      <section className="about-section">
        <h2>Regions Covered</h2>
        <ul>
          <li><strong>Metro Vancouver:</strong> TransLink systems including SkyTrain, SeaBus, and buses</li>
          <li><strong>Germany/Europe:</strong> Deutsche Bahn trains, regional buses/trams, and cross-border routes</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Real-time Tracking</h3>
            <p>Track vehicles and arrivals in real-time</p>
          </div>
          <div className="feature-item">
            <h3>AI-Powered Routing</h3>
            <p>Get intelligent route suggestions with predictive delays</p>
          </div>
          <div className="feature-item">
            <h3>Natural Language Interface</h3>
            <p>Use natural language to query routes and get instant answers</p>
          </div>
          <div className="feature-item">
            <h3>Crowd Density Prediction</h3>
            <p>Estimate bus/train crowding using historical and real-time data</p>
          </div>
          <div className="feature-item">
            <h3>Sustainability Insights</h3>
            <p>Calculate carbon footprint per route with greener alternatives</p>
          </div>
          <div className="feature-item">
            <h3>Accessibility Options</h3>
            <p>Find wheelchair-friendly routes and accessible transit options</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>FAQ</h2>
        <div className="faq-item">
          <h3>How accurate is the real-time data?</h3>
          <p>Our data is sourced directly from transit agencies and updated in real-time.</p>
        </div>
        <div className="faq-item">
          <h3>Can I use the app offline?</h3>
          <p>Yes, offline maps and schedules are available for key routes.</p>
        </div>
        <div className="faq-item">
          <h3>Is the app free?</h3>
          <p>Yes, TransitFlow AI is free to use with basic features. Premium features coming soon.</p>
        </div>
      </section>

      <section className="about-section">
        <h2>Contact</h2>
        <p>Have questions or feedback? We'd love to hear from you!</p>
        <p>Email: support@transitflow.ai</p>
      </section>
    </div>
  )
}

export default About
