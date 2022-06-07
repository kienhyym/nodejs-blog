import express from 'express'
import auth from '../app/middleware/auth'
import {
    login,
    logout,
    onRefreshToken,
} from '../app/controllers/AuthController'

const router = express.Router()

router.post('/login', login)
router.post('/logout', auth, logout),
    router.post('/onRefreshToken', onRefreshToken)

export default router
