const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    name: String,
    description: String,
    price: String,
    createAt: { type: Date, default: Date.now },
    thumnail: String
})

module.exports = mongoose.model('Product', Product)