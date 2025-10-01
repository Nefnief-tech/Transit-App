import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const TRANSLINK_API_KEY = process.env.TRANSLINK_API_KEY
const TRANSLINK_BASE_URL = 'https://api.translink.ca/rttiapi/v1'

// Mock data for transit services
const mockRoutes = [
  { id: 1, name: 'Expo Line', type: 'skytrain', color: '#0098D8' },
  { id: 2, name: 'Canada Line', type: 'skytrain', color: '#009AC8' },
  { id: 3, name: 'Millennium Line', type: 'skytrain', color: '#FFD520' },
  { id: 4, name: '99 B-Line', type: 'bus', color: '#FF0000' },
  { id: 5, name: 'R4 41st Ave', type: 'bus', color: '#FF0000' }
]

const mockStops = [
  { id: 1, name: 'Waterfront Station', lat: 49.2859, lng: -123.1119, type: 'skytrain' },
  { id: 2, name: 'Burrard Station', lat: 49.2859, lng: -123.1205, type: 'skytrain' },
  { id: 3, name: 'Granville Station', lat: 49.2832, lng: -123.1161, type: 'skytrain' },
  { id: 4, name: 'Stadium-Chinatown', lat: 49.2795, lng: -123.1095, type: 'skytrain' },
  { id: 5, name: 'Main Street-Science World', lat: 49.2731, lng: -123.1004, type: 'skytrain' },
  { id: 6, name: 'Broadway-City Hall', lat: 49.2628, lng: -123.1160, type: 'bus' }
]

const mockVehicles = [
  { id: 1, routeId: 4, route: '99 B-Line', lat: 49.2827, lng: -123.1207, type: 'bus', heading: 90 },
  { id: 2, routeId: 1, route: 'Expo Line', lat: 49.2850, lng: -123.1100, type: 'skytrain', heading: 270 },
  { id: 3, routeId: 2, route: 'Canada Line', lat: 49.2835, lng: -123.1180, type: 'skytrain', heading: 180 }
]

const transitService = {
  getRoutes: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockRoutes
  },

  getStops: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockStops
  },

  getArrivals: async (stopId) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const stop = mockStops.find(s => s.id === parseInt(stopId))
    if (!stop) {
      throw new Error('Stop not found')
    }

    return {
      stopId: parseInt(stopId),
      stopName: stop.name,
      arrivals: [
        { route: 'Expo Line', destination: 'King George', minutes: 3, scheduled: '10:15' },
        { route: 'Expo Line', destination: 'Waterfront', minutes: 8, scheduled: '10:20' },
        { route: 'Millennium Line', destination: 'VCC-Clark', minutes: 12, scheduled: '10:24' }
      ]
    }
  },

  getVehicles: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockVehicles
  },

  getBusLines: async (routeNo) => {
    try {
      // If no API key, return mock data
      if (!TRANSLINK_API_KEY) {
        console.log('TransLink API key not found, using mock data')
        return [
          {
            RouteNo: routeNo,
            RouteName: `Bus Route ${routeNo}`,
            Direction: 'EAST',
            Destination: 'UBC'
          },
          {
            RouteNo: routeNo,
            RouteName: `Bus Route ${routeNo}`,
            Direction: 'WEST',
            Destination: 'Commercial'
          }
        ]
      }

      // Call TransLink API
      const response = await axios.get(`${TRANSLINK_BASE_URL}/routes/${routeNo}`, {
        params: {
          apikey: TRANSLINK_API_KEY
        },
        headers: {
          'Accept': 'application/json'
        }
      })

      return response.data
    } catch (error) {
      console.error('TransLink API error:', error.message)
      // Return mock data as fallback
      return [
        {
          RouteNo: routeNo,
          RouteName: `Bus Route ${routeNo}`,
          Direction: 'EAST',
          Destination: 'UBC'
        },
        {
          RouteNo: routeNo,
          RouteName: `Bus Route ${routeNo}`,
          Direction: 'WEST',
          Destination: 'Commercial'
        }
      ]
    }
  }
}

export default transitService
