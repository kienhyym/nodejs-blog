const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/my_database')
        console.log('connect success!!!!')
    } catch (error) {
        console.log('connect false', error)
    }
}
module.exports = { connect }
