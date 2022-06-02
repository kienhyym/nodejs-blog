const { update } = require('../model/User')
const User = require('../model/User')
const { mongooseToObject } = require('../../util/mongoose')
const addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        console.log(user)
        await user.save()
        return res.status(200).send(user)
    } catch (error) {
        return res.send(error)
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).send(users)
    } catch (error) {
        return res.send(error)
    }
}
const getUserbyID = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('course').exec()
        return res.status(200).send(user)
    } catch (error) {
        return res.send(error)
    }
}
const updateUserbyID = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowUpdate = ['name', 'email', 'password', 'age']
        isValidate = updates.every((item) => allowUpdate.includes(item))
        if (!isValidate) {
            return res.status(404).send({ error: 'param isvalidate' })
        }
        const user = await User.findById(req.user._id)
        updates.forEach((element) => (user[element] = req.body[element]))
        await user.save()
        if (!user) {
            return res.status(404).send({ error: 'user not found ' })
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
}
const deleteUserbyID = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (!user) {
            return res.status(404).send({ error: 'user not found ' })
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error)
    }
}
const removeUserbyID = async (req, res) => {
    try {
        await req.user.remove()
        return res.status(200).send(true)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserbyID,
    updateUserbyID,
    deleteUserbyID,
    removeUserbyID,
}
