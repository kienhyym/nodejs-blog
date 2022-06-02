const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
var validator = require('validator')
const jwt = require('jsonwebtoken')
const Course = require('../model/Course')

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
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    console.log('X_X_XX__XX_X_X_X_X_userToken', user)
    await user.save()
    return token
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

const User = mongoose.model('User', UserSchema)
module.exports = User
