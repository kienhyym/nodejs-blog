const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema({
    id: ObjectId,
    name: { type: String, maxlength: 225 },
    description: { type: String, maxlength: 600 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    image: { type: String, maxlength: 225 },
    slug: { type: String, maxlength: 25 },
})
module.exports = mongoose.model('Course', Course)
