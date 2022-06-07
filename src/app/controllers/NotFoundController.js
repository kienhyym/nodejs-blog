class NotFoundController {
    index(req, res) {
        res.render('404')
    }
}

export default new NotFoundController()
