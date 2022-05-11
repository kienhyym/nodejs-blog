const Course = require('../model/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((data) => {
                res.render('home', { courses: mutipleMongooseToObject(data) })
            })
            .catch(next)
    }
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()
