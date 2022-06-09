import {
    ACCESS_TOKEN_LIFE,
    REFRESH_SECRET,
    REFRESH_TOKEN_LIFE,
    SECRET,
} from '../../config/contain'
import User from '../model/User'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        )
        const token = await user.generateAuthToken()
        return res.status(201).send({ user, token })
    } catch (error) {
        return res.status(400).send({ error: error.message })
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
        console.log(typeof error)
        return res.status(500).send(error)
    }
}

const onRefreshToken = async (req, res) => {
    try {
        const refreshTokenFromClient = req.body.refreshToken
        const user = await User.onRefreshToken(refreshTokenFromClient)
        await user.save()
        return res.status(200).send(user.tokens)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export { login, logout, onRefreshToken }
