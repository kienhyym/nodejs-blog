const express = require('express')
const auth = require('../app/middleware/auth')

const router = express.Router()
const {
    addUser,
    getAllUsers,
    getUserbyID,
    updateUserbyID,
    deleteUserbyID,
} = require('../app/controllers/UserController')

router.delete('/:id', deleteUserbyID)
router.patch('/:id', updateUserbyID)
router.get('/users/:id', getUserbyID)
router.get('/users', auth, getAllUsers)
router.post('/', addUser)

module.exports = router
