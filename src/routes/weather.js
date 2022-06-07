import express from 'express'
import { weatherControler } from '../app/controllers/WeatherControler'

const router = express.Router()
router.get('/', weatherControler)

export default router
