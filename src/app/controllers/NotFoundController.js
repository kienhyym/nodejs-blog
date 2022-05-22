class NotFoundController {
    index(req, res) {
        res.render('404')
    }
}

module.exports = new NotFoundController()
