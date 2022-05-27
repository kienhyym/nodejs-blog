const User = require('../model/User')

const UserControler = async (req, res) => {
    try {
        const user = new User(req.body)
        const newUser = await user.save()
        console.log('save success', user)
        return res.send(user)
    } catch (error) {
        return res.send(error)
    }
}
module.exports = {
    UserControler,
}
