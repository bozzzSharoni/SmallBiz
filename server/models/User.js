const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    password: String,
    phone: String,
    email: String,
    gender: String,
    points: Number,
    city: String,
    appointments: [],
})

const User = mongoose.model("User", UserSchema)
module.exports = User



