import routingService from '../../services/routing/routingService.js'

// Plan a route
export const planRoute = async (req, res) => {
  try {
    const { origin, destination, departureTime, preferences } = req.body
    
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Origin and destination are required'
      })
    }

    const route = await routingService.planRoute({ origin, destination, departureTime, preferences })
    res.json({
      success: true,
      data: route
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get alternative routes
export const getAlternatives = async (req, res) => {
  try {
    const { origin, destination } = req.query
    
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Origin and destination are required'
      })
    }

    const alternatives = await routingService.getAlternatives({ origin, destination })
    res.json({
      success: true,
      data: alternatives
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Optimize route with AI
export const optimizeRoute = async (req, res) => {
  try {
    const { route, preferences } = req.body
    
    if (!route) {
      return res.status(400).json({
        success: false,
        error: 'Route data is required'
      })
    }

    const optimizedRoute = await routingService.optimizeRoute({ route, preferences })
    res.json({
      success: true,
      data: optimizedRoute
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
