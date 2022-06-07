import jwt from 'jsonwebtoken'
import { SECRET } from '../../config/contain'
import User from '../model/User'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, SECRET)
        const user = await User.findOne({
            _id: data._id,
            'tokens.token': token,
        })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource',
        })
    }
}
export default auth
