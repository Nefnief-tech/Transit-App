import express from 'express'
import * as transitController from '../controllers/transitController.js'

const router = express.Router()

// Transit data endpoints
router.get('/routes', transitController.getRoutes)
router.get('/stops', transitController.getStops)
router.get('/arrivals/:stopId', transitController.getArrivals)
router.get('/vehicles', transitController.getVehicles)

export default router
