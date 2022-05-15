const express = require('express')
const router = express.Router()

const coursesController = require('../app/controllers/CoursesController')

router.get('/create', coursesController.create)
router.get('/my_courses', coursesController.list)
router.post('/store', coursesController.store)
router.post('/detail/:slug/update', coursesController.update)
router.get('/:slug', coursesController.index)
router.get('/detail/:slug', coursesController.detail)

module.exports = router
