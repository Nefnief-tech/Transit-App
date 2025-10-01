import apiClient from './api'

export const routeService = {
  // Plan a route
  planRoute: async (origin, destination, options = {}) => {
    try {
      const response = await apiClient.post('/routes/plan', {
        origin,
        destination,
        ...options,
      })
      return response.data
    } catch (error) {
      console.error('Error planning route:', error)
      throw error
    }
  },

  // Get alternative routes
  getAlternatives: async (routeId) => {
    try {
      const response = await apiClient.get(`/routes/alternatives?routeId=${routeId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching alternatives:', error)
      throw error
    }
  },

  // Optimize route with AI
  optimizeRoute: async (routeData) => {
    try {
      const response = await apiClient.post('/routes/optimize', routeData)
      return response.data
    } catch (error) {
      console.error('Error optimizing route:', error)
      throw error
    }
  },
}

export default routeService
