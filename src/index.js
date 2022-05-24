const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const routes = require('./routes')
const db = require('./config/db')

const app = express()
const port = process.env.port || 3000

db.connect()

// logger
if (__dev__) {
    app.use(morgan('combined'))
}

//public file
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// handlebars
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './resources', 'views'))

routes(app)

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})
