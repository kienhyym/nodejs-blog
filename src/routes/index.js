import newsRoute from './news'
import sitesRoute from './site'
import coursesRoute from './courses'
import notFoundRoute from './notFound'
import weatherRoute from './weather'
import userRoute from './User'
import authRoute from './auth'

const routes = (app) => {
    app.use('/news', newsRoute)
    app.use('/course', coursesRoute)
    app.use('/weather', weatherRoute)
    app.use('/user', userRoute)
    app.use('/auth', authRoute)
    app.use('/', sitesRoute)
    app.use('*', notFoundRoute)
}
export default routes
