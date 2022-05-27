const express = require('express')
const router = express.Router()
const { UserControler } = require('../app/controllers/UserController')

router.post('/', UserControler)

module.exports = router
