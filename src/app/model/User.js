const mongoose = require('mongoose')
var validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
    },
    age: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is validate')
            }
        },
    },
})
module.exports = User
