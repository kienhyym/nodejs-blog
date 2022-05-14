const Courses = require('../model/Course')
const { mongooseToObject } = require('../../util/mongoose')

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
}
module.exports = new CoursesController()
