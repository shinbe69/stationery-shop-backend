const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const db = require('./db/connectDB')
const router = require('./api/router')
const cookieParser = require('cookie-parser')
const { checkToken } = require('./api/services')

db.isConnect.then(
    () => {
        console.log('Connected to the database!')
        app.listen(process.env.PORT || 3001, process.env.HOST || '0.0.0.0', () => {
            app.use(cookieParser())
            app.use(checkToken)
            app.use(router)
            console.log('Server is running on', process.env.HOST, 'at port:', process.env.PORT, '!')
        })
    },
    () => {
        console.log('Connecting to the database failed!')
    }
)