const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
require('dotenv').config({ path: '../.env' })
const salt = 10
const Login = require('../models/Login')
const User = require('../models/User')
const { generateJWT } = require('./services')

//Get Users
router.get('/getLogins',  (req, res) => {
    Login.find({})
    .then(users => res.json(users))
    .catch(error => console.log(error))
})

//Login
router.post('/login', async (req,res) => {
    let inputID = req.body.username

    let user = await User.find({ userName: inputID })
    //if the id user submit is not exist in database, response 400
    if (typeof user[0] === 'undefined') {
        res.sendStatus(400)
    }
    //otherwise, check if password user submit is correct
    else {
        const password = JSON.stringify(req.body.password)
        const hashPassword = (await Login.find({ userID: user[0]._id }))[0].password
        bcrypt.compare(password, hashPassword, (err, isCorrect) => {
            if (err) throw err
            if (isCorrect) {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.cookie('JWT', generateJWT({username: inputID}), { httpOnly: true, maxAge: 60*15*1000 })
                res.status(200).json(user)
            }
            else res.sendStatus(400)
        })
    }
})
//Sign up
router.post('/signup', async (req,res) => {
    //front-end will manage if the username or password was undefined or not
    let inputID = req.body.username
    let user = await User.find({ userName: inputID })
    //if the id user submit is not exist in database, create new login record
    if (typeof user[0] === 'undefined') {
        bcrypt.hash(JSON.stringify(req.body.password), salt, async (err, hash) => {
            if (err) throw err
            //if the operation succeed, return status 200
            user = await User.create({userName: inputID})
            if (user) {
                if (await Login.create({ userID: user._id, password: hash }))
                    res.sendStatus(200)
                else
                    res.sendStatus(500)
            }
                
            // else res.sendStatus(507)
        })
    }
    //otherwise, send status 409
    else res.sendStatus(409)
})
//Log out
router.post('/logout', (req, res) => {
    res.clearCookie('JWT')
    res.clearCookie('user')
    res.sendStatus(200)
})

module.exports = router