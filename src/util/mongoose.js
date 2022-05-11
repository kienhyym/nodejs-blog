const mutipleMongooseToObject = (object) => {
    return object.map((item) => item.toObject())
}
const mongooseToObject = (object) => {
    return object ? object.toObject() : object
}
module.exports = {
    mutipleMongooseToObject,
    mongooseToObject,
}
