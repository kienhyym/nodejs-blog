import express from 'express'
import auth from '../app/middleware/auth'
import coursesController from '../app/controllers/CoursesController'

const router = express.Router()
router.post('/create', auth, coursesController.create)
router.get('/my_courses', coursesController.list)
router.post('/store', coursesController.store)
router.post('/detail/:slug/update', coursesController.update)
router.get('/:slug', coursesController.index)
router.get('/detail/:id', coursesController.detail)

export default router
