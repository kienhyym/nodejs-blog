const mutipleMongooseToObject = (object) => {
    return object.map((item) => item.toObject())
}
const mongooseToObject = (object) => {
    return object ? object.toObject() : object
}
export { mutipleMongooseToObject, mongooseToObject }
