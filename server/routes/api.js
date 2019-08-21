
const express = require('express')
const router = express.Router()
const Business = require('../models/Business')
const User = require('../models/User')
const Appointment = require('../models/Appointment')
const moment = require('moment')
const Category = require('../models/CategorySchema')

const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/addnewuser', function (req, res) {
    let u1 = new User(req.body)
    u1.save()
    res.send('succes!')
})





getCatgoties = async function () {
// await Category.findOneAndDelete({}).exec(function (err,Category){
//     console.log(Category[0])
//     obj3 = {}
// })
    let obj = {
        Catgories: []
    }
    let obj1 = {}
    await Business.find({}).exec(function (err, businesses) {
        businesses.forEach(b => obj1[b.field] = { name: b.field, img: b.img, description: "jhdskjkjhfk" })
        // obj = JSON.stringify(obj)
        // console.log(obj1)
        for (let i in obj1) {
            // console.log(i)
            // console.log(obj1[i])
            obj.Catgories.push(obj1[i])
        }
        //    obj = JSON.stringify(obj)
        console.log(obj)
        new Category(obj).save()
    })


    // console.log(obj)
}


getCatgoties()


router.get('/Catgories', function (req, res) {
    Category.find({}).exec(function (err, Category) {
        console.log(Category)
        res.send(Category)
    })
})



router.post('/addCatgories', function (req, res) {
    console.log(req.body)
    new Category(req.body).save()
    res.send('succes!')
})


router.post('/addnewbusiness', async function (req, res) {
    req.body.price = parseInt(req.body.price)
    req.body.averageAppointmentTime = parseInt(req.body.averageAppointmentTime)
    let b1 = new Business(req.body)
    let dailySchedule = await getDailySchedule(req.body)
    b1.availableAppointments = [
        { regularDay: dailySchedule },
        { [moment().format('L')]: dailySchedule },
        { [moment().subtract(1, 'day').format('L')]: dailySchedule },
        { [moment().add(2, 'day').format('L')]: dailySchedule },
        { [moment().add(3, 'day').format('L')]: dailySchedule },
        { [moment().add(4, 'day').format('L')]: dailySchedule },
        { [moment().add(5, 'day').format('L')]: dailySchedule },
        { [moment().add(6, 'day').format('L')]: dailySchedule },
        { [moment().add(7, 'day').format('L')]: dailySchedule },
        { [moment().add(8, 'day').format('L')]: dailySchedule },
        { [moment().add(9, 'day').format('L')]: dailySchedule },
    ]
    b1.save()
    res.send('succes!')
})

getDailySchedule = function (object) {

    let dailySchedule = []
    counter = object.averageAppointmentTime
    let num1 = object.startTimeTillBrake * 60
    let num2 = object.breakEndTime * 60


    let numberOfAppointmentsBeforeBreak = Math.floor((object.brakeStartTime - object.startTimeTillBrake) / (object.averageAppointmentTime / 60))
    let numberOfAppointmentsAfterBreak = Math.floor((object.endTime - object.breakEndTime) / (object.averageAppointmentTime / 60))
    for (let i = 0; i < numberOfAppointmentsBeforeBreak; i++) {
        dailySchedule.push(`${Math.floor(num1 / 60)}:${num1 % 60}`)
        num1 += counter
    }
    for (let i = 0; i < numberOfAppointmentsAfterBreak; i++) {
        dailySchedule.push(`${Math.floor(num2 / 60)}:${num2 % 60}`)
        num2 += counter
    }

    return dailySchedule
}

router.post('/addnewappointment', function (req, res) {
    let a1 = new Appointment(req.body)
    a1.save()
    res.send('succes!')
})

router.get('/getuser/:email', function (req, res) {
    User.find({ email: req.params.email }).exec(function (err, users) {
        res.send(users[0])
    })
})

router.get('/getbyfield/:field', function (req, res) {
    Business.find({ field: req.params.field }).exec(function (err, response) {
        res.send(response)
    })
})


// setInterval(function () {
//     let today = moment().format('L')
//     Business.find({}).exec(function (err, res) {
//         if (res[0]) {
//             Object.keys(res[0].availableAppointments[1])[0] == today ?
//                 null :
//                 Business.find({}).exec(function (err, res) {
//                     for (let i of res) {
//                         i.availableAppointments.push = { [today]: Object.values(res[0].availableAppointments[0].regularDay) }
//                         i.availableAppointments.splice(1, 1)
//                     }
//                 })
//         }
//     })
// },
//     3000)



module.exports = router
