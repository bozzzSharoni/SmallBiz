const DBNAME = process.env.DBNAME
const PORT = process.env.PORT
// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')

// Mongoose setup
const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SmallBizDB', { useNewUrlParser: true })

//Cross origin
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use('/', api)





port = PORT || 8000
DBname = DBNAME || 'SmallBizDB'

mongoose.connect(`mongodb://localhost/${DBname}`, { useNewUrlParser: true }).then(() => {
    app.listen(port, () => console.log(`Running server on port` + port))
})



// const port = 8000
// app.listen(port, function () {
//     console.log(`Running on port ${port}`)
// })

