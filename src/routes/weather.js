const express = require('express')
const router = express.Router()

const { weatherControler } = require('../app/controllers/WeatherControler')

router.get('/', weatherControler)

module.exports = router
