require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const usersRoutes = require('./routes')

const app = express()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/auth'
const PORT = process.env.PORT || 3001

mongoose.connect(MONGODB_URI, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
	res.json({message: "API root"})
})

app.use('/api/users', usersRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})
