import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import transitRoutes from './api/routes/transit.js'
import routingRoutes from './api/routes/routing.js'
import aiRoutes from './api/routes/ai.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001'
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.use('/api/transit', transitRoutes)
app.use('/api/routes', routingRoutes)
app.use('/api/ai', aiRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'TransitFlow AI Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      transit: '/api/transit',
      routing: '/api/routes',
      ai: '/api/ai'
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TransitFlow AI Backend running on http://localhost:${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN}`)
})

export default app
