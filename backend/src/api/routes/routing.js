import express from 'express'
import * as routingController from '../controllers/routingController.js'

const router = express.Router()

// Route planning endpoints
router.post('/plan', routingController.planRoute)
router.get('/alternatives', routingController.getAlternatives)
router.post('/optimize', routingController.optimizeRoute)

export default router
