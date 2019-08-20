const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BusinessSchema = new Schema({
    name: String,
    email: String,
    password: String,
    description: String,
    img: String,
    owner: String,
    // payment: String,
    // appointmentComfirm: Boolean,
    country: String,
    city: String,
    address: String,
    field: String,
    service: String,
    price: Number,
    averageAppointmentTime: Number,
    rating: Number,
    days: {
        type: {},
        default: { sunday: false, monday: false, thusday: false, wednesday: false, thursday: false, friday: false, saturday: false }
    },
    startTimeTillBrake: Number,
    brakeStartTime: Number,
    breakEndTime: Number,
    endTime: Number,
    availableAppointments: { type: Object, default: { key: "value" } },
})

const Business = mongoose.model("Business", BusinessSchema)
module.exports = Business

