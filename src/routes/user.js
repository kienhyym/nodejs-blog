import express from 'express'
import auth from '../app/middleware/auth'
import {
    addUser,
    getAllUsers,
    getUserbyID,
    updateUserbyID,
    deleteUserbyID,
    removeUserbyID,
} from '../app/controllers/UserController'

const router = express.Router()
router.delete('/delete', auth, removeUserbyID)
router.delete('/', auth, deleteUserbyID)
router.patch('/', auth, updateUserbyID)
router.get('/', auth, getUserbyID)
router.get('/users', auth, getAllUsers)
router.post('/', addUser)

export default router
