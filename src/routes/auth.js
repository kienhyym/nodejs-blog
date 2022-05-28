const express = require('express')
const auth = require('../app/middleware/auth')

const router = express.Router()
const { login, logout } = require('../app/controllers/AuthController')

router.post('/login', login)
router.post('/logout', auth, logout)

module.exports = router
