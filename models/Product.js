const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    name: String,
    description: String,
    price: String,
    createAt: { type: Date, default: Date.now },
    thumnail: String,
    quantity: Number,
    additionalInfo: String,
    category: ObjectId
})

module.exports = mongoose.model('Product', Product)