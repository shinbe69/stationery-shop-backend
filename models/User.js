const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userName: String,
    dob: {type: Date, default: null},
    cart: {type: Object, default: []},
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)