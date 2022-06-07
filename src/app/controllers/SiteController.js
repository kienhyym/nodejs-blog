import Course from '../model/Course'
import { mutipleMongooseToObject } from '../../util/mongoose'

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
    about(req, res) {
        res.render('about')
    }
    help(req, res) {
        res.render('help')
    }
}

export default new SiteController()
