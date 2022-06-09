import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import Course from '../model/Course'
import {
    ACCESS_TOKEN_LIFE,
    SECRET,
    REFRESH_SECRET,
    REFRESH_TOKEN_LIFE,
} from '../../config/contain'

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        age: {
            type: Number,
            default: 0,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('email is validate')
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            trim: true,
        },
        tokens: [
            {
                token: {
                    type: String,
                },
                refreshToken: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
)

UserSchema.virtual('course', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'owner',
})

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.pre('remove', async function (next) {
    const user = this
    await Course.deleteMany({ owner: user._id })
    next()
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, SECRET, {
        algorithm: 'HS256',
        expiresIn: ACCESS_TOKEN_LIFE,
    })
    const refreshToken = jwt.sign(
        { _id: user._id.toString() },
        REFRESH_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: REFRESH_TOKEN_LIFE,
        }
    )
    user.tokens = user.tokens.concat({ token, refreshToken })
    await user.save()
    return {
        token,
        refreshToken,
    }
}
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({
            name: 'error',
            message: 'no account',
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('uncorect password')
    }
    return user
}

UserSchema.statics.onRefreshToken = async (refreshToken) => {
    const data = jwt.verify(refreshToken, REFRESH_SECRET)
    const user = await User.findOne({
        _id: data._id,
        'tokens.refreshToken': refreshToken,
    })
    if (!user) {
        throw new Error({
            name: 'error',
            message: 'no account',
        })
    }
    user.tokens = user.tokens.filter((item) => {
        return item.refreshToken !== refreshToken
    })
    const token = jwt.sign({ _id: user._id }, SECRET, {
        algorithm: 'HS256',
        expiresIn: ACCESS_TOKEN_LIFE,
    })
    const newRefreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET, {
        algorithm: 'HS256',
        expiresIn: REFRESH_TOKEN_LIFE,
    })
    user.tokens = user.tokens.concat({ token, refreshToken: newRefreshToken })
    return user
}

const User = mongoose.model('User', UserSchema)
export default User
