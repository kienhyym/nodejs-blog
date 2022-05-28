const newsRoute = require('./news')
const sitesRoute = require('./site')
const coursesRoute = require('./courses')
const notFoundRoute = require('./notFound')
const weatherRoute = require('./weather')
const userRoute = require('./User')
const authRoute = require('./auth')

const routes = (app) => {
    app.use('/news', newsRoute)
    app.use('/course', coursesRoute)
    app.use('/weather', weatherRoute)
    app.use('/user', userRoute)
    app.use('/auth', authRoute)
    app.use('/', sitesRoute)
    app.use('*', notFoundRoute)
}
module.exports = routes
