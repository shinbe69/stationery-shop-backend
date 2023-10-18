const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    item: {type: Object},
    totalPrice: Number,
    status: String,
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', Order)