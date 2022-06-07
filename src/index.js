import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'
import db from './config/db/index.js'

const app = express()
const port = process.env.port || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

db.connect()

// logger
if (port === 3000) {
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
