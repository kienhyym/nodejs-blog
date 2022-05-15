const Courses = require('../model/Course')
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongoose')
const Course = require('../model/Course')

class CoursesController {
    index(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((data) => {
                console.log(mongooseToObject(data))
                return res.render('course', { course: mongooseToObject(data) })
            })
            .catch(next)
    }
    create(req, res, next) {
        res.render('course/create')
    }
    store(req, res, next) {
        const formdata = req.body
        const course = new Courses(formdata)
        course
            .save()
            .then(() => res.redirect('/'))
            .catch(next)
    }
    list(req, res, next) {
        Course.find({})
            .then((data) => {
                res.render('course/my_courses', {
                    courses: mutipleMongooseToObject(data),
                })
            })
            .catch(next)
    }
    detail(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((data) => {
                console.log(mongooseToObject(data))
                return res.render('course/detail', {
                    course: mongooseToObject(data),
                })
            })
            .catch(next)
    }
    update(req, res, next) {
        const formdata = req.body
        Course.updateOne({ slug: req.params.slug }, formdata)
            .then(() => res.redirect('/course/my_courses'))
            .catch(next)
    }
}
module.exports = new CoursesController()
