import express from 'express'
import * as aiController from '../controllers/aiController.js'

const router = express.Router()

// AI features endpoints
router.post('/predict-delay', aiController.predictDelay)
router.post('/query', aiController.nlpQuery)
router.get('/crowd-density', aiController.getCrowdDensity)

export default router
