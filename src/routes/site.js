import express from 'express'
import siteController from '../app/controllers/siteController'

const router = express.Router()
router.get('/about', siteController.about)
router.get('/help', siteController.help)
router.get('/search', siteController.search)
router.get('/', siteController.index)

export default router
