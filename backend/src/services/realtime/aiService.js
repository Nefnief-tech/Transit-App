// Mock AI service
const aiService = {
  predictDelay: async ({ routeId, stopId }) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return {
      routeId,
      stopId,
      prediction: {
        expectedDelay: 2, // minutes
        confidence: 0.85,
        factors: [
          'Traffic congestion on Main St',
          'Weather conditions',
          'Time of day'
        ],
        updatedArrival: new Date(Date.now() + 5 * 60000).toISOString()
      }
    }
  },

  processNLPQuery: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Simple mock NLP processing
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('waterfront') && lowerQuery.includes('burrard')) {
      return {
        intent: 'route_planning',
        entities: {
          origin: 'Waterfront Station',
          destination: 'Burrard Station'
        },
        response: 'The fastest route from Waterfront to Burrard is via the Expo Line. It takes approximately 3 minutes.',
        suggestedAction: 'plan_route'
      }
    }
    
    return {
      intent: 'general_query',
      entities: {},
      response: 'I can help you plan routes, check arrivals, and provide transit information. What would you like to know?',
      suggestedAction: null
    }
  },

  getCrowdDensity: async ({ routeId, time }) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const hour = time ? new Date(time).getHours() : new Date().getHours()
    
    let density = 'low'
    if (hour >= 7 && hour <= 9 || hour >= 16 && hour <= 18) {
      density = 'high'
    } else if (hour >= 6 && hour <= 10 || hour >= 15 && hour <= 19) {
      density = 'medium'
    }
    
    return {
      routeId,
      time: time || new Date().toISOString(),
      density,
      level: density === 'high' ? 85 : density === 'medium' ? 50 : 20, // percentage
      recommendation: density === 'high' 
        ? 'Consider taking an alternative route or waiting for the next vehicle'
        : 'Good time to travel on this route'
    }
  }
}

export default aiService
