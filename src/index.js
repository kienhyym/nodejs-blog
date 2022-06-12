import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'
import db from './config/db/index.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img')
    },
    filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    },
})

const upload = multer({
    dest: 'src/public/img',
    limits: {
        fieldSize: 1000000,
    },
    storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('File is must be jpg, png ,jpeg'))
        }
        cb(undefined, true)
    },
})

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
app.post(
    '/upload',
    upload.single('upload'),
    (req, res) => {
        res.send()
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    }
)
app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})
