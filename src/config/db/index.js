import mongoose from 'mongoose'

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/my_database')
        console.log('connect success!!!!')
    } catch (error) {
        console.log('connect false', error)
    }
}
export default { connect }
