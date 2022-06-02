const express = require('express')
const router = express.Router()
const auth = require('../app/middleware/auth')

const coursesController = require('../app/controllers/CoursesController')

router.post('/create', auth, coursesController.create)
router.get('/my_courses', coursesController.list)
router.post('/store', coursesController.store)
router.post('/detail/:slug/update', coursesController.update)
router.get('/:slug', coursesController.index)
router.get('/detail/:id', coursesController.detail)

module.exports = router
