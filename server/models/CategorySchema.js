const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    Catgories: Object
})

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category



