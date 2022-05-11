const newsRoute = require('./news')
const sitesRoute = require('./site')
const coursesRoute = require('./courses')

const routes = (app) => {
    app.use('/news', newsRoute)
    app.use('/course', coursesRoute)
    app.use('/', sitesRoute)
}
module.exports = routes
