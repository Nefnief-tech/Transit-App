import aiService from '../../services/realtime/aiService.js'

// Predict transit delays
export const predictDelay = async (req, res) => {
  try {
    const { routeId, stopId } = req.body
    
    if (!routeId) {
      return res.status(400).json({
        success: false,
        error: 'Route ID is required'
      })
    }

    const prediction = await aiService.predictDelay({ routeId, stopId })
    res.json({
      success: true,
      data: prediction
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Natural language query
export const nlpQuery = async (req, res) => {
  try {
    const { query } = req.body
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Query is required'
      })
    }

    const result = await aiService.processNLPQuery(query)
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Get crowd density predictions
export const getCrowdDensity = async (req, res) => {
  try {
    const { routeId, time } = req.query
    
    if (!routeId) {
      return res.status(400).json({
        success: false,
        error: 'Route ID is required'
      })
    }

    const density = await aiService.getCrowdDensity({ routeId, time })
    res.json({
      success: true,
      data: density
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
