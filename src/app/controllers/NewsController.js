class NewsController {
    index(req, res) {
        res.render('new')
    }
    show(req, res) {
        res.send('new deti')
    }
}

export default new NewsController()
