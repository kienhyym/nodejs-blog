const Schema = mongoose.Schema
import mongoose from 'mongoose'

const courseSchema = new Schema({
    name: { type: String, maxlength: 225 },
    description: { type: String, maxlength: 600 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    image: { type: String, maxlength: 225 },
    slug: { type: String, maxlength: 25 },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
})
const Course = mongoose.model('Course', courseSchema)
export default Course
