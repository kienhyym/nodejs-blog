import Courses from '../model/Course'
import { mongooseToObject, mutipleMongooseToObject } from '../../util/mongoose'

const index = async (req, res, next) => {
    Courses.findOne({ slug: req.params.slug })
        .then((data) => {
            console.log(mongooseToObject(data))
            return res.render('course', { course: mongooseToObject(data) })
        })
        .catch(next)
}
const create = async (req, res) => {
    try {
        const course = new Course({
            ...req.body,
            owner: req.user._id,
        })
        await course.save()
        return res.status(200).send(course)
    } catch (error) {
        return res.status(400).send(error)
    }
}
const store = async (req, res, next) => {
    const formdata = req.body
    const course = new Courses(formdata)
    course
        .save()
        .then(() => res.redirect('/'))
        .catch(next)
}
const list = async (req, res, next) => {
    Courses.find({})
        .then((data) => {
            res.render('course/my_courses', {
                courses: mutipleMongooseToObject(data),
            })
        })
        .catch(next)
}

const detail = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)
            .populate('owner')
            .exec()
        console.log(course.owner)
        return res.status(200).send(course)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}
const update = async (req, res, next) => {
    const formdata = req.body
    Courses.updateOne({ slug: req.params.slug }, formdata)
        .then(() => res.redirect('/course/my_courses'))
        .catch(next)
}

export default {
    index,
    create,
    store,
    list,
    detail,
    update,
}
