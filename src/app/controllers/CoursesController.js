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
}
module.exports = new CoursesController()
