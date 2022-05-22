const express = require('express')
const router = express.Router()

const notFoundController = require('../app/controllers/NotFoundController')

router.get('/', notFoundController.index)

module.exports = router
