import express from 'express'
import newsController from '../app/controllers/NewsController'

const router = express.Router()

router.get('/:slug', newsController.show)
router.get('/', newsController.index)

export default router
