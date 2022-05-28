const User = require('../model/User')

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
        const user = await User.findById(req.params.id)
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

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
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
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({ error: 'user not found ' })
        }
        return res.status(200).send(user)
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
}
