import apiClient from './api'

export const transitService = {
  // Get available routes
  getRoutes: async () => {
    try {
      const response = await apiClient.get('/transit/routes')
      return response.data
    } catch (error) {
      console.error('Error fetching routes:', error)
      throw error
    }
  },

  // Get transit stops
  getStops: async () => {
    try {
      const response = await apiClient.get('/transit/stops')
      return response.data
    } catch (error) {
      console.error('Error fetching stops:', error)
      throw error
    }
  },

  // Get real-time arrivals for a stop
  getArrivals: async (stopId) => {
    try {
      const response = await apiClient.get(`/transit/arrivals/${stopId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching arrivals:', error)
      throw error
    }
  },

  // Get vehicle locations
  getVehicles: async () => {
    try {
      const response = await apiClient.get('/transit/vehicles')
      return response.data
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      throw error
    }
  },

  // Search for bus lines by route number
  searchBusLines: async (routeNo) => {
    try {
      const response = await apiClient.get(`/transit/bus-lines/${routeNo}`)
      return response.data
    } catch (error) {
      console.error('Error searching bus lines:', error)
      throw error
    }
  },
}

export default transitService
