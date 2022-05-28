const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
var validator = require('validator')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const UserSchema = new Schema({
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
})
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    console.log('req', email, password)
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error('Unable login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable login')
    }
    return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User
