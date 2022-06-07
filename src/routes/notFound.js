import express from 'express'
import notFoundController from '../app/controllers/NotFoundController'

const router = express.Router()
router.get('/', notFoundController.index)

export default router
