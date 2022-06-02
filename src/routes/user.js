const express = require('express')
const auth = require('../app/middleware/auth')

const router = express.Router()
const {
    addUser,
    getAllUsers,
    getUserbyID,
    updateUserbyID,
    deleteUserbyID,
    removeUserbyID,
} = require('../app/controllers/UserController')

router.delete('/delete', auth, removeUserbyID)
router.delete('/', auth, deleteUserbyID)
router.patch('/', auth, updateUserbyID)
router.get('/', auth, getUserbyID)
router.get('/users', auth, getAllUsers)
router.post('/', addUser)

module.exports = router
