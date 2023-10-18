const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userName: String,
    dob: {type: Date, default: null},
    cart: {
        cartItems: {type: Object, default: []},
        totalQuantity: {type: Number, default: 0}
    },
    isAdmin: {type: Boolean, default: false},
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)