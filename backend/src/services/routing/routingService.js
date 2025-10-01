// Mock routing service
const routingService = {
  planRoute: async ({ origin, destination, departureTime, preferences }) => {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return {
      origin,
      destination,
      departureTime: departureTime || new Date().toISOString(),
      duration: 35, // minutes
      distance: 8.5, // km
      legs: [
        {
          mode: 'walk',
          from: origin,
          to: 'Waterfront Station',
          duration: 5,
          distance: 0.4
        },
        {
          mode: 'skytrain',
          from: 'Waterfront Station',
          to: 'Burrard Station',
          route: 'Expo Line',
          duration: 3,
          distance: 1.2
        },
        {
          mode: 'walk',
          from: 'Burrard Station',
          to: destination,
          duration: 7,
          distance: 0.5
        }
      ],
      carbonFootprint: 0.5, // kg CO2
      cost: 3.15 // CAD
    }
  },

  getAlternatives: async ({ origin, destination }) => {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return [
      {
        id: 1,
        duration: 35,
        transfers: 1,
        modes: ['walk', 'skytrain', 'walk'],
        carbonFootprint: 0.5
      },
      {
        id: 2,
        duration: 42,
        transfers: 2,
        modes: ['walk', 'bus', 'skytrain', 'walk'],
        carbonFootprint: 0.6
      },
      {
        id: 3,
        duration: 28,
        transfers: 0,
        modes: ['walk', 'bus', 'walk'],
        carbonFootprint: 0.7
      }
    ]
  },

  optimizeRoute: async ({ route, preferences }) => {
    await new Promise(resolve => setTimeout(resolve, 150))
    
    return {
      ...route,
      optimized: true,
      improvements: [
        'Switched to earlier departure for less crowded vehicle',
        'Optimized walking route to reduce distance by 100m'
      ],
      carbonSaved: 0.1,
      timeSaved: 5
    }
  }
}

export default routingService
