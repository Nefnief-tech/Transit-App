import transitService from '../../services/transit/transitService.js'

// Get available transit routes
export const getRoutes = async (req, res) => {
  try {
    const routes = await transitService.getRoutes()
    res.json({
      success: true,
      data: routes
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get transit stops
export const getStops = async (req, res) => {
  try {
    const stops = await transitService.getStops()
    res.json({
      success: true,
      data: stops
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get real-time arrivals for a stop
export const getArrivals = async (req, res) => {
  try {
    const { stopId } = req.params
    const arrivals = await transitService.getArrivals(stopId)
    res.json({
      success: true,
      data: arrivals
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get vehicle locations
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await transitService.getVehicles()
    res.json({
      success: true,
      data: vehicles
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
