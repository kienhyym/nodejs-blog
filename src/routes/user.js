const express = require('express')
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
router.get('/users', getAllUsers)
router.post('/', addUser)

module.exports = router
