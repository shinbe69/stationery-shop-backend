const express = require('express')
const router = express.Router()
const User = require('../models/User')

//Get Users
router.get('/getUsers',  (req, res, next) => {
    User.find({})
    .then(users => res.json(users))
    .catch(error => next(error))
})

module.exports = router