const User = require('../model/User')

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        )
        const token = await user.generateAuthToken()
        return res.status(201).send({ user, token })
    } catch (error) {
        return res.status(400).send(error)
    }
}
const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((item) => {
            return item.token !== req.token
        })
        await req.user.save()
        return res.status(200).send(true)
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = {
    login,
    logout,
}
